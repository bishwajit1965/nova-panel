import { LucideIcon } from "../../../components/lib/LucideIcons";
import Button from "../../../components/ui/Button";
import { usePermission } from "../../../hooks/hasPermission";
import { normalizeDate } from "../../../utils/normalizeDate";

const UploadCard = ({ upload, onSelect, onView, onConfirmDelete }) => {
  const { can } = usePermission();
  return (
    <div className="lg:col-span-4 col-span-12">
      <figure className="relative">
        <img
          src={upload?.url}
          alt={upload?.originalName}
          className="h-40 object-cover bg-conic-0 w-full rounded-xl transition duration-300 hover:scale-105"
        />
        <figcaption className="absolute bottom-0 left-0 right-0 text-xs bg-gray-600 text-base-200 rounded-b-xl p-1 opacity-70">
          {upload?.originalName} <br /> Uploaded at:{" "}
          {normalizeDate(upload?.createdAt)}
        </figcaption>
      </figure>
      <div className="mt-2 flex items-center gap-2">
        <Button
          size="xs"
          variant="primary"
          icon={LucideIcon.EyeIcon}
          onClick={() => onView(upload)}
        >
          View
        </Button>

        <Button
          onClick={() => onSelect(upload)}
          size="xs"
          variant="success"
          icon={LucideIcon.Edit}
        >
          Update
        </Button>

        {can("upload.delete") && (
          <Button
            onClick={() => onConfirmDelete(upload)}
            size="xs"
            variant="danger"
            icon={LucideIcon.Trash2}
          >
            Delete
          </Button>
        )}
      </div>
    </div>
  );
};

export default UploadCard;
