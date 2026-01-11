# Deploy Notes (Vercel) / 배포 기록

## 1) Overview
This project is deployed on Vercel.  
Unlike a pure frontend build (e.g., Vite), Next.js runs a strict `next build` that type-checks **Route Handlers** (API routes) as well.

---

## 2) Issue: Vercel build failed (Type error in Route Handler)
### Error
Type error: Type 'typeof import(".../route")' does not satisfy the constraint ...
Types of property 'PATCH' are incompatible.
...
context: { params: Promise<{ id: string; }> }

### Root cause (summary)
In `app/api/logs/[id]/route.ts`, the Route Handler signature expected `params` as an object:
- `{ params: { id: string } }`

But the build expected `params` as a Promise:
- `{ params: Promise<{ id: string }> }`

So TypeScript failed at build time.

---

## 3) Fix
Updated the Route Handler signature to match the expected type and awaited params.

### Example (PATCH / DELETE)

```ts
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  // update logic...
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  // delete logic...
  return NextResponse.json({ ok: true });
}
```

---

4) Verification
Ran npm run build locally to confirm the build passes.

Re-deployed on Vercel and confirmed successful deployment.

### 日本語メモ（要点）
Next.jsはVercelで next build が走るため、API(Route Handler)の型チェックが厳しい。

app/api/logs/[id]/route.ts の params が Promise として扱われる型と衝突してビルドが落ちた。

params: Promise<{ id: string }> に合わせて await params で取り出す形に修正し、ビルド成功。

### 한국어 메모(요점)
Next.js는 Vercel에서 next build 단계에서 Route Handler(API)의 타입 체크가 엄격하게 수행된다.

app/api/logs/[id]/route.ts에서 params 타입이 { id }로 고정돼 있었는데, 빌드 환경에서는 Promise<{ id }>로 기대하는 타입과 충돌했다.

params: Promise<{ id: string }>로 맞추고 await params로 꺼내는 형태로 수정하니 빌드/배포가 성공했다.