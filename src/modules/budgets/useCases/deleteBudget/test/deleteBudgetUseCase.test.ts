import {Validator} from "../../../../../lib/Validator";

import { lambdaEvent } from "../../../../../mocks/apiGateway/lambdaEvent";
import { Uuid } from "../../../../../lib/Uuid";
import { DeleteBudgetUseCase } from "../DeleteBudgetUseCase";
import { budgetRepositoryMock } from "../../../../../mocks/modules/budgets/repositories/budgetRepositoryMock";


describe("Testing Delete Transaction Use Case", () => {
	
	it("Shouldn't throw an error", async () => {
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {
				error: false,
				message: null
			};
		});

		const deleteBudgetUseCase = new DeleteBudgetUseCase(budgetRepositoryMock(
			{
				config : {
					emptyBudget: false
				}
			}));
		await expect(deleteBudgetUseCase.execute({budgetId: Uuid.v4()})).resolves.not.toThrow();
	});

});