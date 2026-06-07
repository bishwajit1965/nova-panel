import {
  CircleCheckIcon,
  Edit,
  Edit2,
  Eye,
  FileSliders,
  Loader2,
  LucideDownload,
  Pencil,
  PlusCircleIcon,
  Trash2,
  X,
} from "lucide-react";

import { FaFilePdf } from "react-icons/fa";

import Button from "./Button";
import { cn } from "../lib/utils";

const icons = {
  edit: Edit,
  edit2: Edit2,
  delete: Trash2,
  file: FileSliders,
  view: Eye,
  add: PlusCircleIcon,
  close: X,
  download: LucideDownload,
  select: CircleCheckIcon,
  pdf: FaFilePdf,
};

const labels = {
  edit: "Edit",
  edit2: "Edit",
  delete: "Delete",
  file: "File",
  view: "View",
  add: "Add",
  close: "Close",
  download: "Download",
  pdf: "PDF",
  select: "Select",
};

export function MiniIconButton({
  icon = "edit",
  onClick,
  variant = "muted",
  tooltip,
  loading = false,
  disabled = false,
  showLabel = false,
  size = "xs",
  className,
}) {
  const Icon = loading ? Loader2 : icons[icon] || Pencil;

  const text = tooltip || labels[icon?.toLowerCase()] || "Action";

  const sizes = {
    xs: "w-7 h-7 p-0",
    sm: "w-8 h-8 p-0",
    md: "w-10 h-10 p-0",
  };

  return (
    <Button
      icon={Icon}
      onClick={onClick}
      variant={variant}
      loading={loading}
      disabled={disabled}
      size={size}
      tooltip={!showLabel ? text : undefined}
      className={cn(sizes[size], "shadow-sm", className)}
    >
      {showLabel && text}
    </Button>
  );
}
