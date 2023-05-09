import { db } from '../configs/configs.db.js';
import * as constantsNameTableJs from '../constants/constants.name-table.js';
import { userRoles } from '../constants/constant.js';

export default function initSchemaTables() {
  db.schema.hasTable(constantsNameTableJs.userTable).then((exists) => {
    if (!exists) {
      return db.schema.createTable(constantsNameTableJs.userTable, (table) => {
        table.uuid('id').primary().defaultTo(db.raw('(UUID())'));
        table.string('name', 250);
        table.string('email', 250);
        table.string('password', 500);
        table.string('role', 50).defaultTo(userRoles.USER);
        table.boolean('maintenance').defaultTo(0);
        table.boolean('close_system').defaultTo(0);
        table.timestamp('created_at').notNullable().defaultTo(db.raw('now()'));
        table.timestamp('updated_at').notNullable().defaultTo(db.raw('now()'));
      });
    }
  });

  db.schema.hasTable(constantsNameTableJs.bankTable).then((exists) => {
    if (!exists) {
      return db.schema.createTable(constantsNameTableJs.bankTable, (table) => {
        table.uuid('id').primary().defaultTo(db.raw('(UUID())'));
        table.string('english_name', 500);
        table.string('vietnamese_name', 500);
        table.string('description', 500);
        table.string('location', 500);
        table.string('short_name', 50);
        table.string('icon', 500);
        table.timestamp('created_at').notNullable().defaultTo(db.raw('now()'));
        table.timestamp('updated_at').notNullable().defaultTo(db.raw('now()'));
      });
    }
  });

  db.schema.hasTable(constantsNameTableJs.profileTable).then((exists) => {
    if (!exists) {
      return db.schema.createTable(
        constantsNameTableJs.profileTable,
        (table) => {
          table.uuid('id').primary().defaultTo(db.raw('(UUID())'));
          table.string('avatar', 250);
          table.string('gender', 250);
          table.string('address', 500);
          table
            .uuid('userId')
            .references('id')
            .inTable(constantsNameTableJs.userTable)
            .notNullable()
            .onDelete('cascade');
          table
            .timestamp('created_at')
            .notNullable()
            .defaultTo(db.raw('now()'));
          table
            .timestamp('updated_at')
            .notNullable()
            .defaultTo(db.raw('now()'));
        }
      );
    }
  });

  db.schema.hasTable(constantsNameTableJs.userBank).then((exists) => {
    if (!exists) {
      return db.schema.createTable(constantsNameTableJs.userBank, (table) => {
        table.uuid('id').primary().defaultTo(db.raw('(UUID())'));
        table.string('number_card', 50);
        // table.string('password', 250);
        table.boolean('lock_deposits').notNullable().defaultTo(0);
        table.boolean('lock_withdrawals').notNullable().defaultTo(0);
        table.dateTime('account_opening_date');
        table.dateTime('expiration_date');
        table
          .uuid('userId')
          .references('id')
          .inTable(constantsNameTableJs.userTable)
          .notNullable()
          .onDelete('cascade');
        table
          .uuid('bankId')
          .references('id')
          .inTable(constantsNameTableJs.bankTable)
          .notNullable()
          .onDelete('cascade');
        table.timestamp('created_at').notNullable().defaultTo(db.raw('now()'));
        table.timestamp('updated_at').notNullable().defaultTo(db.raw('now()'));
      });
    }
  });
  // p to  p table
  db.schema.hasTable(constantsNameTableJs.p2p).then((exists) => {
    if (!exists) {
      return db.schema.createTable(constantsNameTableJs.p2p, (table) => {
        table.uuid('id').primary().defaultTo(db.raw('(UUID())'));
        table
          .uuid('id_user_bank')
          .references('id')
          .inTable(constantsNameTableJs.userBank)
          .notNullable()
          .onDelete('cascade');
        // table
        //   .uuid('locked_by_user')
        //   .references('userId')
        //   .inTable(constantsNameTableJs.userBank)
        //   .notNullable()
        //   .onDelete('cascade');
        table
          .uuid('user_locked_id')
          .references('id')
          .inTable(constantsNameTableJs.userTable)
          .notNullable()
          .onDelete('cascade');
        // table
        //   .uuid('bank_id')
        //   .references('bankId')
        //   .inTable(constantsNameTableJs.userBank)
        //   .notNullable()
        //   .onDelete('cascade');
        table.boolean('block').notNullable().defaultTo(0);
        table.timestamp('created_at').notNullable().defaultTo(db.raw('now()'));
        table.timestamp('updated_at').notNullable().defaultTo(db.raw('now()'));
      });
    }
  });
}
