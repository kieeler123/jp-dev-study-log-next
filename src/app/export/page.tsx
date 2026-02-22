"use client";

import { useState } from "react";

function downloadJson(filename: string, data: unknown) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);
}

export default function ExportPage() {
  const [msg, setMsg] = useState("");

  const onExport = async () => {
    setMsg("書き出し中...");

    try {
      const res = await fetch("/api/export", { method: "GET" });
      if (!res.ok) throw new Error("Export failed");

      const json = await res.json();

      const date = new Date();
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, "0");
      const d = String(date.getDate()).padStart(2, "0");

      downloadJson(`study-mongodb-${y}${m}${d}.json`, json);
      setMsg(`完了: ${json?.logs?.length ?? 0}件を書き出しました。`);
    } catch (e: any) {
      setMsg(`エラー: ${e?.message ?? "unknown"}`);
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-xl font-semibold tracking-tight">JSON Export</h1>
      <p className="mt-2 text-sm text-neutral-600">
        MongoDBに保存されたログをJSONとして書き出します。
      </p>

      <div className="mt-6 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
        <button
          type="button"
          onClick={onExport}
          className="rounded-xl border border-neutral-200 px-4 py-2 text-sm hover:bg-neutral-50"
        >
          Export JSON
        </button>

        {msg && (
          <p className="mt-3 rounded-xl bg-neutral-50 px-3 py-2 text-sm text-neutral-700">
            {msg}
          </p>
        )}

        <div className="mt-4 text-xs text-neutral-500">
          팁: 다운로드한 JSON 파일을 Shiori Import에 업로드하면 됩니다.
        </div>
      </div>
    </main>
  );
}
