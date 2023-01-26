import { EventLambda } from "../../../../@types/EventLambda";
import { Error } from "../../../../errors";
import { ApiGateway } from "../../../../lib/ApiGateway";
import { Validator } from "../../../../lib/Validator";
import { FindBudgetUseCase } from "./FindBudgetUseCase";
import { schema } from "./validation/schema";

class FindBudgetController {
	constructor(private findBudgetUseCase : FindBudgetUseCase) {}
	async handle(event : EventLambda) {
		const {user_id} = event;
		console.log(user_id);
		const params = event.queryStringParameters;
		try {
	
			const {error, message} = Validator.isValid({month: params?.month ,year: params?.year,user_id}, schema);
			if(error) {
				return ApiGateway.response({statusCode: 400, body: message});
			}
			const budgets = await this.findBudgetUseCase.execute({month: params?.month,year: params?.year,user_id});
			return ApiGateway.response({
				body: budgets,
				statusCode: 200
			});
		} catch(err) {
			console.log(err.message);

			const {body,statusCode} = Error.handlerError(err);
			return ApiGateway.response({body,statusCode});
		}
	}
}

export { FindBudgetController };