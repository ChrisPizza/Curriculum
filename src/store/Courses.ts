import { writable } from "svelte/store";
import type { Course } from "$lib/types/Course";

export const courses = writable<Course[]>([]);
