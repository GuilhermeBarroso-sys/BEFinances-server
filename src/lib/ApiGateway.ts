interface ApiGatewayParameters {
	headers?: unknown | null
	body?: unknown,
	statusCode?: number
}

class ApiGateway {
	static response({body = undefined, statusCode = 200, headers = null} : ApiGatewayParameters) {
		return {
			headers: headers ? headers : {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true,
				'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE'
			},
			body: body ? JSON.stringify(body, (key, value) =>
				typeof value === 'bigint'
					? value.toString()
					: value 
			) : JSON.stringify(null),
			statusCode
		};
	}
}

export {ApiGateway};