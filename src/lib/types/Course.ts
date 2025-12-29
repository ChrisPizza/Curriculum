export type Course = {
  state: "done" | "doing" | null;
  name: string;
  type: "必修" | "系選修" | "外選修" | "領域通識" | "語文通識" | "其他" | null;
  credit: number;
  teacher: string;
  time: string;
  attendance?: Record<string, string[]> | null;
  summaries?: [] | null;
};
