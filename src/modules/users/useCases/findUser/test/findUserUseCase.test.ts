import {FindUserUseCase} from "../FindUserUseCase";
import {userRepositoryMock} from "../../../../../mocks/modules/users/repositories/userRepositoryMock";
describe("Testing Find User Use Case", () => {
	it("shouldn't to find a user", async () => {
		
		const findUserUseCase = new FindUserUseCase(await userRepositoryMock({config: {password: "123", emptyUser: true}}));
		await expect(findUserUseCase.execute({userId: "123"})).rejects.toThrow();
	});

	it("should to find a user", async () => {
		const findUserUseCase = new FindUserUseCase(await userRepositoryMock({config: {password: "123", emptyUser: false}}));
		await expect(findUserUseCase.execute({userId: "123"})).resolves.not.toThrow();
	});
});