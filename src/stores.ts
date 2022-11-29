import { writable } from "svelte/store";
import trackData from "./trackData.json";

export interface Song {
  source: string;
  song: string;
  artist: {
    name: string;
    link: string;
  };
  tracks: TrackData[];
}
export interface TrackData {
  name: string;
  type: string;
}

export const appStarted = writable(false);

export const currentSong = writable<Song>(
  nameToSong("outer_wilds", "travelers")
);

function nameToSong(source: string, name: string) {
  const song = trackData[source].songs[name];

  return {
    source: source,
    song: song.name,
    artist: song.artist,
    tracks: song.tracks,
  };
}
