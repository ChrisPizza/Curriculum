import { writable } from "svelte/store";

export const curriculum = writable<string[][]>(
  Array.from({ length: 5 }, () => Array(8).fill("-"))
);
