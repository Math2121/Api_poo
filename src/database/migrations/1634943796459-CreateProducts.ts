import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProducts1634943796459 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table ({
                name:"products",
                columns: [
                    {
                        name:"id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "name",
                        type: "varchar"
                    },
                    {
                        name: "unity",
                        type: "varchar"
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('products')
    }

}
