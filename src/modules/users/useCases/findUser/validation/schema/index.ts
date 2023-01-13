import Joi from "joi";
export const schema = Joi.object({
	userId: Joi.string().uuid()
});