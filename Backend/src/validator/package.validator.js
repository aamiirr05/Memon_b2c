import Joi from "joi";

// ******** UMRAH PACKAGE VALIDATION ********

function umrahPackageValidation(data) {
  const umrahPackageSchema = Joi.object({
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
    makkahitinerary: Joi.array().required().messages({
      "array.base": '"makkah itinerary" must be an array',
      "any.required": '"makkah itinerary" is required',
    }),
    medinaitinerary: Joi.array().required().messages({
      "array.base": '"medina itinerary" must be an array',
      "any.required": '"medina itinerary" is required',
    }),
    inclusion: Joi.array()
      .items(Joi.string())
      .required()
      .messages({ "any.required": '"inclusion" is required' }),
    exclusion: Joi.array()
      .items(Joi.string())
      .required()
      .messages({ "any.required": '"exclusion" is required' }),
    groupdates: Joi.array().items(Joi.string()).required().messages({
      "array.base": '"group dates" must be an array',
      "any.required": '"group dates" is required',
    }),
    bookingdeadline: Joi.string()
      .required()
      .messages({ "any.required": '"booking deadline" is required' }),
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
    makhotelname: Joi.string().max(200).required().messages({
      "string.max": '"makkah hotel name" cannot exceed 200 characters',
      "any.required": '"makkah hotel name" is required',
    }),
    makhotelstar: Joi.number().integer().required().messages({
      "number.base": '"makkah hotel star" must be a number',
      "number.positive": '"makkah hotel star" must be greater than 0',
      "any.required": '"makkah hotel star" is required',
    }),
    makhotellocation: Joi.string().required().messages({
      "any.required": '"makkah hotel location" is required',
    }),
    medhotelname: Joi.string().max(200).required().messages({
      "string.max": '"medina hotel name" cannot exceed 200 characters',
      "any.required": '"medina hotel name" is required',
    }),
    medhotelstar: Joi.number().integer().required().messages({
      "number.base": '"medina hotel star" must be a number',
      "number.positive": '"medina hotel star" must be greater than 0',
      "any.required": '"medina hotel star" is required',
    }),
    medhotellocation: Joi.string().required().messages({
      "any.required": '"medina hotel location" is required',
    }),
    cancellationpolicy: Joi.array().items(Joi.string()).required().messages({
      "array.base": '"cancellation policy" must be an array',
      "any.required": '"cancellation policy" is required',
    }),
    termcondition: Joi.array().items(Joi.string()).required().messages({
      "array.base": '"term condition" must be an array',
      "any.required": '"term condition" is required',
    }),
    bookingterms: Joi.array().items(Joi.string()).required().messages({
      "array.base": '"booking terms" must be an array',
      "any.required": '"booking terms" is required',
    }),
    departurecity: Joi.string()
      .required()
      .messages({ "any.required": '"departure city" is required' }),
    arrivalcity: Joi.string()
      .required()
      .messages({ "any.required": '"arrival city" is required' }),
    isactive: Joi.boolean()
      .required()
      .messages({ "any.required": '"is active" is required' }),
    featured: Joi.boolean()
      .required()
      .messages({ "any.required": '"featured" is required' }),
    baseprice: Joi.number().integer().positive().required().messages({
      "number.base": '"base price" must be a number',
      "number.positive": '"base price" must be greater than 0',
      "any.required": '"base price" is required',
    }),
    discount: Joi.number().integer().min(0).messages({
      "number.base": '"discount" must be a number',
      "number.positive": '"discount" must be greater than 0',
      "number.min": '"discount" cannot be less than 0',
    }),
    quintprice: Joi.number().positive().required().messages({
      "number.base": '"quint price" must be a number',
      "number.positive": '"quint price" must be greater than 0',
      "any.required": '"quint price" is required',
    }),
    quadprice: Joi.number().positive().required().messages({
      "number.base": '"quad price" must be a number',
      "number.positive": '"quad price" must be greater than 0',
      "any.required": '"quad price" is required',
    }),
    tripleprice: Joi.number().positive().required().messages({
      "number.base": '"triple price" must be a number',
      "number.positive": '"triple price" must be greater than 0',
      "any.required": '"triple price" is required',
    }),
    doubleprice: Joi.number().positive().required().messages({
      "number.base": '"double price" must be a number',
      "number.positive": '"double price" must be greater than 0',
      "any.required": '"double price" is required',
    }),
    childwithoutbedprice: Joi.number().positive().required().messages({
      "number.base": '"child without bed price" must be a number',
      "number.positive": '"child without bed price" must be greater than 0',
      "any.required": '"child without bed price" is required',
    }),
    infantprice: Joi.number().positive().required().messages({
      "number.base": '"infant price" must be a number',
      "number.positive": '"infant price" must be greater than 0',
      "any.required": '"infant price" is required',
    }),
  });

  let { error } = umrahPackageSchema.validate(data);

  return error ? error.details : null;
}

export { umrahPackageValidation };
