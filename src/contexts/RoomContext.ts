import { useContext, createContext, useState } from "react";
import type { Room } from "../types";
import { io, Socket } from "socket.io-client";
import { SERVER_URL } from "../config";
import React from "react";

interface RoomContextValue {
    socket: Socket | null;
    name: string;
    room: Room | null;
    joinRoom: (roomId: string) => boolean;
}

export const RoomContext = createContext<RoomContextValue | null>(null);

export const RoomProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [ room, setRoom ] = useState<Room | null>(null);
    let socket: Socket | null = null;
    let name: string = "";
    const joinRoom = (roomId: string): boolean => {
        try {
            socket = io(`${SERVER_URL}/${roomId}`,{
                query: {
                    name: name || "Anonymous",
                },
            });
        } catch (error) {
            console.error("Failed to connect to the server:", error);
            return false;
        }
            
        return true; 
    }

    socket.on("roomData", (updatedRoom: Room) => {
        setRoom(updatedRoom);
    });

    const contextValue: RoomContextValue = {
        socket,
        name,
        room,
        joinRoom,
        onRoomUpdate,
    };
    return (
        <RoomContext.Provider value={contextValue}>
            {children}
        </RoomContext.Provider>
    );
};


