import Joi from "joi";

function holidayPackageValidation(data) {
  const holidayPackageSchema = Joi.object({
    packagename: Joi.string().max(200).required().messages({
      "string.max": '"package_name" cannot exceed 200 characters',
      "any.required": '"package_name" is required',
    }),
    packagetype: Joi.string().max(100).required().messages({
      "string.max": '"package_type" cannot exceed 100 characters',
      "any.required": '"package_type" is required',
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
      "string.max": '"hotel_name" cannot exceed 200 characters',
      "any.required": '"hotel_name" is required',
    }),
    itinerary: Joi.array().items(Joi.object()).required().messages({
      "array.base": '"itinerary" must be an array of objects',
      "any.required": '"itinerary" is required',
    }),
    groupdates: Joi.array().items(Joi.string()).required().messages({
      "array.base": '"group_dates" must be an array of ISO date strings',
      "any.required": '"group_dates" is required',
    }),
    totaldays: Joi.number().integer().positive().required().messages({
      "number.base": '"total_days" must be a number',
      "number.positive": '"total_days" must be greater than 0',
      "any.required": '"total_days" is required',
    }),
    totalnights: Joi.number().integer().positive().required().messages({
      "number.base": '"total_nights" must be a number',
      "number.positive": '"total_nights" must be greater than 0',
      "any.required": '"total_nights" is required',
    }),
    baseprice: Joi.number().integer().positive().required().messages({
      "number.base": '"base_price" must be a number',
      "number.positive": '"base_price" must be greater than 0',
      "any.required": '"base_price" is required',
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
      "string.isoDate": '"booking_deadline" must be a valid ISO date',
      "any.required": '"booking_deadline" is required',
    }),
    cancellationpolicy: Joi.array().items(Joi.string()).required().messages({
      "array.base": '"cancellation_policy" must be an array of strings',
      "any.required": '"cancellation_policy" is required',
    }),
    termcondition: Joi.array().items(Joi.string()).required().messages({
      "array.base": '"term_condition" must be an array of strings',
      "any.required": '"term_condition" is required',
    }),
    bookingterms: Joi.array().items(Joi.string()).required().messages({
      "array.base": '"booking_terms" must be an array of strings',
      "any.required": '"booking_terms" is required',
    }),
    departurecity: Joi.string().required().messages({
      "any.required": '"departure_city" is required',
    }),
    arrivalcity: Joi.string().required().messages({
      "any.required": '"arrival_city" is required',
    }),
    transportmode: Joi.string().required().messages({
      "any.required": '"transport_mode" is required',
    }),
    isactive: Joi.boolean().default(true).messages({
      "boolean.base": '"is_active" must be a boolean value',
    }),
    featured: Joi.boolean().default(false).messages({
      "boolean.base": '"featured" must be a boolean value',
    }),
  });

  const { error } = holidayPackageSchema.validate(data);
  return error ? error.details : null;
}

export { holidayPackageValidation };
