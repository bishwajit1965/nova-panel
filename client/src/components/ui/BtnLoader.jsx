import { Loader as LoaderIcon } from "lucide-react";

const BtnLoader = ({
  size = 20,
  color = "currentColor",
  message = "Processing...",
}) => {
  return (
    <div className="flex items-center justify-center gap-1">
      <LoaderIcon className="animate-spin" size={size} color={color} />
      <span className="text-sm font-medium text-base-100">{message}</span>
    </div>
  );
};

export default BtnLoader;
