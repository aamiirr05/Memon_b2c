import prisma from "../db/db.config.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { sendMailOnStatusUpdate } from "../utils/utilityfunction.js";

/* ***************************************************************************************************************
                                        ALL UMRAH ENQUIRY ROUTES
   ****************************************************************************************************************/

const getAllUmrahEnquiries = asyncHandler(async (req, res) => {
  const admin = req.admin;

  if (!admin) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const allUmrahEnquiry = await prisma.enquiryUmrah.findMany({
    orderBy: {
      created_at: "desc",
    },
  });

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

  const { status, fullname, servicename, email } = req.body;

  if (
    [status, fullname, servicename, email].some(
      (field) => !field || field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields must be filled");
  }

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

  await sendMailOnStatusUpdate(fullname, servicename, status, email);

  return res
    .status(200)
    .json(new ApiResponse(200, updatedEnquiry, "Status Updated Sucessfully"));
});

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

const getAllForexEnquiries = asyncHandler(async (req, res) => {
  const admin = req.admin;

  if (!admin) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const allForexEnquiry = await prisma.enquiryForex.findMany({
    orderBy: {
      created_at: "desc",
    },
  });

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

  const { status, fullname, servicename, email } = req.body;

  if (
    [status, fullname, servicename, email].some(
      (field) => !field || field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields must be filled");
  }

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

  await sendMailOnStatusUpdate(fullname, servicename, status, email);

  return res
    .status(200)
    .json(new ApiResponse(200, updatedEnquiry, "Status Updated Sucessfully"));
});

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

const getAllVisaEnquiries = asyncHandler(async (req, res) => {
  const admin = req.admin;

  if (!admin) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const allVisaEnquiry = await prisma.enquiryVisa.findMany({
    orderBy: {
      created_at: "desc",
    },
  });

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

  const { status, fullname, servicename, email } = req.body;

  if (
    [status, fullname, servicename, email].some(
      (field) => !field || field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields must be filled");
  }
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

  await sendMailOnStatusUpdate(fullname, servicename, status, email);

  return res
    .status(200)
    .json(new ApiResponse(200, updatedEnquiry, "Status Updated Sucessfully"));
});

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

const getAllContactEnquiries = asyncHandler(async (req, res) => {
  const admin = req.admin;

  if (!admin) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const allContactEnquiry = await prisma.enquiryContact.findMany({
    orderBy: {
      created_at: "desc",
    },
  });

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

  const { status, fullname, servicename, email } = req.body;

  if (
    [status, fullname, servicename, email].some(
      (field) => !field || field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields must be filled");
  }

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

  await sendMailOnStatusUpdate(fullname, servicename, status, email);

  return res
    .status(200)
    .json(new ApiResponse(200, updatedEnquiry, "Status Updated Sucessfully"));
});

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

/* ***************************************************************************************************************
                                        ALL HOLIDAY  ENQUIRY ROUTES
   ****************************************************************************************************************/

const getAllHolidayEnquiries = asyncHandler(async (req, res) => {
  const admin = req.admin;

  if (!admin) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const allHolidayEnquiry = await prisma.enquiryHoliday.findMany({
    orderBy: {
      created_at: "desc",
    },
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        allHolidayEnquiry,
        `${allHolidayEnquiry.length} Holiday Enquiry Fetched Successfully`
      )
    );
});

const updateHolidayEnquiry = asyncHandler(async (req, res) => {
  const admin = req.admin;

  if (!admin) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const enquiryId = req.params.id;

  const existingEnquiry = await prisma.enquiryHoliday.findUnique({
    where: { enquiry_id: enquiryId },
  });

  if (!existingEnquiry) {
    throw new ApiError(404, "No Enquiry Found");
  }

  const { status, fullname, servicename, email } = req.body;

  if (
    [status, fullname, servicename, email].some(
      (field) => !field || field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields must be filled");
  }

  const validStatuses = ["pending", "rejected", "approved"];

  if (!status || !validStatuses.includes(status?.toLowerCase())) {
    throw new ApiError(
      400,
      "Invalid or missing status. Allowed values are: Pending, Rejected, Approved."
    );
  }

  const updatedEnquiry = await prisma.enquiryHoliday.update({
    where: { enquiry_id: enquiryId },
    data: { status: status },
  });

  await sendMailOnStatusUpdate(fullname, servicename, status, email);

  return res
    .status(200)
    .json(new ApiResponse(200, updatedEnquiry, "Status Updated Sucessfully"));
});

const deleteHolidayEnquiry = asyncHandler(async (req, res) => {
  const admin = req.admin;

  if (!admin) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const enquiryId = req.params.id;

  const existingEnquiry = await prisma.enquiryHoliday.findUnique({
    where: { enquiry_id: enquiryId },
  });

  if (!existingEnquiry) {
    throw new ApiError(404, "No Enquiry Found");
  }

  await prisma.enquiryHoliday.delete({
    where: { enquiry_id: enquiryId },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Enquiry Deleted Sucessfully"));
});

/* ***************************************************************************************************************
                                        ALL HOTEL  ENQUIRY ROUTES
   ****************************************************************************************************************/

const getAllHotelEnquiries = asyncHandler(async (req, res) => {
  const admin = req.admin;

  if (!admin) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const allHotelEnquiry = await prisma.enquiryHotel.findMany({
    orderBy: {
      created_at: "desc",
    },
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        allHotelEnquiry,
        `${allHotelEnquiry.length} Hotel Enquiry Fetched Successfully`
      )
    );
});

const updateHotelEnquiry = asyncHandler(async (req, res) => {
  const admin = req.admin;

  if (!admin) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const enquiryId = req.params.id;

  const existingEnquiry = await prisma.enquiryHotel.findUnique({
    where: { enquiry_id: enquiryId },
  });

  if (!existingEnquiry) {
    throw new ApiError(404, "No Enquiry Found");
  }

  const { status, fullname, servicename, email } = req.body;

  if (
    [status, fullname, servicename, email].some(
      (field) => !field || field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields must be filled");
  }

  const validStatuses = ["pending", "rejected", "approved"];

  if (!status || !validStatuses.includes(status?.toLowerCase())) {
    throw new ApiError(
      400,
      "Invalid or missing status. Allowed values are: Pending, Rejected, Approved."
    );
  }

  const updatedEnquiry = await prisma.enquiryHotel.update({
    where: { enquiry_id: enquiryId },
    data: { status: status },
  });

  await sendMailOnStatusUpdate(fullname, servicename, status, email);

  return res
    .status(200)
    .json(new ApiResponse(200, updatedEnquiry, "Status Updated Sucessfully"));
});

const deleteHotelEnquiry = asyncHandler(async (req, res) => {
  const admin = req.admin;

  if (!admin) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const enquiryId = req.params.id;

  const existingEnquiry = await prisma.enquiryHotel.findUnique({
    where: { enquiry_id: enquiryId },
  });

  if (!existingEnquiry) {
    throw new ApiError(404, "No Enquiry Found");
  }

  await prisma.enquiryHotel.delete({
    where: { enquiry_id: enquiryId },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Enquiry Deleted Sucessfully"));
});

/* ***************************************************************************************************************
                                        ALL CUSTOMIZED PACKAGE ENQUIRY ROUTES
   ****************************************************************************************************************/

const getAllCustomizedPackageEnquiries = asyncHandler(async (req, res) => {
  const admin = req.admin;

  if (!admin) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const allCustomizedPackageEnquiry = await prisma.customizedPackage.findMany({
    orderBy: {
      created_at: "desc",
    },
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        allCustomizedPackageEnquiry,
        `${allCustomizedPackageEnquiry.length} Customized Package Enquiry Fetched Successfully`
      )
    );
});

const updateCustomizedPackageEnquiry = asyncHandler(async (req, res) => {
  const admin = req.admin;

  if (!admin) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const enquiryId = req.params.id;

  const existingEnquiry = await prisma.customizedPackage.findUnique({
    where: { custom_package_id: enquiryId },
  });

  if (!existingEnquiry) {
    throw new ApiError(404, "No Enquiry Found");
  }

  const { status, fullname, servicename, email } = req.body;

  if (
    [status, fullname, servicename, email].some(
      (field) => !field || field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields must be filled");
  }

  const validStatuses = ["pending", "rejected", "approved"];

  if (!status || !validStatuses.includes(status?.toLowerCase())) {
    throw new ApiError(
      400,
      "Invalid or missing status. Allowed values are: Pending, Rejected, Approved."
    );
  }

  const updatedEnquiry = await prisma.customizedPackage.update({
    where: { custom_package_id: enquiryId },
    data: { status: status },
  });

  await sendMailOnStatusUpdate(fullname, servicename, status, email);

  return res
    .status(200)
    .json(new ApiResponse(200, updatedEnquiry, "Status Updated Sucessfully"));
});

const deleteCustomizedPackageEnquiry = asyncHandler(async (req, res) => {
  const admin = req.admin;

  if (!admin) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const enquiryId = req.params.id;

  const existingEnquiry = await prisma.customizedPackage.findUnique({
    where: { custom_package_id: enquiryId },
  });

  if (!existingEnquiry) {
    throw new ApiError(404, "No Enquiry Found");
  }

  await prisma.customizedPackage.delete({
    where: { custom_package_id: enquiryId },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Enquiry Deleted Sucessfully"));
});

/* ***************************************************************************************************************
                                        ALL TESTIMONIAL ROUTES
   ****************************************************************************************************************/

const getAllTestimonials = asyncHandler(async (req, res) => {
  const admin = req.admin;

  if (!admin) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const allTestimonials = await prisma.testimonial.findMany({
    orderBy: {
      created_at: "desc",
    },
  });

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        allTestimonials,
        `${allTestimonials.length} Testimonials Fetched Successfully`
      )
    );
});

const deleteTestimonial = asyncHandler(async (req, res) => {
  const admin = req.admin;

  if (!admin) {
    throw new ApiError(401, "Unauthorized Request");
  }

  const testimonialId = req.params.id;

  const existingTestimonial = await prisma.testimonial.findUnique({
    where: { testimonial_id: testimonialId },
  });

  if (!existingTestimonial) {
    throw new ApiError(404, "No Testimonial Found");
  }

  await prisma.testimonial.delete({
    where: { testimonial_id: testimonialId },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Testimonial Deleted Sucessfully"));
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
  getAllHolidayEnquiries,
  updateHolidayEnquiry,
  deleteHolidayEnquiry,
  getAllHotelEnquiries,
  updateHotelEnquiry,
  deleteHotelEnquiry,
  getAllCustomizedPackageEnquiries,
  updateCustomizedPackageEnquiry,
  deleteCustomizedPackageEnquiry,
  getAllTestimonials,
  deleteTestimonial,
};
