import { Router } from "express";
import {
  checkAuth,
  getAllHolidayPackages,
  getAllHotel,
  getAllUmrahPackages,
  getAllVisa,
  getCurrentUser,
  getHolidayPackageById,
  getHotelById,
  getUmrahPackageById,
  getVisaById,
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
router.route("/check-auth").get(checkAuth);
router.route("/resend-otp").post(resendOtp);
router.route("/verify-otp").post(verifyOtp);
router.route("/fetch-all-umrah-packages").get(getAllUmrahPackages);
router.route("/fetch-umrah-packages/:id").get(getUmrahPackageById);
router.route("/fetch-all-holiday-packages").get(getAllHolidayPackages);
router.route("/fetch-holiday-packages/:id").get(getHolidayPackageById);
router.route("/fetch-all-hotels").get(getAllHotel);
router.route("/fetch-hotel/:id").get(getHotelById);
router.route("/fetch-all-visas").get(getAllVisa);
router.route("/fetch-visa/:id").get(getVisaById);

// ********** Protected Routes **********

router.route("/logout").post(verifyJwt, logoutUser);
router.route("/refresh-token").post(verifyJwt, refreshToken);
router.route("/get-user").get(verifyJwt, getCurrentUser);

export default router;
