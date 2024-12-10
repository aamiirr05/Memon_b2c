import Joi from "joi";

// ******** UMRAH PACKAGE VALIDATION ********

function umrahPackageValidation(data) {
  const umrahPackageSchema = Joi.object({
    packagename: Joi.string().max(200).required().messages({
      "string.max": '"package_name" cannot exceed 200 characters',
      "any.required": '"package_name" is required',
    }),
    packagetype: Joi.string().max(100).required().messages({
      "string.max": '"package type" cannot exceed 100 characters',
      "any.required": '"package type" is required',
    }),
    description: Joi.string().required().messages({
      "any.required": '"description" is required',
    }),
    groupdates: Joi.string().required().messages({
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
    makhotelname: Joi.string().max(200).required().messages({
      "string.max": '"mak hotel name" cannot exceed 200 characters',
      "any.required": '"mak hotel name" is required',
    }),
    medhotelname: Joi.string().max(200).required().messages({
      "string.max": '"med hotel name" cannot exceed 200 characters',
      "any.required": '"med hotel name" is required',
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
