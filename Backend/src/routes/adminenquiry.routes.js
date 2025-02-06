import { Router } from "express";
import { verifyAdminJwt } from "../middlewares/admin.auth.middleware.js";
import {
  deleteContactEnquiry,
  deleteCustomizedPackageEnquiry,
  deleteForexEnquiry,
  deleteHolidayEnquiry,
  deleteHotelEnquiry,
  deleteTestimonial,
  deleteUmrahEnquiry,
  deleteVisaEnquiry,
  getAllContactEnquiries,
  getAllCustomizedPackageEnquiries,
  getAllForexEnquiries,
  getAllHolidayEnquiries,
  getAllHotelEnquiries,
  getAllTestimonials,
  getAllUmrahEnquiries,
  getAllVisaEnquiries,
  updateContactEnquiry,
  updateCustomizedPackageEnquiry,
  updateForexEnquiry,
  updateHolidayEnquiry,
  updateHotelEnquiry,
  updateUmrahEnquiry,
  updateVisaEnquiry,
} from "../controllers/enquiry.controller.js";

const router = Router();

// ********************************** UMRAH ENQUIRY ROUTES ********************************************

router
  .route("/fetch-umrah-enquiries")
  .get(verifyAdminJwt, getAllUmrahEnquiries);

router
  .route("/update-umrah-enquiry/:id")
  .post(verifyAdminJwt, updateUmrahEnquiry);

router
  .route("/delete-umrah-enquiry/:id")
  .delete(verifyAdminJwt, deleteUmrahEnquiry);

// ********************************** FOREX ENQUIRY ROUTES ********************************************

router
  .route("/fetch-forex-enquiries")
  .get(verifyAdminJwt, getAllForexEnquiries);

router
  .route("/update-forex-enquiry/:id")
  .post(verifyAdminJwt, updateForexEnquiry);

router
  .route("/delete-forex-enquiry/:id")
  .delete(verifyAdminJwt, deleteForexEnquiry);

// ********************************** VISA ENQUIRY ROUTES ********************************************

router.route("/fetch-visa-enquiries").get(verifyAdminJwt, getAllVisaEnquiries);

router
  .route("/update-visa-enquiry/:id")
  .post(verifyAdminJwt, updateVisaEnquiry);

router
  .route("/delete-visa-enquiry/:id")
  .delete(verifyAdminJwt, deleteVisaEnquiry);

// ********************************** CONTACT ENQUIRY ROUTES ********************************************

router
  .route("/fetch-contact-enquiries")
  .get(verifyAdminJwt, getAllContactEnquiries);

router
  .route("/update-contact-enquiry/:id")
  .post(verifyAdminJwt, updateContactEnquiry);

router
  .route("/delete-contact-enquiry/:id")
  .delete(verifyAdminJwt, deleteContactEnquiry);

// ********************************** HOLIDAY ENQUIRY ROUTES ********************************************

router
  .route("/fetch-holiday-enquiries")
  .get(verifyAdminJwt, getAllHolidayEnquiries);

router
  .route("/update-holiday-enquiry/:id")
  .post(verifyAdminJwt, updateHolidayEnquiry);

router
  .route("/delete-holiday-enquiry/:id")
  .delete(verifyAdminJwt, deleteHolidayEnquiry);

// ********************************** HOTEL ENQUIRY ROUTES ********************************************

router
  .route("/fetch-hotel-enquiries")
  .get(verifyAdminJwt, getAllHotelEnquiries);

router
  .route("/update-hotel-enquiry/:id")
  .post(verifyAdminJwt, updateHotelEnquiry);

router
  .route("/delete-hotel-enquiry/:id")
  .delete(verifyAdminJwt, deleteHotelEnquiry);

// ********************************** CUSTOMIZED PACKAGE ENQUIRY ROUTES ******************************************

router
  .route("/fetch-custom-package-enquiries")
  .get(verifyAdminJwt, getAllCustomizedPackageEnquiries);

router
  .route("/update-custom-package-enquiry/:id")
  .post(verifyAdminJwt, updateCustomizedPackageEnquiry);

router
  .route("/delete-custom-package-enquiry/:id")
  .delete(verifyAdminJwt, deleteCustomizedPackageEnquiry);

// ********************************** TESTIMONIAL ROUTES *****************************************

router.route("/fetch-testimonials").get(verifyAdminJwt, getAllTestimonials);

router
  .route("/delete-testimonial/:id")
  .delete(verifyAdminJwt, deleteTestimonial);

export default router;
