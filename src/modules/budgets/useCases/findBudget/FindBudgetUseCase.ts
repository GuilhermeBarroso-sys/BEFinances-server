import { IBudgetRepository, ICreateBudget, IFindBudgetParams } from "../../repositories/IBudgetRepository";

class FindBudgetUseCase {
	constructor(private budgetRepository : IBudgetRepository) {}
	async execute(data : IFindBudgetParams) {
		const budgets = await this.budgetRepository.findBudget(data);
		return budgets;
	}
}

export { FindBudgetUseCase };