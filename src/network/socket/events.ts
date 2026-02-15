export const SOCKET_EVENTS = {
  // room
  JOIN_ROOM: "join-room",
  LEAVE_ROOM: "leave-room",

  // video sync
  VIDEO_READY: "video-ready",
  VIDEO_PLAY: "video-play",
  VIDEO_PAUSE: "video-pause",
  VIDEO_SEEK: "video-seek",
  VIDEO_SPEED: "video-speed",

  // state sync
  REQUEST_VIDEO_STATE: "request-video-state",
  VIDEO_STATE: "video-state",
} as const;