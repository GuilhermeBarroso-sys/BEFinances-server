import {Validator} from "../../../../../lib/Validator";
import { transactionRepositoryMock } from "../../../../../mocks/modules/transactions/repositories/transactionRepositoryMock";
import { lambdaEvent } from "../../../../../mocks/apiGateway/lambdaEvent";
import {FindAllTransactionsByUserIdUseCase} from "../FindAllTransactionsByUserIdUseCase";
import {FindAllTransactionsByUserIdController} from "../FindAllTransactionsByUserIdController";
import { Uuid } from "../../../../../lib/Uuid";


describe("Testing Find All Transactions By User Id Use Case", () => {
	it("Should find all transactions without date filters", async () => {
	
		const findAllTransactionsByUserIdUseCase = new FindAllTransactionsByUserIdUseCase(transactionRepositoryMock({config : {
			emptyTransaction: false
		}}));

		await expect(findAllTransactionsByUserIdUseCase.execute({userId: Uuid.v4(), options: {
			date: {
				start_date: undefined,
				end_date: undefined
			}
		}})).resolves.not.toThrow();
	});

	it("Should throw an error", async () => {
		const findAllTransactionsByUserIdUseCase = new FindAllTransactionsByUserIdUseCase(transactionRepositoryMock({config : {
			emptyTransaction: false
		}}));

		await expect(findAllTransactionsByUserIdUseCase.execute({userId: Uuid.v4(), options: {
			date: {
				start_date: new Date().toString(),
				end_date: new Date().toString()
			}
		}})).resolves.not.toThrow();
	});

   
});