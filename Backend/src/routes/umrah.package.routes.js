import { Router } from "express";
import { verifyAdminJwt } from "../middlewares/admin.auth.middleware.js";
import {
  createUmrahPackage,
  deleteUmrahPackage,
  getAllUmrahPackages,
  updateUmrahMakHotelImages,
  updateUmrahMedHotelImages,
  updateUmrahPackageDetails,
  updateUmrahPackageImages,
} from "../controllers/umrah.package.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/create-package").post(
  verifyAdminJwt,
  upload.fields([
    { name: "packageimage", maxCount: 5 },
    {
      name: "makkahhotelimage",
      maxCount: 5,
    },
    { name: "medinahotelimage", maxCount: 5 },
  ]),
  createUmrahPackage
);

router.route("/fetch-umrah-packages").get(verifyAdminJwt, getAllUmrahPackages);

router
  .route("/update-package/:id")
  .put(verifyAdminJwt, updateUmrahPackageDetails);

router
  .route("/update-package-image/:id")
  .put(
    verifyAdminJwt,
    upload.fields([{ name: "packageimage", maxCount: 5 }]),
    updateUmrahPackageImages
  );

router
  .route("/update-makhotel-image/:id")
  .put(
    verifyAdminJwt,
    upload.fields([{ name: "makhotelimage", maxCount: 5 }]),
    updateUmrahMakHotelImages
  );

router
  .route("/update-medhotel-image/:id")
  .put(
    verifyAdminJwt,
    upload.fields([{ name: "medhotelimage", maxCount: 5 }]),
    updateUmrahMedHotelImages
  );

router
  .route("/delete-umrah-package/:id")
  .delete(verifyAdminJwt, deleteUmrahPackage);

export default router;
