import { EventLambda } from "../../../../@types/EventLambda";
import { Error } from "../../../../errors";
import { ApiGateway } from "../../../../lib/ApiGateway";
import { Validator } from "../../../../lib/Validator";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { schema } from "./validation/schema";

class AuthenticateUserController {
	constructor(private authenticateUserUseCase : AuthenticateUserUseCase) {}
	async handle(event : EventLambda) {
		const {email, password} = JSON.parse(event.body);
		try {
			const {error,message} = Validator.isValid({email, password}, schema);
			if(error) {
				return ApiGateway.response({
					body: message,
					statusCode: 401
				});
			}
			const user = await this.authenticateUserUseCase.execute({email,password});
			return ApiGateway.response({
				body: user
			});
		} catch(err) { 
			const {body,statusCode} = Error.handlerError(err);
			return ApiGateway.response({
				body,
				statusCode
			});
		}
	}
}

export {AuthenticateUserController};