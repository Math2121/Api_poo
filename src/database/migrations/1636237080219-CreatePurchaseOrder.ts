import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreatePurchaseOrder1636237080219 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "purchase_order",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "product_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "provider_id",
            type: "uuid",
            isNullable: false,
          },
          {
            name: "amount",
            type: "int",
          },
          {
            name: "unit_value",
            type: "float",
          },
          {
            name: "purchase_date",
            type: "Date",
          },
        ],
        foreignKeys: [
          {
              name: 'FKProvider',
              referencedTableName:'provider',
              referencedColumnNames: ['id'],
              columnNames: ['provider_id'],
              onDelete:'CASCADE', //CASCADE
              onUpdate:'CASCADE', //CASCADE
          },
          {
              name: 'FKProduct',
              referencedTableName:'products',
              referencedColumnNames: ['id'],
              columnNames: ['product_id'],
              onDelete:'CASCADE', //CASCADE
              onUpdate:'CASCADE', //CASCADE
          },

      ]
      })
    );

    
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("purchase_order");

  }
}
