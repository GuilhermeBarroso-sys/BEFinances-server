

export const commonErrors =  [
	{
		errorName: "P2002",
		statusCode: 409,
		body: "This user Already exists!"
	},
	{
		errorName: "userNotExists",
		statusCode: 400,
		body: "This user doesn't exists!"
	},
	{
		errorName: "wrongCredentials",
		statusCode: 401,
		body: "Wrong Credentials! verify it and try again"
	}, 
	{
		errorName: "unprocessableEntity",
		statusCode: 422,
		body: undefined
	},
	{
		errorName: "P2025",
		statusCode: 404,
		body: "Record to delete does not exist."
	},
	{
		errorName: "forbidden",
		statusCode: 403,
		body: "forbidden"
	},
	{
		errorName: "unauthorized",
		statusCode: 401,
		body: "unauthorized"
	}
];