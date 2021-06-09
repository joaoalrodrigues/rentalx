import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import { getRepository, Repository } from "typeorm";
import { UserToken } from "../entities/UserToken";


class UsersTokenRepository implements IUsersTokenRepository {
    private repository: Repository<UserToken>;

    constructor() {
        this.repository = getRepository(UserToken);
    }

    async create({ user_id, expires_date, refresh_token }: ICreateUserTokenDTO): Promise<UserToken> {
        const userToken = this.repository.create({
            user_id,
            expires_date,
            refresh_token
        });

        await this.repository.save(userToken);

        return userToken;
    }

    async findByUserAndRefreshToken(user_id: string, refresh_token: string): Promise<UserToken> {
        const userToken = this.repository.findOne({
            where: { user_id, refresh_token }
        });
        return userToken;
    }

    async findByRefreshToken(refresh_token: string): Promise<UserToken> {
        const userToken = this.repository.findOne({ refresh_token });
        return userToken;
    }

    async deleteById(id: string): Promise<void> {
        await this.repository.delete(id);
    }
}

export { UsersTokenRepository }
