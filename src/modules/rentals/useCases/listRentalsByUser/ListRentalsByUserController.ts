import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListRentalsByUserService } from "./ListRentalsByUserService";

class ListRentalsByUserController {

    async handle(request: Request, response: Response) {
        const { user } = request;
        const listRentalsByUserService = container.resolve(ListRentalsByUserService);

        const userRentals = await listRentalsByUserService.execute(user.id);

        return response.json(userRentals);
    }

}

export { ListRentalsByUserController }
