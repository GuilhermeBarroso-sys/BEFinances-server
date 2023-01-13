import { UserRepository } from "../../repositories/prisma/UserRepository";
import { AuthenticateUserController } from "./AuthenticateUserController";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export function AuthenticateUserFactory() {
	const userRepository = new UserRepository();
	const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);
	const authenticateUserController = new AuthenticateUserController(authenticateUserUseCase);
	return authenticateUserController;
}