import prisma from "../db/db.config.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// ****************** Helper: Seat Status ******************
export const getSeatStatus = (available, total) => {
  const avail = Number(available) || 0;
  const tot = Number(total) || 0;

  if (avail === 0) return "Sold Out";
  if (tot > 0 && avail / tot <= 0.2) return "Few Seats Left";
  if (tot > 0 && avail / tot <= 0.5) return "Limited";
  return "Available";
};

// ****************** Helper: Public Data Sanitizer ******************
// STRICT SECURITY RULE: NEVER return total_seats, price, status, is_published, created_at, updated_at
export const formatPublicDeparture = (dep) => ({
  id: dep.id,
  departure_date: dep.departure_date,
  return_date: dep.return_date,
  departure_city: dep.departure_city,
  flights: (dep.flights || []).map((f) => ({
    airline: f.airline,
    flight_number: f.flight_number,
  })),
  tiers: (dep.tiers || []).map((t) => ({
    id: t.id,
    tier_name: t.tier_name,
    available_seats: t.available_seats,
    makkah_hotel: t.makkah_hotel,
    madina_hotel: t.madina_hotel,
    seat_status: getSeatStatus(t.available_seats, t.total_seats),
  })),
});

// ============================================================================
// PUBLIC CONTROLLERS (No Auth Required)
// ============================================================================

export const getPublicDepartures = asyncHandler(async (req, res) => {
  if (!prisma.departure) {
    return res
      .status(200)
      .json(new ApiResponse(200, [], "Public departures fetched successfully"));
  }

  const departures = await prisma.departure.findMany({
    where: {
      is_published: true,
    },
    include: {
      flights: {
        select: {
          airline: true,
          flight_number: true,
        },
      },
      tiers: {
        select: {
          id: true,
          tier_name: true,
          available_seats: true,
          total_seats: true,
          makkah_hotel: true,
          madina_hotel: true,
        },
      },
    },
    orderBy: {
      departure_date: "asc",
    },
  });

  const sanitized = departures.map(formatPublicDeparture);

  return res
    .status(200)
    .json(new ApiResponse(200, sanitized, "Public departures fetched successfully"));
});

/**
 * GET /api/v1/departures/public/:id
 * Returns single published departure detail.
 */
export const getPublicDepartureById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const departure = await prisma.departure.findFirst({
    where: {
      id,
      is_published: true,
    },
    include: {
      flights: {
        select: {
          airline: true,
          flight_number: true,
        },
      },
      tiers: {
        select: {
          id: true,
          tier_name: true,
          available_seats: true,
          total_seats: true,
          makkah_hotel: true,
          madina_hotel: true,
        },
      },
    },
  });

  if (!departure) {
    throw new ApiError(404, "Departure not found or not published");
  }

  const sanitized = formatPublicDeparture(departure);

  return res
    .status(200)
    .json(new ApiResponse(200, sanitized, "Departure detail fetched successfully"));
});

// ============================================================================
// ADMIN CONTROLLERS (verifyAdminJwt Required)
// ============================================================================

/**
 * GET /api/v1/admin/departures
 * All departures (published + draft) with full flights and tiers
 */
export const getAdminDepartures = asyncHandler(async (req, res) => {
  if (!prisma.departure) {
    return res
      .status(200)
      .json(new ApiResponse(200, [], "Admin departures fetched successfully"));
  }

  const departures = await prisma.departure.findMany({
    include: {
      flights: true,
      tiers: true,
    },
    orderBy: {
      departure_date: "asc",
    },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, departures, "Admin departures fetched successfully"));
});

/**
 * POST /api/v1/admin/departures
 * Create new departure with optional flights and tiers
 */
export const createDeparture = asyncHandler(async (req, res) => {
  const {
    departure_date,
    return_date,
    departure_city,
    status = "active",
    is_published = false,
    flights = [],
    tiers = [],
  } = req.body;

  if (!departure_date || !return_date || !departure_city) {
    throw new ApiError(400, "departure_date, return_date, and departure_city are required");
  }

  const createdDeparture = await prisma.departure.create({
    data: {
      departure_date: new Date(departure_date),
      return_date: new Date(return_date),
      departure_city: departure_city.trim(),
      status: status || "active",
      is_published: Boolean(is_published),
      flights: {
        create: flights
          .filter((f) => f.airline && f.flight_number)
          .map((f) => ({
            airline: f.airline.trim(),
            flight_number: f.flight_number.trim(),
          })),
      },
      tiers: {
        create: tiers
          .filter((t) => t.tier_name)
          .map((t) => ({
            tier_name: t.tier_name.trim(),
            total_seats: Number(t.total_seats) || 0,
            available_seats:
              t.available_seats !== undefined
                ? Number(t.available_seats)
                : Number(t.total_seats) || 0,
            makkah_hotel: (t.makkah_hotel || "").trim(),
            madina_hotel: (t.madina_hotel || "").trim(),
          })),
      },
    },
    include: {
      flights: true,
      tiers: true,
    },
  });

  return res
    .status(201)
    .json(new ApiResponse(201, createdDeparture, "Departure created successfully"));
});

/**
 * PUT /api/v1/admin/departures/:id
 * Edit departure and sync its flights & tiers if provided
 */
export const updateDeparture = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    departure_date,
    return_date,
    departure_city,
    status,
    is_published,
    flights,
    tiers,
  } = req.body;

  const existing = await prisma.departure.findUnique({
    where: { id },
  });

  if (!existing) {
    throw new ApiError(404, "Departure not found");
  }

  const updateData = {};
  if (departure_date) updateData.departure_date = new Date(departure_date);
  if (return_date) updateData.return_date = new Date(return_date);
  if (departure_city !== undefined) updateData.departure_city = departure_city.trim();
  if (status !== undefined) updateData.status = status;
  if (is_published !== undefined) updateData.is_published = Boolean(is_published);

  // If flights array is provided, replace/sync existing flights
  if (Array.isArray(flights)) {
    await prisma.flight.deleteMany({ where: { departure_id: id } });
    updateData.flights = {
      create: flights
        .filter((f) => f.airline && f.flight_number)
        .map((f) => ({
          airline: f.airline.trim(),
          flight_number: f.flight_number.trim(),
        })),
    };
  }

  // If tiers array is provided, replace/sync existing tiers
  if (Array.isArray(tiers)) {
    await prisma.packageTier.deleteMany({ where: { departure_id: id } });
    updateData.tiers = {
      create: tiers
        .filter((t) => t.tier_name)
        .map((t) => ({
          tier_name: t.tier_name.trim(),
          total_seats: Number(t.total_seats) || 0,
          available_seats:
            t.available_seats !== undefined
              ? Number(t.available_seats)
              : Number(t.total_seats) || 0,
          makkah_hotel: (t.makkah_hotel || "").trim(),
          madina_hotel: (t.madina_hotel || "").trim(),
        })),
    };
  }

  const updatedDeparture = await prisma.departure.update({
    where: { id },
    data: updateData,
    include: {
      flights: true,
      tiers: true,
    },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, updatedDeparture, "Departure updated successfully"));
});

/**
 * DELETE /api/v1/admin/departures/:id
 * Delete departure (cascades to flights and tiers)
 */
export const deleteDeparture = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const existing = await prisma.departure.findUnique({
    where: { id },
  });

  if (!existing) {
    throw new ApiError(404, "Departure not found");
  }

  await prisma.departure.delete({
    where: { id },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Departure deleted successfully"));
});

/**
 * PATCH /api/v1/admin/departures/:id/publish
 * Toggle is_published true/false
 */
export const togglePublishDeparture = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { is_published } = req.body;

  const existing = await prisma.departure.findUnique({
    where: { id },
  });

  if (!existing) {
    throw new ApiError(404, "Departure not found");
  }

  const newPublishState =
    typeof is_published === "boolean" ? is_published : !existing.is_published;

  const updated = await prisma.departure.update({
    where: { id },
    data: {
      is_published: newPublishState,
    },
    include: {
      flights: true,
      tiers: true,
    },
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updated,
        `Departure ${newPublishState ? "published" : "unpublished"} successfully`
      )
    );
});

/**
 * POST /api/v1/admin/departures/:id/flights
 * Add flight to departure
 */
export const addFlight = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { airline, flight_number } = req.body;

  if (!airline || !flight_number) {
    throw new ApiError(400, "airline and flight_number are required");
  }

  const departure = await prisma.departure.findUnique({
    where: { id },
  });

  if (!departure) {
    throw new ApiError(404, "Departure not found");
  }

  const flight = await prisma.flight.create({
    data: {
      departure_id: id,
      airline: airline.trim(),
      flight_number: flight_number.trim(),
    },
  });

  return res
    .status(201)
    .json(new ApiResponse(201, flight, "Flight added successfully"));
});

/**
 * DELETE /api/v1/admin/flights/:flightId
 */
export const deleteFlight = asyncHandler(async (req, res) => {
  const { flightId } = req.params;

  const existing = await prisma.flight.findUnique({
    where: { id: flightId },
  });

  if (!existing) {
    throw new ApiError(404, "Flight not found");
  }

  await prisma.flight.delete({
    where: { id: flightId },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Flight deleted successfully"));
});

/**
 * POST /api/v1/admin/departures/:id/tiers
 * Add package tier to departure
 */
export const addTier = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    tier_name,
    total_seats,
    available_seats,
    makkah_hotel,
    madina_hotel,
  } = req.body;

  if (!tier_name || total_seats === undefined) {
    throw new ApiError(400, "tier_name and total_seats are required");
  }

  const departure = await prisma.departure.findUnique({
    where: { id },
  });

  if (!departure) {
    throw new ApiError(404, "Departure not found");
  }

  const tier = await prisma.packageTier.create({
    data: {
      departure_id: id,
      tier_name: tier_name.trim(),
      total_seats: Number(total_seats) || 0,
      available_seats:
        available_seats !== undefined
          ? Number(available_seats)
          : Number(total_seats) || 0,
      makkah_hotel: (makkah_hotel || "").trim(),
      madina_hotel: (madina_hotel || "").trim(),
    },
  });

  return res
    .status(201)
    .json(new ApiResponse(201, tier, "Package tier added successfully"));
});

/**
 * PUT /api/v1/admin/tiers/:tierId
 * Edit package tier (seats, hotel names, tier name)
 */
export const updateTier = asyncHandler(async (req, res) => {
  const { tierId } = req.params;
  const {
    tier_name,
    total_seats,
    available_seats,
    makkah_hotel,
    madina_hotel,
  } = req.body;

  const existing = await prisma.packageTier.findUnique({
    where: { id: tierId },
  });

  if (!existing) {
    throw new ApiError(404, "Package tier not found");
  }

  const updateData = {};
  if (tier_name !== undefined) updateData.tier_name = tier_name.trim();
  if (total_seats !== undefined) updateData.total_seats = Number(total_seats);
  if (available_seats !== undefined)
    updateData.available_seats = Number(available_seats);
  if (makkah_hotel !== undefined) updateData.makkah_hotel = makkah_hotel.trim();
  if (madina_hotel !== undefined) updateData.madina_hotel = madina_hotel.trim();

  const updatedTier = await prisma.packageTier.update({
    where: { id: tierId },
    data: updateData,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, updatedTier, "Package tier updated successfully"));
});

/**
 * DELETE /api/v1/admin/tiers/:tierId
 * Delete a package tier
 */
export const deleteTier = asyncHandler(async (req, res) => {
  const { tierId } = req.params;

  const existing = await prisma.packageTier.findUnique({
    where: { id: tierId },
  });

  if (!existing) {
    throw new ApiError(404, "Package tier not found");
  }

  await prisma.packageTier.delete({
    where: { id: tierId },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Package tier deleted successfully"));
});
