import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";
import { AppError } from "@shared/errors/appError";
import { CreateCarService } from "../createCar/CreateCarService";
import { CreateSpecificationService } from "../createSpecification/CreateSpecificationService";
import { CreateCarSpecificationService } from "./CreateCarSpecificationService";


let createCarSpecificationService: CreateCarSpecificationService;
let createCarService: CreateCarService;
let createSpecificationService: CreateSpecificationService;
let carsRepository: ICarsRepository;
let specificationRepository: ISpecificationsRepository;

describe("Create Car Specification", () => {

    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        specificationRepository = new SpecificationsRepositoryInMemory();
        createCarService = new CreateCarService(carsRepository);
        createSpecificationService = new CreateSpecificationService(specificationRepository);
        createCarSpecificationService = new CreateCarSpecificationService(carsRepository, specificationRepository);
    })

    it("should be able to add specifications to the car", async () => {
        const specification = await createSpecificationService.execute(
            "Specification Name",
            "Specification Description"
        );

        const car = await createCarService.execute({
            name: "Car Name",
            brand: "Brand",
            category_id: "Category Id",
            daily_rate: 100,
            description: "Car Description",
            fine_amount: 70,
            license_plate: "TUV-9876",
            specifications: [specification]
        });

        const car_id = car.id;
        const specifications_id = [specification.id];
        const carWithSpecifications = await createCarSpecificationService.execute({ car_id, specifications_id });

        expect(carWithSpecifications).toHaveProperty("specifications");
        expect(carWithSpecifications.specifications.length).toBe(1);

    })

    it("should not be able to add specifications to an unexistent car", async () => {
        expect(async () => {
            const car_id = "1234";
            const specifications_id = ["1111"]
            await createCarSpecificationService.execute({ car_id, specifications_id });
        }).rejects.toBeInstanceOf(AppError);
    })

    it("should not be able to add an unexistent specifications to a car", async () => {
        expect(async () => {
            const car = await createCarService.execute({
                name: "Car Name",
                brand: "Brand",
                category_id: "Category Id",
                daily_rate: 100,
                description: "Car Description",
                fine_amount: 70,
                license_plate: "TUV-9876"
            });

            const car_id = car.id;
            const specifications_id = ["1111"]
            await createCarSpecificationService.execute({ car_id, specifications_id });
        }).rejects.toBeInstanceOf(AppError);
    })

});