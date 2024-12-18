import { ApiError } from "../utils/ApiErrors.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";
import prisma from "../db/db.config.js";

// *************** Verifies Admins Jwt ***************

export const verifyAdminJwt = asyncHandler(async (req, _, next) => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      throw new ApiError(401, "Unauthorized request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const isAdmin = decodedToken.isAdmin;

    if (!isAdmin) {
      throw new ApiError(401, "Unauthorized Access");
    }

    const admin = await prisma.admin.findUnique({
      where: { admin_id: decodedToken.adminId },
      select: {
        admin_id: true,
        admin_username: true,
        email: true,
        contact: true,
        created_at: true,
      },
    });

    if (!admin) {
      throw new ApiError(404, "Invalid Token");
    }
    req.admin = admin;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Access Token");
  }
});
