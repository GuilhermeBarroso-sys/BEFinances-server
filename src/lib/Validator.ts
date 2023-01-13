import Joi from "joi";


export class Validator {
	static isValid(params : Record<string,unknown>, schema : Joi.ObjectSchema<unknown>) {
		const {error} = schema.validate(params);
		if(error) {
			return {error: true, message: error.message};
		} else {
			return {error:false, message: null};
		}
	}
}