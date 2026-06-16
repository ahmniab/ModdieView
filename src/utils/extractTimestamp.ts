import { convertTimestampToSeconds } from "./video";

export const extractTimestamp = (text: string) => {
  const timestampRegex = /\b\d{1,2}:\d{2}(?::\d{2})?\b/g;
  const results = [];
  let match;

  while ((match = timestampRegex.exec(text)) !== null) {
    const time = match[0];
    results.push({
      timestamp: time,
      seconds: convertTimestampToSeconds(time),
      index: match.index,
    });
  }

  return results;
};