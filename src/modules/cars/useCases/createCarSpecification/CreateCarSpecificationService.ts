import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/appError";
import { inject, injectable } from "tsyringe";


interface IRequest {
    car_id: string;
    specifications_id: string[];
}

@injectable()
class CreateCarSpecificationService {

    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
        @inject("SpecificationsRepository")
        private specificationsRepository: ISpecificationsRepository
    ) { }

    async execute({ car_id, specifications_id }: IRequest): Promise<Car> {
        const carExists = await this.carsRepository.findById(car_id);

        if (!carExists) {
            throw new AppError("Car does not exist.");
        }

        let specifications = await this.specificationsRepository.findByIds(specifications_id)

        if (specifications.length === 0) {
            throw new AppError("Specification does not exist.");
        }

        if (!carExists.specifications) {
            carExists.specifications = specifications;
        } else {
            specifications = specifications.filter(specification => !carExists.specifications.includes(specification));
            carExists.specifications.push(...specifications);
        }

        await this.carsRepository.create(carExists);

        return carExists;
    }

}

export { CreateCarSpecificationService }
