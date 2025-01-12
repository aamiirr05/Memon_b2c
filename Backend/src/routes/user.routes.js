import { Router } from "express";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
  resendOtp,
  verifyOtp,
} from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/user.auth.middleware.js";

const router = Router();

router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);
router.route("/send-otp").post(resendOtp);
router.route("/verify-otp").post(verifyOtp);

// ********** Protected Routes **********

router.route("/logout").post(verifyJwt, logoutUser);
router.route("/refresh-token").post(verifyJwt, refreshToken);
router.route("/get-user").get(verifyJwt, getCurrentUser);

export default router;
