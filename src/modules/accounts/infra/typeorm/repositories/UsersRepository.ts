
import { User } from "../entities/User";
import { getRepository, Repository } from "typeorm";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User);
    }
    async create({ name, email, password, driver_license, id, avatar }: ICreateUserDTO): Promise<User> {
        const userData = this.repository.create({
            name,
            email,
            password,
            driver_license,
            id,
            avatar
        });

        const user = await this.repository.save(userData);

        return user;
    }

    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne(id);
        return user;
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ email });
        return user;
    }

}

export { UsersRepository }
