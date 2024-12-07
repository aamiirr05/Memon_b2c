import { Router } from "express";
import { verifyJwt } from "../middlewares/user.auth.middleware.js";
import {
  enquiryContact,
  enquiryForex,
  enquiryUmrah,
  enquiryVisa,
} from "../controllers/user.controller.js";

const router = Router();

// ********** Protected Routes **********

router.route("/contact").post(verifyJwt, enquiryContact);
router.route("/forex").post(verifyJwt, enquiryForex);
router.route("/umrah").post(verifyJwt, enquiryUmrah);
router.route("/visa").post(verifyJwt, enquiryVisa);

export default router;
