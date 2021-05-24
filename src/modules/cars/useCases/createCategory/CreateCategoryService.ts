import { AppError } from "../../../../errors/appError";
import { inject, injectable } from "tsyringe";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository"

@injectable()
class CreateCategoryService {

    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ) { }

    async execute(name: string, description: string): Promise<void> {
        const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

        if (categoryAlreadyExists) {
            throw new AppError("Category already exists.");
        }

        await this.categoriesRepository.create({ name, description });
    }
}

export { CreateCategoryService }
