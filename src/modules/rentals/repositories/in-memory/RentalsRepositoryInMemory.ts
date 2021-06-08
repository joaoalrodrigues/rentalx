import { IRentalDTO } from "@modules/rentals/dtos/IRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "../IRentalsRepository";

class RentalsRepositoryInMemory implements IRentalsRepository {
    private rentals: Rental[] = [];

    async findById(id: string): Promise<Rental> {
        const rental = this.rentals.find(rental => rental.id === id);
        return rental;
    }

    async findActiveByCar(car_id: string): Promise<Rental> {
        return this.rentals.find(rental => rental.car_id === car_id && rental.end_date == null);
    }

    async findActiveByUser(user_id: string): Promise<Rental> {
        return this.rentals.find(rental => rental.user_id === user_id && rental.end_date == null);
    }

    async create({ car_id, user_id, start_date, expected_return_date, end_date, total, id }: IRentalDTO): Promise<Rental> {
        const rental = new Rental();
        Object.assign(rental, {
            car_id,
            user_id,
            start_date,
            expected_return_date,
            created_at: new Date(),
            updated_at: new Date(),
            end_date,
            total,
            id
        });

        this.rentals.push(rental);

        return rental;
    }
}

export { RentalsRepositoryInMemory }
