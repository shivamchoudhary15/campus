# Campus Safety API

Node.js + Express backend with **MongoDB**, **JWT**, and **bcrypt**.

## Setup

1. **MongoDB** – Install and run MongoDB locally, or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and set `MONGODB_URI`.

2. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Environment**
   ```bash
   cp .env.example .env
   # Edit .env: set PORT, MONGODB_URI, JWT_SECRET
   ```

4. **Seed alerts and incidents (optional)**
   ```bash
   npm run seed
   ```

5. **Run**
   ```bash
   npm run dev   # development with --watch
   # or
   npm start     # production
   ```

API base URL: `http://localhost:3001` (or your `PORT`).

## Frontend

In the project root, create `.env` with:
```env
VITE_API_URL=http://localhost:3001
```
Then run the frontend: `npm run dev` from the project root.

## API

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/auth/register` | No | Register (email, password, name?) |
| POST | `/api/auth/login` | No | Login (email, password) → `{ user, token }` |
| GET | `/api/auth/me` | Yes | Current user |
| GET | `/api/users/me` | Yes | Profile (emergencyInfo, primaryContactId) |
| PATCH | `/api/users/me` | Yes | Update emergencyInfo, primaryContactId |
| GET | `/api/contacts/trusted` | Yes | List trusted contacts |
| POST | `/api/contacts/trusted` | Yes | Add (name, phone) |
| PATCH | `/api/contacts/trusted/:id` | Yes | Update contact |
| DELETE | `/api/contacts/trusted/:id` | Yes | Delete contact |
| GET | `/api/alerts` | No | List active alerts |
| GET | `/api/incidents` | No | List recent incidents |
| POST | `/api/reports` | Yes | Submit report (type, location?, description) |
| GET | `/api/reports` | Yes | User's reports |

Auth: send header `Authorization: Bearer <token>`.
