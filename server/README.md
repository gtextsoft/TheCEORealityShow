# KeystoDCity Reality Show – Backend

Node.js + Express + MongoDB + Cloudinary. Handles application submissions and admin auth.

## Setup

1. **Install dependencies**
   ```bash
   cd server && npm install
   ```

2. **Environment**
   - Copy `.env.example` to `.env`
   - Set:
     - `MONGODB_URI` – MongoDB connection string (e.g. `mongodb://localhost:27017/ceo-reality-show` or Atlas URI)
     - `JWT_SECRET` – Strong random string for admin JWT
     - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` – from [Cloudinary](https://cloudinary.com) (video uploads)
     - `ADMIN_EMAIL`, `ADMIN_PASSWORD` – used to create the first admin (see step 3)

3. **Create admin user**
   ```bash
   npm run seed-admin
   ```
   Uses `ADMIN_EMAIL` and `ADMIN_PASSWORD` from `.env`. Log in at `/admin/login` with these credentials.

4. **Run**
   ```bash
   npm run dev
   ```
   Server runs at `http://localhost:3001`.

## API

- `POST /api/applications` – Submit application (multipart: form fields + `video` file). No auth.
- `POST /api/admin/login` – Body: `{ "email", "password" }`. Returns `{ "token" }`.
- `GET /api/admin/applications` – List all applications. Header: `Authorization: Bearer <token>`.

Frontend admin: `/admin` (dashboard), `/admin/login`. Use the token from login for the dashboard.

**Production:** Set `VITE_API_URL` in the frontend build to your backend URL (e.g. `https://api.yoursite.com`) so form submissions and admin API calls hit the right server.
