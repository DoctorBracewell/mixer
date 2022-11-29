import type { Track } from "./tracks";

// Convert a blob to a base64 array buffer
export const blobToBase64 = (blob: Blob): Promise<ArrayBuffer> => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);

  return new Promise((resolve, reject) => {
    reader.addEventListener("loadend", () =>
      resolve(reader.result as ArrayBuffer)
    );

    reader.addEventListener("error", () =>
      reject("Unable to read sound files!")
    );
  });
};

// Artifical sleep function
export const sleep = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Take in an array of tracks and run a callback function on each one.
export const forEachTrack = async (
  tracks: Track[],
  callback: (track: Track) => void
) => await Promise.all(tracks.map(async (track) => callback(track)));

export const capitalise = (str: string) =>
  str
    .split("_")
    .map((word) => word.charAt(0).toLocaleUpperCase() + word.slice(1))
    .join(" ");
