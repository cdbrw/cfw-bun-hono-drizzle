import { Hono } from 'hono';

const app = new Hono();

app.get('/', (c) => {
  return c.text('Hello Hono!');
});

app.get('/codebrew', (c) => {
  return c.text('subscribe!');
});

export default app;
