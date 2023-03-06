import { TransactionRepository } from "../../repositories/prisma/TransactionRepository";
import { DeleteTransactionController } from "./DeleteTransactionController";
import { DeleteTransactionUseCase } from "./DeleteTransactionUseCase";


export function DeleteTransactionFactory() {
	const transactionRepository = new TransactionRepository();
	const deleteTransactionUseCase = new DeleteTransactionUseCase(transactionRepository);
	const deleteTransactionController = new DeleteTransactionController(deleteTransactionUseCase);
	return deleteTransactionController;
}