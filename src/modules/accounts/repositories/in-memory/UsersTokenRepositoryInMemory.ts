import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { UserToken } from "@modules/accounts/infra/typeorm/entities/UserToken";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";


class UsersTokenRepositoryInMemory implements IUsersTokenRepository {
    private usersToken: UserToken[] = [];

    constructor() {
        this.usersToken
    }

    async create({ user_id, expires_date, refresh_token }: ICreateUserTokenDTO): Promise<UserToken> {
        const userToken = new UserToken();
        Object.assign(userToken, {
            user_id,
            expires_date,
            refresh_token,
            created_at: Date.now()
        });

        this.usersToken.push(userToken);

        return userToken;
    }

    async findByUserAndRefreshToken(user_id: string, refresh_token: string): Promise<UserToken> {
        const userToken = this.usersToken.find(token => token.user_id === user_id && token.refresh_token === refresh_token);
        return userToken;
    }

    async findByRefreshToken(refresh_token: string): Promise<UserToken> {
        const userToken = this.usersToken.find(token => token.refresh_token === refresh_token);
        return userToken;
    }

    async deleteById(id: string): Promise<void> {
        const userToken = this.usersToken.find(token => token.id === id);
        this.usersToken.splice(this.usersToken.indexOf(userToken));
    }
}

export { UsersTokenRepositoryInMemory }
