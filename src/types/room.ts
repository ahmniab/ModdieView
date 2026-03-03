import type { VimeoVideo } from "./VimeoVideo";
import { type YoutubeVideo } from "./YoutubeVideo";
import { type NormalVideo } from "./NormalVideo";

export type PlayableVideo = {
  url: string;
  isPlaying: boolean;
  lastTimePlayed : number;
  playbackRate: number;
  videoTime: number;
};

export type Video = (( NormalVideo | YoutubeVideo | VimeoVideo ) & PlayableVideo) | null; 

export type VideoPlaylist = {
  videos: Video[];
  currentIndex: number;
  isPlaying: boolean;
  videoStartTime: number;
};

export type RoomContent = Video | null;

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