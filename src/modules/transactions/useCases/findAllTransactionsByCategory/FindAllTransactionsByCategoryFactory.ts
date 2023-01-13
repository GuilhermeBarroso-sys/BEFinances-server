import { TransactionRepository } from "../../repositories/prisma/TransactionRepository";
import { FindAllTransactionsByCategoryController } from "./FindAllTransactionsByCategoryController";
import { FindAllTransactionsByCategoryUseCase } from "./FindAllTransactionsByCategoryUseCase";


export function FindAllTransactionsByCategoryFactory() {
	const transactionRepository = new TransactionRepository();
	const findAllTransactionsByCategoryUseCase = new FindAllTransactionsByCategoryUseCase(transactionRepository);
	const findAllTransactionsByCategoryController = new FindAllTransactionsByCategoryController(findAllTransactionsByCategoryUseCase);
	return findAllTransactionsByCategoryController;
}