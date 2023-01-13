import { UserRepository } from "../../repositories/prisma/UserRepository";
import { FindUserController } from "./FindUserController";
import { FindUserUseCase } from "./FindUserUseCase";

export function FindUserFactory() {
	const userRepository = new UserRepository();
	const findUserUseCase = new FindUserUseCase(userRepository);
	const findUserController = new FindUserController(findUserUseCase);
	return findUserController;
}