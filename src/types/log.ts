export type Category = "japanese" | "coding" | "other";

export type LogDoc = {
  _id?: string;
  category: Category;
  title: string;
  content: string;
  date: string; // ISO string로 통일 (UI도 쉬움)
  legacyId?: number; // 기존 localStorage id 보관용(선택)
};
