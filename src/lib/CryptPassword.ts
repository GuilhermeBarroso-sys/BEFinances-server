import crypto from "crypto";

class CryptPassword {
	constructor(private password : string) {}
	async hash() : Promise<string>{
		return new Promise((resolve, reject) => {
			const salt = crypto.randomBytes(16).toString("hex");
			crypto.scrypt(this.password, salt, 64, (err, derivedKey) => {
				if (err) reject(err);
				resolve(salt + ":" + derivedKey.toString('hex'));
			});
		});
	}

	async check(hashedPassword : string) {
	
		return new Promise((resolve, reject) => {
			const [salt, key] = hashedPassword.split(":");
			crypto.scrypt(this.password, salt, 64, (err, derivedKey) => {
				if (err) reject(err);
				resolve(key === derivedKey.toString('hex'));
			});
		});
	}
}

export { CryptPassword };