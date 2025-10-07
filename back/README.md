# VerdeMar API

Node/Express API with JWT auth and role-based access (ADMIN/USER) plus properties CRUD. Persistence uses Prisma + SQLite (file).

## Setup

1) Copy `.env.example` to `.env` and adjust values if needed. Add:

```
DATABASE_URL="file:./dev.db"
```

2) Install deps and generate/migrate Prisma:

```
npm install
npm run prisma:generate
npm run prisma:migrate
npm run dev
```

The API will start on port 4000 by default.

## Env vars

- JWT_SECRET: secret for JWT signing (required)
- ADMIN_EMAIL: initial admin email (default admin@verdemar.com)
- ADMIN_PASSWORD: initial admin password (default admin123)
- PORT: HTTP port (default 4000)
- ALLOWED_ORIGIN: CORS origin for the front (default http://localhost:5173)

On startup, if the admin user does not exist, it will be created automatically.

## Endpoints

Auth
- POST /api/auth/register { name, email, password }
- POST /api/auth/login { email, password }
- GET  /api/auth/me (Bearer token)

Properties
- GET    /api/properties?search=&city=&country=&minPrice=&maxPrice=&limit=&offset=&published=
- GET    /api/properties/:id
- POST   /api/properties (ADMIN) body: Property
- PUT    /api/properties/:id (ADMIN) body: Property
- PATCH  /api/properties/:id/publish (ADMIN) { published: boolean }
- DELETE /api/properties/:id (ADMIN)

Property shape
```
{
  title, description, price, currency: 'BRL', city, country,
  area, beds, baths, guests, rating, reviews, images: string[], published
}
```

Validation uses express-validator and returns 400 with an `errors` array when invalid.

## Data store (SQLite)

Database file is `back/prisma/dev.db` (by default from DATABASE_URL). To inspect data:

```
npm run prisma:studio
```

This opens Prisma Studio in the browser where you can view/edit Users and Properties.
