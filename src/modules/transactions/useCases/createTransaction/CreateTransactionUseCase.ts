import { ICreateTransaction, ITransactionRepository } from "../../repositories/ITransactionRepository";


class CreateTransactionUseCase {
	constructor(private transactionRepository : ITransactionRepository) {}
	async execute({data} : ICreateTransaction) {
		await this.transactionRepository.create({data});
    
	}
}

export { CreateTransactionUseCase};
