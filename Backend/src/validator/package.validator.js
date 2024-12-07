import Joi from "joi";

// ******** UMRAH PACKAGE VALIDATION ********

function umrahPackageValidation(data) {
  const umrahPackageSchema = Joi.object({
    packagename: Joi.string().max(200).required().messages({
      "string.max": '"package_name" cannot exceed 200 characters',
      "any.required": '"package_name" is required',
    }),
    description: Joi.string().required().messages({
      "any.required": '"description" is required',
    }),
    packagetype: Joi.string().max(200).required().messages({
      "string.max": '"package_type" cannot exceed 200 characters',
      "any.required": '"package_type" is required',
    }),
    groupdates: Joi.string().required().messages({
      "any.required": '"group_dates" is required',
    }),
    totaldays: Joi.number().integer().positive().required().messages({
      "number.base": '"total_days" must be a number',
      "number.integer": '"total_days" must be an integer',
      "number.positive": '"total_days" must be a positive number',
      "any.required": '"total_days" is required',
    }),
    totalnights: Joi.number().integer().positive().required().messages({
      "number.base": '"total_nights" must be a number',
      "number.integer": '"total_nights" must be an integer',
      "number.positive": '"total_nights" must be a positive number',
      "any.required": '"total_nights" is required',
    }),
    makhotelname: Joi.string().max(200).required().messages({
      "string.max": '"mak_hotel_name" cannot exceed 200 characters',
      "any.required": '"mak_hotel_name" is required',
    }),
    medhotelname: Joi.string().max(200).required().messages({
      "string.max": '"med_hotel_name" cannot exceed 200 characters',
      "any.required": '"med_hotel_name" is required',
    }),
    quintprice: Joi.number().positive().required().messages({
      "number.base": '"quint_price" must be a number',
      "number.positive": '"quint_price" must be a positive number',
      "any.required": '"quint_price" is required',
    }),
    quadprice: Joi.number().positive().required().messages({
      "number.base": '"quad_price" must be a number',
      "number.positive": '"quad_price" must be a positive number',
      "any.required": '"quad_price" is required',
    }),
    tripleprice: Joi.number().positive().required().messages({
      "number.base": '"triple_price" must be a number',
      "number.positive": '"triple_price" must be a positive number',
      "any.required": '"triple_price" is required',
    }),
    doubleprice: Joi.number().positive().required().messages({
      "number.base": '"double_price" must be a number',
      "number.positive": '"double_price" must be a positive number',
      "any.required": '"double_price" is required',
    }),
    childwithoutbedprice: Joi.number().positive().required().messages({
      "number.base": '"child_without_bed_price" must be a number',
      "number.positive": '"child_without_bed_price" must be a positive number',
      "any.required": '"child_without_bed_price" is required',
    }),
    infantprice: Joi.number().positive().required().messages({
      "number.base": '"infant_price" must be a number',
      "number.positive": '"infant_price" must be a positive number',
      "any.required": '"infant_price" is required',
    }),
  });
  let { error } = umrahPackageSchema.validate(data);

  return error ? error.details : null;
}

export { umrahPackageValidation };
