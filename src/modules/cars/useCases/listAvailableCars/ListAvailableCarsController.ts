import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAvailableCarsService } from "./ListAvailableCarsService";

class ListAvailableCarsController {

    constructor() { }

    async handle(request: Request, response: Response): Promise<Response> {
        const listCarsService = container.resolve(ListAvailableCarsService);

        const cars = await listCarsService.execute(request.query);

        return response.json(cars);
    }

}

export { ListAvailableCarsController }
