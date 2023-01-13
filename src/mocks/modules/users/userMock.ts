import { CryptPassword } from "../../../lib/CryptPassword";
import { Uuid } from "../../../lib/Uuid";


interface IUserMockParams {
	password: string
}
export async function userMock({password = "123"} : IUserMockParams)  {
	const crypt = new CryptPassword(password);
	return {id: Uuid.v4(), email: "test@gmail.com", password: await crypt.hash(), username: "test" };
}