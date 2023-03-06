import { createThrowError } from "../../../../errors/createThrowError";
import { IBudgetRepository, IDeleteBudget } from "../../repositories/IBudgetRepository";

class DeleteBudgetUseCase {
	constructor(private budgetRepository : IBudgetRepository) {}
  
	async execute({budgetId} : IDeleteBudget) {
		await this.budgetRepository.deleteBudget({budgetId});
	}
}

export { DeleteBudgetUseCase };