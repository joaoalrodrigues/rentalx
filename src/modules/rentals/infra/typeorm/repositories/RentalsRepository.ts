import { IRentalDTO } from "@modules/rentals/dtos/IRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { getRepository, Repository } from "typeorm";
import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>;

    constructor() {
        this.repository = getRepository(Rental);
    }

    async findById(id: string): Promise<Rental> {
        const rental = await this.repository.findOne(id);
        return rental;
    }

    async findByUser(user_id: string): Promise<Rental[]> {
        const rentalsByUser = await this.repository.find({
            where: { user_id },
            relations: ["car"]
        });
        return rentalsByUser;
    }

    async findActiveByCar(car_id: string): Promise<Rental> {
        const activeRental = await this.repository.findOne({
            where: {
                car_id,
                end_date: null
            }
        });

        return activeRental;
    }

    async findActiveByUser(user_id: string): Promise<Rental> {
        const activeRental = await this.repository.findOne({
            where: {
                user_id,
                end_date: null
            }
        });

        return activeRental;
    }

    async create({ car_id, user_id, start_date, expected_return_date, end_date, total, id }: IRentalDTO): Promise<Rental> {
        const rental = this.repository.create({
            user_id,
            car_id,
            start_date,
            expected_return_date,
            end_date,
            total,
            id
        });

        await this.repository.save(rental);

        return rental;
    }

}

export { RentalsRepository }
