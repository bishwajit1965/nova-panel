import Modal from "../../../components/ui/Modal";
import Button from "../../../components/ui/Button";
import { normalizeDate } from "../../../utils/normalizeDate";
import { LucideIcon } from "../../../components/lib/LucideIcons";
import { useState } from "react";
import { formatFileSize } from "../../../utils/formatFileSize";

const UploadViewModal = ({ isOpen, onClose, upload }) => {
  const [copied, setCopied] = useState(false);
  const [urlCopied, setUrlCopied] = useState(false);

  if (!upload) return null;

  // Public Id & Url copier helper
  const copyToClipboard = async (text, setter) => {
    try {
      await navigator.clipboard.writeText(text);

      setter(true);

      setTimeout(() => setter(false), 2000);
    } catch (error) {
      console.error("Copy failed", error);
    }
  };

  const handleDownload = async () => {
    if (!upload?.url) return;

    try {
      const response = await fetch(upload.url);
      const blob = await response.blob();

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = upload.name || "image.jpg";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(link.href);
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Upload Details">
      <div className="space-y-4">
        <img
          src={upload?.url}
          alt={upload?.originalName}
          className="w-full max-h-100 object-cover rounded-lg border border-base-content/10   transition-transform duration-300 hover:scale-105 cursor-pointer"
        />
        {/* Open image in a new window */}
        <Button
          onClick={() =>
            window.open(upload.url, "_blank", "noopener,noreferrer")
          }
          size="xs"
          title="Open full image"
          className="flex items-center gap-1.5 text-sm cursor-pointer"
        >
          <LucideIcon.Link size={14} />
          Open Image
        </Button>{" "}
        &nbsp;
        <Button
          onClick={handleDownload}
          size="xs"
          variant="success"
          title="Download image"
        >
          <LucideIcon.DownloadCloud size={14} /> Download
        </Button>
        <div className="space-y-2 text-sm">
          <p className="">
            <span className="font-bold">File Name:</span> {upload?.originalName}
          </p>

          <div className="grid  lg:grid-cols-12 grid-cols-1 items-center justify-between gap-1.25">
            <div className="lg:col-span-2 col-span-12">
              {" "}
              <p className="inline-flex">
                <span className="font-bold inline-flex items-center">
                  Public Id:
                </span>
              </p>
            </div>
            <div className="lg:col-span-10 col-span-12">
              <div className="inline-flex items-center gap-2 w-full">
                <input
                  readOnly
                  value={upload?.publicId}
                  className="input input-bordered input-sm w-full"
                />

                <Button
                  size="xs"
                  variant="primary"
                  onClick={() => copyToClipboard(upload?.publicId, setCopied)}
                  title="Copy Public Id"
                >
                  <LucideIcon.Copy size={18} />
                </Button>
                {copied && (
                  <span className="border border-base-content/15 rounded-md px-1.75 py-1 text-xs bg-base-300 flex items-center gap-1 text-gray-600">
                    <LucideIcon.Check size={14} className="text-blue-500" />
                    Copied
                  </span>
                )}
              </div>
            </div>
          </div>

          <p className="flex items-center flex-wrap">
            Uploaded By:{" "}
            <span className="font-bold"> {upload?.user?.name}</span>
          </p>

          <p>
            Uploader Role(s): &nbsp;
            {upload?.user?.roles?.map((r, index) => (
              <span
                key={index}
                className="badge mr-1.25 badge-primary text-base-100 text-sm"
              >
                {r?.name}
              </span>
            ))}
          </p>

          <div className="flex items-center justify-between">
            <p>
              <span className="">Uploaded On:</span>{" "}
              {normalizeDate(upload?.createdAt)}
            </p>

            <p>
              <span className="">Updated On:</span>{" "}
              {normalizeDate(upload?.updatedAt)}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <p>MIME Type: {upload?.mimeType}</p>

            <p>File Size: {formatFileSize(upload?.size)}</p>
          </div>
          <div className="flex items-center justify-between gap-1.25">
            <p>
              <span className="font-bold">URL:</span>
            </p>

            <div className="flex items-center gap-2 w-full">
              <input
                readOnly
                value={upload?.url}
                className="input input-bordered input-sm w-full b break-all"
              />

              <Button
                size="xs"
                variant="primary"
                onClick={() => copyToClipboard(upload?.url, setUrlCopied)}
                title="Copy Url"
              >
                <LucideIcon.Copy size={18} />
              </Button>

              {urlCopied && (
                <span className="border border-base-content/15 rounded-md px-1.75 py-1 text-sm bg-base-300 flex items-center gap-1 text-gray-600">
                  <LucideIcon.Check size={14} className="text-blue-500" />
                  Copied
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UploadViewModal;
