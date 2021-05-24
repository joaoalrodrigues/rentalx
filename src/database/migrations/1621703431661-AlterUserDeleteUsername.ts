import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterUserDeleteUsername1621703431661 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("Users", "username");       
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("Users",
            new TableColumn({
                name: "username",
                type: "varchar",
                isUnique: true
            })
        );
    }

}
