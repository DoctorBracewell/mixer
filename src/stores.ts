import { writable } from "svelte/store";
import type { Track } from "./tracks";

export const appStarted = writable(false);
export const tracks = writable<Track[]>();
