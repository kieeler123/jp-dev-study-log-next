"use client";

import { useState } from "react";

export default function ImportPage() {
  const [msg, setMsg] = useState<string>("");

  const onFile = async (file: File | null) => {
    if (!file) return;
    setMsg("読み込み中...");

    try {
      const text = await file.text();
      const json = JSON.parse(text);

      const res = await fetch("/api/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(json),
      });

      if (!res.ok) {
        const e = await res.json().catch(() => ({}));
        throw new Error(e?.message ?? "Import failed");
      }

      const data = await res.json();
      setMsg(
        `完了: ${data.inserted}件をインポートしました。 /logs で確認してください。`
      );
    } catch (e: any) {
      setMsg(`エラー: ${e?.message ?? "unknown"}`);
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-xl font-semibold tracking-tight">JSON Import</h1>
      <p className="mt-2 text-sm text-neutral-600">
        기존 localStorage export(JSON)를 업로드하면 MongoDB로 저장합니다.
        날짜(date)도 그대로 보존됩니다.
      </p>

      <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
        <label className="text-sm font-medium text-neutral-900">
          파일 선택
        </label>
        <input
          type="file"
          accept="application/json"
          className="mt-2 block w-full text-sm"
          onChange={(e) => onFile(e.target.files?.[0] ?? null)}
        />

        {msg && (
          <p className="mt-3 rounded-xl bg-neutral-50 px-3 py-2 text-sm text-neutral-700">
            {msg}
          </p>
        )}

        <div className="mt-4 text-xs text-neutral-500">
          팁: import 후 <span className="font-medium">/logs</span>에서
          확인하세요.
        </div>
      </div>
    </main>
  );
}
