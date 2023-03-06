import { IBudget, IBudgetRepository, ICreateBudget, IDeleteBudget, IFindBudgetParams } from "../../../../modules/budgets/repositories/IBudgetRepository";
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
		create: async (data : ICreateBudget ) => {throw new Error("database error");},
		deleteBudget: async (data : IDeleteBudget) => {throw new Error("database error");}
	
	} :{
		findBudget: async (data : IFindBudgetParams) => {return !emptyBudget ? [budget] : [];},
		create: async (data : ICreateBudget ) => {},
		deleteBudget: async (data : IDeleteBudget) => {}
	
	};
}