import Joi from "joi";

function hotelInputValidation(data) {
  const hotelSchema = Joi.object({
    hotelname: Joi.string().max(200).required().messages({
      "string.max": '"hotel name" cannot exceed 200 characters',
      "any.required": '"hotel name" is required',
    }),
    hotelcountry: Joi.string().max(100).required().messages({
      "string.max": '"hotel country" cannot exceed 100 character',
      "any.required": '"hotel country" is required',
    }),
    hotelcity: Joi.string().max(100).required().messages({
      "string.max": '"hotel city" cannot exceed 100 character',
      "any.required": '"hotel city" is required',
    }),
    hoteldescription: Joi.string().required().messages({
      "any.required": '"hotel city" is required',
    }),
    hoteldistance: Joi.string().max(200).required().messages({
      "string.max": '"hotel distance" cannot exceed 200 characters',
      "any.required": '"hotel city" is required',
    }),
    amenities: Joi.array().items(Joi.string()).required().messages({
      "array.base": '"amenities" must be an array of strings',
      "any.required": '"amenities" is required',
    }),
    star: Joi.number().positive().min(0).max(5).required().messages({
      "number.base": '"hotel star" must be a number',
      "number.positive": '"hotel star" must be 0 or greater than 0',
      "any.required": '"hotel star" is required',
    }),
    isactive: Joi.boolean().default(true).messages({
      "boolean.base": '"is active" must be a boolean value',
    }),
    featured: Joi.boolean().default(false).messages({
      "boolean.base": '"featured" must be a boolean value',
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
  });

  const { error } = hotelSchema.validate(data);
  return error ? error.details : null;
}

export { hotelInputValidation };
