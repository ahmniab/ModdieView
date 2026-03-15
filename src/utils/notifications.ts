import type { IconType } from "react-icons";
import { PiPlayFill } from "react-icons/pi";
import { TbPlayerPause } from "react-icons/tb";
import { FaExchangeAlt } from "react-icons/fa";
import { PiFastForwardFill } from "react-icons/pi";
import { SiSpeedypage } from "react-icons/si";
import { PiUserPlusFill } from "react-icons/pi";
import { PiUserMinusFill } from "react-icons/pi";

export const notificationText: Record<string, string> = {
  play: "played the video.",
  pause: "paused the video.",
  seek: "seeked the video.",
  playbackRate: "changed playback speed.",
  videoChange: "changed the video.",
  join: "joined the room.",
  leave: "left the room.",

};

export const notificationIcons: Record<string,IconType> = {
  play: PiPlayFill,
  pause: TbPlayerPause,
  seek: PiFastForwardFill,
  playbackRate: SiSpeedypage,
  videoChange: FaExchangeAlt,
  join: PiUserPlusFill,
  leave: PiUserMinusFill,
};