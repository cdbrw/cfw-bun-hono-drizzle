import { sql } from 'drizzle-orm';
import { generateId } from 'lucia';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const posts = sqliteTable('posts', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  authorId: text('author_id')
    .notNull()
    .references(() => users.id),
  title: text('title', { length: 256 }).notNull(),
  content: text('content', { length: 1000 }).notNull(),
  createdAt: text('created_at')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export type InsertPost = typeof posts.$inferInsert;
export type SelectPost = typeof posts.$inferSelect;

export const users = sqliteTable('users', {
  id: text('id')
    .primaryKey()
    .notNull()
    .$defaultFn(() => generateId(15)),
  email: text('email').notNull().unique(),
  password: text('password').notNull(),
});

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

export const sessions = sqliteTable('sessions', {
  id: text('id').primaryKey().notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  expiresAt: integer('expires_at').notNull(),
});
