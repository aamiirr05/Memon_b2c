import { Router } from "express";
import { verifyAdminJwt } from "../middlewares/admin.auth.middleware.js";
import {
  deleteContactEnquiry,
  deleteForexEnquiry,
  deleteUmrahEnquiry,
  deleteVisaEnquiry,
  getAllContactEnquiries,
  getAllForexEnquiries,
  getAllUmrahEnquiries,
  getAllVisaEnquiries,
  updateContactEnquiry,
  updateForexEnquiry,
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

export default router;
