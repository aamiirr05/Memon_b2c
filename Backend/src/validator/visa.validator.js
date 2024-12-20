import Joi from "joi";

function visaInputValidation(data) {
  const visaSchema = Joi.object({
    visacountry: Joi.string().max(200).required().messages({
      "string.max": '"visa country" cannot exceed 200 characters',
      "any.required": '"visa country" is required',
    }),
    visatype: Joi.string().max(200).required().messages({
      "string.max": '"visa type" cannot exceed 200 characters',
      "any.required": '"visa type" is required',
    }),
    price: Joi.number().integer().positive().required().messages({
      "number.base": '"price" must be a number',
      "number.positive": '"price" must be greater than 0',
      "any.required": '"price" is required',
    }),
    description: Joi.string().required().messages({
      "any.required": '"description" is required',
    }),
    processingtime: Joi.string().required().messages({
      "any.required": '"processing time" is required',
    }),
    validity: Joi.string().required().messages({
      "any.required": '"validity" is required',
    }),
    stayperiod: Joi.number().integer().positive().required().messages({
      "number.base": '"stay period" must be a number',
      "number.positive": '"stay period" must be greater than 0',
      "any.required": '"stay period" is required',
    }),
    entry: Joi.string().required().messages({
      "any.required": '"entry" is required',
    }),
    documentrequirement: Joi.array().items(Joi.string()).required().messages({
      "array.base": '"document requirement" must be an array of objects',
      "any.required": '"document requirement" is required',
    }),
    basicrequirement: Joi.array()
      .items(Joi.string().required())
      .required()
      .messages({
        "array.base": '"basic requirement" must be an array of strings',
        "any.required": '"basic requirement" is required',
      }),
    termcondition: Joi.array()
      .items(Joi.string().required())
      .required()
      .messages({
        "array.base": '"term condition" must be an array of strings',
        "any.required": '"term condition" is required',
      }),
    bookingterms: Joi.array()
      .items(Joi.string().required())
      .required()
      .messages({
        "array.base": '"booking terms" must be an array of strings',
        "any.required": '"booking terms" is required',
      }),
    cancellationpolicy: Joi.array()
      .items(Joi.string().required())
      .required()
      .messages({
        "array.base": '"cancellation policy" must be an array of strings',
        "any.required": '"cancellation policy" is required',
      }),
  });

  const { error } = visaSchema.validate(data);
  return error ? error.details : null;
}

export { visaInputValidation };
