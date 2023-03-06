import { createThrowError } from "../../../../errors/createThrowError";
import { ITransactionRepository, IFindAllTransactionsByUserIdParams, IDelete } from "../../repositories/ITransactionRepository";

class DeleteTransactionUseCase {
	constructor(private transactionRepository : ITransactionRepository) {}
  
	async execute({transactionId} : IDelete) {
		await this.transactionRepository.delete({transactionId});
	}
}

export { DeleteTransactionUseCase };