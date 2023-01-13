import { IBudget, IBudgetRepository, ICreateBudget, IFindBudgetParams } from "../../../../modules/budgets/repositories/IBudgetRepository";
import { budgetMock } from "../budgetMock";

interface IBudgetRepositoryMock {
	config?: {
		emptyBudget?: boolean
	}
	throwError?: boolean
}
export function budgetRepositoryMock({config : { emptyBudget = false}, throwError = false} : IBudgetRepositoryMock) : IBudgetRepository {
	const budget : IBudget | undefined = emptyBudget ? undefined : budgetMock();
	
	return throwError ? {
		findBudget: async (data : IFindBudgetParams) => {throw new Error("database error");},
		create: async (data : ICreateBudget ) => {throw new Error("database error");}
	
	} :{
		findBudget: async (data : IFindBudgetParams) => {return budget;},
		create: async (data : ICreateBudget ) => {}
	
	};
}