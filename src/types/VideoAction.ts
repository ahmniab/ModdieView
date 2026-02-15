export interface VideoAction {
  videoId: string;
  userName: string;
  time?: number;
  speed?: number;
  action: "play" | "pause" | "seek" | "speed";
}