import middy from '@middy/core';

import { EventLambda } from "../../@types/EventLambda";
import { FindAllTransactionsByUserIdFactory } from '../../modules/transactions/useCases/findAllTransactionsByUserId/FindAllTransactionsByUserIdFactory';
import { AuthenticationMiddleware } from '../../middlewares/AuthenticationMiddleware';
import { CreateTransactionFactory } from '../../modules/transactions/useCases/createTransaction/CreateTransactionFactory';
import { FindAllTransactionsByCategoryFactory } from '../../modules/transactions/useCases/findAllTransactionsByCategory/FindAllTransactionsByCategoryFactory';
import { DeleteTransactionFactory } from '../../modules/transactions/useCases/deleteTransaction/DeleteTransactionFactory';


async function findAllTransactionsByUserIdRoute(event : EventLambda)  {
	return FindAllTransactionsByUserIdFactory().handle(event);
}
async function findAllTransactionsByCategoryRoute(event : EventLambda)  {
	return FindAllTransactionsByCategoryFactory().handle(event);
}

async function createTransactionRoute(event : EventLambda) {
	return CreateTransactionFactory().handle(event);
}

async function deleteTransactionRoute(event : EventLambda) {
	return DeleteTransactionFactory().handle(event);
}

export const findAllTransactionsByUserId = middy(findAllTransactionsByUserIdRoute)
	.use(new AuthenticationMiddleware());

export const findAllTransactionsByCategory = middy(findAllTransactionsByCategoryRoute)
	.use(new AuthenticationMiddleware());

export const createTransaction = middy(createTransactionRoute)
	.use(new AuthenticationMiddleware());

export const deleteTransaction = middy(deleteTransactionRoute)
	.use(new AuthenticationMiddleware());

