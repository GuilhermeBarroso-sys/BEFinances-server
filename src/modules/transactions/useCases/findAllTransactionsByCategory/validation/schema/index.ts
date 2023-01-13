import Joi from "joi";
const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
export const schema = Joi.object({
	userId: Joi.string().uuid().required(),
	start_date: Joi.string().pattern(dateFormatRegex).required(),
	end_date: Joi.string().pattern(dateFormatRegex).required()
});