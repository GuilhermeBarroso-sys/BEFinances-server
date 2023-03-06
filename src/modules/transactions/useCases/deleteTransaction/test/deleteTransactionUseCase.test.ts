import {Validator} from "../../../../../lib/Validator";
import { transactionRepositoryMock } from "../../../../../mocks/modules/transactions/repositories/transactionRepositoryMock";
import { lambdaEvent } from "../../../../../mocks/apiGateway/lambdaEvent";
import {DeleteTransactionUseCase} from "../DeleteTransactionUseCase";
import {DeleteTransactionController} from "../DeleteTransactionController";
import { Uuid } from "../../../../../lib/Uuid";


describe("Testing Delete Transaction Use Case", () => {
	
	it("Shouldn't throw an error", async () => {

		const deleteTransactionUseCase = new DeleteTransactionUseCase(transactionRepositoryMock(
			{
				config : {
					emptyTransaction: false
				}
			}));
		await expect(deleteTransactionUseCase.execute({transactionId: Uuid.v4()})).resolves.not.toThrow();
	});

   
});