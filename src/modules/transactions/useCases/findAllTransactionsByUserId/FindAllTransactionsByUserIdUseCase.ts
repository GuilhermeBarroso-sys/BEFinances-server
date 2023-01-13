import { createThrowError } from "../../../../errors/createThrowError";
import { ITransactionRepository, IFindAllTransactionsByUserIdParams } from "../../repositories/ITransactionRepository";

class FindAllTransactionsByUserIdUseCase {
	constructor(private transactionRepository : ITransactionRepository) {}
  
	async execute({userId, options} : IFindAllTransactionsByUserIdParams) {
		const {end_date, start_date} = options.date;
		if(!start_date || !end_date) {
			options.date = undefined;
		} 
		const transactions = await this.transactionRepository.findAllTransactionsByUserId({userId, options});
		return transactions;
	}
}

export { FindAllTransactionsByUserIdUseCase };