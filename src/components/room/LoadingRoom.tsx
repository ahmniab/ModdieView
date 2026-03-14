export const LoadingRoomModal = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center flex-col z-50 bg-gray-800/90">
        <div className="flex justify-center items-center mb-2">
          <div className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mr-4"/>
            <h2 className="text-3xl font-semibold">
            Loading room
            </h2>
        </div>
        <h2 className="text-white/60">
          Please wait a moment...
        </h2>
      </div>
  );
};