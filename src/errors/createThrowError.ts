import { commonErrors } from "./commonErrors";
interface IcreateThrowError {
	name: string
	message?: string;
}
export function createThrowError(config : IcreateThrowError) {
	const error = new Error();
	Object.assign(error, config);
	return error;

}