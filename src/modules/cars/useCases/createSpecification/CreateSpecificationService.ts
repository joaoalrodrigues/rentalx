import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/appError";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateSpecificationService {

    constructor(
        @inject("SpecificationsRepository")
        private specificationsRepository: ISpecificationsRepository
    ) { }

    async execute(name: string, description: string): Promise<void> {
        const specificationAlreadyExists = await this.specificationsRepository.findByName(name);

        if (specificationAlreadyExists) {
            throw new AppError("Specification already exists.");
        }

        await this.specificationsRepository.create({ name, description });
    }
}

export { CreateSpecificationService }
