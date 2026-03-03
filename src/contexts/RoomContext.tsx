import { useContext, createContext, useState, useEffect } from "react";
import type { ChatReaction, Room } from "../types";
import { io, Socket } from "socket.io-client";
import { SERVER_URL } from "../config";
import type { Message, IoChatMessage } from "../types";
import React from "react";
import IoEvents from "@/utils/ioEventsNames";
import type { Users } from "../types";

interface RoomContextValue {
    socket: Socket | undefined;
    name: string;
    roomId: string;
    room: Room | undefined;
    users: Users;
    chatMsgs?: Message[];
    joinRoom: (roomId: string) => boolean;
    setUserName: (name: string) => void;
    setRoomName: (name: string) => void;
}

export const RoomContext = createContext<RoomContextValue | null>(null);

export const RoomProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [ room, setRoom ] = useState<Room | undefined>(undefined);
    const [ roomId, setRoomId ] = useState<string>("");
    const [ socket, setSocket ] = useState<Socket | undefined>(undefined);
    const [ chatMsgs, setChatMsgs ] = useState<Message[]>([]);
    const [users, setUsers] = useState<Users>({});
    const [name, setName] = useState<string>("");
    
    
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
        newSocket.on(IoEvents.ROOM_DATA, (updatedRoom: Room) => {
            setRoom(updatedRoom);
            setName(updatedRoom.roomName);
            setUsers(updatedRoom.users);
        });

        newSocket.on(IoEvents.USERS_UPDATE, (updatedUsers) => {
            setUsers(updatedUsers);
        });

        ////////////// Chat ////////////////
        newSocket.on(IoEvents.RESIEVE_CHAT_MESSAGE, (ioMsg: IoChatMessage) => {
            setChatMsgs(prev => [...prev, {
                id: ioMsg.id!,
                text: ioMsg.text,
                reactions: {},
                isOwn: ioMsg.senderId === newSocket.id,
                senderId: ioMsg.senderId,
                senderName: ioMsg.senderName,
                replyTo: ioMsg.replyTo ,
                sentAt: ioMsg.sentAt,
            }]);
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

        newSocket.on(IoEvents.SET_ROOM_NAME, (newName: string) => {
            setName(newName);
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
        users,
        joinRoom: (roomId: string) => {
            setRoomId(roomId);
            return true;
        },
        setUserName: (name: string) => {
            if (!socket) {
                console.warn("Socket not initialized yet");
                return;
            }
            socket.emit(IoEvents.SET_USER_NAME, name);
        },
        setRoomName: (name: string) => {
            if (!socket) {
                console.warn("Socket not initialized yet");
                return;
            }
            socket.emit(IoEvents.SET_ROOM_NAME, name);
        },
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

