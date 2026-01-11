# Study Log (Next.js + MongoDB) / 학습 로그 (Next.js + MongoDB)

Vanilla JS(LocalStorage)로 만든 CRUD 학습 로그를 기반으로,  
**Next.js + MongoDB**로 확장하여 **어느 기기에서든 기록/조회 가능한 학습 로그 앱**으로 마이그레이션한 프로젝트입니다.

**Languages:** [日本語](README.md) | 한국어 | [English](README.en.md)

---

## ✅ 주요 기능
- ✅ CRUD (추가 / 조회 / 수정 / 삭제)
- ✅ 카테고리(태그) 필터 / 검색(부분 일치)
- ✅ MongoDB 영속 저장 (LocalStorage의 기기 종속 문제 해결)
- ✅ JSON Import (LocalStorage Export → DB 업로드)
- ✅ Next.js Route Handlers 기반 API (`app/api/.../route.ts`)
- ✅ Vercel 배포 (빌드 & 타입 체크 통과)

---

## 🎯 왜 Next.js + MongoDB로 확장했는가?
Vanilla 버전(LocalStorage)은 학습에는 최적이지만, 아래 한계가 있었습니다.

- ❌ 기기 종속 (PC에서 입력하면 모바일에서 확인 불가)
- ❌ 사용자/기기 간 동기화 불가능
- ❌ 데이터가 쌓일수록 관리가 불편해짐

이 문제를 해결하고 **실제 서비스에 가까운 형태**로 확장하기 위해:

- Next.js (UI + 서버 API 통합)
- MongoDB (영속 저장)
- Vercel (실배포)

까지 포함한 구조로 개선했습니다.

---

## 🧩 설계(Architecture)
### 1) 역할 분리
- UI: 입력 폼 / 리스트 렌더링
- API: `/api/logs` 기반 CRUD
- DB: MongoDB에 영속 저장

### 2) “계산 → 렌더링” 분리 원칙 유지
Vanilla 버전에서 사용했던 설계 철학을 Next.js에서도 유지했습니다.

- “보여줄 데이터 계산” → 검색/필터 조건 적용
- “화면 렌더링” → 계산 결과를 기반으로 UI 업데이트

이 방식은 기능이 늘어나도 코드가 깨지지 않도록 하는 핵심 구조입니다.

---

## 🔌 API (Route Handlers)
### 예시 엔드포인트
- `GET    /api/logs`      : 로그 목록 조회
- `POST   /api/logs`      : 로그 추가
- `PATCH  /api/logs/[id]` : 로그 수정
- `DELETE /api/logs/[id]` : 로그 삭제

※ 실제 구현 스펙에 맞춰 세부 내용은 변경될 수 있습니다.

---

## 🔐 환경변수(.env) / 보안
MongoDB 접속 정보는 `.env.local`로 관리하며 GitHub에 업로드하지 않습니다.

예시:
```env
MONGODB_URI="mongodb+srv://***"
MONGODB_DB="study"
```
🚀 배포 (Vercel) - 빌드 에러 기록
Next.js는 Vercel에서 next build 단계가 실행되며,
이 과정에서 API(Route Handler)의 타입 체크가 매우 엄격하게 수행됩니다.

저는 배포 과정에서 **Route Handler의 params 타입 불일치(Type Error)**로 빌드가 실패한 경험이 있습니다.

문제 요약
app/api/logs/[id]/route.ts에서 params를 단순 객체로 가정했으나,

빌드 환경에서는 params가 Promise 형태로 기대되는 타입과 충돌

해결 요약
{ params: Promise<{ id: string }> }로 시그니처를 수정

await params를 통해 id를 추출하도록 변경

로컬에서 npm run build로 검증 후 Vercel 재배포

👉 자세한 내용은 docs/deploy-notes.md에 정리했습니다.

🧳 데이터 마이그레이션(LocalStorage → MongoDB)
기존 LocalStorage 데이터를 JSON으로 export 하고,
Next.js 프로젝트에서 import하여 MongoDB에 업로드하는 방식으로 이전했습니다.

흐름:

JSON export (기존 LocalStorage 버전)

JSON import (Next.js API를 통해 MongoDB 업로드)

👉 자세한 내용은 docs/migration-notes.md에 정리했습니다.

🚀 Demo
(여기에 URL 추가)

📌 Links
Vanilla JS 원본 버전 Repo: (링크 추가)

Next.js + MongoDB 버전 Repo: (이 Repo)

✅ 이 프로젝트로 얻은 것
Next.js Route Handler 구조 이해 및 타입 에러 해결 경험

MongoDB 연결 및 환경변수 보안 관리

LocalStorage → DB 데이터 마이그레이션 경험

Vercel 배포 환경에서의 빌드/에러 디버깅 경험

Author
GitHub: https://github.com/kieeler123