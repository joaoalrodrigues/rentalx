import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateSpecificationService } from "./CreateSpecificationService";


class CreateSpecificationController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, description } = request.body;

        const createSpecificationService = container.resolve(CreateSpecificationService);

        return createSpecificationService.execute(name, description)
            .then(() => response.status(201).send())
            .catch(err => response.status(400).json({ error: err.message }));
    }

}

export { CreateSpecificationController }
