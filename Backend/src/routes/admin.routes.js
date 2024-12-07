import { Router } from "express";
import {
  getAdmin,
  loginAdmin,
  logoutAdmin,
  refreshToken,
  registerAdmin,
} from "../controllers/admin.controller.js";
import { verifyAdminJwt } from "../middlewares/admin.auth.middleware.js";

const router = Router();

router.route("/signup").post(registerAdmin);
router.route("/login").post(loginAdmin);

// ******** Protected Routes ********

router.route("/logout").post(verifyAdminJwt, logoutAdmin);
router.route("/refresh-token").post(verifyAdminJwt, refreshToken);
router.route("/get-admin").get(verifyAdminJwt, getAdmin);

export default router;
