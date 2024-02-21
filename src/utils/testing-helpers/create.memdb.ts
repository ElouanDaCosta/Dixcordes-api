import { ModelCtor, Sequelize } from 'sequelize-typescript';

export async function createMemDB(models: ModelCtor[]): Promise<Sequelize> {
  const memDb = new Sequelize({
    dialect: 'postgres',
    storage: ':memory:',
    logging: false,
  });
  memDb.addModels(models);

  // Creates the database structure
  await memDb.sync();

  return memDb;
}
