import { IRentalDTO } from "../dtos/IRentalDTO";
import { Rental } from "../infra/typeorm/entities/Rental";


interface IRentalsRepository {

    findById(id: string): Promise<Rental>;
    findByUser(user_id: string): Promise<Rental[]>;
    findActiveByCar(car_id: string): Promise<Rental>;
    findActiveByUser(user_id: string): Promise<Rental>;
    create({ car_id, user_id, start_date, expected_return_date, end_date, id }: IRentalDTO): Promise<Rental>;

}

export { IRentalsRepository }
