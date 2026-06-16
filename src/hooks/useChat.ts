import { useRoom } from "../contexts/RoomContext";
import type { IoChatMessage, ChatReaction } from "../types";
import IoEvents from "../utils/ioEventsNames";

const useChat = () => {
    const { chatMsgs, socket, users } = useRoom();

    const sendMessage = (msg: IoChatMessage) => {
        if (!socket) return;
        msg.senderName = users[socket?.id || '']?.name || "Moddie Anonymous";
        socket.emit(IoEvents.SEND_CHAT_MESSAGE, msg);
    }

    const sendReaction = (reaction: ChatReaction) => {
        if (!socket) return;
        socket.emit(IoEvents.SEND_CHAT_REACT, reaction);
    }

    return {
        chatMsgs,
        sendMessage,
        sendReaction,
        userId: socket?.id || "unknown",
        userName: users[socket?.id || ""]?.name || "Moddie Anonymous",
    };
}

export default useChat;