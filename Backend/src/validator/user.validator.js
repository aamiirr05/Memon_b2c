import Joi from "joi";

// Signup Form Validation

function userSignupInputValidation(data) {
  const userSignupSchema = Joi.object({
    salutation: Joi.string().required(),
    first_name: Joi.string().min(3).max(10).required(),
    last_name: Joi.string().min(3).max(10).required(),
    email: Joi.string().email().required(),
    contact: Joi.string()
      .pattern(/^[0-9]{10,15}$/)
      .required(),
    password: Joi.string()
      .pattern(
        new RegExp(
          "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&#])[A-Za-z\\d@$!%*?&#]{8,}$"
        )
      )
      .required(),
    confirm_password: Joi.string().valid(Joi.ref("password")).required(),
  });

  let { error } = userSignupSchema.validate(data);

  return error ? error.details : null;
}

// Login Form Validation

function userLoginInputValidation(data) {
  const userLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  let { error } = userLoginSchema.validate(data);

  return error ? error.details : null;
}

export { userSignupInputValidation, userLoginInputValidation };
