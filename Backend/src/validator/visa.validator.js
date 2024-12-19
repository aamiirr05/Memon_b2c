import Joi from "joi";

function visaInputValidation(data) {
  const visaSchema = Joi.object({
    visacountry: Joi.string().max(100).required(),
  });
}

export { visaInputValidation };
