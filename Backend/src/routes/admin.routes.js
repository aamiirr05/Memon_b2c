import { Router } from "express";
import {
  checkAuthAdmin,
  getAdmin,
  loginAdmin,
  logoutAdmin,
  refreshToken,
} from "../controllers/admin.controller.js";
import { verifyAdminJwt } from "../middlewares/admin.auth.middleware.js";
import { limiter } from "../utils/utilityfunction.js";

const router = Router();

// *************************** AUTH ROUTES **********************************

router.route("/login").post(limiter, loginAdmin);
router.route("/check-auth-admin").get(checkAuthAdmin);

// ************************** PROTECTED ROUTES *******************************

router.route("/logout").post(verifyAdminJwt, logoutAdmin);
router.route("/refresh-token").post(refreshToken);
router.route("/get-admin").get(verifyAdminJwt, getAdmin);

export default router;
