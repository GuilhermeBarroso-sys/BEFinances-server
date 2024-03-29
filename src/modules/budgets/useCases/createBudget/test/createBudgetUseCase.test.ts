import {Validator} from "../../../../../lib/Validator";
import { budgetRepositoryMock } from "../../../../../mocks/modules/budgets/repositories/budgetRepositoryMock";
import { lambdaEvent } from "../../../../../mocks/apiGateway/lambdaEvent";
import {CreateBudgetUseCase} from "../CreateBudgetUseCase";
import {CreateBudgetController} from "../CreateBudgetController";
import { transactionMock } from "../../../../../mocks/modules/transactions/transactionMock";
import { budgetMock } from "../../../../../mocks/modules/budgets/budgetMock";


describe("Testing Create Budget Use Case", () => {
	
	it("Should throw an error because already exists a budget", async () => {
	
		const budgetRepository = budgetRepositoryMock({config: {emptyBudget: false}});
    
		const createBudgetUseCase = new CreateBudgetUseCase(budgetRepository);
		await expect(async () => {await createBudgetUseCase.execute({data: budgetMock()});}).rejects.toThrow();

	});
	it("Should create a budget without error", async () => {
	
		const budgetRepository = budgetRepositoryMock({config: {emptyBudget: true}});

		const createBudgetUseCase = new CreateBudgetUseCase(budgetRepository);
		const response = await createBudgetUseCase.execute({data: budgetMock()});
		expect(response).toBe(undefined);

	});

	

   
});