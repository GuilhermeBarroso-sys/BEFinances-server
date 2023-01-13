import middy from "@middy/core";
import { Uuid } from "../lib/Uuid";
import { IMiddlewares } from "./IMiddlewareInterface";
import { EventLambda } from "../@types/EventLambda";
import { ApiGateway } from "../lib/ApiGateway";
import { verify } from "jsonwebtoken";
interface IJWTPayload {
	iat: number
	userId: string;
}
class AuthenticationMiddleware implements IMiddlewares {
	before ({event}: middy.Request<EventLambda, any, Error, any>) {
		const authorizationToken = event.headers.authorization;
		if(!authorizationToken) {
	
			return ApiGateway.response({
				body: 'Unauthorized - Missing token',
				statusCode: 401
			});
		}
		const [, token] = authorizationToken.split(" ");
		try {
			const {userId}  = verify(token, process.env.JWT_SECRET) as IJWTPayload;
			event.user_id = userId;
		} catch(err) {
			return ApiGateway.response({
				body: 'Unauthorized',
				statusCode: 401
			});
		}
	}
  
	onError ({error}: middy.Request<EventLambda, any, Error, any>) {
		return ApiGateway.response({
			body: 'Error - '+error.message,
			statusCode: 500
		});

	}
}


export {AuthenticationMiddleware};