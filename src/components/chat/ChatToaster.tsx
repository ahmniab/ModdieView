import { Toaster } from "react-hot-toast";
import favicon from "../../../public/favicon.ico";

const ChatToaster = () => {
  return (
    <Toaster
      toasterId="chat-toaster"
      toastOptions={{
        duration: 1500,
        icon: <img src={favicon} alt="ModdieView icon" width="18" height="18" />,
        style: {
            transform: "none",
            animation: "none", 
            background: "rgba(0, 0, 0, 0.45)",
            color: "#fff",
            borderRadius: "8px",
            padding: "10px 15px",
            fontSize: "14px",
        },
      }}
      containerStyle={{
        position: "absolute",
        top: "auto",
        bottom: "115px",
        left: "0",
        right: "0",
        margin: "0 auto",
        pointerEvents: "none",
      }}
    />
  );
};

export default ChatToaster;