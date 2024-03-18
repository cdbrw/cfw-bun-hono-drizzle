import { Hono } from 'hono';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/d1';

import { posts } from './db/schema';

export type Env = {
  DB: D1Database;
};

const api = new Hono<{ Bindings: Env }>();
api
  .get('/posts', async (c) => {
    const db = drizzle(c.env.DB);
    const result = await db.select().from(posts).all();
    return c.json(result);
  })
  .get('/posts/:id', async (c) => {
    const db = drizzle(c.env.DB);
    const id = Number(c.req.param('id'));
    const result = await db.select().from(posts).where(eq(posts.id, id));
    return c.json(result);
  })
  .post('/posts', async (c) => {
    const db = drizzle(c.env.DB);
    const { title, content } = await c.req.json();
    const result = await db
      .insert(posts)
      .values({ title, content })
      .returning();
    return c.json(result);
  });

const app = new Hono();
app.route('/api', api);

export default app;
