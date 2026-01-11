import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDb } from "@/lib/mongodb";
import type { LogDoc, Category } from "@/types/log";

function normalizeCategory(x: unknown): Category {
  if (x === "japanese" || x === "coding" || x === "other") return x;
  return "other";
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  let oid: ObjectId;
  try {
    oid = new ObjectId(id);
  } catch {
    return NextResponse.json({ message: "Invalid id" }, { status: 400 });
  }

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

  const db = await getDb();
  const col = db.collection("logs");

  const updated = await col.findOneAndUpdate(
    { _id: oid },
    { $set: { category, title, content } },
    { returnDocument: "after" }
  );

  // ✅ 여기 핵심: updated가 null일 수도 있으니 보호
  const doc = updated?.value;
  if (!doc) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ ...doc, _id: String(doc._id) });
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  let oid: ObjectId;
  try {
    oid = new ObjectId(id);
  } catch {
    return NextResponse.json({ message: "Invalid id" }, { status: 400 });
  }

  const db = await getDb();
  const col = db.collection("logs");

  const del = await col.deleteOne({ _id: oid });
  if (del.deletedCount === 0) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  return new Response(null, { status: 204 });
}
