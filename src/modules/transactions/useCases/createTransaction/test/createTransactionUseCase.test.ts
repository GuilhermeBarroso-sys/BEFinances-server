import {Validator} from "../../../../../lib/Validator";
import { transactionRepositoryMock } from "../../../../../mocks/modules/transactions/repositories/transactionRepositoryMock";
import { lambdaEvent } from "../../../../../mocks/apiGateway/lambdaEvent";
import {CreateTransactionUseCase} from "../CreateTransactionUseCase";
import {CreateTransactionController} from "../CreateTransactionController";
import { transactionMock } from "../../../../../mocks/modules/transactions/transactionMock";


describe("Testing Create Transaction Use Case", () => {
	
	it("Should create a transaction without error", async () => {
	

		const createTransactionUseCase = new CreateTransactionUseCase(transactionRepositoryMock({config : {
			emptyTransaction: false
		}}));
		const response = await createTransactionUseCase.execute({data: transactionMock()});
		expect(response).toBe(undefined);

	});

	

   
});