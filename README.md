### Development

1. Install dependencies

```
bun install
```

2. Generate database migrations

```
bun run db:generate
```

3. Create the D1 Database

```
bunx wrangler d1 create cfw-bun-hono-drizzle-d1
```

4. Add D1 database credentials to wrangler.toml
5. Run the local SQLite database

```
bun run db:up
```

6. Apply migrations to local database

```
bunx wrangler d1 execute cfw-bun-hono-drizzle-d1 --local --file=./drizzle/migrations/<migration file name here>
```

7. Start development server

```
bun run dev
```

### Production

1. Apply migrations to D1 database on Cloudflare

```
bunx wrangler d1 execute cfw-bun-hono-drizzle-d1 --remote --file=./drizzle/migrations/<migration file name here>
```

2. Deploy the application

```
bun run deploy
```
