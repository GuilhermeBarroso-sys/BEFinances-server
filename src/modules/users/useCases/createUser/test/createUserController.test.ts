import {CreateUserUseCase} from "../createUserUseCase";
import {CreateUserController} from "../createUserController";
import {userRepositoryMock} from "../../../../../mocks/modules/users/repositories/userRepositoryMock";
import {lambdaEvent} from "../../../../../mocks/apiGateway/lambdaEvent";
import { Validator } from "../../../../../lib/Validator";
describe("Testing Create User Controller", () => {

	it("shouldn't pass on validator", async () => {
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {
				error: true,
				message: "invalid email / test"
      
			};
		});
		const createUserUseCase = new CreateUserUseCase(await userRepositoryMock({config: {password: "123"}}));
		const createUserController = new CreateUserController(createUserUseCase);
		const response = await createUserController.handle(lambdaEvent({
			body: JSON.stringify({
				username: "test",
				email: "test", 
				
			})
		}));
		expect(response.statusCode).toBe(400);

	});

	
	it("Should create a user", async () => {
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {
				error: false,
				message: null
      
			};
		});
		const createUserUseCase = new CreateUserUseCase(await userRepositoryMock({config: {password: "123"}}));
		const createUserController = new CreateUserController(createUserUseCase);
		const response = await createUserController.handle(lambdaEvent({
			body: JSON.stringify({
				username: "test",
				email: "test", 
				password: "123456"
				
			})
		}));
		expect(response.statusCode).toBe(201);

	});

	it("Should throw an error" , async () => {
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {
				error: false,
				message: null
      
			};
		});
		const createUserUseCase = new CreateUserUseCase(await userRepositoryMock({config: {password: "123"}, throwError: true}));
		const createUserController = new CreateUserController(createUserUseCase);
		const response = await createUserController.handle(lambdaEvent({
			body: JSON.stringify({
				username: "test",
				email: "test", 
				password: "test123"
				
			})
		}));
		expect(response.statusCode).toBe(500);
	});
	
});