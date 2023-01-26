import { EventLambda } from "../../../../@types/EventLambda";
import { Error } from "../../../../errors";
import { ApiGateway } from "../../../../lib/ApiGateway";
import { Validator } from "../../../../lib/Validator";
import { FindAllTransactionsByUserIdUseCase } from "./FindAllTransactionsByUserIdUseCase";
import { schema } from "./validation/schema";

class FindAllTransactionsByUserIdController {
	constructor(private findAllTransactionsByUserIdUseCase : FindAllTransactionsByUserIdUseCase) {}
	async handle(event : EventLambda) {
		const {transaction_userId : userId} = event.pathParameters;
		const params = event.queryStringParameters;
		try {
			const {error, message } = Validator.isValid({userId, start_date: params?.start_date, end_date: params?.end_date, limit: params?.limit, offset: params?.offset}, schema);
			if(error) {
				return ApiGateway.response({
					statusCode: 400,
					body: message
				});
			}

			const transactions = await this.findAllTransactionsByUserIdUseCase.execute({userId, options: {date: {start_date: params?.start_date,end_date: params?.end_date}, limit: params?.limit, offset: params?.offset}});

			return ApiGateway.response({body: transactions, statusCode: 200});
		} catch( err ){
			const {body, statusCode} = Error.handlerError(err);

			return ApiGateway.response({body, statusCode});
		}
	}
}

export {FindAllTransactionsByUserIdController};