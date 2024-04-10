import { Hono } from 'hono';

import posts from './posts';

const api = new Hono();
api.route('/posts', posts);

export default api;
