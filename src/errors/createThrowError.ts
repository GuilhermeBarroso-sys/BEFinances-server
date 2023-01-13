
interface IcreateThrowError {
	name: string
	code?: string
	message?: string;
}
export function createThrowError(config : IcreateThrowError) {
	const error = new Error();
	Object.assign(error, config);
	if(config.message) {
		error.message = "Custom Error "+error.message; 
	}
	return error;

}