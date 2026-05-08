# Books Management

Full-stack application for managing a book catalog with role-based access control. Backend built with NestJS + Prisma + PostgreSQL; frontend built with Next.js + React + TanStack Query + shadcn/ui.

## Project Structure

```
book-management/
├── backend/                # NestJS API server
│   ├── prisma/
│   │   └── schema.prisma   # Database schema (User, Book models)
│   ├── src/
│   │   ├── common/         # Shared filters, guards, etc.
│   │   ├── modules/
│   │   │   ├── auth/       # JWT auth, login/signup, roles guard
│   │   │   ├── books/      # Books CRUD
│   │   │   ├── prisma/     # Prisma service wrapper
│   │   │   └── users/      # Users CRUD (admin-only)
│   │   ├── scripts/        # CLI scripts (create-admin)
│   │   └── main.ts         # Bootstrap, global prefix "api", CORS, validation
│   └── package.json
├── frontend/               # Next.js SPA
│   ├── src/
│   │   ├── app/
│   │   │   ├── (auth)/     # Login & signup pages (unauthenticated)
│   │   │   └── (app)/      # Books & users pages (authenticated)
│   │   ├── components/     # Shared UI components (shadcn/ui)
│   │   ├── features/
│   │   │   ├── auth/       # Auth API calls, schemas, components
│   │   │   ├── books/      # Books API calls, schemas, components
│   │   │   └── users/      # Users API calls, schemas, components
│   │   ├── hooks/          # Shared React hooks
│   │   └── lib/
│   │       ├── api.ts      # Base fetch wrapper with JWT & 401 handling
│   │       └── utils.ts    # Utility functions
│   └── package.json
└── README.md
```

## Prerequisites

- **Node.js** ≥ 18
- **PostgreSQL** ≥ 14 (running locally or via Docker)
- **npm** (comes with Node)

## Installing Dependencies

```bash
# Backend
cd backend
npm install

# Frontend (in a separate terminal)
cd frontend
npm install
```

## Environment Variables

### Backend (`backend/.env`)

| Variable | Description | Default |
|---|---|---|
| `DATABASE_URL` | PostgreSQL connection string | — (required) |
| `JWT_SECRET` | Secret key for signing JWT tokens | `dev-secret` |
| `JWT_EXPIRES_IN` | Token lifetime in seconds | `86400` (24h) |
| `PORT` | Server port | `3000` |
| `CORS_ORIGIN` | Comma-separated allowed origins | `*` |
| `ADMIN_NAME` | Admin user name (used by create-admin script) | — |
| `ADMIN_EMAIL` | Admin user email (used by create-admin script) | — |
| `ADMIN_PASSWORD` | Admin user password (used by create-admin script) | — |

Example `.env`:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/books_db
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=86400
PORT=3000
CORS_ORIGIN=http://localhost:4200
```

### Frontend

| Variable | Description | Default |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API base URL | `http://localhost:3000/api/` |

Create `frontend/.env.local` if you need to override:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/
```

## Database Setup

1. Create a PostgreSQL database:

```bash
createdb books_db
```

2. Set `DATABASE_URL` in `backend/.env` (see above).

3. Run Prisma migrations:

```bash
cd backend
npx prisma migrate dev
```

4. (Optional) Seed an admin user:

```bash
npm run create-admin -- --name=Admin --email=admin@example.com --password=secret123
```

Alternatively, set `ADMIN_NAME`, `ADMIN_EMAIL`, `ADMIN_PASSWORD` in `.env` and run:

```bash
npm run create-admin
```

## Running the Application

### Backend

```bash
cd backend
npm run start:dev    # Development (watch mode)
# or
npm run start:prod   # Production (requires prior npm run build)
```

The API starts at `http://localhost:3000/api/` (or the port set via `PORT`).

### Frontend

```bash
cd frontend
npm run dev          # Development server on http://localhost:4200
# or
npm run build && npm start  # Production build
```

## API Routes

All routes are prefixed with `/api`.

### Auth (`/api/auth`)

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/signup` | Public | Register a new user (role: `user`) |
| POST | `/api/auth/login` | Public | Login, returns `{ user, accessToken }` |
| GET | `/api/auth/me` | JWT | Get current user profile |

### Books (`/api/books`)

| Method | Route | Auth | Role | Description |
|---|---|---|---|---|
| GET | `/api/books` | JWT | any | List all books |
| GET | `/api/books/:id` | JWT | any | Get a single book |
| POST | `/api/books` | JWT | admin | Create a book |
| PUT | `/api/books/:id` | JWT | admin | Replace a book |
| PATCH | `/api/books/:id` | JWT | admin | Partially update a book |
| DELETE | `/api/books/:id` | JWT | admin | Delete a book |

### Users (`/api/users`)

| Method | Route | Auth | Role | Description |
|---|---|---|---|---|
| GET | `/api/users` | JWT | admin | List all users |
| GET | `/api/users/:id` | JWT | admin | Get a single user |
| POST | `/api/users` | JWT | admin | Create a user |
| PUT | `/api/users/:id` | JWT | admin | Replace a user |
| PATCH | `/api/users/:id` | JWT | admin | Partially update a user |
| DELETE | `/api/users/:id` | JWT | admin | Delete a user |

## Role-Based Access Rules

- **`user`** role (default on signup): Can read books and view their own profile. Cannot create, update, or delete books. Cannot access any user management endpoints.
- **`admin`** role: Full access — can manage books (create, update, delete) and users (all CRUD operations).

Access is enforced via:
- `JwtAuthGuard` — requires a valid JWT on all authenticated routes
- `RolesGuard` + `@Roles('admin')` decorator — restricts specific endpoints to the admin role

## Request / Response Examples

### Signup

```bash
curl -X POST http://localhost:3000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"secret123"}'
```

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"secret123"}'
```

Returns: `{ "user": { "name", "email", "role" }, "accessToken": "..." }`

### Access protected route

```bash
curl http://localhost:3000/api/books \
  -H "Authorization: Bearer <accessToken>"
```
