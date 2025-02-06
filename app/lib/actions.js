export async function fetchVideo() {
    const token = {seenVideo: false}
    if(token.seenVideo === true) {
        return {message:"Sorry, hast das Video schon gesehen, frag Basti wenn du es nochmal schauen willst.", url:false}
    }else {
        return {message: "The Cake is a Lie - Portal" ,url:"https://youtu.be/-g598UJ7rX0"}
    }
}

import { Video } from '@mux/mux-node';

const { MUX_API_KEY, MUX_API_SECRET } = process.env;

const mux = new Video({ accessToken: MUX_API_KEY, secretKey: MUX_API_SECRET });

export default async (req, res) => {
  try {
    // Get video playback details from Mux
    const playbackId = req.query.playbackId;
    const videoDetails = await mux.assets.get(playbackId);

    res.status(200).json(videoDetails);
  } catch (error) {
    console.error('Error fetching video:', error);
    res.status(500).json({ error: 'Failed to fetch video data from Mux' });
  }
};