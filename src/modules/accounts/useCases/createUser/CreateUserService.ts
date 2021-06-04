import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { AppError } from "@shared/errors/appError";
import { User } from "@modules/accounts/infra/typeorm/entities/User";

@injectable()
class CreateUserService {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute({ name, email, password, driver_license }: ICreateUserDTO): Promise<User> {
        const userAlreadyExists = await this.usersRepository.findByEmail(email);

        if (userAlreadyExists) {
            throw new AppError("User already exists.")
        }

        const passwordHash = await hash(password, 8);
        const user = await this.usersRepository.create({
            name,
            email,
            password: passwordHash,
            driver_license
        });

        return user;
    }
}

export { CreateUserService }
