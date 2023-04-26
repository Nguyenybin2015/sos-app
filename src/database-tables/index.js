import { db } from '../configs/configs.db.js';
import {
  userTable,
  bankTable,
  profileTable,
  userBank,
} from '../constants/constants.name-table.js';

export default function initSchemaTables() {
  db.schema.hasTable(userTable).then((exists) => {
    if (!exists) {
      return db.schema.createTable(userTable, (table) => {
        table.uuid('id').primary().defaultTo(db.raw('(UUID())'));
        table.string('name', 250);
        table.string('email', 250);
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
        table.string('short_name', 50);
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

  db.schema.hasTable(userBank).then((exists) => {
    if (!exists) {
      return db.schema.createTable(userBank, (table) => {
        table.uuid('id').primary().defaultTo(db.raw('(UUID())'));
        table.string('number_card', 50);
        table.dateTime('account_opening_date');
        table.dateTime('expiration_date');
        table
          .uuid('userId')
          .references('id')
          .inTable(userTable)
          .notNullable()
          .onDelete('cascade');
        table
          .uuid('bankId')
          .references('id')
          .inTable(bankTable)
          .notNullable()
          .onDelete('cascade');
        table.timestamp('created_at').notNullable().defaultTo(db.raw('now()'));
        table.timestamp('updated_at').notNullable().defaultTo(db.raw('now()'));
      });
    }
  });
}
