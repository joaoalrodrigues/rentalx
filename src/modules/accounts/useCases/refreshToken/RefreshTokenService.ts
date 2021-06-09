import auth from "@config/auth";
import { UserToken } from "@modules/accounts/infra/typeorm/entities/UserToken";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import { AppError } from "@shared/errors/appError";
import { sign, verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

interface IPayload {
    sub: string;
    email: string;
}

@injectable()
class RefreshTokenService {

    constructor(
        @inject("UsersTokenRepository")
        private usersTokenRepository: IUsersTokenRepository,
        @inject("DateProvider")
        private dateProvider: IDateProvider
    ) { }

    async execute(token: string): Promise<string> {
        const { email, sub: user_id } = verify(token, auth.secret_refresh_token) as IPayload;
        const { secret_refresh_token, refresh_token_expire_days, expires_in_refresh_token } = auth;

        const userTokens = await this.usersTokenRepository.findByUserAndRefreshToken(user_id, token);

        if (!userTokens) {
            throw new AppError("Invalid refresh token.");
        }

        await this.usersTokenRepository.deleteById(userTokens.id);

        const expires_date = this.dateProvider.addDays(refresh_token_expire_days);

        const refresh_token = sign({ email }, secret_refresh_token, {
            subject: user_id,
            expiresIn: expires_in_refresh_token
        });

        await this.usersTokenRepository.create({
            user_id,
            refresh_token,
            expires_date
        });

        return refresh_token;
    }
}

export { RefreshTokenService }
