import fs from "fs";
import csvParse from "csv-parse";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { CreateCategoryService } from "../createCategory/CreateCategoryService";
import { inject, injectable } from "tsyringe";

interface IImportCategory {
    name: string;
    description: string;
}

@injectable()
class ImportCategoriesService {

    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ) { }

    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]> {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path);
            const parseFile = csvParse({});
            const categories: IImportCategory[] = [];

            stream.pipe(parseFile);

            parseFile.on("data", async (row) => {
                const [name, description] = row;
                categories.push({
                    name,
                    description
                });
            })
                .on("end", () => {
                    fs.promises.unlink(file.path);
                    resolve(categories);
                })
                .on("error", (err) => {
                    reject(err);
                });
        });
    }

    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);
        const createCategoryService = new CreateCategoryService(this.categoriesRepository);

        categories.forEach(category => {
            const { name, description } = category;
            createCategoryService.execute(name, description);
        });
    }

}

export { ImportCategoriesService }
