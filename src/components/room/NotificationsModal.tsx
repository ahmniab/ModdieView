import { useRef } from "react";
import { useClickOutside } from "@/hooks";
import { useRoom } from "@/contexts/RoomContext";
import { notificationText, notificationIcons } from "@/utils/notifications";

interface NotificationsModalProps {
  onClose: () => void;
}

const NotificationsModal = ({ onClose }: NotificationsModalProps) => {
  const { newNotification } = useRoom();
  const containerRef = useRef<HTMLDivElement>(null);

  useClickOutside(containerRef, onClose);

  const formatTime = (time: number) =>
    new Date(time).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="absolute right-4 top-14 bg-gray-800 z-[50] rounded-b-xl" ref={containerRef}>
      <div className="w-[260px] h-[300px] px-6 py-4 shadow-lg overflow-y-auto custom-scroll">
        <h1 className="text-lg font-semibold mb-2">Notifications</h1>
        <div>
          {newNotification.map((n) => {
            const Icon = notificationIcons[n.type];
            return (
                <div key={n.id} className="mb-2 flex items-center gap-2 text-slate-200">
                    {Icon && <Icon className="text-md shrink-0 mr-2" />}
                    <span className="flex-1">
                        <span className="font-semibold">{n.producerName}</span>{" "}
                        {notificationText[n.type]} {" "}
                        <span className="text-xs text-gray-400 whitespace-nowrap">
                            {formatTime(n.createdAt)}
                        </span>
                    </span>
                </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NotificationsModal;