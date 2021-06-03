import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";


class SpecificationsRepositoryInMemory implements ISpecificationsRepository {

    specifications: Specification[] = [];

    async list(): Promise<Specification[]> {
        throw new Error("Method not implemented.");
    }

    async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
        const specification = new Specification(name, description);
        this.specifications.push(specification);
        return specification;
    }

    async findByName(name: string): Promise<Specification> {
        const specification = this.specifications.find(specification => specification.name === name);
        return specification;
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const specifications = this.specifications.filter(specification => ids.includes(specification.id));
        return specifications;
    }

}

export { SpecificationsRepositoryInMemory }
