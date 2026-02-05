import type { Emoji } from "./emoji";
export interface Message {
  id: string;
  text: string;
  reactions: Emoji[];
  isOwn: boolean;
}