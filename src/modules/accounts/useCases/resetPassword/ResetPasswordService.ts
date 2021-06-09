import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import { AppError } from "@shared/errors/appError";
import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordService {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UsersTokenRepository")
        private usersTokenRepository: IUsersTokenRepository,
        @inject("DateProvider")
        private dateProvider: IDateProvider
    ) { }

    async execute({ token, password }: IRequest) {
        const userToken = await this.usersTokenRepository.findByRefreshToken(token);

        if (!userToken) {
            throw new AppError("Invalid token!");
        }

        const isTokenExpired = this.dateProvider.isExpired(userToken.expires_date);

        if (isTokenExpired) {
            throw new AppError("Token expired!");
        }

        const user = await this.usersRepository.findById(userToken.user_id);

        user.password = await hash(password, 8);

        await this.usersRepository.create(user);

        await this.usersTokenRepository.deleteById(userToken.id);

    }

}

export { ResetPasswordService }
