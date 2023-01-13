import { budgetRepositoryMock } from "../../../../../mocks/modules/budgets/repositories/budgetRepositoryMock";
import {FindBudgetUseCase} from "../FindBudgetUseCase";
import { Uuid } from "../../../../../lib/Uuid";


describe("Testing Find Budget Use Case", () => {
	
	it("Should find a budget without error", async () => {
	
		const budgetRepository = budgetRepositoryMock({config: {emptyBudget: false}});
		const findBudgetUseCase = new FindBudgetUseCase(budgetRepository);
		await expect(findBudgetUseCase.execute({month: "05", year: "05", user_id: Uuid.v4()})).resolves.not.toThrow();


	});

	

   
});