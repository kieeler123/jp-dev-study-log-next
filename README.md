# JP Dev Study Log (Next.js + MongoDB)

A minimal study-log web app built with **Next.js (App Router)** and **MongoDB**.
Started from a localStorage-based CRUD app and migrated the data to a DB-backed architecture.

---

## 🔗 Live Demo
- App: (YOUR_VERCEL_URL)
- API Example: (YOUR_VERCEL_URL)/api/logs

---

## ✅ Why this project
I originally built a study log as a simple CRUD app using **localStorage**.
As the logs grew, I needed:

- Access from any device
- Reliable persistence (DB)
- A scalable structure (API + server-side filtering)

So I migrated the project to **Next.js API Routes + MongoDB** and imported legacy logs via JSON.

---

## ⭐ Key Features
- CRUD study logs (Create / Read / Update / Delete)
- Filter by category + search by keyword
- JSON Import (localStorage → MongoDB migration)
- Stable server-side persistence (MongoDB)

---

## 🧠 What I learned (Practical debugging)
During development, I faced and resolved:

- **500 Internal Server Error** in Next.js API routes
- MongoDB SRV DNS issue (`querySrv EBADNAME`)
- Environment variable management (`.env.local`) and deployment considerations

---

## 🧩 Tech Stack
- Next.js (App Router)
- TypeScript
- TailwindCSS
- MongoDB Atlas
- Vercel Deploy

---

## 📌 Architecture Overview
Client → Next.js Route Handlers → MongoDB

Endpoints (simplified):
- `GET /api/logs`
- `POST /api/logs`
- `PATCH /api/logs/:id`
- `DELETE /api/logs/:id`
- `POST /api/import`

---

## 🖼️ Screenshots
| List / Search | Import |
|---|---|
| ![](public/screenshots/home.png) | ![](public/screenshots/import.png) |

---

## 📚 Docs
- Project Notes (JA/KR): `docs/project-notes-ja-ko.md`
- API Spec: `docs/api.md`
- Data Migration: `docs/data-migration.md`
- Troubleshooting: `docs/troubleshooting.md`

---

## 🚀 Run Locally

### 1) Install
```bash
npm install
