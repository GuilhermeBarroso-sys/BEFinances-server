import {Validator} from "../../../../../lib/Validator";

import { lambdaEvent } from "../../../../../mocks/apiGateway/lambdaEvent";
import {DeleteBudgetUseCase} from "../DeleteBudgetUseCase";
import {DeleteBudgetController} from "../DeleteBudgetController";
import { budgetRepositoryMock } from "../../../../../mocks/modules/budgets/repositories/budgetRepositoryMock";


describe("Testing Delete Budget Controller", () => {
	it("Shouldn't pass on validator", async () => {
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {
				error: true,
				message: "Missing params!"
			};
		});

		const deleteBudgetUseCase = new DeleteBudgetUseCase(budgetRepositoryMock({config : {
			emptyBudget: false
		}}));
		const deleteBudgetController = new DeleteBudgetController(deleteBudgetUseCase);
		const event = lambdaEvent();
		const response = await deleteBudgetController.handle(event);
		expect(response.statusCode).toBe(400);
	});
	it("Should return status code 204 without error", async () => {
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {
				error: false,
				message: null
			};
		});

		const deleteBudgetUseCase = new DeleteBudgetUseCase(budgetRepositoryMock({config : {
			emptyBudget: false
		}}));
		const deleteBudgetController = new DeleteBudgetController(deleteBudgetUseCase);
		const event = lambdaEvent();
		const response = await deleteBudgetController.handle(event);
		expect(response.statusCode).toBe(204);
	});

	it("Should throw an error", async () => {
		jest.spyOn(Validator, "isValid").mockImplementation(() => {
			return {
				error: false,
				message: null
			};
		});

		const deleteBudgetUseCase = new DeleteBudgetUseCase(budgetRepositoryMock(
			{
				config : {
					emptyBudget: false
				}
				,throwError: true
			}));
		const deleteBudgetController = new DeleteBudgetController(deleteBudgetUseCase);
		const event = lambdaEvent();
		const response = await deleteBudgetController.handle(event);
		expect(response.statusCode).toBe(500);
	});

   
});