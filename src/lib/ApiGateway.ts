interface ApiGatewayParameters {
	headers?: unknown | null
	body?: unknown,
	statusCode?: number
}

class ApiGateway {
	static response({body = undefined, statusCode = 400, headers = null} : ApiGatewayParameters) {
		return {
			headers: headers ? headers : {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true,
			},
			body: JSON.stringify(body, (key, value) =>
				typeof value === 'bigint'
					? value.toString()
					: value 
			),
			statusCode
		};
	}
}

export {ApiGateway};