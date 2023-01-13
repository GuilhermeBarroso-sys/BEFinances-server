import { IBudgetRepository, ICreateBudget } from "../../repositories/IBudgetRepository";

class CreateBudgetUseCase {
	constructor(private budgetRepository : IBudgetRepository) {}
	async execute({data} : ICreateBudget) {
		await this.budgetRepository.create({
			data
		});
	}
}

export { CreateBudgetUseCase };