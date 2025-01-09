import { Sequelize } from '@sequelize/core';
import { PostgresDialect } from '@sequelize/postgres';
import dotenv from 'dotenv';
import WebAgent from '../models/WebAgent';
import CustomerDetails from '../models/CustomerDetails';

dotenv.config();

const dbConfig = {
  name: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  schema: process.env.DB_SCHEMA,
};

// Validate config
Object.entries(dbConfig).forEach(([key, value]) => {
  if (!value) {
    throw new Error(`Missing database config: ${key}`);
  }
});

const sequelize = new Sequelize({
  dialect: PostgresDialect,
  database: dbConfig.name,
  user: dbConfig.user,
  password: dbConfig.password,
  host: dbConfig.host,
  port: parseInt(dbConfig.port!, 10),
  clientMinMessages: 'notice',
  schema: dbConfig.schema,
  logging: (sql: string, timing?: number) => {
    if(!timing) {
      console.log(sql);
    } else {
      console.log(`${sql} (${timing}ms)`);
    }
  },
});

sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((error) => {
    console.error('Failed to synchronize database:', error);
  });

export default sequelize;
