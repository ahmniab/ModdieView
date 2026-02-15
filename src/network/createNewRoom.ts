import type { CreatedRoom } from "../types";
import axiosInstance from "./axiosInstane";

const createNewRoom = async (roomName: string): Promise<CreatedRoom> => {
    const response = await axiosInstance.post("/room/create", {
        roomName
    });
    if (response.status !== 201) {
        throw new Error("Failed to create room");
    }
    return response.data;
}

export default createNewRoom;