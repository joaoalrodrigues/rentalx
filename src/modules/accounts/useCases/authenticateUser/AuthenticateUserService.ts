import { inject, injectable } from "tsyringe";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/appError";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    };
    token: string;
}

@injectable()
class AuthenticateUserService {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError("Email or password is incorrect!");
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError("Email or password is incorrect!");
        }

        const token = sign({}, "b3a8a6f3883b04647a727404f9b2a842", {
            subject: user.id,
            expiresIn: "1d"
        });

        const tokenReturn = {
            user: {
                name: user.name,
                email: user.email,
            },
            token
        };

        return tokenReturn;
    }

}

export { AuthenticateUserService }
