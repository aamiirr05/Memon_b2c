import { Router } from "express";
import { verifyAdminJwt } from "../middlewares/admin.auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  createHotel,
  deleteHotel,
  getAllHotels,
  updateHotelDetails,
  updateHotelImages,
} from "../controllers/hotel.controller.js";

const router = Router();

router.route("/create-hotel").post(
  verifyAdminJwt,
  upload.fields([
    {
      name: "hotelimage",
      maxCount: 20,
    },
  ]),
  createHotel
);

router.route("/fetch-hotel").get(verifyAdminJwt, getAllHotels);

router
  .route("/update-hotel-details/:id")
  .put(verifyAdminJwt, upload.none(), updateHotelDetails);

router
  .route("/update-hotel-image/:id")
  .put(
    verifyAdminJwt,
    upload.fields([{ name: "hotelimage", maxCount: 20 }]),
    updateHotelImages
  );

router.route("/delete-hotel/:id").delete(verifyAdminJwt, deleteHotel);

export default router;
