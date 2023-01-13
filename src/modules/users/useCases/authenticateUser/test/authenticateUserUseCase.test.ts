import { config } from 'dotenv';

config();

import {AuthenticateUserUseCase} from "../AuthenticateUserUseCase";
import {userRepositoryMock} from "../../../../../mocks/modules/users/repositories/userRepositoryMock";
import { CryptPassword } from '../../../../../lib/CryptPassword';
import JWT from 'jsonwebtoken';
describe("Testing Authenticate User Use Case", () => {

	it("should throw an invalid user error", async () => {
		const repositoryMock = await userRepositoryMock({config: {password: "123456"}});
		repositoryMock.custom = async () => {
			return [];
		};
		const authenticateUserUseCase = new AuthenticateUserUseCase(repositoryMock);
		await expect(authenticateUserUseCase.execute({email: "test@gmail.com", password: "123456"})).rejects.toThrow();
		
	});

	it("should throw a wrong credential error", async () => {
		const repositoryMock = await userRepositoryMock({config: {password: "123456"}});
		jest.spyOn(CryptPassword.prototype, "check").mockImplementation(async () => {
			return false;
		});

		const authenticateUserUseCase = new AuthenticateUserUseCase(repositoryMock);
		await expect(authenticateUserUseCase.execute({email: "test@gmail.com", password: "123456"})).rejects.toThrow();
		
	});

	it("should authenticate user without errors", async () => {
		const repositoryMock = await userRepositoryMock({config: {password: "123456"}});
		jest.spyOn(CryptPassword.prototype, "check").mockImplementation(async () => {
			return true;
		});
		jest.spyOn(JWT, "sign").mockImplementation(() => {
			return "test";
		});
		const authenticateUserUseCase = new AuthenticateUserUseCase(repositoryMock);

		await expect(authenticateUserUseCase.execute({email: "test@gmail.com", password: "123456"})).resolves.not.toThrow();
		await expect(authenticateUserUseCase.execute({email: "test@gmail.com", password: "123456"})).resolves.toHaveProperty("token");
    
		
	});

	
});