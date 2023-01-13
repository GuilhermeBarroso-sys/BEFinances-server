import { prisma } from "../../../../prisma";
import {  ITransaction, ITransactionRepository, IFindAllTransactionsByUserIdParams, ICreateTransaction } from "../ITransactionRepository";

class TransactionRepository implements ITransactionRepository {
	async findAllTransactionsByUserId({ userId , options : {  date = undefined,limit = undefined,offset = undefined} }: IFindAllTransactionsByUserIdParams) {
		const handleData = date ? `AND date BETWEEN '${date.start_date}' AND '${date.end_date}' `: "";
		const handleLimit = limit ? ` LIMIT ${limit}` : "";
		const handleOffset = limit ? ` OFFSET ${offset}` : "";
		return await prisma.$queryRawUnsafe<ITransaction[]>(`SELECT * FROM transactions WHERE user_id = '${userId}' ${handleData} ${handleLimit} ${handleOffset}`);
	}

	async create({data}: ICreateTransaction) : Promise<void>  {
		await prisma.transaction.create({
			data
		});
	}
}

export { TransactionRepository};