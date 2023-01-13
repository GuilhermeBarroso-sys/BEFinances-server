import Joi from "joi";
export const schema = Joi.object({
	user_id: Joi.string().uuid().required(),
	year: Joi.string().optional().max(4),
	month: Joi.string().optional().max(2),
});