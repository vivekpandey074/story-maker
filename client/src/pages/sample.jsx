import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

export default function Sample() {
  const [ans, setAns] = useState(false);

  const isImageUrl = (url) => {
    return (
      url.endsWith(".jpg") ||
      url.endsWith(".jpeg") ||
      url.endsWith(".png") ||
      url.endsWith(".gif") ||
      url.endsWith(".bmp") ||
      url.endsWith(".svg")
    );
  };

  // const checkUrl = (url) => {
  //   const video = document.createElement("video");
  //   video.src = url;

  //   // Load the video metadata
  //   video.addEventListener("loadedmetadata", () => {
  //     if (video.duration.toString() === "NaN") {
  //       if (isImageUrl(url)) {
  //         setAns("Valid");
  //       } else {
  //         setAns("image/video url unsupported");
  //       }
  //     } else {
  //       if (video.duration <= 15) {
  //         setAns("Valid");
  //       } else {
  //         setAns("More than 15 sec");
  //       }
  //     }
  //   });
  // };

  const checkUrl = async (url) => {
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

  useEffect(() => {}, []);

  const handleClick = () => {
    console.log("clicking");
    //  ""
    checkUrl("https://static.remove.bg/sample-gallery/graphics/bird-thumbna")
      // "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"

      .then((res) => {
        console.log("hi");
        console.log(res);
      })
      .error((err) => console.log(err));
  };

  return (
    <div>
      <p style={{ color: "black" }} onClick={handleClick}>
        Click here
      </p>
    </div>
  );
}
