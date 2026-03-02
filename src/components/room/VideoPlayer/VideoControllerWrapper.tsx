import React from "react";

interface VideoControllerWrapperProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

const VideoControllerWrapper: React.FC<VideoControllerWrapperProps> = ({ children, className, onClick }) => {
    return (
        <div 
            className={`bg-slate-800/20 hover:bg-slate-800/50 border-slate-700/30 flex justify-center items-center relative rounded-full p-4 cursor-pointer ${className || ''}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default VideoControllerWrapper;