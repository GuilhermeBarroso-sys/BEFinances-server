import { SQLStatement } from "sql-template-strings";

export interface IUserCreate {
	id?: string;
	username: string;
	email: string;
	password: string;

}

export interface IUserFind {
	id: string
	username: string;
	email: string;
	password: string;
}

export interface IUserFindCustom {
	id: string
	username: string;
	email: string;
	password: string;
	[key: string]: unknown
}
export interface IUserRepository {
	create: (data : IUserCreate) => Promise<void>
	find: (userId : string) => Promise<IUserFind|undefined>
	custom: (query:  SQLStatement|any) => Promise<IUserFindCustom[]>
}

