import prisma from ".././db/db.config.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { userSignupInputValidation } from "../utils/validator/user.validator.js";

const registerUser = asyncHandler(async (req, res) => {
  const { salutation, firstname, lastname, email, contact, password } =
    req.body;

  if (
    [salutation, firstname, lastname, email, contact, password].some(
      (field) => !field || field.trim() === ""
    )
  ) {
    throw new ApiError(400, "All fields must be filled");
  }

  const userExists = await prisma.userRegistration.findUnique({
    where: {
      email,
    },
  });
  if (userExists) {
    throw new ApiError(400, "User with email or username already exists");
  }

  let error = await userSignupInputValidation({
    salutation,
    first_name: firstname,
    last_name: lastname,
    email,
    contact,
    password,
  });
  if (error) {
    throw new ApiError(401, "Error: ", error);
  }

  const newUser = await prisma.userRegistration.create({
    data: {
      salutation,
      first_name: firstname,
      last_name: lastname,
      email,
      contact,
      password,
    },
  });

  return res
    .status(200)
    .json(new ApiResponse(200, newUser, "User created successfully"));
});

export { registerUser };
