import { writable } from "svelte/store";
export type OverlayType = "editor" | "settings" | null;
export const overlay = writable<OverlayType>(null);
