import { useRoom } from "../contexts/RoomContext";
import type { IoChatMessage, ChatReaction } from "../types";
import IoEvents from "../utils/ioEventsNames";

const useChat = () => {
    const { chatMsgs, socket } = useRoom();

    const sendMessage = (msg: IoChatMessage) => {
        if (!socket) return;
        socket.emit(IoEvents.SEND_CHAT_MESSAGE, msg);
    }

    const sendReaction = (reaction: ChatReaction) => {
        if (!socket) return;
        socket.emit(IoEvents.SEND_CHAT_REACT, reaction);
    }

    return {
        chatMsgs,
        sendMessage,
        sendReaction
    };
}

export default useChat;