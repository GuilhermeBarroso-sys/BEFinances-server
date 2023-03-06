import Joi from "joi";
export const schema = Joi.object({
	budgetId: Joi.string().uuid().required(),
});