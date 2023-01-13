import { SQLStatement } from "sql-template-strings";
import { prisma } from "../../../../prisma";
import { IUserCreate, IUserRepository, IUserFindCustom } from "../IUserRepository";
class UserRepository implements IUserRepository {

	async custom(query:  SQLStatement|any): Promise<IUserFindCustom[]> {
		return await prisma.$queryRaw<IUserFindCustom[]>(query);
	}
	async create (data: IUserCreate) {
		await prisma.user.create({
			data
		});
	}
	async find(userId : string) {
		return await prisma.user.findFirst({
			where: {
				id: userId 
			}
		});
	}
}

export { UserRepository };