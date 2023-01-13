import {Validator} from "../../../../../lib/Validator";
import { budgetRepositoryMock } from "../../../../../mocks/modules/budgets/repositories/budgetRepositoryMock";
import { lambdaEvent } from "../../../../../mocks/apiGateway/lambdaEvent";
import {CreateBudgetUseCase} from "../CreateBudgetUseCase";
import {CreateBudgetController} from "../CreateBudgetController";


describe("Testing Create Transaction Controller", () => {
	it("Shouldn't pass on validator", async () => {
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {
				error: true,
				message: "Missing params!"
			};
		});

		const createBudgetUseCase = new CreateBudgetUseCase(budgetRepositoryMock({config : {
			emptyBudget: false
		}}));
		const createBudgetController = new CreateBudgetController(createBudgetUseCase);
		const event = lambdaEvent();
		const response = await createBudgetController.handle(event);
		expect(response.statusCode).toBe(400);
	});
	it("Should return status code 201 without error", async () => {
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {
				error: false,
				message: null
			};
		});

		const createBudgetUseCase = new CreateBudgetUseCase(budgetRepositoryMock({config : {
			emptyBudget: false
		}}));
		const createBudgetController = new CreateBudgetController(createBudgetUseCase);
		const event = lambdaEvent();
		const response = await createBudgetController.handle(event);
		expect(response.statusCode).toBe(201);
	});

	it("Should throw an error", async () => {
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {
				error: false,
				message: null
			};
		});

		const createBudgetUseCase = new CreateBudgetUseCase(budgetRepositoryMock({throwError: true,config : {
			emptyBudget: false
		}}));
		const createBudgetController = new CreateBudgetController(createBudgetUseCase);
		const event = lambdaEvent();
		const response = await createBudgetController.handle(event);
		expect(response.statusCode).toBe(500);
	});

   
});