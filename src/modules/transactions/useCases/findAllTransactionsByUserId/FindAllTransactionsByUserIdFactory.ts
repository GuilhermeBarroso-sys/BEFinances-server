import { TransactionRepository } from "../../repositories/prisma/TransactionRepository";
import { FindAllTransactionsByUserIdController } from "./FindAllTransactionsByUserIdController";
import { FindAllTransactionsByUserIdUseCase } from "./FindAllTransactionsByUserIdUseCase";

export function FindAllTransactionsByUserIdFactory() {
	const transactionRepository = new TransactionRepository();
	const findAllTransactionsByUserIdUseCase = new FindAllTransactionsByUserIdUseCase(transactionRepository);
	const findAllTransactionsByUserIdController = new FindAllTransactionsByUserIdController(findAllTransactionsByUserIdUseCase);
	return findAllTransactionsByUserIdController;
}