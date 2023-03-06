import middy from '@middy/core';

import { EventLambda } from "../../@types/EventLambda";
import { FindAllTransactionsByUserIdFactory } from '../../modules/transactions/useCases/findAllTransactionsByUserId/FindAllTransactionsByUserIdFactory';
import { AuthenticationMiddleware } from '../../middlewares/AuthenticationMiddleware';
import { CreateTransactionFactory } from '../../modules/transactions/useCases/createTransaction/CreateTransactionFactory';
import { CreateBudgetFactory } from '../../modules/budgets/useCases/createBudget/CreateBudgetFactory';
import { FindBudgetFactory } from '../../modules/budgets/useCases/findBudget/FindBudgetFactory';
import { DeleteBudgetFactory } from '../../modules/budgets/useCases/deleteBudget/DeleteBudgetFactory';


async function createBudgetRoute(event : EventLambda) {
	return CreateBudgetFactory().handle(event);
}

async function findBudgetRoute(event : EventLambda) {
	return FindBudgetFactory().handle(event);
}

async function deleteBudgetRoute(event : EventLambda) {
	return DeleteBudgetFactory().handle(event);
}


export const createBudget = middy(createBudgetRoute)
	.use(new AuthenticationMiddleware());

export const findBudget = middy(findBudgetRoute)
	.use(new AuthenticationMiddleware());

export const deleteBudget = middy(deleteBudgetRoute)
	.use(new AuthenticationMiddleware());



