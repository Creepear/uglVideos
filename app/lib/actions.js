export async function fetchVideo() {
    const token = {seenVideo: false}
    if(token.seenVideo === true) {
        return {message:"Sorry, hast das Video schon gesehen, frag Basti wenn du es nochmal schauen willst.", url:false}
    }else {
        return {message: "The Cake is a Lie - Portal" ,url:"https://drive.google.com/uc?export=download&id=1YEWmUFfV5tBt5eX-dfou8beB5EGM4NPB"}
    }
}