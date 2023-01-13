import { commonErrors } from "./commonErrors";
interface Ierr {
	name?: string
	code?: string;
	message?: string;
}
export class Error {
	static handlerError(err : Ierr){
		
		if(err.message.includes("Custom Error ")) {
			return {
				errorName: "Custom Error",
				statusCode: err.code ? parseInt(err.code) : 400,
				body: err.message.replace("Custom Error ", "")
			};
		}
		const errorName = err.code ? err.code : err.name; 
		const knownError = commonErrors.find((error) =>  error.errorName == errorName);
		const serverError = 	{
			errorName: "ServerError",
			statusCode: 500,
			body: "Server error"
		};
		return knownError ? knownError : serverError;
  
	}
} 