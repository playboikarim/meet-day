import { sqliteTable, text } from 'drizzle-orm/sqlite-core';
export const rooms=sqliteTable('rooms',{id:text('id').primaryKey(),title:text('title').notNull()});
export const people=sqliteTable('people',{id:text('id').primaryKey(),room:text('room').notNull(),name:text('name').notNull(),token:text('token').notNull(),dates:text('dates').notNull().default('[]')});
