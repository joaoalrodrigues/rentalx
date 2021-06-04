import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/appError";
import { CreateCarService } from "./CreateCarService"

let createCarService: CreateCarService;
let carsRepository: ICarsRepository;

describe("Create Car", () => {

    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        createCarService = new CreateCarService(carsRepository);
    })

    it("should be able to create a new car", async () => {
        const car = await createCarService.execute({
            name: "Name Car",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category"
        });

        expect(car).toHaveProperty("id");
    });

    it("should not be able to create a car with existent license plate", async () => {
        await expect(async () => {
            const car = {
                name: "Name Car",
                description: "Description Car",
                daily_rate: 100,
                license_plate: "ABC-1234",
                fine_amount: 60,
                brand: "Brand",
                category_id: "category"
            };
            await createCarService.execute(car);
            await createCarService.execute(car);
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to create a car without avaiability", async () => {
        const car = await createCarService.execute({
            name: "Name Car 2",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category"
        });
        expect(car.available).toBe(true);
    });

});