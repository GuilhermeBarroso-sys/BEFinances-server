import crypto from "crypto";
class Uuid {
	static v4() {
		//ts ignore because the intellisense doesn't work on randomUUID function
		//@ts-ignore
		return crypto.randomUUID(); 
	}
}

export {Uuid};