import { Router } from "express";
import { verifyJwt } from "../middlewares/user.auth.middleware.js";
import {
  enquiryContact,
  enquiryCustomizedPackage,
  enquiryForex,
  enquiryUmrah,
  enquiryVisa,
  testimonial,
} from "../controllers/user.controller.js";

const router = Router();

router.route("/contact").post(verifyJwt, enquiryContact);
router.route("/forex").post(verifyJwt, enquiryForex);
router.route("/umrah").post(verifyJwt, enquiryUmrah);
router.route("/visa").post(verifyJwt, enquiryVisa);
router.route("/customized-package").post(verifyJwt, enquiryCustomizedPackage);
router.route("/testimonial").post(verifyJwt, testimonial);

export default router;
