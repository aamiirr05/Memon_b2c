import Joi from "joi";

function holidayPackageValidation(data) {
  const holidayPackageSchema = Joi.object({
    packagename: Joi.string().max(200).required().messages({
      "string.max": '"package name" cannot exceed 200 characters',
      "any.required": '"package name" is required',
    }),
    packagetype: Joi.string().max(100).required().messages({
      "string.max": '"package type" cannot exceed 100 characters',
      "any.required": '"package type" is required',
    }),
    description: Joi.string().required().messages({
      "any.required": '"description" is required',
    }),
    country: Joi.string().max(100).required().messages({
      "string.max": '"country" cannot exceed 100 characters',
      "any.required": '"country" is required',
    }),
    city: Joi.string().max(100).required().messages({
      "string.max": '"city" cannot exceed 100 characters',
      "any.required": '"city" is required',
    }),
    hotelname: Joi.string().max(200).required().messages({
      "string.max": '"hotel name" cannot exceed 200 characters',
      "any.required": '"hotel name" is required',
    }),
    itinerary: Joi.array().items(Joi.object()).required().messages({
      "array.base": '"itinerary" must be an array of objects',
      "any.required": '"itinerary" is required',
    }),
    groupdates: Joi.array().items(Joi.string()).required().messages({
      "array.base": '"group dates" must be an array of strings',
      "any.required": '"group dates" is required',
    }),
    totaldays: Joi.number().integer().positive().required().messages({
      "number.base": '"total days" must be a number',
      "number.positive": '"total days" must be greater than 0',
      "any.required": '"total days" is required',
    }),
    totalnights: Joi.number().integer().positive().required().messages({
      "number.base": '"total nights" must be a number',
      "number.positive": '"total nights" must be greater than 0',
      "any.required": '"total nights" is required',
    }),
    baseprice: Joi.number().integer().positive().required().messages({
      "number.base": '"base price" must be a number',
      "number.positive": '"base price" must be greater than 0',
      "any.required": '"base price" is required',
    }),
    discount: Joi.number().integer().min(0).default(0).messages({
      "number.base": '"discount" must be a number',
      "number.min": '"discount" cannot be less than 0',
    }),
    inclusion: Joi.array().items(Joi.string()).required().messages({
      "array.base": '"inclusion" must be an array of strings',
      "any.required": '"inclusion" is required',
    }),
    exclusion: Joi.array().items(Joi.string()).required().messages({
      "array.base": '"exclusion" must be an array of strings',
      "any.required": '"exclusion" is required',
    }),
    bookingdeadline: Joi.string().required().messages({
      "any.required": '"booking deadline" is required',
    }),
    cancellationpolicy: Joi.array().items(Joi.string()).required().messages({
      "array.base": '"cancellation policy" must be an array of strings',
      "any.required": '"cancellation policy" is required',
    }),
    termcondition: Joi.array().items(Joi.string()).required().messages({
      "array.base": '"term condition" must be an array of strings',
      "any.required": '"term condition" is required',
    }),
    bookingterms: Joi.array().items(Joi.string()).required().messages({
      "array.base": '"booking terms" must be an array of strings',
      "any.required": '"booking terms" is required',
    }),
    departurecity: Joi.string().required().messages({
      "any.required": '"departure city" is required',
    }),
    arrivalcity: Joi.string().required().messages({
      "any.required": '"arrival city" is required',
    }),
    transportmode: Joi.string().required().messages({
      "any.required": '"transport mode" is required',
    }),
    isactive: Joi.boolean().default(true).messages({
      "boolean.base": '"is active" must be a boolean value',
    }),
    featured: Joi.boolean().default(false).messages({
      "boolean.base": '"featured" must be a boolean value',
    }),
  });

  const { error } = holidayPackageSchema.validate(data);
  return error ? error.details : null;
}

export { holidayPackageValidation };
