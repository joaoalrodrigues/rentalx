import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsService } from "./ListAvailableCarsService";


let carsRepositoryInMemory: ICarsRepository;
let listCarsService: ListAvailableCarsService;

describe("List Cars", () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listCarsService = new ListAvailableCarsService(carsRepositoryInMemory);
    })

    it("should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Name Car",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category"
        });

        const cars = await listCarsService.execute({});

        expect(cars).toEqual([car]);
    });

    it("should be able to list cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Name Car",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category"
        });

        const cars = await listCarsService.execute({ name: "Name Car" });

        expect(cars).toEqual([car]);
    });

    it("should be able to list cars by category", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Name Car",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category"
        });

        const cars = await listCarsService.execute({ category_id: "category" });

        expect(cars).toEqual([car]);
    });

    it("should be able to list cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Name Car",
            description: "Description Car",
            daily_rate: 100,
            license_plate: "ABC-1234",
            fine_amount: 60,
            brand: "Brand",
            category_id: "category"
        });

        const cars = await listCarsService.execute({ brand: "Brand" });

        expect(cars).toEqual([car]);
    });

});
