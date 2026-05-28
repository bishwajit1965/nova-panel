import {
  AlertTriangleIcon,
  CircleCheckBig,
  Trash2Icon,
  XCircle,
} from "lucide-react";

import Modal from "./Modal";
import Button from "./Button";

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  icon = <CircleCheckBig size={24} className="text-blue-500" />,
  title = "Confirm Action",
  message = "Are you sure you want to continue?",
  confirmText = "Delete",
  cancelText = "Cancel",
  loading = false,
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-4">
        {/* Message */}
        <div className="flex items-start gap-3">
          <span className="mt-0.5">{icon}</span>

          <p className="text-sm text-gray-700">{message}</p>
        </div>

        {/* Warning */}
        <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2">
          <AlertTriangleIcon size={18} className="mt-0.5 text-red-500" />

          <p className="text-xs text-red-700">
            Once deleted, this action cannot be undone.
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose} icon={XCircle}>
            {cancelText}
          </Button>

          <Button
            variant="danger"
            onClick={onConfirm}
            icon={Trash2Icon}
            loading={loading}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
