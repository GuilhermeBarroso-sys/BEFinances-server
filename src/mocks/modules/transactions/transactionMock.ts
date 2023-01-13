import { Uuid } from "../../../lib/Uuid";

export function transactionMock()  {
	return {
		id: Uuid.v4(),
		user_id: Uuid.v4(),
		date: new Date(),
		amount: 35353.35,
		category: "test",
		description: "test"
	};
}