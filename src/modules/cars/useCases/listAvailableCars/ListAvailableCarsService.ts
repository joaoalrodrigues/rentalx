import { IListCarsDTO } from "@modules/cars/dtos/IListCarsDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class ListAvailableCarsService {

    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) { }

    async execute({ brand, category_id, name }: IListCarsDTO): Promise<Car[]> {
        const cars = await this.carsRepository.findAvailable(brand, category_id, name);
        return cars;
    }

}

export { ListAvailableCarsService }
