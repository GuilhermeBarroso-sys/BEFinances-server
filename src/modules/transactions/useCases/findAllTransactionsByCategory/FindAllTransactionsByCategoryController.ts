import { EventLambda } from "../../../../@types/EventLambda";
import { Error } from "../../../../errors";
import { ApiGateway } from "../../../../lib/ApiGateway";
import { Validator } from "../../../../lib/Validator";
import { FindAllTransactionsByCategoryUseCase } from "./FindAllTransactionsByCategoryUseCase";
import { schema } from "./validation/schema";

class FindAllTransactionsByCategoryController {
	constructor(private  findAllTransactionsByCategoryUseCase: FindAllTransactionsByCategoryUseCase) {}
	async handle(event : EventLambda) {
		const {userId} = event.pathParameters;
		const params = event.queryStringParameters;
		try {
			const {error, message } = Validator.isValid({start_date: params?.start_date, end_date: params?.end_date, userId }, schema);
			if(error) {
				return ApiGateway.response({
					statusCode: 400,
					body: message
				});
			}
			const {start_date, end_date} = params;
			const transactions = await this.findAllTransactionsByCategoryUseCase.execute({userId,date: {start_date, end_date}});

			return ApiGateway.response({body: transactions, statusCode: 200});
		} catch( err ){
			const {body, statusCode} = Error.handlerError(err);
			console.log(err.message);
			return ApiGateway.response({body, statusCode});
		}
	}
}

export {FindAllTransactionsByCategoryController};