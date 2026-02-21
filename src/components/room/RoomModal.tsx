import { MdOutlineContentCopy } from "react-icons/md";
import { copyToClipboard } from "../../utils/copyToClipboard";
import { useState, useEffect, useRef } from "react";
import roomLogo from "../../assets/roomLogo.png";
import { toast } from "react-hot-toast";

interface Props {
  onConfirm: () => void;
  roomLink: string;
}

const RoomModal = ({ onConfirm, roomLink }: Props) => {
    // const [requireApproval, setRequireApproval] = useState(false);
    const [name, setName] = useState("");
    useEffect(() => {
        const savedName = localStorage.getItem("moddieview:name");
        if (savedName) {
            setName(savedName);
        }
    }, []);


    const nameRef = useRef<HTMLInputElement>(null);
    const savedName = localStorage.getItem("moddieview:name") || "Anonymous Moddie";

    const handleJoin = () => {
        const finalName = nameRef.current?.value.trim() || "Anonymous Moddie";
        localStorage.setItem("moddieview:name", finalName);
        onConfirm();
        console.log("Joined with name:", finalName);
        console.log(localStorage.getItem("moddieview:name"));
    };
    
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleJoin();
                }}
                className="bg-gray-800 rounded-xl p-6 w-[88%] max-w-[500px]"
            >


                <div className="flex items-center mb-3">
                    <img src={roomLogo} alt="ModdieView logo" className="w-6 h-6 object-contain mr-1"
                    />
                    <h2 className="text-xl text-yellow-500 font-semibold ">Welcome to ModdieView</h2>
                </div>

                <p className="text-gray-300 mb-6 text-[16px] sm:text-[16px] md:text-[16px] lg:text-[17px]">
                Invite others and enjoy time together.
                </p>

                <div className="flex flex-col gap-2 rounded-lg mb-4">
                    <h2 className="text-[16px]">Room Link:</h2>
                    <div className="flex w-full items-center gap-2">
                        <span className="h-10 overflow-x-auto overflow-y-hidden whitespace-nowrap text-[16px] text-black px-3 py-2 bg-gray-300 rounded-sm flex-1 sm:px-4 sm:py-2">
                            {roomLink}
                        </span>
                        <button
                            type="button"
                            onClick={async () => {
                                const success = await copyToClipboard(roomLink);
                                if (success) {
                                    toast.success("Copied", { toasterId: "global-toaster" });
                                }
                            }}
                            title="Copy URL"
                            className="p-3 rounded-md bg-purple-700 hover:bg-purple-600 cursor-pointer"
                        >
                            {<MdOutlineContentCopy size={20} />}
                        </button>
                    </div>
                </div>

                <div className="mb-10 text-[16px]"> 
                    <label className="block mb-2 ">
                        Pick your name:
                    </label>
                    <input
                        type="text"
                        ref={nameRef}
                        defaultValue={savedName}
                        autoFocus
                        placeholder="Anonymous Moddie"
                        className="w-full px-3 py-2 rounded-sm text-black focus:outline-none bg-gray-300 sm:px-4 sm:py-2"
                    />
                </div>

                {/* <div className="flex rounded-lg mb-10 items-center">
                    <button
                        onClick={() => setRequireApproval(prev => !prev)}
                        className={`w-12 h-6 rounded-full transition relative cursor-pointer ${
                        requireApproval ? "bg-purple-600" : "bg-gray-600"
                        }`}
                    >
                        <span
                        className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition ${
                            requireApproval ? "translate-x-6" : ""
                        }`}
                        />
                    </button>
                    <span className="text-[15px] ml-2 text-gray-300/90">
                        Manually approve each user before joining.
                    </span>
                </div> */}

                <div className="flex justify-center">
                <button
                    type="submit"
                    title="Join Room"
                    className="px-6 py-2 rounded-lg bg-purple-700 hover:bg-purple-600 cursor-pointer text-md font-semibold"
                >
                    Join Room
                </button>
            </div>

        </form>
    </div>
    );
};

export default RoomModal;