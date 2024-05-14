import { z } from 'zod';
import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { drizzle } from 'drizzle-orm/d1';

import { Bindings, Variables } from '../bindings';
import { SelectPost } from '../db/schema';
import { getPosts, insertPost } from '../functions/posts';

import PostsList from '../components/PostsList';
import Post from '../components/Post';

const postsRouter = new Hono<{ Bindings: Bindings; Variables: Variables }>();

postsRouter.get('/', async (c) => {
  const user = c.get('user');
  if (!user) {
    return c.html(<></>);
  }

  const db = drizzle(c.env.DB);

  const results: SelectPost[] = await getPosts(db, user.id);

  return c.html(<PostsList posts={results} />);
});

postsRouter.post(
  '/',
  zValidator(
    'form',
    z.object({
      title: z.string().min(1).max(255),
      content: z.string().min(1).max(999),
    })
  ),
  async (c) => {
    const user = c.get('user');
    if (!user) {
      return c.json({ error: 'User not found' }, 404);
    }

    const db = drizzle(c.env.DB);
    const { title, content } = c.req.valid('form');
    console.log('data:', { title, content });

    const post = await insertPost(db, { title, content, authorId: user.id });
    if (!post) {
      return c.html(<></>);
    }

    return c.html(<Post post={post} />);
  }
);

export default postsRouter;
