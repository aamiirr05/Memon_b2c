import { Router } from "express";
import {
  checkAuthAdmin,
  getAdmin,
  loginAdmin,
  logoutAdmin,
  refreshToken,
  registerAdmin,
} from "../controllers/admin.controller.js";
import { verifyAdminJwt } from "../middlewares/admin.auth.middleware.js";

const router = Router();

// *************************** AUTH ROUTES **********************************

router.route("/signup").post(registerAdmin);
router.route("/login").post(loginAdmin);
router.route("/check-auth-admin").get(checkAuthAdmin);

// ************************** PROTECTED ROUTES *******************************

router.route("/logout").post(verifyAdminJwt, logoutAdmin);
router.route("/refresh-token").post(verifyAdminJwt, refreshToken);
router.route("/get-admin").get(verifyAdminJwt, getAdmin);

export default router;
