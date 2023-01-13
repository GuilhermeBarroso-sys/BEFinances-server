import middy from '@middy/core';

import { EventLambda } from "../../@types/EventLambda";
import { FindAllTransactionsByUserIdFactory } from '../../modules/transactions/useCases/findAllTransactionsByUserId/FindAllTransactionsByUserIdFactory';
import { AuthenticationMiddleware } from '../../middlewares/AuthenticationMiddleware';
import { CreateTransactionFactory } from '../../modules/transactions/useCases/createTransaction/CreateTransactionFactory';
import { CreateBudgetFactory } from '../../modules/budgets/useCases/createBudget/CreateBudgetFactory';
import { FindBudgetFactory } from '../../modules/budgets/useCases/findBudget/FindBudgetFactory';


async function createBudgetRoute(event : EventLambda) {
	return CreateBudgetFactory().handle(event);
}

async function findBudgetRoute(event : EventLambda) {
	return FindBudgetFactory().handle(event);
}

export const createBudget = middy(createBudgetRoute)
	.use(new AuthenticationMiddleware());

export const findBudget = middy(findBudgetRoute)
	.use(new AuthenticationMiddleware());



