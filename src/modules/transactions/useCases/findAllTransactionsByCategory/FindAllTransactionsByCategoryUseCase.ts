import { createThrowError } from "../../../../errors/createThrowError";
import { ITransactionRepository, IFindAllTransactionsByUserIdParams, IFindAllTransactionsByCategoryParams } from "../../repositories/ITransactionRepository";

class FindAllTransactionsByCategoryUseCase {
	constructor(private transactionRepository : ITransactionRepository) {}
  
	async execute({userId, date} : IFindAllTransactionsByCategoryParams) {
		const {end_date, start_date} = date;
	
		const transactions = await this.transactionRepository.findAllTransactionsByCategory({userId, date: {start_date, end_date}});
		return transactions;
	}
}

export { FindAllTransactionsByCategoryUseCase };