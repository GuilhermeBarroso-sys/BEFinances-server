import Joi from "joi";
const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;
const filtersPattern = /^\d{1,15}$/; 
export const schema = Joi.object({
	userId: Joi.string().uuid().required(),
	limit: Joi.string().pattern(filtersPattern),
	offset: Joi.string().pattern(filtersPattern),
	start_date: Joi.string().pattern(dateFormatRegex),
	end_date: Joi.string().pattern(dateFormatRegex)
});