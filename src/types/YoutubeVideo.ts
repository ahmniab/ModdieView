export type YoutubeVideo = {
  platform: "youtube";
  id: string;
  title: string;
  description: string;
  thumbnail: {
    url: string;
    width: number;
    height: number;
  };
};
