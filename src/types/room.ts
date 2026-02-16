import type { VimeoVideo } from "./VimeoVideo";
import { type YoutubeVideo } from "./YoutubeVideo";

export type Video = { url: string; } | YoutubeVideo | VimeoVideo;

export type VideoPlaylist = {
  videos: Video[];
  currentIndex: number;
  isPlaying: boolean;
  videoStartTime: number;
};

export type RoomContent = VideoPlaylist | null;

export interface UserData {
  name: string;
}
export type Users = Record<string, UserData>;

export type RoomData = {
  roomName: string;
  roomOwner: string;
  users: Users;
  roomContent: RoomContent;
  bannedUsers?: string[];
};

export type Room = { roomId: string; } & RoomData;

export type CreatedRoom = {
  ownerWebToken: string;
} & Room;