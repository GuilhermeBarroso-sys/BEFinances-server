import { CryptPassword } from "../../../../lib/CryptPassword";
import { Uuid } from "../../../../lib/Uuid";
import { ICreateTransaction, IFindAllTransactionsByCategoryParams, IFindAllTransactionsByUserIdParams, ITransaction, ITransactionRepository } from "../../../../modules/transactions/repositories/ITransactionRepository";
import { IUserCreate, IUserRepository } from "../../../../modules/users/repositories/IUserRepository";
import { findAllTransactionsByCategory } from "../../../../routes/transactions";
import { transactionMock } from "../transactionMock";

interface ITransactionRepositoryMock {
	config: {
		emptyTransaction?: boolean
	}
	throwError?: boolean
}
export function transactionRepositoryMock({config : { emptyTransaction = false}, throwError = false} : ITransactionRepositoryMock) : ITransactionRepository {
	const transaction : ITransaction | null = emptyTransaction ? null : transactionMock();
	
	return throwError ? {
		findAllTransactionsByUserId: async (options : IFindAllTransactionsByUserIdParams) => {throw new Error("database error");},
		create: async (data : ICreateTransaction ) => {throw new Error("database error");},
		findAllTransactionsByCategory: async (data : IFindAllTransactionsByCategoryParams) => {throw new Error("database error");},
	
	} :{
		findAllTransactionsByUserId: async (options : IFindAllTransactionsByUserIdParams) => {return [transaction];},
		create: async (data : ICreateTransaction ) => {},
		findAllTransactionsByCategory: async (data : IFindAllTransactionsByCategoryParams) => {return [{category: "servers", total: 3500.00}];},

	
	};
}