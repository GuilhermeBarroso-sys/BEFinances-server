import { Error } from "../../../../errors";
import { createThrowError } from "../../../../errors/createThrowError";
import { IUserFind, IUserRepository } from "../../repositories/IUserRepository";

interface IFindUserUseCaseParams {
	userId: string
}
class FindUserUseCase {
	constructor(private userRepository : IUserRepository) {}
	async execute({userId} : IFindUserUseCaseParams) : Promise<Omit<IUserFind, "password">> {
		const user = await this.userRepository.find(userId);
		if(!user) {
			throw createThrowError({
				name: "userNotExists"
			});
		}
		delete user.password;
		return user;
	}
}
export {FindUserUseCase};