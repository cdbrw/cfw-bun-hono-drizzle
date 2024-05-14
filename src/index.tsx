import { Hono } from 'hono';
import { csrf } from 'hono/csrf';
import { drizzle } from 'drizzle-orm/d1';

import api from './api';
import { Bindings, Variables } from './bindings';
import { authMiddleware } from './middleware';
import { getPosts } from './functions/posts';

import Home from './pages/Home';
import Posts from './pages/Posts';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';

const app = new Hono<{ Bindings: Bindings; Variables: Variables }>();

app.use(csrf());
app.use('*', authMiddleware);

app.route('/api', api);

app.get('/', async (c) => {
  const user = c.get('user');
  if (user) {
    return c.redirect('/posts');
  }

  return c.html(<Home />);
});

app.get('/posts', async (c) => {
  const user = c.get('user');
  if (!user) {
    return c.redirect('/');
  }

  const db = drizzle(c.env.DB);
  const results = await getPosts(db, user.id);

  return c.html(<Posts posts={results} />);
});

app.get('/login', async (c) => {
  const user = c.get('user');
  if (user) {
    return c.redirect('/posts');
  }

  return c.html(<LogIn />);
});

app.get('/signup', async (c) => {
  const user = c.get('user');
  if (user) {
    return c.redirect('/posts');
  }

  return c.html(<SignUp />);
});

export default app;
