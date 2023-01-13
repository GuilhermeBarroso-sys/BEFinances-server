import { EventLambda } from "../../../../@types/EventLambda";
import { Error } from "../../../../errors";
import { ApiGateway } from "../../../../lib/ApiGateway";
import { Validator } from "../../../../lib/Validator";
import { CreateTransactionUseCase } from "./CreateTransactionUseCase";
import { schema } from "./validation/schema";

class CreateTransactionController {
	constructor(private createTransactionUseCase : CreateTransactionUseCase) {}
	async handle(event: EventLambda) {
		const {date,amount,category,description} = JSON.parse(event.body);
		const {user_id} = event;

		try {
			const {error,message} = Validator.isValid({date,amount,category,description}, schema);
			if(error) {
				return ApiGateway.response({
					body: message,
					statusCode: 400
				});
			}
			const data = {date,amount,category,description, user_id};
			await this.createTransactionUseCase.execute({data});
			return ApiGateway.response({
				statusCode: 201
			});
		} catch(err) {
			console.log(err.message);
      
			const {body, statusCode} = Error.handlerError(err);
			return ApiGateway.response({
				body,statusCode
			});
		}
	}
}

export { CreateTransactionController };