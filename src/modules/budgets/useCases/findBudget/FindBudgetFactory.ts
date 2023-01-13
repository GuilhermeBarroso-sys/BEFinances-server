import { BudgetRepository } from "../../repositories/prisma/BudgetRepository";
import { FindBudgetController } from "./FindBudgetController";
import { FindBudgetUseCase } from "./FindBudgetUseCase";

export function FindBudgetFactory() {
	const budgetRepository = new BudgetRepository();
	const findBudgetUseCase = new FindBudgetUseCase(budgetRepository);
	const findBudgetController = new FindBudgetController(findBudgetUseCase);
	return findBudgetController;
}