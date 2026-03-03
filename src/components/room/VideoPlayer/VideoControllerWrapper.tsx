import React from "react";

interface VideoControllerWrapperProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
}

const VideoControllerWrapper: React.FC<VideoControllerWrapperProps> = ({ children, className, onClick }) => {
    return (
        <div 
            className={`bg-slate-800/20 hover:bg-slate-800 border-slate-700/30 flex justify-center items-center relative rounded p-1.5 cursor-pointer ${className || ''}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default VideoControllerWrapper;