import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UserToken } from "../infra/typeorm/entities/UserToken";

interface IUsersTokenRepository {
    create({ user_id, expires_date, refresh_token }: ICreateUserTokenDTO): Promise<UserToken>;
    findByUserAndRefreshToken(user_id: string, refresh_token: string): Promise<UserToken>;
    findByRefreshToken(refresh_token: string): Promise<UserToken>;
    deleteById(id: string): Promise<void>;
}

export { IUsersTokenRepository }