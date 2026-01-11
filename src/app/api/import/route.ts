import { NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const payload = await req.json();

    if (!Array.isArray(payload)) {
      return NextResponse.json(
        { message: "JSON array required" },
        { status: 400 }
      );
    }

    const docs = payload
      .map((x: any) => {
        const category =
          x.category === "japanese" ||
          x.category === "coding" ||
          x.category === "other"
            ? x.category
            : "other";

        const title = String(x.title ?? "").trim();
        const content = String(x.content ?? "").trim();

        // date 파싱이 실패해도 죽지 않게 방어
        const dt = x.date ? new Date(x.date) : new Date();
        const dateIso = Number.isNaN(dt.getTime())
          ? new Date().toISOString()
          : dt.toISOString();

        return {
          category,
          title,
          content,
          date: dateIso,
          legacyId: typeof x.id === "number" ? x.id : undefined,
        };
      })
      .filter((d: any) => d.title && d.content);

    if (docs.length === 0) {
      return NextResponse.json(
        { message: "No valid logs to import" },
        { status: 400 }
      );
    }

    const db = await getDb();
    const col = db.collection("logs");

    const result = await col.insertMany(docs);

    return NextResponse.json({ inserted: result.insertedCount });
  } catch (e: any) {
    console.error("IMPORT_ERROR:", e);
    return NextResponse.json(
      { message: e?.message ?? "Server error during import" },
      { status: 500 }
    );
  }
}
