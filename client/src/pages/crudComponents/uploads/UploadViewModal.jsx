import Modal from "../../../components/ui/Modal";
import Button from "../../../components/ui/Button";
import { normalizeDate } from "../../../utils/normalizeDate";
import { LucideIcon } from "../../../components/lib/LucideIcons";

const UploadViewModal = ({ isOpen, onClose, upload }) => {
  if (!upload) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upload Details">
      <div className="space-y-4">
        <img
          src={upload?.url}
          alt={upload?.originalName}
          className="w-full max-h-100 object-contain rounded-lg border border-base-content/10"
        />

        <div className="space-y-2 text-sm">
          <p>
            <span className="font-bold">File Name:</span> {upload?.originalName}
          </p>

          <p>
            <span className="font-bold">Uploaded:</span>{" "}
            {normalizeDate(upload?.createdAt)}
          </p>

          <p>
            <span className="font-bold">URL:</span>
          </p>

          <div className="flex gap-2">
            <input
              readOnly
              value={upload?.url}
              className="input input-bordered input-sm w-full"
            />

            <Button
              size="xs"
              variant="primary"
              onClick={() => {
                navigator.clipboard.writeText(upload?.url);
              }}
            >
              <LucideIcon.Copy />
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UploadViewModal;
