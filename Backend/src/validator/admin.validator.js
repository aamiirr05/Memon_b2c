import Joi from "joi";

// Signup Form Validation

function adminSignupInputValidation(data) {
  const adminSignupSchema = Joi.object({
    username: Joi.string().max(50).required().messages({
      "string.max": '"admin_username" cannot exceed 50 characters',
      "any.required": '"admin_username" is required',
    }),
    password: Joi.string()
      .pattern(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
      .required()
      .messages({
        "string.pattern.base":
          '"password" must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character',
        "any.required": '"password" is required',
      }),
    email: Joi.string().email().required().messages({
      "string.email": '"email" must be a valid email address',
      "any.required": '"email" is required',
    }),
    contact: Joi.string()
      .pattern(/^[0-9]{10,12}$/)
      .required()
      .messages({
        "string.pattern.base": '"contact" must be a 10-12 digit number',
        "any.required": '"contact" is required',
      }),
  });

  let { error } = adminSignupSchema.validate(data);

  return error ? error.details : null;
}

// Login Form Validation

function adminLoginInputValidation(data) {
  const adminLoginSchema = Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": '"email" must be a valid email address',
      "any.required": '"email" is required',
    }),
    password: Joi.string()
      .pattern(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
      )
      .required()
      .messages({
        "string.pattern.base":
          '"password" must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character',
        "any.required": '"password" is required',
      }),
  });

  let { error } = adminLoginSchema.validate(data);

  return error ? error.details : null;
}

export { adminSignupInputValidation, adminLoginInputValidation };
