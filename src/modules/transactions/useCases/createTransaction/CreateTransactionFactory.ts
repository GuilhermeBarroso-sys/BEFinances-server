import { TransactionRepository } from "../../repositories/prisma/TransactionRepository";
import { CreateTransactionController } from "./CreateTransactionController";
import { CreateTransactionUseCase } from "./CreateTransactionUseCase";

export function CreateTransactionFactory() {
	const transactionRepository = new TransactionRepository();
	const createTransactionUseCase = new CreateTransactionUseCase(transactionRepository);
	const createTransactionController = new CreateTransactionController(createTransactionUseCase);
	return createTransactionController;
}