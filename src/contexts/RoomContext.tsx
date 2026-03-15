import { useContext, createContext, useState, useEffect } from "react";
import type { ChatReaction, Room, Notification } from "../types";
import { io, Socket } from "socket.io-client";
import { SERVER_URL } from "../config";
import type { Message, IoChatMessage } from "../types";
import React from "react";
import IoEvents from "@/utils/ioEventsNames";
import type { Users, RoomContent } from "../types";

interface RoomContextValue {
    socket: Socket | undefined;
    isConnected: boolean;
    roomExist: boolean | null;
    name: string;
    roomId: string;
    room: Room | undefined;
    users: Users;
    chatMsgs?: Message[];
    currentVideo: RoomContent | null;
    setCurrentVideo: React.Dispatch<React.SetStateAction<RoomContent | null>>;
    joinRoom: (roomId: string) => boolean;
    setUserName: (name: string) => void;
    setRoomName: (name: string) => void;
    changeRoomContent: (content: RoomContent) => void;
    quitRoom: () => void;
    newNotification: Notification[];
}

export const RoomContext = createContext<RoomContextValue | null>(null);

export const RoomProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [ room, setRoom ] = useState<Room | undefined>(undefined);
    const [ roomId, setRoomId ] = useState<string>("");
    const [ socket, setSocket ] = useState<Socket | undefined>(undefined);
    const [ chatMsgs, setChatMsgs ] = useState<Message[]>([]);
    const [users, setUsers] = useState<Users>({});
    const [name, setName] = useState<string>("");
    const [ currentVideo,setCurrentVideo ] = useState<RoomContent | null>(null);
    const [ isConnected, setIsConnected ] = useState<boolean>(false);
    const [ roomExist, setRoomExist ] = useState<boolean | null>(null);
    const [ newNotification, setNewNotification ] = useState<Notification[]>([]);
    
    useEffect(() => {
        if (!roomId) return;
        const newSocket = io(`${SERVER_URL}/${roomId}`, {
            transports: ["websocket"],
            withCredentials: true,
            auth: {
                name: localStorage.getItem("moddieview:name") || "Anonymous Moddie"
            }
        });
        newSocket.on(IoEvents.CONNECT, () => {
            setSocket(newSocket);
            setIsConnected(true);
            setRoomExist(true);
            newSocket.emit(IoEvents.GET_ROOM_DATA);
        });
        newSocket.on(IoEvents.ROOM_DATA, (updatedRoom: Room) => {
            setRoom(updatedRoom);
            setCurrentVideo(updatedRoom.roomContent);
            setName(updatedRoom.roomName);
            setUsers(updatedRoom.users);
        });

        newSocket.on(IoEvents.USERS_UPDATE, (updatedUsers) => {
            setUsers(updatedUsers);
        });

        newSocket.on("connect_error", (err) => {
            if (err.message === 'Room not found') {
                setRoomExist(false);
            }
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

        ///////////////// Video //////////////////////
        newSocket.on(IoEvents.CONTENT_CHANGE, (updatedVideo: RoomContent) => {
            console.log("Content changed:", updatedVideo);
            setCurrentVideo(updatedVideo);
        });

        ////////////////Notifications/////////////////
        newSocket.on(IoEvents.NEW_NOTIFICATION, (notification: Notification) => {
            setNewNotification(prev => [ notification, ...prev ].slice(0,15));
        });

        newSocket.on(IoEvents.DISCONNECT, () => {
            setIsConnected(false);
            handleDisconnect();
        });

        return () => {
            setIsConnected(false);
            setRoomExist(null);
            newSocket.off(IoEvents.CONNECT);
            newSocket.off(IoEvents.DISCONNECT);
            newSocket.off(IoEvents.ROOM_DATA);
            newSocket.off(IoEvents.USERS_UPDATE);
            newSocket.off(IoEvents.RESIEVE_CHAT_MESSAGE);
            newSocket.off(IoEvents.RESIEVE_CHAT_REACT);
            newSocket.off(IoEvents.SET_ROOM_NAME);
            newSocket.off(IoEvents.CONTENT_CHANGE);
            newSocket.off(IoEvents.DISCONNECT);
            newSocket.disconnect();
        };

    }, [roomId]);


    const contextValue: RoomContextValue = {
        socket,
        isConnected,
        roomExist,
        name,
        roomId,
        room,
        chatMsgs,
        users,
        currentVideo,
        newNotification,
        setCurrentVideo,
        joinRoom: (roomId: string) => {
            setCurrentVideo(null);
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
        changeRoomContent: (content: RoomContent) => {
            if (!socket) {
                console.warn("Socket not initialized yet");
                return;
            }
            socket.emit(IoEvents.CONTENT_CHANGE, content);
        },
        quitRoom: () => {
            if (!socket) {
                console.warn("Socket not initialized yet");
                return;
            }
            socket.disconnect();
            handleDisconnect();
        }
    };

    const handleDisconnect = () => {
        setIsConnected(false);
        setRoom(undefined);
        setCurrentVideo(null);
        setSocket(undefined);
        setRoomId("");
        setChatMsgs([]);
        setUsers({});
        setName("");
        setNewNotification([]);
    }



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

