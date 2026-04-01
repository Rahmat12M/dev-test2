import { Sequelize } from "sequelize";
import { setRelations } from '@/db/relations';

const { DB_USER, DB_PWD, DB_HOST, DB_PORT, DB_DB } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PWD}@${DB_HOST}:${DB_PORT}/${DB_DB}`);

/**
 * 
 */
export async function initDb() {
  await sequelize.authenticate();
  setRelations();
  await sequelize.sync();
}

export default sequelize;