import {Validator} from "../../../../../lib/Validator";
import { transactionRepositoryMock } from "../../../../../mocks/modules/transactions/repositories/transactionRepositoryMock";
import { lambdaEvent } from "../../../../../mocks/apiGateway/lambdaEvent";
import {FindAllTransactionsByCategoryUseCase} from "../FindAllTransactionsByCategoryUseCase";
import {FindAllTransactionsByCategoryController} from "../FindAllTransactionsByCategoryController";


describe("Testing Find All Transactions By Category Id Controller", () => {
	it("Shouldn't pass on validator", async () => {
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {
				error: true,
				message: "start_date is correct but end_date missing"
			};
		});

		const findAllTransactionsByCategoryUseCase = new FindAllTransactionsByCategoryUseCase(transactionRepositoryMock({config : {
			emptyTransaction: false
		}}));
		const findAllTransactionsByCategoryController = new FindAllTransactionsByCategoryController(findAllTransactionsByCategoryUseCase);
		const event = lambdaEvent();
		const response = await findAllTransactionsByCategoryController.handle(event);
		expect(response.statusCode).toBe(400);
	});
	it("Should return status code 200 without error", async () => {
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {
				error: false,
				message: null
			};
		});

		const findAllTransactionsByCategoryUseCase = new FindAllTransactionsByCategoryUseCase(transactionRepositoryMock({config : {
			emptyTransaction: false
		}}));
		const findAllTransactionsByCategoryController = new FindAllTransactionsByCategoryController(findAllTransactionsByCategoryUseCase);
		const event = lambdaEvent();
		const response = await findAllTransactionsByCategoryController.handle(event);
		expect(response.statusCode).toBe(200);
	});

	it("Should throw an error", async () => {
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {
				error: false,
				message: null
			};
		});

		const findAllTransactionsByCategoryUseCase = new FindAllTransactionsByCategoryUseCase(transactionRepositoryMock({throwError: true,config : {
			emptyTransaction: false
		}}));
		const findAllTransactionsByCategoryController = new FindAllTransactionsByCategoryController(findAllTransactionsByCategoryUseCase);
		const event = lambdaEvent();
		const response = await findAllTransactionsByCategoryController.handle(event);
		expect(response.statusCode).toBe(500);
	});

   
});