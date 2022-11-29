import type { Song } from "./stores";
import type { Writable } from "svelte/store";
import { writable, get } from "svelte/store";
import { Howl } from "howler";
import { blobToBase64, sleep } from "./utils";

// Options interface for Track.toggle
interface ToggleOptions {
  random?: boolean;
  muting?: boolean;
}

export class Track {
  private howl: Howl;
  private _volume: Writable<number>;
  private previousVolume: number;

  constructor(
    public name: string,
    public type: string,
    file: any,
    public playing: boolean,
    public muted: boolean
  ) {
    this.name = name;
    this.type = type;
    this.howl = new Howl({
      src: file,
      loop: true,
    });

    this.playing = playing;
    this.muted = muted;

    // Use a writable store to keep track of the volume under the hood, so it can be re-rendered through methods on this class
    this._volume = writable(0);
    this.volume = Math.round(Math.random()) / 2;
  }

  // Custom setter to update the volume in the store and in the Howl
  set volume(value: number) {
    this.howl.volume(value);
    this._volume.set(value);

    // Check if the floating point of value is ~about~ 0, and if so, set muted to true;
    this.muted = value === 0;
  }

  // A **seperate** getter for the volume store (does NOT match the setter above), so it can be used by components
  get volumeStore() {
    return this._volume;
  }

  togglePlaying() {
    this.playing ? this.howl.pause() : this.howl.play();

    this.playing = !this.playing;
  }

  // An interpolation function that can be used to smoothly transition between volumes
  // * TODO - potentially change to async generator the yields `await sleep(..)` ?
  async interpolateVolume(start: number, end: number) {
    const countUp = end > start;
    let volumeTracker = start;

    if (countUp) {
      while (volumeTracker < end) {
        volumeTracker += 0.01;
        this.volume = volumeTracker;

        await sleep(5);
      }
    } else {
      while (volumeTracker > end) {
        volumeTracker -= 0.01;
        this.volume = volumeTracker;

        await sleep(5);
      }
    }

    this.volume = end;
  }

  async toggle(options?: ToggleOptions) {
    // Use svelte get function to get the current volume without having to manually subscribe
    const volume = get(this.volumeStore);
    const endVolume = this.decideEndVolume(volume, options);

    // Set the previous volume then interpolate between the start and end values
    this.previousVolume = volume;
    await this.interpolateVolume(volume, endVolume);
  }

  decideEndVolume(volume: number, options?: ToggleOptions) {
    // Checks for volume options
    if (!(options?.muting ?? true)) return this.previousVolume;
    if (options?.muting ?? false) return 0;

    // Check for random option
    if (options?.random) return Math.random() > 0.6 ? 0 : Math.random();

    // Otherwise decide volume normally
    if (volume > 0) return 0;
    if (this.previousVolume === 0) return 0.5;

    // If we definitely want to set volume > 0 but don't have a value, deafult to 0.5
    return this.previousVolume ?? 0.5;
  }
}

// Intermediate class between `trackNames: string[]` the `tracks: Track[]` array
class TrackFile {
  constructor(
    public name: string,
    public type: string,
    public file: ArrayBuffer
  ) {
    this.name = name;
    this.type = type;
    this.file = file;
  }
}

// Asynchronously load the tracks from the static host
export async function downloadTracks({ source, song, tracks }: Song) {
  // Convert to an array of Promise<Response> objects, to be awaited in the App component
  // This is so a Loading component can be displayed using sveltes {#await} syntax whilst
  // the tracks are being downloaded
  const soundFiles = await Promise.all(
    tracks.map(
      async ({ name, type }) =>
        new TrackFile(
          name,
          type,
          await fetch(
            `https://static.brace.dev/mixer/${source}/${song}/${[
              name,
              type,
              "flac",
            ].join(".")}`
          )
            .then((res) => res.blob())
            // Convert to base64 because that is the only raw data format supported by Howler
            .then(blobToBase64)
        )
    )
  );

  return soundFiles.map(
    ({ name, file, type }) => new Track(name, type, file, false, false)
  );
}
