import { EventLambda } from "../../../../@types/EventLambda";
import { Error } from "../../../../errors";
import { ApiGateway } from "../../../../lib/ApiGateway";
import { Uuid } from "../../../../lib/Uuid";
import { Validator } from "../../../../lib/Validator";
import { FindUserUseCase } from "./FindUserUseCase";
import { schema } from "./validation/schema";

class FindUserController {
	constructor(private findUserUseCase : FindUserUseCase) {}
	async handle(event : EventLambda) {
		
		const {userId} = event.pathParameters;
    
		const {message, error} = Validator.isValid({userId: Uuid.v4()},schema);
		
		if(error) {
			return ApiGateway.response({
				statusCode: 400,
				body: message
			});
		}
		try {
			const user = await this.findUserUseCase.execute({userId: userId});
			return ApiGateway.response({
				body: user
			});
		} catch(err) {
			console.log(err.message);
			const {body,statusCode} = Error.handlerError(err);
			return ApiGateway.response({
				body,
				statusCode
			});
		}
	}
}

export {FindUserController};