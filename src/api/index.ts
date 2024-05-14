import { Hono } from 'hono';

import posts from './posts';
import auth from './auth';

const api = new Hono();
api.route('/posts', posts);
api.route('/auth', auth);

export default api;
