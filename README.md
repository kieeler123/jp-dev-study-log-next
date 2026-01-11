# Study Log (Next.js + MongoDB) / 学習ログ（Next.js + MongoDB）

Vanilla JS(LocalStorage) で作ったCRUDをベースに、  
**Next.js + MongoDB** に移行して「どの端末からでも記録・閲覧できる学習ログ」に拡張しました。

**Languages:** 日本語 | [한국어](README.ko.md) | [English](README.en.md)

---

## ✅ 主な機能
- ✅ CRUD（作成 / 参照 / 更新 / 削除）
- ✅ Categoryフィルタ / 検索（部分一致）
- ✅ MongoDB 永続化（端末依存から解放）
- ✅ JSON Import（LocalStorage Export → DB 取り込み）
- ✅ Next.js Route Handlers（`app/api/.../route.ts`）
- ✅ Vercel Deploy（ビルド & 型チェック通過）

---

## 🎯 なぜ Next.js + MongoDB にしたか
Vanilla版(LocalStorage) は学習には最適でしたが、制限がありました。

- ❌ 端末依存（別デバイスで見れない）
- ❌ ユーザー/端末間同期ができない
- ❌ データ量が増えるほど管理が難しくなる

そこで Next.js を使い、
- **API（Route Handlers）**
- **DB（MongoDB）**
- **Deploy（Vercel）**
まで含めた “実運用に近い形” に拡張しました。

---

## 🧩 Architecture（設計方針）
### 1) データの責務分離
- UI：フォーム / リスト表示
- API：`/api/logs`（CRUD）
- DB：MongoDB（永続化）

### 2) 計算と表示の分離（Vanilla版の思想を継承）
- 「表示対象の計算」→ filter/search
- 「描画」→ UI更新

---

## 🔌 API (Route Handlers)
### Endpoints（例）
- `GET    /api/logs`     : 一覧取得
- `POST   /api/logs`     : 追加
- `PATCH  /api/logs/[id]`: 更新
- `DELETE /api/logs/[id]`: 削除

（※ 実際の仕様に合わせて調整）

---

## 🔐 Env / Security
MongoDB接続情報は `.env.local` で管理し、GitHubには含めません。

例：
```env
MONGODB_URI="mongodb+srv://***"
MONGODB_DB="study"
🚀 Deploy (Vercel) - Build Error Note
Next.js は Vercel で next build が走り、Route Handler の型チェックが厳格です。
私はデプロイ時に Route Handler の params 型不一致でビルドが落ちました。
```

Issue
app/api/logs/[id]/route.ts の params がビルド環境で Promise として扱われ、型エラーになった

Fix
{ params: Promise<{ id: string }> } に合わせて await params で取り出す形に修正

👉 詳細は docs/deploy-notes.md に記録しています。

🧳 Migration (LocalStorage → MongoDB)
Vanilla版のログを JSON として export し、Next.js側で import してDBに取り込みました。

JSON export（旧）

JSON import（新：APIで取り込み）

👉 詳細は docs/migration-notes.md に記録しています。

📌 Links
Vanilla JS version (original): （旧Repoリンク）

This repo (Next.js + MongoDB): （このRepo）

✅ What I learned
Next.js Route Handlers の型とビルドの厳格さ

MongoDB接続と環境変数管理

データ移行（LocalStorage → DB）

Deploy時のエラー解析と修正フロー

Author
GitHub: https://github.com/kieeler123