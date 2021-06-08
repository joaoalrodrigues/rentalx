import { Request, Response } from "express";
import { container } from "tsyringe";
import { FinalizeRentalService } from "./FinalizeRentalService";


class FinalizeRentalController {

    async handle(request: Request, response: Response) {
        const { id: user_id } = request.user;
        const { id } = request.params;

        const finalizeRentalService = container.resolve(FinalizeRentalService);

        const rental = await finalizeRentalService.execute({ id, user_id });

        return response.json(rental);
    }

}

export { FinalizeRentalController }
