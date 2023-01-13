import {FindUserUseCase} from "../FindUserUseCase";
import {FindUserController} from "../FindUserController";
import {userRepositoryMock} from "../../../../../mocks/modules/users/repositories/userRepositoryMock";
import {lambdaEvent} from "../../../../../mocks/apiGateway/lambdaEvent";
import { Validator } from "../../../../../lib/Validator";
describe("Testing Find User Controller", () => {

	it("shouldn't pass on validator", async () => {
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {
				error: true,
				message: "invalid UUID / test"
      
			};
		});
		const findUserUseCase = new FindUserUseCase(await userRepositoryMock({config: {password: "123"}}));
		const findUserController = new FindUserController(findUserUseCase);
		const response = await findUserController.handle(lambdaEvent());

		expect(response.statusCode).toBe(400);

	});
	it("should to find a user", async () => {
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {
				error: false,
				message: null
      
			};
		});
		const findUserUseCase = new FindUserUseCase(await userRepositoryMock({config: {password: "123"}}));
		const findUserController = new FindUserController(findUserUseCase);
		const response = await findUserController.handle(lambdaEvent());
		expect(response.statusCode).toBe(200);
		expect(JSON.parse(response.body)).toHaveProperty("id");
	});

	it("should to throw an error", async () => {
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {
				error: false,
				message: null
      
			};
		});
		const findUserUseCase = new FindUserUseCase(await userRepositoryMock({config: {password: "123"}, throwError: true}));
		const findUserController = new FindUserController(findUserUseCase);
		const response = await findUserController.handle(lambdaEvent());
		expect(response.statusCode).toBe(500);
	});
});