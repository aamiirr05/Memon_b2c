import { Router } from "express";
import { verifyAdminJwt } from "../middlewares/admin.auth.middleware.js";
import {
  createHolidayPackage,
  deleteHolidayPackage,
  getAllHolidayPackage,
  updateHolidayPackageDetails,
  updateHolidayPackageHotelImage,
  updateHolidayPackageImage,
} from "../controllers/holiday.package.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/create-holiday-package").post(
  verifyAdminJwt,
  upload.fields([
    { name: "packageimage", maxCount: 3 },
    {
      name: "hotelimage",
      maxCount: 8,
    },
  ]),
  createHolidayPackage
);

router
  .route("/fetch-holiday-package")
  .get(verifyAdminJwt, getAllHolidayPackage);

router
  .route("/update-holiday-package/:id")
  .put(verifyAdminJwt, upload.none(), updateHolidayPackageDetails);

router
  .route("/update-holiday-package-image/:id")
  .put(
    verifyAdminJwt,
    upload.fields([{ name: "packageimage", maxCount: 3 }]),
    updateHolidayPackageImage
  );

router
  .route("/update-holiday-package-hotel-image/:id")
  .put(
    verifyAdminJwt,
    upload.fields([{ name: "hotelimage", maxCount: 8 }]),
    updateHolidayPackageHotelImage
  );

router
  .route("/delete-holiday-package/:id")
  .delete(verifyAdminJwt, deleteHolidayPackage);

export default router;
