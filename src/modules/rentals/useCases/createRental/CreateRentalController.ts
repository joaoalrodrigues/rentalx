import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateRentalService } from "./CreateRentalService";

class CreateRentalController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;
        const { start_date, expected_return_date, car_id } = request.body;

        const createRentalService = container.resolve(CreateRentalService);

        const rental = await createRentalService.execute({
            user_id: id,
            car_id,
            start_date,
            expected_return_date
        });

        return response.status(201).json(rental);
    }

}

export { CreateRentalController }
