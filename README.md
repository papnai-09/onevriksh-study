# Onevriksh Study Platform

Modern coaching institute management platform for Onevriksh Study.

## Structure

- `frontend` - Next.js 15 frontend with public site, auth pages, student dashboard, and admin panel.
- `backend` - Express API with MongoDB models, JWT auth, Razorpay-ready payments, QR attendance, notices, tests, results, and AI demo endpoints.
- `shared` - Shared constants and settings.

## Run Locally

```bash
npm install
npm run dev
```

Frontend: `http://localhost:3000`
API: `http://localhost:5000/api/health`

Copy `.env.example` files in `frontend` and `backend` when connecting MongoDB and Razorpay.
