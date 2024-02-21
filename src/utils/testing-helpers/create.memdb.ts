import { ModelCtor, Sequelize } from 'sequelize-typescript';
import * as config from '../../../config/config.json';

const DbDevConfig = config.development;

export async function createMemDB(models: ModelCtor[]): Promise<Sequelize> {
  const memDb = new Sequelize({
    ...DbDevConfig,
    dialect: 'postgres',
    storage: ':memory:',
    logging: false,
  });
  memDb.addModels(models);

  // Creates the database structure
  await memDb.sync();

  return memDb;
}
