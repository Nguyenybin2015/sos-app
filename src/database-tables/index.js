import { db } from '../configs/configs.db.js';
import {
  userTable,
  bankTable,
  profileTable,
  userBank,
} from '../constants/constants.name-table.js';
import { gender, userRoles } from '../constants/constant.js';

export default function initSchemaTables() {
  db.schema.hasTable(userTable).then((exists) => {
    if (!exists) {
      return db.schema.createTable(userTable, (table) => {
        table.uuid('id').primary().defaultTo(db.raw('(UUID())'));
        table.string('name', 250).notNullable();
        table.string('email', 250).notNullable();
        table.string('password', 500).notNullable();
        table.string('role', 50).defaultTo(userRoles.USER);
        table.timestamp('created_at').notNullable().defaultTo(db.raw('now()'));
        table.timestamp('updated_at').notNullable().defaultTo(db.raw('now()'));
      });
    }
  });

  db.schema.hasTable(bankTable).then((exists) => {
    if (!exists) {
      return db.schema.createTable(bankTable, (table) => {
        table.uuid('id').primary().defaultTo(db.raw('(UUID())'));
        table.string('english_name', 500).notNullable();
        table.string('vietnamese_name', 500).notNullable();
        table.string('description', 500).nullable();
        table.string('location', 500).nullable();
        table.string('short_name', 50).notNullable();
        table.string('icon', 500).nullable();
        table.timestamp('created_at').notNullable().defaultTo(db.raw('now()'));
        table.timestamp('updated_at').notNullable().defaultTo(db.raw('now()'));
      });
    }
  });

  db.schema.hasTable(profileTable).then((exists) => {
    if (!exists) {
      return db.schema.createTable(profileTable, (table) => {
        table.uuid('id').primary().defaultTo(db.raw('(UUID())'));
        table.string('avatar', 250).nullable();
        table.string('gender', 250).defaultTo(gender.MALE);
        table.string('address', 500).defaultTo(null);
        table.string('phone', 250).defaultTo(null);
        table.dateTime('birth_date').defaultTo(null);
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
        table.string('number_card', 100).notNullable();
        table.dateTime('account_opening_date').nullable();
        table.dateTime('expiration_date').nullable();
        table.string('name_account', 250).notNullable();
        table.string('password', 500).notNullable();
        table.string('number_id', 100).notNullable(); // Can cuoc cong dan
        table
          .uuid('user_id')
          .references('id')
          .inTable(userTable)
          .notNullable()
          .onDelete('cascade');
        table
          .uuid('bank_id')
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
