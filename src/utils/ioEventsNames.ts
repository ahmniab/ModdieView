const IoEvents = Object.freeze({
    CONNECT: "connect",
    DISCONNECT: "disconnect",
    ROOM_DATA: "roomData",

    GET_ROOM_DATA: "CMD:getRoomData",
    USERS_UPDATE: "CMD:usersUpdate",
    SET_USER_NAME: "CMD:name",

    SEND_CHAT_MESSAGE: "CHAT:chatMessage",
    RESIEVE_CHAT_MESSAGE: "CHAT:newChatMessage",
    SEND_CHAT_REACT: "CHAT:reactOnMessage",
    RESIEVE_CHAT_REACT: "CHAT:newChatReaction",

    CONTENT_CHANGE: "CONTENT:change",
    CONTENT_VIDEO_PLAY: "CONTENT:video.play",
    CONTENT_VIDEO_PAUSE: "CONTENT:video.pause",
    CONTENT_VIDEO_SEEK: "CONTENT:video.seek",
    CONTENT_VIDEO_PLAYBACK_RATE_CHANGE: "CONTENT:video.playbackRateChange",
    CONTENT_VIDEO_CHANGE_PLAYBACK_RATE: "CONTENT:video.changePlaybackRate",
    INITIALIZE_VIDEO: "CONTENT:video.initialize",
});
export default IoEvents;