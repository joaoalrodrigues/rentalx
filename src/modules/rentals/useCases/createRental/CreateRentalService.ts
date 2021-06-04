import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/appError";
import { inject, injectable } from "tsyringe"

interface IRequest {
    user_id: string;
    car_id: string;
    start_date: Date;
    expected_return_date: Date;
}

@injectable()
class CreateRentalService {

    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) { }

    async execute({ user_id, car_id, start_date, expected_return_date }: IRequest): Promise<Rental> {
        await this.checkIsUserValid(user_id);
        await this.checkIsCarValid(car_id);
        this.checkIsRentDurationValid(expected_return_date, start_date);

        const rental = await this.rentalsRepository.create({
            user_id,
            car_id,
            start_date,
            expected_return_date
        });

        return rental;
    }

    private async checkIsUserValid(user_id: string) {
        const userExists = await this.usersRepository.findById(user_id);

        if (!userExists) {
            throw new AppError("User does not exist!");
        }

        const userHasActiveRental = await this.rentalsRepository.findActiveByUser(user_id);

        if (userHasActiveRental) {
            throw new AppError("User has an active rental.");
        }
    }

    private async checkIsCarValid(car_id: string) {
        const carExists = await this.carsRepository.findById(car_id);

        if (!carExists) {
            throw new AppError("Car does not exist!");
        }

        const carIsNotAvailable = await this.rentalsRepository.findActiveByCar(car_id);

        if (carIsNotAvailable) {
            throw new AppError("Car is not available!");
        }
    }

    private checkIsRentDurationValid(expected_return_date: Date, start_date: Date) {
        const hours = Math.abs(expected_return_date.getTime() - start_date.getTime()) / 36e5;
        const lessThan24h = hours < 24;

        if (lessThan24h) {
            throw new AppError("Rental cannot last less than 24 hours.");
        }
    }
}

export { CreateRentalService }
