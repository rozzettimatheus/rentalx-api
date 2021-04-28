import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm'

export class CreateSpecificationsCars1619018802320
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // tabela many to many
    // so faz sentido a tabela se existir uma especificacao e um carro
    // esquece id por enquanto
    await queryRunner.createTable(
      new Table({
        name: 'specifications_cars',
        columns: [
          {
            name: 'car_id',
            type: 'uuid',
          },
          {
            name: 'specification_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      })
    )

    await queryRunner.createForeignKeys('specifications_cars', [
      new TableForeignKey({
        name: 'FKSpecificationCar',
        referencedTableName: 'specifications',
        columnNames: ['specification_id'],
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      }),
      new TableForeignKey({
        name: 'FKCarSpecification',
        referencedTableName: 'cars',
        columnNames: ['car_id'],
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      }),
    ])
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'specifications_cars',
      'FKCarSpecification'
    )

    await queryRunner.dropForeignKey(
      'specifications_cars',
      'FKSpecificationCar'
    )

    await queryRunner.dropTable('specifications_cars')
  }
}
