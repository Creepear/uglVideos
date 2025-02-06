"use client";

import Video from "next-video";
import { fetchVideo } from "../lib/actions";
import { useState, useEffect } from "react";

export default function TokenPage() {
  const [myVideo, setMyVideo] = useState<string | null>(null);

  useEffect(() => {
    async function getVideo() {
        const videoUrl = await fetchVideo();
        if (typeof videoUrl.url === "string") {
          setMyVideo(videoUrl.url);
        } else {
          alert(videoUrl.message);
        }
    }
    getVideo();
  }, []);
  return (
    <div>
      {myVideo ? <Video src={myVideo} /> : <p>No Video for you</p>}
    </div>
  );
}
