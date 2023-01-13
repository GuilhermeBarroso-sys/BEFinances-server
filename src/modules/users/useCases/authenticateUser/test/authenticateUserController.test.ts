import { config } from 'dotenv';

config();

import {AuthenticateUserUseCase} from "../AuthenticateUserUseCase";
import {userRepositoryMock} from "../../../../../mocks/modules/users/repositories/userRepositoryMock";
import {lambdaEvent} from "../../../../../mocks/apiGateway/lambdaEvent";
import { Validator } from "../../../../../lib/Validator";
import { AuthenticateUserController } from "../AuthenticateUserController";

describe("Testing Authenticate User Controller", () => {

	it("shouldn't pass on validator", async () => {
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {
				error: true,
				message: "Wrong Credentials"
      
			};
		});
		const authenticateUserUseCase = new AuthenticateUserUseCase(await userRepositoryMock({config: {password: "123"}}));
		const authenticateUserController = new AuthenticateUserController(authenticateUserUseCase);
		const response = await authenticateUserController.handle(lambdaEvent({
			body: JSON.stringify({
				username: "test",
				email: "test",
				
				
			})
		}));
		expect(response.statusCode).toBe(401);

	});

	it("should return token and user ", async () => {
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {
				error: false,
				message: null
      
			};
		});
		const authenticateUserUseCase = new AuthenticateUserUseCase(await userRepositoryMock({config: {password: "123456"}}));
		const authenticateUserController = new AuthenticateUserController(authenticateUserUseCase);

		const response = await authenticateUserController.handle(lambdaEvent({
			body: JSON.stringify({
				email: "test@gmail.com",
				password: "123456", 
				
			})
		}));
		expect(response.statusCode).toBe(200);

	});

	it("should throw an error ", async () => {
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {
				error: false,
				message: null
      
			};
		});
		const authenticateUserUseCase = new AuthenticateUserUseCase(await userRepositoryMock({config: {password: "123456"}, throwError: true}));
		const authenticateUserController = new AuthenticateUserController(authenticateUserUseCase);

		const response = await authenticateUserController.handle(lambdaEvent({
			body: JSON.stringify({
				email: "test@gmail.com",
				password: "123456", 
				
			})
		}));
		expect(response.statusCode).toBe(500);

	});
	

	
});