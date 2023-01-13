type ILambdaEvent = {
	rawQueryString?: string;
	body?: string;
	pathParameters?: Record<string,string>
}

export function lambdaEvent(lambdaParams? : ILambdaEvent | undefined) {
  
	return {
		"version": "2.0",
		"user_id": "12321312",
		"routeKey": "GET /users/{userId}",
		"rawPath": "/users/ec660c93-a022-4b92-9c6e-d8f7b9a4148e",
		"rawQueryString": lambdaParams?.rawQueryString ? lambdaParams.rawQueryString : "",
		"cookies": [],
		"headers": {
			"host": "localhost:3000",
			"user-agent": "test",
			"accept": "*/*"
		},
		"queryStringParameters": {},
		"requestContext": {
			"accountId": "offlineContext_accountId",
			"apiId": "offlineContext_apiId",
			"authorizer": {
				"jwt": {}
			},
			"domainName": "offlineContext_domainName",
			"domainPrefix": "offlineContext_domainPrefix",
			"http": {
				"method": "test",
				"path": "/test",
				"protocol": "HTTP/1.1",
				"sourceIp": "127.0.0.1",
				"userAgent": "test"
			},
			"requestId": "offlineContext_resourceId",
			"routeKey": "GET /users/{userId}",
			"stage": "$default",
			"time": "30/Dec/2022:15:19:47 -0300",
			"timeEpoch": 1672424387810
		},
		"body": lambdaParams?.body ? lambdaParams.body : "{}",
		"pathParameters": lambdaParams?.pathParameters ? lambdaParams.pathParameters : {},
		"isBase64Encoded": false,
	};
}