import { DrizzleD1Database } from 'drizzle-orm/d1';
import { InsertPost, SelectPost, posts } from '../db/schema';

export async function getPosts(db: DrizzleD1Database): Promise<SelectPost[]> {
  return await db.select().from(posts);
}

export async function insertPost(
  db: DrizzleD1Database,
  data: InsertPost
): Promise<SelectPost[]> {
  return await db.insert(posts).values(data).returning();
}
