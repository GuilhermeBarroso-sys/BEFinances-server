import middy from '@middy/core';
import { FindUserFactory } from "../../modules/users/useCases/findUser/FindUserFactory";
import { EventLambda } from "../../@types/EventLambda";
import { AuthenticateUserFactory } from "../../modules/users/useCases/authenticateUser/AuthenticateUserFactory";
import { createUserFactory } from "../../modules/users/useCases/createUser/CreateUserFactory";

async function findUserRoute(event : EventLambda)  {
	return FindUserFactory().handle(event);
}

async function authenticateUserRoute(event : EventLambda) {
	return AuthenticateUserFactory().handle(event);
}

async function createUserRoute(event : EventLambda) {
	return createUserFactory().handle(event);
}


export const findUser = middy(findUserRoute);


export const authenticateUser = middy(authenticateUserRoute);

export const createUser = middy(createUserRoute);
