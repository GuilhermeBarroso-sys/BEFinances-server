import { UserRepository } from "../../repositories/prisma/UserRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

export function createUserFactory() {
	const userRepository = new UserRepository();
	const createUserUseCase = new CreateUserUseCase(userRepository);
	const createUserController = new CreateUserController(createUserUseCase);
	return createUserController;
}

