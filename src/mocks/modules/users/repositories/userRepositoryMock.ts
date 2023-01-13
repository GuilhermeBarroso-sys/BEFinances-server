import { CryptPassword } from "../../../../lib/CryptPassword";
import { Uuid } from "../../../../lib/Uuid";
import { IUserCreate, IUserRepository } from "../../../../modules/users/repositories/IUserRepository";
import { userMock } from "../userMock";
interface IUserRepositoryMockParams {
	config: {
		password?: string
		emptyUser?: boolean
	}
	throwError?: boolean
}
export async function userRepositoryMock({config : {password = "123", emptyUser = false}, throwError = false} : IUserRepositoryMockParams) : Promise<IUserRepository> {
	const user = emptyUser ? null : await userMock({password});
	
	return throwError ? {
		create: async (data : IUserCreate) => {throw new Error("database error");},
		custom: async (query: any) => { throw new Error("database error"); },
		find: async (userId : string) => { throw new Error("database error");},
	} :{
		create: async (data : IUserCreate) => {},
		custom: async (query: any) => {return [user];},
		find: async (userId : string) => {return user;},
	};
}