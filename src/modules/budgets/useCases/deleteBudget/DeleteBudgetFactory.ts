import { BudgetRepository } from "../../repositories/prisma/BudgetRepository";
import { DeleteBudgetController } from "./DeleteBudgetController";
import { DeleteBudgetUseCase } from "./DeleteBudgetUseCase";



export function DeleteBudgetFactory() {
	const budgetRepository = new BudgetRepository();
	const deleteBudgetUseCase = new DeleteBudgetUseCase(budgetRepository);
	const deleteBudgetController = new DeleteBudgetController(deleteBudgetUseCase);
	return deleteBudgetController;
}