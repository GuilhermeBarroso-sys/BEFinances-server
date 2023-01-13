import { Uuid } from "../../../lib/Uuid";

export function budgetMock()  {
	return {
		id: Uuid.v4(),
		user_id: Uuid.v4(),
		month: new Date().getMonth().toString(),
		year: new Date().getFullYear().toString(),
		amount: 3500.00
	};
}