import type { User, Session } from 'lucia';

export type Bindings = {
  DB: D1Database;
};

export type Variables = {
  user: User | null;
  session: Session | null;
};
