import { useContext, createContext, useState, useEffect } from "react";
import type { ChatReaction, Room } from "../types";
import { io, Socket } from "socket.io-client";
import { SERVER_URL } from "../config";
import type { Message, IoChatMessage } from "../types";
import React from "react";
import IoEvents from "@/utils/ioEventsNames";

interface RoomContextValue {
    socket: Socket | undefined;
    name: string;
    roomId: string;
    room: Room | undefined;
    joinRoom: (roomId: string) => boolean;
    chatMsgs?: Message[];
}

export const RoomContext = createContext<RoomContextValue | null>(null);

export const RoomProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [ room, setRoom ] = useState<Room | undefined>(undefined);
    const [ roomId, setRoomId ] = useState<string>("");
    const [ socket, setSocket ] = useState<Socket | undefined>(undefined);
    const [ chatMsgs, setChatMsgs ] = useState<Message[]>([]);

    let name: string = "";
    
    useEffect(() => {
        if (!roomId) return;
        const newSocket = io(`${SERVER_URL}/${roomId}`, {
            transports: ["websocket"],
            withCredentials: true
        });
        newSocket.on(IoEvents.CONNECT, () => {
            newSocket.emit(IoEvents.GET_ROOM_DATA);
            setSocket(newSocket);
        });
        newSocket.on(IoEvents.ROOM_DATA, (updatedRoom) => {
            setRoom(updatedRoom);
        });

        ////////////// Chat ////////////////
        newSocket.on(IoEvents.RESIEVE_CHAT_MESSAGE, (ioMsg: IoChatMessage) => {

            setChatMsgs(prev => [...prev, {
                id: ioMsg.id!,
                text: ioMsg.text,
                reactions: {},
                isOwn: ioMsg.senderId === newSocket.id,
                senderName: room?.users[ioMsg.senderId]?.name ?? "Unknown",
                replyTo: ioMsg.replyTo ,
                sentAt: ioMsg.sentAt,
            }]);
            console.log("Received new chat message:", ioMsg);
        });

        newSocket.on(IoEvents.RESIEVE_CHAT_REACT, (reaction: ChatReaction) => {
            setChatMsgs(prev => prev.map(msg => {
                if (msg.id === reaction.messageId) {
                    msg.reactions
                    return {
                        ...msg,
                        reactions: {
                            ...msg.reactions,
                            [reaction.senderId]: reaction.reaction
                        }
                    };
                }
                return msg;
            }));
        });

        return () => {
            newSocket.disconnect();
        };
    }, [roomId]);


    const contextValue: RoomContextValue = {
        socket,
        name,
        roomId,
        room,
        chatMsgs,
        joinRoom: (roomId: string) => {
            setRoomId(roomId);
            return true;
        }
    };

    return (
        <RoomContext.Provider value={contextValue}>
            {children}
        </RoomContext.Provider>
    );
};

export const useRoom = () => {
    const context = useContext(RoomContext);
    if (!context) {
        throw new Error("useRoom must be used within a RoomProvider");
    }
    return context;
};

