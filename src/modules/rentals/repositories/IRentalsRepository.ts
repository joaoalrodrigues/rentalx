import { IRentalDTO } from "../dtos/IRentalDTO";
import { Rental } from "../infra/typeorm/entities/Rental";


interface IRentalsRepository {

    findActiveByCar(car_id: string): Promise<Rental>;
    findActiveByUser(user_id: string): Promise<Rental>;
    create({ car_id, user_id, start_date, expected_return_date }: IRentalDTO): Promise<Rental>;

}

export { IRentalsRepository }
