import { EventLambda } from "../../../../@types/EventLambda";
import { Error } from "../../../../errors";
import { ApiGateway } from "../../../../lib/ApiGateway";
import { Validator } from "../../../../lib/Validator";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { schema } from "./validation/schema";

class CreateUserController {
	constructor(private createUserUseCase : CreateUserUseCase) {}
	async handle(event : EventLambda) {
		try {
			const {username, email, password} = JSON.parse(event.body);
      
			const {error, message} = Validator.isValid({username, email, password}, schema);
			if(error) {
				return ApiGateway.response({
					body: message,
					statusCode: 400
				});
			}
			await this.createUserUseCase.execute({username,email,password});
			return ApiGateway.response({
				statusCode: 201
			});

		} catch (err) {
			console.log('envs =>', process.env,process.env.JWT_SECRET, process.env.DATABASE_URL);

			console.log(err);
			const {body, statusCode} = Error.handlerError(err);

			return ApiGateway.response({
				body,
				statusCode
			});
		}
	}
}

export { CreateUserController };