import Joi from "joi";
export const schema = Joi.object({
	transactionId: Joi.string().uuid().required(),
});