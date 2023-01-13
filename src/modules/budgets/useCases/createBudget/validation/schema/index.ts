import Joi from "joi";
export const schema = Joi.object({
	user_id: Joi.string().uuid(),
	year: Joi.string().max(4).required(),
	month: Joi.string().max(2).required(),
	amount: Joi.number().required()
});