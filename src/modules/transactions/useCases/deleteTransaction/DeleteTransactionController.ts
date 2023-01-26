import { EventLambda } from "../../../../@types/EventLambda";
import { Error } from "../../../../errors";
import { ApiGateway } from "../../../../lib/ApiGateway";
import { Validator } from "../../../../lib/Validator";
import { DeleteTransactionUseCase } from "./DeleteTransactionUseCase";
import { schema } from "./validation/schema";

class DeleteTransactionController {
	constructor(private deleteTransactionUseCase : DeleteTransactionUseCase) {}
	async handle(event : EventLambda) {
		const {transactionId} = event.pathParameters;

		try {
			const {error, message } = Validator.isValid({transactionId}, schema);
			if(error) {
				return ApiGateway.response({
					statusCode: 400,
					body: message
				});
			}
			await this.deleteTransactionUseCase.execute({transactionId});
			return ApiGateway.response({ statusCode: 204 });
		} catch( err ){
			const {body, statusCode} = Error.handlerError(err);
			console.log(err.message);
			return ApiGateway.response({body, statusCode});
		}
	}
}

export {DeleteTransactionController};