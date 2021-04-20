import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'

export class AlterUsersAddPKToId1617909342654 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'users',
      'id',
      new TableColumn({
        name: 'id',
        type: 'uuid',
        isUnique: true,
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'users',
      'id',
      new TableColumn({
        name: 'id',
        type: 'uuid',
      })
    )
  }
}
