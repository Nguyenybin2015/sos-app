import dotenv from 'dotenv';
import knex from 'knex';
dotenv.config();

export const db = knex({
  client: 'mysql',
  connection: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME
  },
  useNullAsDefault: true,
})

