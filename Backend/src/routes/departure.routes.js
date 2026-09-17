import { Router } from "express";
import {
  getPublicDepartures,
  getPublicDepartureById,
  getAdminDepartures,
  createDeparture,
  updateDeparture,
  deleteDeparture,
  togglePublishDeparture,
  addFlight,
  deleteFlight,
  addTier,
  updateTier,
  deleteTier,
} from "../controllers/departure.controller.js";
import { verifyAdminJwt } from "../middlewares/admin.auth.middleware.js";

// ============================================================================
// PUBLIC ROUTES
// Base mount: /api/v1/departures
// ============================================================================
const departurePublicRoutes = Router();

departurePublicRoutes.route("/public").get(getPublicDepartures);
departurePublicRoutes.route("/public/:id").get(getPublicDepartureById);

// ============================================================================
// ADMIN ROUTES
// Base mount: /api/v1/admin/departures
// ============================================================================
const departureAdminRoutes = Router();

// Protect all admin routes
departureAdminRoutes.use(verifyAdminJwt);

// Departures CRUD
departureAdminRoutes.route("/").get(getAdminDepartures).post(createDeparture);

departureAdminRoutes
  .route("/:id")
  .put(updateDeparture)
  .delete(deleteDeparture);

departureAdminRoutes.route("/:id/publish").patch(togglePublishDeparture);

// Flight sub-resources
departureAdminRoutes.route("/:id/flights").post(addFlight);
departureAdminRoutes.route("/flights/:flightId").delete(deleteFlight);

// Package Tier sub-resources
departureAdminRoutes.route("/:id/tiers").post(addTier);
departureAdminRoutes
  .route("/tiers/:tierId")
  .put(updateTier)
  .delete(deleteTier);

export { departurePublicRoutes, departureAdminRoutes };
export default { departurePublicRoutes, departureAdminRoutes };
