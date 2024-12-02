import { Router } from "express";
import {
  loginUser,
  logoutUser,
  refreshToken,
  registerUser,
  sendOtp,
  verifyOtp,
} from "../controllers/user.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/signup").post(registerUser);
router.route("/login").post(loginUser);
router.route("/send-otp").post(sendOtp);
router.route("/verify-otp").post(verifyOtp);
router.route("/logout").post(verifyJwt, logoutUser);
router.route("/refresh-token").post(verifyJwt, refreshToken);

export default router;
