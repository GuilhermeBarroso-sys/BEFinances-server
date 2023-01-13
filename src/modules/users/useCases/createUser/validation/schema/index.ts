import Joi from "joi";
export const schema = Joi.object({
	username: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().required()
});