import { Request, Response } from "express";
import { container } from "tsyringe";
import { ProfileUserService } from "./ProfileUserService";

class ProfileUserController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { id: user_id } = request.user;

        const profileUserService = container.resolve(ProfileUserService);
        const user = await profileUserService.execute(user_id);

        return response.json(user);
    }

}

export { ProfileUserController }
