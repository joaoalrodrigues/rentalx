import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/appError";
import { inject } from "tsyringe";

interface IRequest {
    id: string;
    user_id: string;
}

class FinalizeRentalService {

    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository,
        @inject("DateProvider")
        private dateProvider: IDateProvider
    ) { }

    async execute({ id, user_id }: IRequest) {
        const rental = await this.rentalsRepository.findById(id);
        const minimun_duration = 1;

        if (!rental) {
            throw new AppError("Rental does not exist.");
        }

        const car = await this.carsRepository.findById(rental.car_id);

        const dateNow = this.dateProvider.now();
        let duration = this.dateProvider.compareDays(rental.start_date, dateNow);

        if (duration <= 0) {
            duration = minimun_duration;
        }

        const delay = this.dateProvider.compareDays(dateNow, rental.expected_return_date);

        let total = 0;

        if (delay > 0) {
            const calculate_fine = delay * car.fine_amount;
            total = calculate_fine;
        }

        total += duration * car.daily_rate;

        rental.end_date = dateNow;
        rental.total = total;

        await this.rentalsRepository.create(rental);
        await this.carsRepository.updateAvailability(car.id, true);

        return rental;
    }

}

export { FinalizeRentalService }
