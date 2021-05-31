import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";
import { AppError } from "@shared/errors/appError";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(request: Request, reponse: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError("Token is missing", 401);
    }

    const [, token] = authHeader.split(" ");
    try {
        const { sub: user_id } = verify(token, "b3a8a6f3883b04647a727404f9b2a842") as IPayload;

        const userRepository = new UsersRepository();
        const user = await userRepository.findById(user_id);

        if (!user) {
            throw new AppError("User does not exist.", 401);
        }

        request.user = {
            id: user_id
        }

        next();
    } catch {
        throw new AppError("Invalid token!", 401);
    }

}
