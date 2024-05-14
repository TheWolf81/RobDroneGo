import { Repo } from "../../core/infra/Repo";
import { User } from "../../domain/user";
import { UserEmail } from "../../domain/userEmail";

export default interface IUserRepo extends Repo<User> {
	save(user: User): Promise<User>;
	findByEmail (email: UserEmail | string): Promise<User>;
	findById (id: string): Promise<User>;
	findByUsername (username: string): Promise<User>;
	findByNif (nif: string): Promise<User>;
	findByPhoneNumber (phoneNumber: string): Promise<User>;
	findAll (): Promise<User[]>;
	deleteById (id: string): Promise<void>;
}
  