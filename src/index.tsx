import { Hono } from 'hono';
import { drizzle } from 'drizzle-orm/d1';

import { Env } from './bindings';
import api from './api';

import Home from './pages/Home';
import { getPosts } from './functions/posts';

const app = new Hono<{ Bindings: Env }>();
app.route('/api', api);

app.get('/', async (c) => {
  const db = drizzle(c.env.DB);
  const results = await getPosts(db);
  return c.html(<Home posts={results} />);
});

export default app;
