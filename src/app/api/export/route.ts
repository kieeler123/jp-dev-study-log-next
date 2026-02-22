import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export async function GET() {
  const db = await getDb();
  const col = db.collection("logs");

  const docs = await col.find({}).sort({ date: -1, _id: -1 }).toArray();

  const out = docs.map((d: any) => {
    // ✅ legacyId 우선, 없으면 date(ms), 없으면 _id 기반 fallback
    const legacyId =
      d.legacyId ??
      (d.date ? new Date(d.date).getTime() : null) ??
      (d.id ? Number(d.id) : null);

    return {
      _id: String(d._id), // ✅ Mongo 식별자
      legacyId: legacyId != null ? String(legacyId) : null, // ✅ Shiori upsert key
      id: d.id ?? String(d._id), // 예전 id 유지(선택)
      category: d.category ?? "other",
      title: d.title ?? "",
      content: d.content ?? "",
      date: d.date ? new Date(d.date).toISOString() : null, // ✅ 원본 작성일
      createdAt: d.createdAt ? new Date(d.createdAt).toISOString() : null,
    };
  });

  return NextResponse.json(
    { version: 2, exportedAt: new Date().toISOString(), logs: out },
    { status: 200 },
  );
}
