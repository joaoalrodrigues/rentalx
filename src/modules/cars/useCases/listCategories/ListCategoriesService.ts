import { inject, injectable } from "tsyringe";
import { Category } from "../../entities/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository"

@injectable()
class ListCategoriesService {

    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ) { }

    async execute(): Promise<Category[]> {
        return await this.categoriesRepository.list();
    }

}

export { ListCategoriesService }
