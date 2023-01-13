import Joi from "joi";
export const schema = Joi.object({
	date: Joi.string().required(),
	amount: Joi.number().required(),
	category: Joi.string().required(),
	description: Joi.string().required(),
});