import { z } from 'zod';
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { drizzle } from 'drizzle-orm/d1';

import { Env } from '../bindings';
import { SelectPost } from '../db/schema';
import { getPosts, insertPost } from '../functions/posts';

import PostsList from '../components/PostsList';
import Post from '../components/Post';

const postsRouter = new Hono<{ Bindings: Env }>();

postsRouter.get('/', async (c) => {
  const db = drizzle(c.env.DB);

  const results: SelectPost[] = await getPosts(db);

  return c.html(<PostsList posts={results} />);
});

postsRouter.post(
  '/',
  zValidator(
    'json',
    z.object({
      title: z.string().min(5).max(255),
      content: z.string().min(10).max(255),
    })
  ),
  async (c) => {
    const db = drizzle(c.env.DB);
    const { title, content } = c.req.valid('json');

    const results = await insertPost(db, { title, content });

    if (results.length === 0) {
      return c.html(<></>);
    }

    return c.html(<Post post={results[0]} />);
  }
);

export default postsRouter;
