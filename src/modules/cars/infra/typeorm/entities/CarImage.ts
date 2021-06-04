import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from "uuid";

@Entity("cars_image")
class CarImage {

    constructor() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }

    @PrimaryColumn()
    id: string;

    @Column()
    car_id: string;

    @Column()
    image_name: string;

    @CreateDateColumn()
    created_at: Date;

}

export { CarImage }
