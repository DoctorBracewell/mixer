import { writable } from "svelte/store";
import trackData from "./songs.json";

export class Song {
  public artist: {
    name: string;
    link: string;
  };
  public tracks: TrackData[];

  constructor(public source: string, public song: string) {
    const songData = trackData[source].songs[song];

    this.source = source;
    this.song = song;
    this.artist = songData.artist;
    this.tracks = songData.tracks;

    this.saveToLocalStorage();
  }

  saveToLocalStorage() {
    localStorage.setItem(
      "song",
      JSON.stringify({
        source: this.source,
        song: this.song,
      })
    );
  }
}

export interface TrackData {
  name: string;
  type: string;
}

export const appStarted = writable(false);

const { source, song } = localStorage.getItem("song")
  ? JSON.parse(localStorage.getItem("song") as string)
  : { source: "outer_wilds", song: "travelers" };

export const currentSong = writable(new Song(source, song));
