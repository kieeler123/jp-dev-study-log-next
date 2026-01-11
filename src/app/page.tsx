import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">
        JP Dev Study Log
      </h1>
      <p className="mt-2 text-sm text-neutral-600">
        안정적인 일본식 레이아웃 위에, 한국식 트렌디 포인트를 절제해서 올린 로그
        앱.
      </p>

      <div className="mt-6 flex gap-3">
        <Link
          href="/logs"
          className="rounded-xl bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-black"
        >
          로그 보기
        </Link>
        <Link
          href="/import"
          className="rounded-xl border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-50"
        >
          JSON Import
        </Link>
      </div>
    </main>
  );
}
