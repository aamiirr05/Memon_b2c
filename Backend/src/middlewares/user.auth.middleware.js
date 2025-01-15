import { ApiError } from "../utils/ApiErrors.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import jwt from "jsonwebtoken";
import prisma from "../db/db.config.js";

// *************** Verifies User Jwt ***************

export const verifyJwt = asyncHandler(async (req, _, next) => {
  try {
    const token = req.cookies?.accessToken;

    if (!token) {
      return next();
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (!decodedToken || !decodedToken.registrationId) {
      throw new ApiError(401, "Invalid Access Token");
    }

    const user = await prisma.user.findUnique({
      where: {
        registration_id: decodedToken?.registrationId,
      },
      select: {
        registration_id: true,
        salutation: true,
        first_name: true,
        last_name: true,
        email: true,
        contact: true,
      },
    });

    if (!user) {
      throw new ApiError(404, "Invalid Token");
    }

    req.user = user;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Access Token");
  }
});
