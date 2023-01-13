import {CreateUserUseCase} from "../createUserUseCase";
import {CreateUserController} from "../createUserController";
import {userRepositoryMock} from "../../../../../mocks/modules/users/repositories/userRepositoryMock";
import {lambdaEvent} from "../../../../../mocks/apiGateway/lambdaEvent";
import { Validator } from "../../../../../lib/Validator";
describe("Testing Create User Use Case", () => {

	it("Shouldn't create a user with weak password", async () => {

		const createUserUseCase = new CreateUserUseCase(await userRepositoryMock({config: {password: "123"}}));
		await expect(createUserUseCase.execute({
			email: "test@gmail.com",
			password:"123",
			username: "test",
		})).rejects.toThrow();
	});
	it("Should create a user", async () => {
		const createUserUseCase = new CreateUserUseCase(await userRepositoryMock({config: {password: "123"}}));
		await expect(createUserUseCase.execute({
			email: "test@gmail.com",
			password:"123456",
			username: "test",
		})).resolves.not.toThrow();

	});

	
});