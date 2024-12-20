import { Router } from "express";
import { verifyAdminJwt } from "../middlewares/admin.auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  createVisa,
  deleteVisa,
  getAllVisa,
  updateVisaDetails,
  updateVisaImage,
} from "../controllers/visa.controller.js";

const router = Router();

router.route("/create-visa").post(
  verifyAdminJwt,
  upload.fields([
    {
      name: "visaimage",
      maxCount: 1,
    },
  ]),
  createVisa
);

router.route("/fetch-visa").get(verifyAdminJwt, getAllVisa);

router
  .route("/update-visa-details/:id")
  .put(verifyAdminJwt, upload.none(), updateVisaDetails);

router
  .route("/update-visa-image/:id")
  .put(
    verifyAdminJwt,
    upload.fields([{ name: "visaimage", maxCount: 1 }]),
    updateVisaImage
  );

router.route("/delete-visa/:id").delete(verifyAdminJwt, deleteVisa);

export default router;
