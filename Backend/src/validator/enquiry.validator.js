import Joi from "joi";

// ****** Contact Form Validation ******

function userContactEnquiryValidation(data) {
  const contactSchema = Joi.object({
    salutation: Joi.string().valid("Mr", "Ms", "Mrs").required(),
    firstname: Joi.string().trim().min(1).max(50).required().messages({
      "any.required": "First name is required.",
    }),
    lastname: Joi.string().trim().min(1).max(50).required().messages({
      "string.empty": "Last name cannot be empty.",
    }),
    email: Joi.string().email().required().messages({
      "string.email": "Email must be a valid email address.",
      "any.required": "Email is required.",
    }),
    contact: Joi.string()
      .pattern(/^\+?[0-9]{10,15}$/)
      .required()
      .messages({
        "string.pattern.base":
          "Contact must be a valid phone number with 10–15 digits.",
        "any.required": "Contact is required.",
      }),
    message: Joi.string().trim().min(1).max(500).required().messages({
      "string.empty": "Message cannot be empty.",
    }),
  });

  let { error } = contactSchema.validate(data);

  return error ? error.details : null;
}

//  ****** Forex Form Validation ******

function userForexEnquiryValidation(data) {
  const forexSchema = Joi.object({
    salutation: Joi.string().max(5).required().messages({
      "any.required": '"salutation" is required',
    }),
    firstname: Joi.string().max(50).required().messages({
      "any.required": '"first name" is required',
    }),
    lastname: Joi.string().max(50).required().messages({
      "any.required": '"last name" is required',
    }),
    email: Joi.string().email().required().messages({
      "string.email": '"email" must be a valid email address',
      "any.required": '"email" is required',
    }),
    contact: Joi.string()
      .pattern(/^[0-9]{10,15}$/)
      .required()
      .messages({
        "string.pattern.base": '"contact" must be a 10-15 digit number',
        "any.required": '"contact" is required',
      }),
    amountrequired: Joi.number().positive().required().messages({
      "number.base": '"amount required" must be a number',
      "number.positive": '"amount required" must be a positive number',
      "any.required": '"amount required" should not be empty',
    }),
    country: Joi.string().max(100).required().messages({
      "any.required": '"country" is required',
    }),
    address: Joi.string().max(255).required().messages({
      "any.required": '"address" is required',
    }),
  });

  let { error } = forexSchema.validate(data);

  return error ? error.details : null;
}

//  ****** Umrah Form Validation ******

function userUmrahEnquiryValidation(data) {
  const umrahSchema = Joi.object({
    salutation: Joi.string().max(5).required().messages({
      "any.required": '"salutation" is required',
    }),
    firstname: Joi.string().max(50).required().messages({
      "string.max": '"first name" cannot exceed 50 characters',
      "any.required": '"first name" is required',
    }),
    lastname: Joi.string().max(50).required().messages({
      "string.max": '"last name" cannot exceed 50 characters',
      "any.required": '"last name" is required',
    }),
    email: Joi.string().email().required().messages({
      "string.email": '"email" must be a valid email address',
      "any.required": '"email" is required',
    }),
    packagetype: Joi.string().max(200).required().messages({
      "string.max": '"package type" cannot exceed 200 characters',
      "any.required": '"package type" is required',
    }),
    packagename: Joi.string().max(200).required().messages({
      "string.max": '"package name" cannot exceed 200 characters',
      "any.required": '"package name" is required',
    }),
    contact: Joi.string()
      .pattern(/^[0-9]{10,15}$/)
      .required()
      .messages({
        "string.pattern.base": '"contact" must be a 10-15 digit number',
        "any.required": '"contact" is required',
      }),
    travellerdate: Joi.string().required().messages({
      "date.base": '"traveller date" must be a valid date',
      "any.required": '"traveller date" is required',
    }),
    totaladults: Joi.number().integer().min(1).required().messages({
      "number.base": '"total adults" must be a number',
      "number.min": '"total adults" must be at least 1',
      "any.required": '"total adults" is required',
    }),
    totalchildren: Joi.number().integer().min(0).messages({
      "number.base": '"total children" must be a number',
      "number.integer": '"total children" must be an integer',
      "number.min": '"total children" cannot be less than 0',
    }),
    totalinfants: Joi.number().integer().min(0).messages({
      "number.base": '"total infants" must be a number',
      "number.integer": '"total infants" must be an integer',
      "number.min": '"total infants" cannot be less than 0',
    }),
  });

  let { error } = umrahSchema.validate(data);

  return error ? error.details : null;
}

//  ****** Visa Form Validation ******

function userVisaEnquiryValidation(data) {
  const visaSchema = Joi.object({
    salutation: Joi.string().max(5).required().messages({
      "string.max": '"salutation" cannot exceed 5 characters',
      "any.required": '"salutation" is required',
    }),
    firstname: Joi.string().max(50).required().messages({
      "string.max": '"first name" cannot exceed 50 characters',
      "any.required": '"first name" is required',
    }),
    lastname: Joi.string().max(50).required().messages({
      "string.max": '"last name" cannot exceed 50 characters',
      "any.required": '"last name" is required',
    }),
    email: Joi.string().email().required().messages({
      "string.email": '"email" must be a valid email address',
      "any.required": '"email" is required',
    }),
    contact: Joi.string()
      .pattern(/^[0-9]{10,15}$/)
      .required()
      .messages({
        "string.pattern.base": '"contact" must be a 10-15 digit number',
        "any.required": '"contact" is required',
      }),
    visacountry: Joi.string().max(100).required().messages({
      "string.max": '"visa country" cannot exceed 100 characters',
      "any.required": '"visa country" is required',
    }),
    visatype: Joi.string().max(50).required().messages({
      "string.max": '"visa type" cannot exceed 50 characters',
      "any.required": '"visa type" is required',
    }),
  });

  let { error } = visaSchema.validate(data);

  return error ? error.details : null;
}

export {
  userContactEnquiryValidation,
  userForexEnquiryValidation,
  userUmrahEnquiryValidation,
  userVisaEnquiryValidation,
};
