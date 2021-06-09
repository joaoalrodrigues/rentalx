import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { CreateUserService } from "@modules/accounts/useCases/createUser/CreateUserService";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { CreateCarService } from "@modules/cars/useCases/createCar/CreateCarService";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";
import { AppError } from "@shared/errors/appError";
import { CreateRentalService } from "./CreateRentalService";

let createRentalService: CreateRentalService;
let createUserService: CreateUserService;
let createCarService: CreateCarService;
let rentalsRepository: IRentalsRepository;
let usersRepository: IUsersRepository;
let carsRepository: ICarsRepository;

describe("Create Rental", () => {

    beforeEach(() => {
        rentalsRepository = new RentalsRepositoryInMemory();
        usersRepository = new UsersRepositoryInMemory();
        carsRepository = new CarsRepositoryInMemory();
        createRentalService = new CreateRentalService(rentalsRepository, usersRepository, carsRepository);
        createUserService = new CreateUserService(usersRepository);
        createCarService = new CreateCarService(carsRepository);
    });

    it("should be able to create a rental", async () => {
        const { rental, car } = await createRentalWithSuccess();
        expect(rental).toHaveProperty("id");
        expect(car.available).toBe(false);
    });

    it("should not be able to create a rental for an unexistent user", async () => {
        const car = await createCarService.execute({
            name: "Car Rental",
            description: "Car that will be rented",
            brand: "Rental",
            category_id: "category-id",
            license_plate: "XFV-2354",
            daily_rate: 70,
            fine_amount: 50
        });
        
        await expect(
            createRentalService.execute({
                car_id: car.id,
                user_id: "user-unexistent",
                start_date: new Date(),
                expected_return_date: new Date("2021-06-08")
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a rental for an unexistent car", async () => {
        const user = await createUserService.execute({
            name: "User Rental",
            email: "use@rental.com",
            password: "rental123",
            driver_license: "XXXXXXXX"
        });
        await expect(
            createRentalService.execute({
                car_id: "car-unexistent",
                user_id: user.id,
                start_date: new Date(),
                expected_return_date: new Date("2021-06-08")
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a rental for a user with a rental in course", async () => {
        const { rental } = await createRentalWithSuccess();

        const car = await createCarService.execute({
            name: "Car Rental 2",
            description: "Another car that will be rented",
            brand: "Rental",
            category_id: "category-id",
            license_plate: "XFC-2354",
            daily_rate: 170,
            fine_amount: 100
        });

        await expect(
            createRentalService.execute({
                car_id: car.id,
                user_id: rental.user_id,
                start_date: new Date(),
                expected_return_date: new Date("2021-06-08")
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a rental for a car currently rented", async () => {
        const { rental } = await createRentalWithSuccess();

        const user = await createUserService.execute({
            name: "User Rental 2",
            email: "user2@rental.com",
            password: "rental123",
            driver_license: "XXXXXXXX"
        });
        await expect(
            createRentalService.execute({
                car_id: rental.car_id,
                user_id: user.id,
                start_date: new Date(),
                expected_return_date: new Date("2021-06-08")
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a rental for less than 24 hours", async () => {
        const user = await createUserService.execute({
            name: "User Rental",
            email: "use@rental.com",
            password: "rental123",
            driver_license: "XXXXXXXX"
        });

        const car = await createCarService.execute({
            name: "Car Rental",
            description: "Car that will be rented",
            brand: "Rental",
            category_id: "category-id",
            license_plate: "XFV-2354",
            daily_rate: 70,
            fine_amount: 50
        });

        await expect(
            createRentalService.execute({
                car_id: car.id,
                user_id: user.id,
                start_date: new Date(),
                expected_return_date: new Date()
            })
        ).rejects.toBeInstanceOf(AppError);
    });

});

async function createRentalWithSuccess() {
    const user = await createUserService.execute({
        name: "User Rental",
        email: "use@rental.com",
        password: "rental123",
        driver_license: "XXXXXXXX"
    });

    const car = await createCarService.execute({
        name: "Car Rental",
        description: "Car that will be rented",
        brand: "Rental",
        category_id: "category-id",
        license_plate: "XFV-2354",
        daily_rate: 70,
        fine_amount: 50
    });

    const startDate = new Date();

    const rental = await createRentalService.execute({
        car_id: car.id,
        user_id: user.id,
        start_date: startDate,
        expected_return_date: new Date(startDate.getDate() + 2)
    });

    return { rental, car };
}
