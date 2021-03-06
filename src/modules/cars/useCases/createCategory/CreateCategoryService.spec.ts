import { AppError } from "@shared/errors/appError";
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryService } from "./CreateCategoryService"

let createCategoryService: CreateCategoryService;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {

    beforeEach(() => {
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryService = new CreateCategoryService(categoriesRepositoryInMemory);
    });

    it("should be able to create a new category", async () => {
        const category = {
            name: "Category Test",
            description: "Category Description Test"
        }

        await createCategoryService.execute(category.name, category.description);

        const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);

        expect(categoryCreated).toHaveProperty("id");
    });

    it("should not be able to create a new category with existent name", async () => {
        const category = {
            name: "Category Test",
            description: "Category Description Test"
        }

        await createCategoryService.execute(category.name, category.description);
        
        await expect(
            createCategoryService.execute(category.name, category.description)
        ).rejects.toBeInstanceOf(AppError);
    });
})