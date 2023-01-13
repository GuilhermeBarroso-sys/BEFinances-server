import {Validator} from "../../../../../lib/Validator";
import { budgetRepositoryMock } from "../../../../../mocks/modules/budgets/repositories/budgetRepositoryMock";
import { lambdaEvent } from "../../../../../mocks/apiGateway/lambdaEvent";
import {FindBudgetUseCase} from "../FindBudgetUseCase";
import {FindBudgetController} from "../FindBudgetController";


describe("Testing Find Transaction Controller", () => {
	it("Shouldn't pass on validator", async () => {
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {
				error: true,
				message: "Missing params!"
			};
		});

		const findBudgetUseCase = new FindBudgetUseCase(budgetRepositoryMock({config : {
			emptyBudget: false
		}}));
		const findBudgetController = new FindBudgetController(findBudgetUseCase);
		const event = lambdaEvent();
		const response = await findBudgetController.handle(event);
		expect(response.statusCode).toBe(400);
	});
	it("Should return status code 200 without error", async () => {
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {
				error: false,
				message: null
			};
		});

		const findBudgetUseCase = new FindBudgetUseCase(budgetRepositoryMock({config : {
			emptyBudget: false
		}}));
		const findBudgetController = new FindBudgetController(findBudgetUseCase);
		const event = lambdaEvent();
		const response = await findBudgetController.handle(event);
		expect(response.statusCode).toBe(200);
	});

	it("Should throw an error", async () => {
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {
				error: false,
				message: null
			};
		});

		const findBudgetUseCase = new FindBudgetUseCase(budgetRepositoryMock({throwError: true,config : {
			emptyBudget: false
		}}));
		const findBudgetController = new FindBudgetController(findBudgetUseCase);
		const event = lambdaEvent();
		const response = await findBudgetController.handle(event);
		expect(response.statusCode).toBe(500);
	});

   
});