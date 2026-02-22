"use client";

import { useEffect, useMemo, useState } from "react";
import type { Category, LogDoc } from "@/types/log";

const categoryLabel: Record<Category, string> = {
  japanese: "日本語",
  coding: "コーディング",
  other: "その他",
};

type LogUI = LogDoc & { _id: string };

export default function LogsPage() {
  const [logs, setLogs] = useState<LogUI[]>([]);
  const [filter, setFilter] = useState<"all" | Category>("all");
  const [search, setSearch] = useState("");

  const [editingId, setEditingId] = useState<string | null>(null);

  const [category, setCategory] = useState<Category>("japanese");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const load = async () => {
    const qs = new URLSearchParams();
    qs.set("filter", filter);
    if (search.trim()) qs.set("search", search.trim());

    const res = await fetch(`/api/logs?${qs.toString()}`, {
      cache: "no-store",
    });
    const data = await res.json();
    setLogs(data);
  };

  useEffect(() => {
    load().catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter, search]);

  const resetForm = () => {
    setEditingId(null);
    setCategory("japanese");
    setTitle("");
    setContent("");
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const t = title.trim();
    const c = content.trim();
    if (!t || !c) return;

    if (editingId) {
      await fetch(`/api/logs/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category, title: t, content: c }),
      });
    } else {
      await fetch(`/api/logs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category,
          title: t,
          content: c,
          date: new Date().toISOString(),
        }),
      });
    }

    resetForm();
    await load();
  };

  const startEdit = (log: LogUI) => {
    setEditingId(log._id);
    setCategory(log.category);
    setTitle(log.title);
    setContent(log.content);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const remove = async (id: string) => {
    if (!confirm("このログを削除しますか？")) return;
    await fetch(`/api/logs/${id}`, { method: "DELETE" });
    if (editingId === id) resetForm();
    await load();
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Study Logs</h1>
          <p className="mt-1 text-sm text-neutral-600">
            안정/신뢰 기반 + 포인트만 트렌디하게.
          </p>
        </div>

        {/* “한국 트렌디” 포인트: 아주 약한 그라데이션 버튼(절제) */}
        <a
          href="/import"
          className="rounded-xl bg-gradient-to-r from-neutral-900 to-neutral-700 px-3 py-2 text-xs font-medium text-white hover:opacity-95"
        >
          JSON Import
        </a>
        <a
          href="/export"
          className="rounded-xl bg-gradient-to-r from-neutral-900 to-neutral-700 px-3 py-2 text-xs font-medium text-white hover:opacity-95"
        >
          JSON Export
        </a>
      </div>

      {/* Form */}
      <section className="mt-6 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold text-neutral-900">
            {editingId ? "編集モード" : "新規ログ"}
          </h2>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="rounded-full border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50"
            >
              キャンセル
            </button>
          )}
        </div>

        <form onSubmit={onSubmit} className="mt-3 grid gap-3">
          <div className="grid gap-2 sm:grid-cols-3">
            <label className="grid gap-1">
              <span className="text-xs text-neutral-600">Category</span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="h-10 rounded-xl border border-neutral-200 bg-neutral-50 px-3 text-sm outline-none focus:border-neutral-900"
              >
                <option value="japanese">日本語</option>
                <option value="coding">コーディング</option>
                <option value="other">その他</option>
              </select>
            </label>

            <label className="grid gap-1 sm:col-span-2">
              <span className="text-xs text-neutral-600">Title</span>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="h-10 rounded-xl border border-neutral-200 bg-neutral-50 px-3 text-sm outline-none focus:border-neutral-900"
                placeholder="タイトル"
              />
            </label>
          </div>

          <label className="grid gap-1">
            <span className="text-xs text-neutral-600">Content</span>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[120px] rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-sm outline-none focus:border-neutral-900"
              placeholder="内容"
            />
          </label>

          <div className="flex gap-2">
            <button
              className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-black"
              type="submit"
            >
              {editingId ? "更新する" : "保存する"}
            </button>
          </div>
        </form>
      </section>

      {/* Filters */}
      <section className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-600">Filter</span>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="h-9 rounded-xl border border-neutral-200 bg-white px-3 text-sm outline-none focus:border-neutral-900"
          >
            <option value="all">All</option>
            <option value="japanese">日本語</option>
            <option value="coding">コーディング</option>
            <option value="other">その他</option>
          </select>
        </div>

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-9 rounded-xl border border-neutral-200 bg-white px-3 text-sm outline-none focus:border-neutral-900 sm:w-72"
          placeholder="Search title/content..."
        />
      </section>

      {/* List */}
      <section className="mt-4 grid gap-3">
        {logs.length === 0 ? (
          <p className="mt-6 text-sm text-neutral-500">
            条件に合うログがありません。
          </p>
        ) : (
          logs.map((log) => (
            <article
              key={log._id}
              className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700">
                  {categoryLabel[log.category]}
                </span>
                <span className="text-xs text-neutral-500">
                  {new Date(log.date).toISOString().slice(0, 10)}
                </span>
              </div>

              <h3
                className="mt-2 text-base font-semibold text-neutral-900"
                style={{ overflowWrap: "anywhere" }}
              >
                {log.title}
              </h3>

              <p
                className="mt-2 whitespace-pre-line text-sm text-neutral-700"
                style={{ overflowWrap: "anywhere", wordBreak: "break-word" }}
              >
                {log.content}
              </p>

              <div className="mt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => startEdit(log)}
                  className="rounded-full border border-neutral-200 px-3 py-1.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50"
                >
                  編集
                </button>
                <button
                  type="button"
                  onClick={() => remove(log._id)}
                  className="rounded-full border border-red-200 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50"
                >
                  削除
                </button>
              </div>
            </article>
          ))
        )}
      </section>
    </main>
  );
}
