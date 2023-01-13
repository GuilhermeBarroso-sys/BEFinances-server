import middy from "@middy/core";

export interface IMiddlewareAttributes {
	user_id: string | undefined
}


export interface IMiddlewares {
	before?: (event: middy.Request<any, any, Error, any>) => void 
	after?: (event: middy.Request<any, any, Error, any>) => void
	onError?: (event: middy.Request<any, any, Error, any>) => void
}