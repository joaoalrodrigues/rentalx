import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateRentals1622796208495 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "rentals",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "car_id",
                        type: "uuid"
                    },
                    {
                        name: "user_id",
                        type: "uuid"
                    },
                    {
                        name: "start_date",
                        type: "timestamp"
                    },
                    {
                        name: "end_date",
                        type: "timestamp"
                    },
                    {
                        name: "expected_return_date",
                        type: "timestamp"
                    },
                    {
                        name: "total",
                        type: "numeric"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            })
        );

        await queryRunner.createForeignKeys("rentals",
            [
                new TableForeignKey({
                    name: "FKCarRental",
                    referencedTableName: "cars",
                    referencedColumnNames: ["id"],
                    columnNames: ["car_id"],
                    onDelete: "SET NULL"
                }),
                new TableForeignKey({
                    name: "FKUserRental",
                    referencedTableName: "users",
                    referencedColumnNames: ["id"],
                    columnNames: ["user_id"],
                    onDelete: "SET NULL"
                }),
            ]
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey("rentals", "FKCarRental");
        await queryRunner.dropForeignKey("rentals", "FKUserRental");
        await queryRunner.dropTable("rentals");
    }

}
