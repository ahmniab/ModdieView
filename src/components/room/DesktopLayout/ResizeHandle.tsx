interface Props {
  onStartDrag: () => void;
}

const ResizeHandle = ({ onStartDrag }: Props) => {
  return (
    <div
      onMouseDown={onStartDrag}
      className="w-1 cursor-col-resize bg-gray-700 hover:bg-purple-600"
    />
  );
};

export default ResizeHandle;