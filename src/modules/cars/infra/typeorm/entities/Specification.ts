import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

@Entity("specifications")
class Specification {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;

    constructor(name: string, description: string) {
        if (!this.id) {
            this.id = uuidv4();
        }
        Object.assign(this, {
            name,
            description
        });
    }
}

export { Specification }
