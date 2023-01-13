import {Validator} from "../../../../../lib/Validator";
import { transactionRepositoryMock } from "../../../../../mocks/modules/transactions/repositories/transactionRepositoryMock";
import { lambdaEvent } from "../../../../../mocks/apiGateway/lambdaEvent";
import {FindAllTransactionsByUserIdUseCase} from "../FindAllTransactionsByUserIdUseCase";
import {FindAllTransactionsByUserIdController} from "../FindAllTransactionsByUserIdController";


describe("Testing Find All Transactions By User Id Controller", () => {
	it("Shouldn't pass on validator", async () => {
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {
				error: true,
				message: "start_date is correct but end_date missing"
			};
		});

		const findAllTransactionsByUserIdUseCase = new FindAllTransactionsByUserIdUseCase(transactionRepositoryMock({config : {
			emptyTransaction: false
		}}));
		const findAllTransactionsByUserIdController = new FindAllTransactionsByUserIdController(findAllTransactionsByUserIdUseCase);
		const event = lambdaEvent();
		const response = await findAllTransactionsByUserIdController.handle(event);
		expect(response.statusCode).toBe(400);
	});
	it("Should return status code 200 without error", async () => {
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {
				error: false,
				message: null
			};
		});

		const findAllTransactionsByUserIdUseCase = new FindAllTransactionsByUserIdUseCase(transactionRepositoryMock({config : {
			emptyTransaction: false
		}}));
		const findAllTransactionsByUserIdController = new FindAllTransactionsByUserIdController(findAllTransactionsByUserIdUseCase);
		const event = lambdaEvent();
		const response = await findAllTransactionsByUserIdController.handle(event);
		expect(response.statusCode).toBe(200);
	});

	it("Should throw an error", async () => {
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {
				error: false,
				message: null
			};
		});

		const findAllTransactionsByUserIdUseCase = new FindAllTransactionsByUserIdUseCase(transactionRepositoryMock({throwError: true,config : {
			emptyTransaction: false
		}}));
		const findAllTransactionsByUserIdController = new FindAllTransactionsByUserIdController(findAllTransactionsByUserIdUseCase);
		const event = lambdaEvent();
		const response = await findAllTransactionsByUserIdController.handle(event);
		expect(response.statusCode).toBe(500);
	});

   
});