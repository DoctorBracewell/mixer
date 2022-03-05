export const blobToBase64 = (blob): Promise<ArrayBuffer> => {
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

export const sleep = async (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
