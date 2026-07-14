import {
  ArchiveIcon,
  ArrowBigUpDash,
  BookCheck,
  CircleCheckIcon,
  CreditCardIcon,
  Edit,
  Edit2,
  Eye,
  FileSliders,
  ImageIcon,
  Loader2,
  LucideDownload,
  Pencil,
  PlusCircleIcon,
  TimerReset,
  Trash2,
  User,
  UserCircleIcon,
  UserKeyIcon,
  X,
} from "lucide-react";

import { FaFilePdf } from "react-icons/fa";

import Button from "./Button";
import { cn } from "../lib/utils";

const icons = {
  archive: ArchiveIcon,
  avatar: UserCircleIcon,
  edit: Edit,
  edit2: Edit2,
  delete: Trash2,
  file: FileSliders,
  view: Eye,
  add: PlusCircleIcon,
  close: X,
  download: LucideDownload,
  select: CircleCheckIcon,
  assign: CreditCardIcon,
  user: User,
  suspend: TimerReset,
  publish: BookCheck,
  revoke: ArrowBigUpDash,
  soft: Trash2,
  profile: ImageIcon,
  password: UserKeyIcon,
  pdf: FaFilePdf,
};

const labels = {
  archive: "Archive",
  avatar: "Change Avatar",
  assign: "Assign",
  edit: "Edit",
  edit2: "Edit",
  delete: "Delete",
  file: "File",
  view: "View",
  add: "Add",
  close: "Close",
  download: "Download",
  pdf: "PDF",
  revoke: "Revoke Status",
  select: "Select",
  suspend: "Suspend",
  user: "User",
  publish: "Publish",
  soft: "Soft Delete",
  profile: "Edit Profile",
  password: "Change Password",
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
    xs: "w-8 h-8 p-0",
    sm: "w-9 h-9 p-0",
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
