import SQL from "sql-template-strings";
import { createThrowError } from "../../../../errors/createThrowError";
import { CryptPassword } from "../../../../lib/CryptPassword";
import {sign} from "jsonwebtoken";
import { IUserFindCustom, IUserRepository } from "../../repositories/IUserRepository";

interface IAuthenticateUserUseCaseResponse {
	user: IUserFindCustom
	token: string
}
class AuthenticateUserUseCase {
	constructor(private userRepository : IUserRepository) {} 
	async execute({email, password}) : Promise<IAuthenticateUserUseCaseResponse> {
		const [user] = await this.userRepository.custom(SQL`SELECT * FROM users WHERE email = ${email}`);
		if(!user) {
			throw createThrowError({
				name: "userNotExists"
			});
		}
		const crypt = new CryptPassword(password);
		const isCorrectPassword = await crypt.check(user.password);
		if(!isCorrectPassword) {
			throw createThrowError({
				name: "wrongCredentials"
			});
		}
		delete user.password;
		const token = sign({
			userId: user.id
		},
		process.env.JWT_SECRET);
		// Create the route to create user first... is better
		return {
			user,
			token
		};
	}
}


export { AuthenticateUserUseCase };