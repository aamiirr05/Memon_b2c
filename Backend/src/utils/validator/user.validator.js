import Joi from "joi";

function userSignupInputValidation(data) {
  const userSignupSchema = Joi.object({
    salutation: Joi.string().required(),
    first_name: Joi.string().min(3).max(10).required(),
    last_name: Joi.string().min(3).max(10).required(),
    email: Joi.string().email().required(),
    contact: Joi.string(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
      .required(),
  });

  let { error } = userSignupSchema.validateAsync(data);

  return error ? error.details : null;
}

function userLoginInputValidation(data) {
  const userLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  let { error } = userLoginSchema.validate(data);

  return error ? error.details : null;
}

export { userSignupInputValidation, userLoginInputValidation };
