import middy from '@middy/core';

import { EventLambda } from "../../@types/EventLambda";
import { FindAllTransactionsByUserIdFactory } from '../../modules/transactions/useCases/findAllTransactionsByUserId/FindAllTransactionsByUserIdFactory';
import { AuthenticationMiddleware } from '../../middlewares/AuthenticationMiddleware';
import { CreateTransactionFactory } from '../../modules/transactions/useCases/createTransaction/CreateTransactionFactory';


async function findAllTransactionsByUserIdRoute(event : EventLambda)  {
	return FindAllTransactionsByUserIdFactory().handle(event);
}

async function createTransactionRoute(event : EventLambda) {
	return CreateTransactionFactory().handle(event);
}

export const findAllTransactionsByUserId = middy(findAllTransactionsByUserIdRoute)
	.use(new AuthenticationMiddleware());

export const createTransaction = middy(createTransactionRoute)
	.use(new AuthenticationMiddleware());
