import { EventLambda } from "../../../../@types/EventLambda";
import { Error } from "../../../../errors";
import { ApiGateway } from "../../../../lib/ApiGateway";
import { Validator } from "../../../../lib/Validator";
import { CreateBudgetUseCase } from "./CreateBudgetUseCase";
import { schema } from "./validation/schema";

class CreateBudgetController {
	constructor(private createBudgetUseCase : CreateBudgetUseCase) {}
	async handle(event : EventLambda) {
		const {month,year, amount} = JSON.parse(event.body);
		const {user_id} = event;
		try {
			const {error, message} = Validator.isValid({month,year,amount,user_id}, schema);
			if(error) {
				return ApiGateway.response({statusCode: 400, body: message});
			}
			await this.createBudgetUseCase.execute({data: {
				amount,
				month, 
				user_id,
				year
			}});
			return ApiGateway.response({
				statusCode:201 
			});
		} catch( err) {
			const {body,statusCode} = Error.handlerError(err);
			return ApiGateway.response({body,statusCode});
		}
	}
}

export { CreateBudgetController };