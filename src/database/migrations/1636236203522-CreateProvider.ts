import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProvider1636236203522 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "provider",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "provider_name",
            type: "varchar",
          },
          {
            name: "email",
            type: "varchar",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("provider");
  }
}
