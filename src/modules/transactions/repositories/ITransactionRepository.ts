export interface ITransaction {
	id: string,
	user_id: string,
	date: Date,
	amount: number,
	category: string,
	description: string
}

export interface ICreateTransaction {
	data: {
		id?: string,
		user_id: string,
		date: Date,
		amount: number,
		category: string,
		description: string
	}
}

export interface IQueryOptions {
	date?: {
		start_date: string | undefined,
		end_date: string | undefined,
	} | undefined,
	limit?: string,
	offset?: string,
}
export interface IFindAllTransactionsByUserIdParams {
	userId : string
	options : IQueryOptions
}
export interface ITransactionRepository {
	findAllTransactionsByUserId: (params : IFindAllTransactionsByUserIdParams) => Promise<ITransaction[]>
	create: (data: ICreateTransaction) => Promise<void>

}