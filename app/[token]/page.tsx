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
    <div onContextMenu={(e) => e.preventDefault()}
      style={{
        position: 'relative',
        paddingBottom: '56.25%',
        height: 0,
        overflow: 'hidden',
        maxWidth: '100%',
        width: '100%',
      }}
    >
      {myVideo ? (<iframe
        src={myVideo}
        frameBorder="0"
        allowFullScreen
        title="Unlisted Video"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />) : (<p>Video loading or inacessable</p>)}
      
    </div>
    
  );
}
