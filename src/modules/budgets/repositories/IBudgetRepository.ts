export interface IBudget {
	id: string,
	user_id: string,
	month: string,
	year: string,
	amount: number
}

export interface ICreateBudget {
	data: {
		user_id: string,
		month: string,
		year: string
		amount: number
	}
}

export interface IFindBudgetParams {
	user_id: string,
	month: string,
	year: string,
}
export interface IBudgetRepository {
	create: (data: ICreateBudget) => Promise<void>
	findBudget: (data : IFindBudgetParams) => Promise<IBudget|IBudget[]>
}