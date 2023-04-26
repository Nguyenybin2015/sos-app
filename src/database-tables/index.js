import { db } from '../configs/configs.db.js';
import {
  userTable,
  bankTable,
  profileTable,
} from '../constants/constants.name-table.js';

export default function initSchemaTables() {
  db.schema.hasTable(userTable).then((exists) => {
    if (!exists) {
      return db.schema.createTable(userTable, (table) => {
        table.uuid('id').primary().defaultTo(db.raw('(UUID())'));
        table.string('name', 250);
        table.string('email', 250).unique();
        table.string('password', 500);
        table.timestamp('created_at').notNullable().defaultTo(db.raw('now()'));
        table.timestamp('updated_at').notNullable().defaultTo(db.raw('now()'));
      });
    }
  });

  db.schema.hasTable(bankTable).then((exists) => {
    if (!exists) {
      return db.schema.createTable(bankTable, (table) => {
        table.uuid('id').primary().defaultTo(db.raw('(UUID())'));
        table.string('name', 250);
        table.string('description', 500);
        table.string('location', 500);
        table.string('branch', 250);
        table.string('code', 50);
        table.string('icon', 500);
        table.timestamp('created_at').notNullable().defaultTo(db.raw('now()'));
        table.timestamp('updated_at').notNullable().defaultTo(db.raw('now()'));
      });
    }
  });

  db.schema.hasTable(profileTable).then((exists) => {
    if (!exists) {
      return db.schema.createTable(profileTable, (table) => {
        table.uuid('id').primary().defaultTo(db.raw('(UUID())'));
        table.string('avatar', 250);
        table.string('gender', 250);
        table.string('address', 500);
        table
          .uuid('userId')
          .references('id')
          .inTable(userTable)
          .notNullable()
          .onDelete('cascade');
        table.timestamp('created_at').notNullable().defaultTo(db.raw('now()'));
        table.timestamp('updated_at').notNullable().defaultTo(db.raw('now()'));
      });
    }
  });
}
