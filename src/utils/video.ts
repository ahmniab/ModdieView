import type { Video, YoutubeVideo, VimeoVideo } from "@/types";

export const extractVideoUrl = (input: string): Video | null => {
    const trimmed=input.trim();
    const ytRegex = new RegExp(`(?<=watch\\?v=|/videos/|embed/|shorts/|youtu\\.be/|/v/|watch\\?v=|/videos/|embed/|youtu\\.be/|/v/)[^#&?\\n]*`, "i");

  const ytMatch = trimmed.match(ytRegex);
  if (ytMatch) {
    const videoId = ytMatch[0];
    if (!/^[\w-]{11}$/.test(videoId)) {
        return null;
    }
    const yt: YoutubeVideo = {
        platform: "youtube",
        id: videoId,
        title: "",
        description: "",
        thumbnail:{
            url: "",
            width: 0,
            height: 0,
      }
    };
    return yt;
  };

  const vmRegex = new RegExp(
    `^(?:https?:)?\\/\\/?(?:www\\.)?(?:player\\.)?vimeo\\.com\\/(?:channels\\/(?:\\w+\\/)?|groups\\/(?:[^\\/]*)\\/videos\\/|video\\/|)(\\d+)(?:|\\/\\?)`,
    "i"
  );
  const vimeoMatch = trimmed.match(vmRegex);
  if (vimeoMatch) {
    const videoId = vimeoMatch[1];
    const vimeo: VimeoVideo = {
      platform: "vimeo",
      id: Number(videoId),
      title: "",
      description: "",
      thumbnails: {
        thumbnail_url: "",
        thumbnail_width: 0,
        thumbnail_height: 0,
      },
    };
    return vimeo;
  }

//   const videoExtensions = [
//     "mp4", "webm", "ogg", "mkv", 
//     "avi", "flv", "mpeg", "mp3", 
//     "wav", "aac", "ogv", "opus", "mov", "m4v", "m4a", "3gp", "3g2", "flac", "alac", "aiff", "vob", "ts", "mts", "m2ts", "divx", "xvid", "rm", "asf", "mpc", "mpe", "mpeg4", "mpg", "rrc", "srt", "ass", "ssa", "vtt", "sub", "idx", "gifv", "mng", "qt", "f4v", "f4p", "f4a", "f4b", "mxf", "roq", "nsv", "yuv", "viv", "drc", "mpg4", "wmv", "amv", "m4b", "mp2", "mpv", "svi", "m1v", "m2v", "mp4v", "mpg2", "mpeg2", "mpeg1", "mp4a", "oga", "rmvb",
// ];
//     const extensionPattern = videoExtensions.join("|");
//   const urlRegex = new RegExp( 
//     `^https?:\\/\\/[^\\s]+\\.(${extensionPattern})(\\?.*)?$`,"i")
//     .test(trimmed);
//   if(urlRegex) {
    return { url: trimmed };
//   }
//   return null;
}; 

export const calculateVideoTime = (currentTime: number, lastTimePlayed: number) => {
    if (lastTimePlayed === 0) return currentTime;
    const now = new Date().getTime();
    const elapsed = (now - lastTimePlayed) / 1000;
    return currentTime + elapsed;
}