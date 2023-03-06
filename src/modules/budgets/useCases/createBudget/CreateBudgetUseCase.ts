import { createThrowError } from "../../../../errors/createThrowError";
import { IBudgetRepository, ICreateBudget } from "../../repositories/IBudgetRepository";

class CreateBudgetUseCase {
	constructor(private budgetRepository : IBudgetRepository) {}
	async execute({data} : ICreateBudget) {
		const {user_id, month, year} = data;
		const budgetAlreadyExists = await this.budgetRepository.findBudget({
			user_id,
			month,
			year
		});
		if(budgetAlreadyExists.length) {
			throw createThrowError({
				name: "customError",
				code: "409",
				message: `A budget already exists on ${year}/${month}`
			});
		}
		await this.budgetRepository.create({
			data
		});
	}
}

export { CreateBudgetUseCase };