import { z } from 'zod';
import { Hono } from 'hono';
import { Scrypt } from 'lucia';
import { drizzle } from 'drizzle-orm/d1';
import { zValidator } from '@hono/zod-validator';

import { Bindings, Variables } from '../bindings';
import { getUser, insertUser } from '../functions/users';
import { initializeLucia } from '../db/lucia';

const authRouter = new Hono<{ Bindings: Bindings; Variables: Variables }>();

authRouter.post(
  '/login',
  zValidator(
    'form',
    z.object({
      email: z.string().min(1).email(),
      password: z.string().min(1).max(255),
    })
  ),
  async (c) => {
    const { email, password } = await c.req.valid('form');
    const db = drizzle(c.env.DB);

    const user = await getUser(db, email);
    if (!user) {
      return c.json({ error: 'Invalid email or password.' }, 400);
    }

    const validPassword = await new Scrypt().verify(user.password, password);
    if (!validPassword) {
      return c.json({ error: 'Invalid email or password.' }, 400);
    }

    const lucia = initializeLucia(c.env.DB);
    const session = await lucia.createSession(user.id, {});
    const cookie = lucia.createSessionCookie(session.id);

    c.header('Set-Cookie', cookie.serialize(), { append: true });

    return c.redirect('/posts');
  }
);

authRouter.post(
  '/signup',
  zValidator(
    'form',
    z.object({
      email: z.string().min(1).email(),
      password: z.string().min(1).max(255),
    })
  ),
  async (c) => {
    const { email, password } = await c.req.valid('form');
    const db = drizzle(c.env.DB);

    const existingUser = await getUser(db, email);
    if (existingUser) {
      return c.json({ error: 'User with that email already exists.' }, 400);
    }

    const passwordHash = await new Scrypt().hash(password);

    const user = await insertUser(db, {
      email,
      password: passwordHash,
    });
    if (!user) {
      return c.json({ error: 'An error occurred during sign up.' }, 500);
    }

    const lucia = initializeLucia(c.env.DB);
    const session = await lucia.createSession(user.id, {});
    const cookie = lucia.createSessionCookie(session.id);

    c.header('Set-Cookie', cookie.serialize(), { append: true });

    return c.redirect('/posts');
  }
);

authRouter.post('/logout', async (c) => {
  const lucia = initializeLucia(c.env.DB);
  const session = c.get('session');
  if (session) {
    await lucia.invalidateSession(session.id);
  }

  const cookie = lucia.createBlankSessionCookie();

  c.header('Set-Cookie', cookie.serialize(), { append: true });

  return c.redirect('/');
});

export default authRouter;
