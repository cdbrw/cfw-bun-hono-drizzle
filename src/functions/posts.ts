import { DrizzleD1Database } from 'drizzle-orm/d1';
import { InsertPost, SelectPost, posts } from '../db/schema';
import { eq } from 'drizzle-orm';

export async function getPosts(
  db: DrizzleD1Database,
  userId: string
): Promise<SelectPost[]> {
  return await db.select().from(posts).where(eq(posts.authorId, userId));
}

export async function insertPost(
  db: DrizzleD1Database,
  data: InsertPost
): Promise<SelectPost | null> {
  const result = await db.insert(posts).values(data).returning();
  if (!result || result.length === 0) {
    return null;
  }

  return result[0];
}
