import { Request, Response } from "express";
import { container } from "tsyringe";
import { ImportCategoriesService } from "./ImportCategoriesService";

class ImportCategoriesController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { file } = request;

        const importCategoriesService = container.resolve(ImportCategoriesService);

        await importCategoriesService.execute(file);

        return response.status(201).send();
    }

}

export { ImportCategoriesController };
