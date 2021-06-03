import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCarSpecificationService } from "./CreateCarSpecificationService";


class CreateCarSpecificationController {

    async handle(request: Request, response: Response) {
        const { id } = request.params;
        const { specifications_id } = request.body;

        const createCarSpecificationService = container.resolve(CreateCarSpecificationService);

        const car = await createCarSpecificationService.execute({ car_id: id, specifications_id });

        return response.json(car);
    }

}

export { CreateCarSpecificationController }
