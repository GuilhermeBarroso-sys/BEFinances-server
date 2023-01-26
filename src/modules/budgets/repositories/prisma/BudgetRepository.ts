import { Uuid } from "../../../../lib/Uuid";
import { prisma } from "../../../../prisma";
import { IBudget, IBudgetRepository, ICreateBudget, IDeleteBudget, IFindBudgetParams } from "../IBudgetRepository";


class BudgetRepository implements IBudgetRepository {
	async create ({data}: ICreateBudget) {
		await prisma.budget.create({data});
	}

	async findBudget({month,user_id,year}: IFindBudgetParams) {
		if(month && year) {
			const budget =  await prisma.$queryRaw<IBudget[]>`SELECT * FROM budgets WHERE month = ${month} AND year = ${year} AND user_id = ${user_id} LIMIT 1`;
			return budget;
		} else {
			const budget = await prisma.$queryRaw<IBudget[]>`SELECT * FROM budgets WHERE user_id = ${user_id}`;
			return budget.length !== 0 ? budget : [];
		}	
	}

	async deleteBudget ({budgetId}: IDeleteBudget) {
		await prisma.$queryRaw`DELETE FROM budgets WHERE id = ${budgetId} `;
	}
}

export { BudgetRepository};