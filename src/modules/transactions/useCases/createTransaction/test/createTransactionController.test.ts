import {Validator} from "../../../../../lib/Validator";
import { transactionRepositoryMock } from "../../../../../mocks/modules/transactions/repositories/transactionRepositoryMock";
import { lambdaEvent } from "../../../../../mocks/apiGateway/lambdaEvent";
import {CreateTransactionUseCase} from "../CreateTransactionUseCase";
import {CreateTransactionController} from "../CreateTransactionController";


describe("Testing Create Transaction Controller", () => {
	it("Shouldn't pass on validator", async () => {
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {
				error: true,
				message: "Missing params!"
			};
		});

		const createTransactionUseCase = new CreateTransactionUseCase(transactionRepositoryMock({config : {
			emptyTransaction: false
		}}));
		const createTransactionController = new CreateTransactionController(createTransactionUseCase);
		const event = lambdaEvent();
		const response = await createTransactionController.handle(event);
		expect(response.statusCode).toBe(400);
	});
	it("Should return status code 201 without error", async () => {
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {
				error: false,
				message: null
			};
		});

		const createTransactionUseCase = new CreateTransactionUseCase(transactionRepositoryMock({config : {
			emptyTransaction: false
		}}));
		const createTransactionController = new CreateTransactionController(createTransactionUseCase);
		const event = lambdaEvent();
		const response = await createTransactionController.handle(event);
		expect(response.statusCode).toBe(201);
	});

	it("Should throw an error", async () => {
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {
				error: false,
				message: null
			};
		});

		const createTransactionUseCase = new CreateTransactionUseCase(transactionRepositoryMock({throwError:true,config : {
			emptyTransaction: false
		}}));
		const createTransactionController = new CreateTransactionController(createTransactionUseCase);
		const event = lambdaEvent();
		const response = await createTransactionController.handle(event);
		expect(response.statusCode).toBe(500);
	});

   
});