# Ariyan Portfolio Backend

NestJS + MySQL API for the portfolio CMS.

## Stack

- NestJS 11
- MySQL (cPanel / MariaDB compatible)
- TypeORM
- JWT Auth

## Quick Start (Local)

```bash
cp .env.example .env
# Set DB_PASSWORD in .env

npm install
npm run start:dev
```

API: **http://localhost:3002/api**

## Production Environment

```env
NODE_ENV=production
DB_TYPE=mysql
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=shaarian_db
DB_USERNAME=shaarian_api_user
DB_PASSWORD=your_password_here

DB_SYNCHRONIZE=false

JWT_SECRET=your-strong-secret
JWT_EXPIRES_IN=7d

ADMIN_USERNAME=arian
ADMIN_PASSWORD=123456

API_URL=https://api.shaarian.com
FRONTEND_URL=https://creative.shaarian.com
CORS_ORIGINS=https://creative.shaarian.com
```

## Auth

```
POST /api/auth/login
Content-Type: application/json

{
  "username": "arian",
  "password": "123456"
}
```

Response:

```json
{
  "success": true,
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

## Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/content` | Full site content |
| GET | `/api/content/:section` | Single section |
| GET | `/api/projects` | All projects |
| GET | `/api/projects/:slug` | Project by slug |
| GET | `/api/blog` | All blog posts |
| GET | `/api/blog/:slug` | Blog post by slug |

## Protected Endpoints (Bearer JWT)

| Method | Endpoint | Description |
|--------|----------|-------------|
| PUT | `/api/content` | Update section `{ section, data }` |
| POST | `/api/content` | Reset `{ action: "reset" }` |

## Database Notes

- **synchronize** is `false` in production by default (safe — no auto drop/alter).
- For **first deploy** on an empty database, set `DB_SYNCHRONIZE=true` once, start the app to create tables, then set it back to `false`.
- No migration files exist yet; existing tables are never dropped when `synchronize` is false.

## Seed

```bash
npm run seed
```

Seeds admin user (`arian`) and content from `data/content.json` if empty.

## cPanel Deployment (api.shaarian.com)

1. Upload backend files to cPanel Node.js app directory.
2. In cPanel → **Setup Node.js App**:
   - Node version: 18+ or 20+
   - Application root: your backend folder
   - Application URL: `api.shaarian.com`
   - Application startup file: `dist/main.js`
3. Set environment variables in cPanel (same as production `.env`).
4. SSH or Terminal:

```bash
npm install --production=false
npm run build
npm run seed
```

5. Restart the Node.js application in cPanel.
6. Verify: `GET https://api.shaarian.com/api/health`

## Build Commands

```bash
npm run build      # compiles to dist/
npm run start:prod # runs dist/main.js
```
