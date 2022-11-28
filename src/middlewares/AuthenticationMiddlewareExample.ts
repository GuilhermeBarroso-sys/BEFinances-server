import middy from "@middy/core";
import { Uuid } from "../lib/Uuid";
import { IMiddlewares } from "./IMiddlewareInterface";
class AuthenticationMiddlewareExample implements IMiddlewares {
	before ({event}: middy.Request<any, any, Error, any>) {
		event.userIdExample = Uuid.v4();
		// throw new Error("Error that going to onError function");
	}
  
	onError ({event}: middy.Request<any, any, Error, any>) {
		return {
			body: 'Server Error'
		};
		// ...
	}
}


export {AuthenticationMiddlewareExample};