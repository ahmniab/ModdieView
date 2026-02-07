import type { Emoji } from "./emoji";
export interface Message {
  id: string;
  text: string;
  reactions: Emoji[];
  isOwn: boolean;
  senderName?: string;
  replyTo?: {
    id: string;
    text: string;
  };
  sentAt: number;
}