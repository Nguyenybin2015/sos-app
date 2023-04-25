import { db } from '../configs/configs.db.js';
import { userTable, bankTable, profileTable } from '../constants/constants.name-table.js';

export default function initSchemaTables() {
  db.schema.hasTable(userTable).then((exists) => {
    if (!exists) {
      return db.schema.createTable(userTable, (table) => {
        table.increments('id').primary();
        table.string('name', 250);
        table.string('email', 250);
        table.string('password', 500);
      });
    }
  });

  db.schema.hasTable(bankTable).then((exists) => {
    if (!exists) {
      return db.schema.createTable(bankTable, (table) => {
        table.increments('id').primary();
        table.string('name', 250);
        table.string('description', 500);
        table.string('location', 500);
        table.string('branch', 250);
        table.string('code', 50);
        table.string('icons', 500);
      });
    }
  });

  db.schema.hasTable(profileTable).then((exists) => {
    if (!exists) {
      return db.schema.createTable(profileTable, (table) => {
        table.increments('id').primary();
        table.string('avatar', 250);
        table.string('gender', 250);
        table.string('address', 500);
      });
    }
  });
}
