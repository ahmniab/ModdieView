import { useContext, createContext, useState, useEffect } from "react";
import type { Room } from "../types";
import { io, Socket } from "socket.io-client";
import { SERVER_URL } from "../config";
import React from "react";

interface RoomContextValue {
    socket: Socket | undefined;
    name: string;
    roomId: string;
    room: Room | undefined;
    joinRoom: (roomId: string) => boolean;
}

export const RoomContext = createContext<RoomContextValue | null>(null);

export const RoomProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [ room, setRoom ] = useState<Room | undefined>(undefined);
    const [ roomId, setRoomId ] = useState<string>("");
    const [ socket, setSocket ] = useState<Socket | undefined>(undefined);
    let name: string = "";
    
    useEffect(() => {
        if (!roomId) return;
        const newSocket = io(`${SERVER_URL}/${roomId}`, {
            transports: ["websocket"],
            withCredentials: true
        });
        newSocket.on("connect", () => {
            newSocket.emit("CMD:getRoomData");
            setSocket(newSocket);
        });
        newSocket.on("roomData", (updatedRoom) => {
            setRoom(updatedRoom);
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

