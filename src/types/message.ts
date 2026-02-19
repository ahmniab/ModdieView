import type { Emoji } from "./emoji";
export interface Message {
  id: string;
  text: string;
  reactions: Record<string, Emoji>;
  isOwn: boolean;
  senderName?: string;
  replyTo?: {
    id: string;
    text: string;
  };
  sentAt: number;
}

export interface IoChatMessage {
  id: string | undefined;
  text: string;
  senderId: string;
  replyTo?: {
    id: string;
    text: string;
  };
  sentAt: number;
}