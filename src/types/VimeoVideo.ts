export type VimeoVideo = {
    platform: "vimeo";
    id: number;
    title: string;
    description: string;
    thumbnails: {
        thumbnail_url?: string;
        thumbnail_width?: number;
        thumbnail_height?: number;
  };
}