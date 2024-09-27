import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

export default function Sample() {
  const [ans, setAns] = useState(false);

  const checkVideoUrl = async (url) => {
    const video = document.createElement("video");
    video.src = url;

    // Load the video metadata
    video.addEventListener("loadedmetadata", () => {
      console.log(`Video duration: ${video.duration} seconds`);
    });
  };

  useEffect(() => {
    checkVideoUrl(
      "https://firebasestorage.googleapis.com/v0/b/qriositynet-dev.appspot.com/o/chat%2FMgttfKqKIDhQ6bgtgy6V%2Fvideos%2F1663229371400watermelon-bunny.mp4?alt=media&token=722bb260-c65b-46fe-8805-4a5a742f282d"
    );
  }, []);

  return (
    <div>
      <p style={{ color: "black" }}>{ans}</p>
    </div>
  );
}
