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
export interface IFindAllTransactionsByCategoryParams {
	userId : string
	date: {
		start_date: string,
		end_date: string,
	},

}

export interface ITransactionByCategory {
	category: string,
	total: number
}

export interface IDelete {
	transactionId: string
}

export interface ITransactionRepository {
	findAllTransactionsByUserId: (params : IFindAllTransactionsByUserIdParams) => Promise<ITransaction[]>
	create: (data: ICreateTransaction) => Promise<void>
	findAllTransactionsByCategory: (params : IFindAllTransactionsByCategoryParams) => Promise<ITransactionByCategory[]>
	delete: ({transactionId} : IDelete) => Promise<void>
}