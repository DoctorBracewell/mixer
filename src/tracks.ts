import { Howl } from "howler";
import { blobToBase64 } from "./utils";

export class Track {
  public howl: Howl;
  private _volume: number;

  constructor(public name: string, file: any) {
    this.name = name;
    this.howl = new Howl({
      src: file,
      loop: true,
    });
  }

  set volume(value: number) {
    this.howl.volume(value);
    this._volume = value;
  }

  get volume(): number {
    return this._volume;
  }
}

class TrackFile {
  constructor(public name: string, public file: ArrayBuffer) {
    this.name = name;
    this.file = file;
  }
}

const trackNames = [
  "drums",
  "whistling",
  "banjo",
  "flute",
  "harmonica",
  "piano",
  "stranger",
];

export async function downloadTracks() {
  const soundFiles = await Promise.all(
    trackNames.map(
      async (track) =>
        new TrackFile(
          track,

          await fetch(`https://static.brace.dev/travellers/${track}.wav`)
            .then((res) => res.blob())
            .then(blobToBase64)
        )
    )
  );

  return soundFiles.map(({ name, file }) => new Track(name, file));
}
