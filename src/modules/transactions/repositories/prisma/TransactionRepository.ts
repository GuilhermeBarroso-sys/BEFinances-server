import { prisma } from "../../../../prisma";
import {  ITransaction, ITransactionRepository, IFindAllTransactionsByUserIdParams, ICreateTransaction, IFindAllTransactionsByCategoryParams, ITransactionByCategory } from "../ITransactionRepository";

class TransactionRepository implements ITransactionRepository {
	async findAllTransactionsByCategory (params: IFindAllTransactionsByCategoryParams) {
		const {userId,date} = params;
		date.start_date = date.start_date + " 00:00:00";
		date.end_date = date.end_date + " 23:59:59";
		const {start_date,end_date} = date;
		console.log(start_date, end_date);
		const transactionsByCategory = await prisma.$queryRaw<ITransactionByCategory[]>`SELECT SUM(amount) as total, category FROM transactions WHERE user_id = ${userId} AND date BETWEEN ${start_date} AND ${end_date}  group by category`;
		return transactionsByCategory;
	} 

	async findAllTransactionsByUserId({ userId , options : {  date = undefined,limit = undefined,offset = undefined} }: IFindAllTransactionsByUserIdParams) {
		const handleData = date ? `AND date BETWEEN '${date.start_date} 00:00:00' AND '${date.end_date} 23:59:59' `: "";
		const handleLimit = limit ? ` LIMIT ${limit}` : "";
		const handleOffset = limit ? ` OFFSET ${offset}` : "";
		return await prisma.$queryRawUnsafe<ITransaction[]>(`SELECT * FROM transactions WHERE user_id = '${userId}' ${handleData} ${handleLimit} ${handleOffset}`);
	}

	async create({data}: ICreateTransaction) : Promise<void>  {
		const a = await prisma.transaction.create({
			data
		});
		console.log(a.date, a.user_id);
	}
}

export { TransactionRepository};