import { EventLambda } from "../../../../@types/EventLambda";
import { Error } from "../../../../errors";
import { ApiGateway } from "../../../../lib/ApiGateway";
import { Validator } from "../../../../lib/Validator";
import { DeleteBudgetUseCase } from "./DeleteBudgetUseCase";
import { schema } from "./validation/schema";

class DeleteBudgetController {
	constructor(private deleteBudgetUseCase : DeleteBudgetUseCase) {}
	async handle(event : EventLambda) {
		const {budgetId} = event.pathParameters;

		try {
			const {error, message } = Validator.isValid({budgetId}, schema);
			if(error) {
				return ApiGateway.response({
					statusCode: 400,
					body: message
				});
			}
			await this.deleteBudgetUseCase.execute({budgetId});
			return ApiGateway.response({ statusCode: 204 });
		} catch( err ){
			const {body, statusCode} = Error.handlerError(err);
			console.log(err.message);
			return ApiGateway.response({body, statusCode});
		}
	}
}

export {DeleteBudgetController};