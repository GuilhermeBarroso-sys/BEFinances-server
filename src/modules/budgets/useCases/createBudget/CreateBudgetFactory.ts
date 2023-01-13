import { BudgetRepository } from "../../repositories/prisma/BudgetRepository";
import { CreateBudgetController } from "./CreateBudgetController";
import { CreateBudgetUseCase } from "./CreateBudgetUseCase";

export function CreateBudgetFactory() {
	const budgetRepository = new BudgetRepository();
	const createBudgetUseCase = new CreateBudgetUseCase(budgetRepository);
	const createBudgetController = new CreateBudgetController(createBudgetUseCase);
	return createBudgetController;
}