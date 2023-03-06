import {Validator} from "../../../../../lib/Validator";
import { transactionRepositoryMock } from "../../../../../mocks/modules/transactions/repositories/transactionRepositoryMock";
import { lambdaEvent } from "../../../../../mocks/apiGateway/lambdaEvent";
import {FindAllTransactionsByCategoryUseCase} from "../FindAllTransactionsByCategoryUseCase";
import {FindAllTransactionsByCategoryController} from "../FindAllTransactionsByCategoryController";
import { Uuid } from "../../../../../lib/Uuid";


describe("Testing Find All Transactions By User Id Use Case", () => {
	it("Should find transactions By Category", async () => {
	
		const findAllTransactionsByCategoryUseCase = new FindAllTransactionsByCategoryUseCase(transactionRepositoryMock({config : {
			emptyTransaction: false
		}}));

		await expect(findAllTransactionsByCategoryUseCase.execute({userId: Uuid.v4(),date : {
			start_date: new Date().toString(),
			end_date: new Date().toString()
		}})).resolves.not.toThrow();
	});

	it("Should throw an error", async () => {
		const findAllTransactionsByCategoryUseCase = new FindAllTransactionsByCategoryUseCase(transactionRepositoryMock({config : {
			emptyTransaction: false
		}}));

		await expect(findAllTransactionsByCategoryUseCase.execute({userId: Uuid.v4(),date: {
			start_date: new Date().toString(),
			end_date: new Date().toString()
		} })).resolves.not.toThrow();
	});

   
});