import prisma from "../db/db.config.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";

/* ***************************************************************************************************************
                                        ALL UMRAH ENQUIRY ROUTES
   ****************************************************************************************************************/

// ****************** Get All Umrah Enquiries ******************

const getAllUmrahEnquiries = asyncHandler(async (req, res) => {
  const admin = req.admin;

  if (!admin) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const allUmrahEnquiry = await prisma.enquiryUmrah.findMany();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        allUmrahEnquiry,
        `${allUmrahEnquiry.length} Umrah Enquiry Fetched Successfully`
      )
    );
});

// *************** Update Enquiry ***************

const updateUmrahEnquiry = asyncHandler(async (req, res) => {
  const admin = req.admin;

  if (!admin) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const enquiryId = req.params.id;

  const existingEnquiry = await prisma.enquiryUmrah.findUnique({
    where: { enquiry_id: enquiryId },
  });

  if (!existingEnquiry) {
    throw new ApiError(404, "No Enquiry Found");
  }

  const { status } = req.body;

  const validStatuses = ["pending", "rejected", "approved"];

  if (!status || !validStatuses.includes(status?.toLowerCase())) {
    throw new ApiError(
      400,
      "Invalid or missing status. Allowed values are: Pending, Rejected, Approved."
    );
  }

  const updatedEnquiry = await prisma.enquiryUmrah.update({
    where: { enquiry_id: enquiryId },
    data: { status: status },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, updatedEnquiry, "Status Updated Sucessfully"));
});

// *************** Delete Enquiry ***************

const deleteUmrahEnquiry = asyncHandler(async (req, res) => {
  const admin = req.admin;

  if (!admin) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const enquiryId = req.params.id;

  const existingEnquiry = await prisma.enquiryUmrah.findUnique({
    where: { enquiry_id: enquiryId },
  });

  if (!existingEnquiry) {
    throw new ApiError(404, "No Enquiry Found");
  }

  await prisma.enquiryUmrah.delete({
    where: { enquiry_id: enquiryId },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Enquiry Deleted Sucessfully"));
});

/* ***************************************************************************************************************
                                        ALL FOREX ENQUIRY ROUTES
   ****************************************************************************************************************/

// ****************** Get All Forex Enquiries ******************

const getAllForexEnquiries = asyncHandler(async (req, res) => {
  const admin = req.admin;

  if (!admin) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const allForexEnquiry = await prisma.enquiryForex.findMany();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        allForexEnquiry,
        `${allForexEnquiry.length} Forex Enquiry Fetched Successfully`
      )
    );
});

// *************** Update Enquiry ***************

const updateForexEnquiry = asyncHandler(async (req, res) => {
  const admin = req.admin;

  if (!admin) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const enquiryId = req.params.id;

  const existingEnquiry = await prisma.enquiryForex.findUnique({
    where: { enquiry_id: enquiryId },
  });

  if (!existingEnquiry) {
    throw new ApiError(404, "No Enquiry Found");
  }

  const { status } = req.body;

  const validStatuses = ["pending", "rejected", "approved"];

  if (!status || !validStatuses.includes(status?.toLowerCase())) {
    throw new ApiError(
      400,
      "Invalid or missing status. Allowed values are: Pending, Rejected, Approved."
    );
  }

  const updatedEnquiry = await prisma.enquiryForex.update({
    where: { enquiry_id: enquiryId },
    data: { status: status },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, updatedEnquiry, "Status Updated Sucessfully"));
});

// *************** Delete Enquiry ***************

const deleteForexEnquiry = asyncHandler(async (req, res) => {
  const admin = req.admin;

  if (!admin) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const enquiryId = req.params.id;

  const existingEnquiry = await prisma.enquiryForex.findUnique({
    where: { enquiry_id: enquiryId },
  });

  if (!existingEnquiry) {
    throw new ApiError(404, "No Enquiry Found");
  }

  await prisma.enquiryForex.delete({
    where: { enquiry_id: enquiryId },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Enquiry Deleted Sucessfully"));
});

/* ***************************************************************************************************************
                                        ALL VISA ENQUIRY ROUTES
   ****************************************************************************************************************/

// ****************** Get All Forex Enquiries ******************

const getAllVisaEnquiries = asyncHandler(async (req, res) => {
  const admin = req.admin;

  if (!admin) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const allVisaEnquiry = await prisma.enquiryVisa.findMany();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        allVisaEnquiry,
        `${allVisaEnquiry.length} Visa Enquiry Fetched Successfully`
      )
    );
});

// *************** Update Enquiry ***************

const updateVisaEnquiry = asyncHandler(async (req, res) => {
  const admin = req.admin;

  if (!admin) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const enquiryId = req.params.id;

  const existingEnquiry = await prisma.enquiryVisa.findUnique({
    where: { enquiry_id: enquiryId },
  });

  if (!existingEnquiry) {
    throw new ApiError(404, "No Enquiry Found");
  }

  const { status } = req.body;

  const validStatuses = ["pending", "rejected", "approved"];

  if (!status || !validStatuses.includes(status?.toLowerCase())) {
    throw new ApiError(
      400,
      "Invalid or missing status. Allowed values are: Pending, Rejected, Approved."
    );
  }

  const updatedEnquiry = await prisma.enquiryVisa.update({
    where: { enquiry_id: enquiryId },
    data: { status: status },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, updatedEnquiry, "Status Updated Sucessfully"));
});

// *************** Delete Enquiry ***************

const deleteVisaEnquiry = asyncHandler(async (req, res) => {
  const admin = req.admin;

  if (!admin) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const enquiryId = req.params.id;

  const existingEnquiry = await prisma.enquiryVisa.findUnique({
    where: { enquiry_id: enquiryId },
  });

  if (!existingEnquiry) {
    throw new ApiError(404, "No Enquiry Found");
  }

  await prisma.enquiryVisa.delete({
    where: { enquiry_id: enquiryId },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Enquiry Deleted Sucessfully"));
});

/* ***************************************************************************************************************
                                        ALL CONTACT ENQUIRY ROUTES
   ****************************************************************************************************************/

// ****************** Get All Contact Enquiries ******************

const getAllContactEnquiries = asyncHandler(async (req, res) => {
  const admin = req.admin;

  if (!admin) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const allContactEnquiry = await prisma.enquiryContact.findMany();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        allContactEnquiry,
        `${allContactEnquiry.length} Contact Enquiry Fetched Successfully`
      )
    );
});

// *************** Update Enquiry ***************

const updateContactEnquiry = asyncHandler(async (req, res) => {
  const admin = req.admin;

  if (!admin) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const enquiryId = req.params.id;

  const existingEnquiry = await prisma.enquiryContact.findUnique({
    where: { enquiry_id: enquiryId },
  });

  if (!existingEnquiry) {
    throw new ApiError(404, "No Enquiry Found");
  }

  const { status } = req.body;

  const validStatuses = ["pending", "rejected", "approved"];

  if (!status || !validStatuses.includes(status?.toLowerCase())) {
    throw new ApiError(
      400,
      "Invalid or missing status. Allowed values are: Pending, Rejected, Approved."
    );
  }

  const updatedEnquiry = await prisma.enquiryContact.update({
    where: { enquiry_id: enquiryId },
    data: { status: status },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, updatedEnquiry, "Status Updated Sucessfully"));
});

// *************** Delete Enquiry ***************

const deleteContactEnquiry = asyncHandler(async (req, res) => {
  const admin = req.admin;

  if (!admin) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const enquiryId = req.params.id;

  const existingEnquiry = await prisma.enquiryContact.findUnique({
    where: { enquiry_id: enquiryId },
  });

  if (!existingEnquiry) {
    throw new ApiError(404, "No Enquiry Found");
  }

  await prisma.enquiryContact.delete({
    where: { enquiry_id: enquiryId },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Enquiry Deleted Sucessfully"));
});

// *************** Export Controller ***************

export {
  getAllUmrahEnquiries,
  updateUmrahEnquiry,
  deleteUmrahEnquiry,
  getAllForexEnquiries,
  updateForexEnquiry,
  deleteForexEnquiry,
  getAllVisaEnquiries,
  updateVisaEnquiry,
  deleteVisaEnquiry,
  getAllContactEnquiries,
  updateContactEnquiry,
  deleteContactEnquiry,
};
