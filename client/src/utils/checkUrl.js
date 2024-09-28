export const isImageUrl = (url) => {
  return (
    url.endsWith(".jpg") ||
    url.endsWith(".jpeg") ||
    url.endsWith(".png") ||
    url.endsWith(".gif") ||
    url.endsWith(".bmp") ||
    url.endsWith(".svg")
  );
};

export const checkUrl = async (url) => {
  if (isImageUrl(url)) {
    return "Valid Image URL";
  }

  const video = document.createElement("video");
  video.src = url;

  // Wrap the video loading in a Promise to await the loadedmetadata event

  const loadVideoMetadata = () =>
    new Promise((resolve, reject) => {
      video.addEventListener("loadedmetadata", () => {
        if (!isNaN(video.duration)) {
          resolve(video.duration);
        } else {
          reject(new Error("Invalid video duration"));
        }
      });
      video.addEventListener("error", () => {
        reject(new Error("Failed to load video"));
      });
    });

  try {
    const duration = await loadVideoMetadata();

    console.log(`Video duration: ${duration} seconds`);
    if (duration <= 15) {
      return "Valid Video URL";
    } else {
      return "Video duration is more than 15 seconds";
    }
  } catch (error) {
    console.log(error.message);
    return "Unsupported image/video URL";
  }
};

export const checkMediaType = async (url) => {
  if (isImageUrl(url)) {
    return "Image";
  }

  const video = document.createElement("video");
  video.src = url;

  const loadMetaData = () =>
    new Promise((resolve, reject) => {
      video.addEventListener("loadedmetadata", () => {
        if (!isNaN(video.duration)) {
          resolve("Video");
        } else {
          reject(new Error("Invalid"));
        }
      });
      video.addEventListener("error", () => {
        reject(new Error("Invalid"));
      });
    });

  try {
    const res = await loadMetaData();
    return res;
  } catch (err) {
    console.log(err);
    return "Invalid";
  }
};
