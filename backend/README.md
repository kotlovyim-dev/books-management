# Inforce Test Task - Backend

## Overview

NestJS API with JWT authentication, role-based authorization, and CRUD endpoints for users and books.

## Environment Variables

Set these in `.env`:

- `DATABASE_URL` - Hosted Postgres connection string
- `JWT_SECRET` - Secret used to sign access tokens
- `JWT_EXPIRES_IN` - Token expiration in seconds (e.g. `86400`)
- `PORT` - Port to run the API (default: `3000`)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Generate Prisma client:

```bash
npx prisma generate
```

3. Start the API:

```bash
npm run start:dev
```

## Auth Routes

- `POST /signup`
- `POST /login`

Use the returned `accessToken` as a Bearer token for protected routes:

```
Authorization: Bearer <token>
```

## Users Routes (admin only)

- `GET /users`
- `POST /users`
- `GET /users/:id`
- `PUT /users/:id`
- `PATCH /users/:id`
- `DELETE /users/:id`

## Books Routes

Common user:

- `GET /books`
- `GET /books/:id`

Admin user:

- `POST /books`
- `PUT /books/:id`
- `PATCH /books/:id`
- `DELETE /books/:id`
