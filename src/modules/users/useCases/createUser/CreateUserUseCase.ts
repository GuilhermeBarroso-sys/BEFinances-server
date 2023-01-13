import { createThrowError } from "../../../../errors/createThrowError";
import { CryptPassword } from "../../../../lib/CryptPassword";
import { IUserCreate, IUserRepository } from "../../repositories/IUserRepository";

class CreateUserUseCase {
	constructor(private userRepository : IUserRepository) {}

	async execute({username,email,password} : IUserCreate) {
		if(password.length < 6) {
			throw createThrowError({
				name: "customError",
				message: "Password must to be 6 or more characters",
				code: "400"
			});
		}
		const passwordHashed = await new CryptPassword(password).hash();
		await this.userRepository.create({
			username,
			email,
			password: passwordHashed
		});
	}
}

export { CreateUserUseCase};