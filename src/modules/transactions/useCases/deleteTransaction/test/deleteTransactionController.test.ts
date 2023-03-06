import {Validator} from "../../../../../lib/Validator";
import { transactionRepositoryMock } from "../../../../../mocks/modules/transactions/repositories/transactionRepositoryMock";
import { lambdaEvent } from "../../../../../mocks/apiGateway/lambdaEvent";
import {DeleteTransactionUseCase} from "../DeleteTransactionUseCase";
import {DeleteTransactionController} from "../DeleteTransactionController";


describe("Testing Delete Transaction Controller", () => {
	it("Shouldn't pass on validator", async () => {
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {
				error: true,
				message: "Missing params!"
			};
		});

		const deleteTransactionUseCase = new DeleteTransactionUseCase(transactionRepositoryMock({config : {
			emptyTransaction: false
		}}));
		const deleteTransactionController = new DeleteTransactionController(deleteTransactionUseCase);
		const event = lambdaEvent();
		const response = await deleteTransactionController.handle(event);
		expect(response.statusCode).toBe(400);
	});
	it("Should return status code 200 without error", async () => {
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {
				error: false,
				message: null
			};
		});

		const deleteTransactionUseCase = new DeleteTransactionUseCase(transactionRepositoryMock({config : {
			emptyTransaction: false
		}}));
		const deleteTransactionController = new DeleteTransactionController(deleteTransactionUseCase);
		const event = lambdaEvent();
    
		const response = await deleteTransactionController.handle(event);
		expect(response.statusCode).toBe(204);
	});

	it("Should throw an error", async () => {
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {
				error: false,
				message: null
			};
		});

		const deleteTransactionUseCase = new DeleteTransactionUseCase(transactionRepositoryMock(
			{
				config : {
					emptyTransaction: false
				}
				,throwError: true
			}));
		const deleteTransactionController = new DeleteTransactionController(deleteTransactionUseCase);
		const event = lambdaEvent();
		const response = await deleteTransactionController.handle(event);
		expect(response.statusCode).toBe(500);
	});

   
});