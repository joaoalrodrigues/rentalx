import { IRentalDTO } from "@modules/rentals/dtos/IRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { getRepository, Repository } from "typeorm";
import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>;

    constructor() {
        this.repository = getRepository(Rental);
    }

    async findActiveByCar(car_id: string): Promise<Rental> {
        const activeRental = await this.repository.findOne({ car_id, end_date: null });
        return activeRental;
    }

    async findActiveByUser(user_id: string): Promise<Rental> {
        const activeRental = await this.repository.findOne({ user_id, end_date: null });
        return activeRental;
    }

    async create({ car_id, user_id, start_date, expected_return_date }: IRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            user_id,
            car_id,
            start_date,
            expected_return_date
        });

        await this.repository.save(rental);

        return rental;
    }

}

export { RentalsRepository }
