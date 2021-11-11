import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateBalanceStock1636654664154 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable( new Table({
        name: 'balanceStock',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            generationStrategy: "uuid"
          },
          {
            name: 'product_id',
            type: "varchar",
            generationStrategy: "uuid",
            isNullable: false,
          },
          {
            name: 'amount',
            type: "int",
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
              name: 'created_at',
              type: 'timestamp',
              default: 'now()'
          }
          
       
        ],
        foreignKeys: [
          {
              name: 'FKProductt',
              referencedTableName: 'products',
              referencedColumnNames: ['id'],
              columnNames: ['product_id'],
          },
      ]
      }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
              await queryRunner.dropTable('balanceStock')
    }

}
