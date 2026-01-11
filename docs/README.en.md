# Study Log (Next.js + MongoDB)

This project is an upgraded version of my Vanilla JS(LocalStorage) CRUD study log.  
I migrated it to **Next.js + MongoDB** to make it a real multi-device app that can be used anywhere.

**Languages:** [日本語](README.md) | [한국어](README.ko.md) | English

---

## ✅ Key Features
- ✅ CRUD (Create / Read / Update / Delete)
- ✅ Category(tag) filter + Search (substring match)
- ✅ MongoDB persistence (solves device-dependent LocalStorage limitation)
- ✅ JSON Import (LocalStorage Export → DB Import)
- ✅ Next.js Route Handlers API (`app/api/.../route.ts`)
- ✅ Deployment on Vercel (strict build + type-check)

---

## 🎯 Why Next.js + MongoDB?
The original Vanilla JS version using LocalStorage was great for learning, but had limitations:

- ❌ device-dependent (data is not shared across devices)
- ❌ no sync (not suitable for multi-device usage)
- ❌ hard to scale when logs grow

So I expanded it into a more production-like structure with:

- Next.js (UI + API in one project)
- MongoDB (persistent storage)
- Vercel (real deployment environment)

---

## 🧩 Architecture
### 1) Responsibility split
- UI: form input + list rendering
- API: `/api/logs` CRUD endpoints
- DB: MongoDB persistence

### 2) Keep the original design philosophy
I kept the same architecture principle from the Vanilla JS version:

✅ **Calculate first → Render later**

- filtering/search logic decides what should be shown
- UI renders based on the computed result

This structure stays maintainable as features grow.

---

## 🔌 API (Route Handlers)
### Example endpoints
- `GET    /api/logs`      : fetch logs
- `POST   /api/logs`      : create log
- `PATCH  /api/logs/[id]` : update log
- `DELETE /api/logs/[id]` : delete log

---

## 🔐 Env / Security
MongoDB credentials are stored in `.env.local` and not committed to GitHub.

Example:
```env
MONGODB_URI="mongodb+srv://***"
MONGODB_DB="study"
```
🚀 Deployment (Vercel) - Build Error Note
Next.js runs next build during Vercel deployment, which includes strict type-checking for Route Handlers.

I faced a deployment failure due to a TypeScript type mismatch in params for:

app/api/logs/[id]/route.ts

Root cause
the handler expected params as a plain object

but the build environment expected params as a Promise

Fix
updated handler signature to:

{ params: Promise<{ id: string }> }

extracted the id with await params

verified with npm run build, then re-deployed successfully

👉 More details in: docs/deploy-notes.md

🧳 Migration (LocalStorage → MongoDB)
I exported logs from the LocalStorage-based version into a JSON file,
then imported them into MongoDB via the Next.js API.

Flow:

JSON export from Vanilla JS version

JSON import in Next.js version → MongoDB

👉 More details in: docs/migration-notes.md

🚀 Demo
(Add URL here)

📌 Links
Vanilla JS version (original): (Add repo link)

Next.js + MongoDB version: (This repo)

✅ What I learned
Next.js Route Handlers and strict type checks during builds

MongoDB connection and secure env variable management

Data migration (LocalStorage → MongoDB)

Debugging and fixing deployment issues on Vercel

Author
GitHub: https://github.com/kieeler123