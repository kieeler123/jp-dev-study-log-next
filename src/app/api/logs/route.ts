import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import type { Category, LogDoc } from "@/types/log";

function normalizeCategory(x: unknown): Category {
  if (x === "japanese" || x === "coding" || x === "other") return x;
  return "other";
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const filter = searchParams.get("filter") ?? "all";
  const search = (searchParams.get("search") ?? "").trim();

  const db = await getDb();
  const col = db.collection("logs");

  const q: any = {};
  if (filter !== "all") q.category = filter;
  if (search) {
    q.$or = [
      { title: { $regex: search, $options: "i" } },
      { content: { $regex: search, $options: "i" } },
    ];
  }

  const docs = await col.find(q).sort({ date: -1 }).toArray();

  // _id를 string으로 변환
  const logs = docs.map((d: any) => ({
    ...d,
    _id: String(d._id),
  }));

  return NextResponse.json(logs);
}

export async function POST(req: Request) {
  const body = (await req.json()) as Partial<LogDoc>;

  const category = normalizeCategory(body.category);
  const title = (body.title ?? "").trim();
  const content = (body.content ?? "").trim();

  if (!title || !content) {
    return NextResponse.json(
      { message: "title/content required" },
      { status: 400 }
    );
  }

  // date가 없으면 지금
  const dateIso = body.date
    ? new Date(body.date).toISOString()
    : new Date().toISOString();

  const db = await getDb();
  const col = db.collection("logs");

  const insert = await col.insertOne({
    category,
    title,
    content,
    date: dateIso,
    legacyId: typeof body.legacyId === "number" ? body.legacyId : undefined,
  });

  return NextResponse.json({ _id: String(insert.insertedId) }, { status: 201 });
}
