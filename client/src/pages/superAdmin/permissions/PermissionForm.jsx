import { LucideIcon } from "../../../components/lib/LucideIcons";
import Button from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import Loader from "../../../components/ui/Loader";
import Textarea from "../../../components/ui/Textarea";

const PermissionForm = ({
  permissionToUpdate,
  onUpdate,
  formData,
  errors,
  onHandleChange,
  loading,
  onCancel,
}) => {
  return (
    <div>
      <div className="relative">
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-70 backdrop-blur-sm flex items-center rounded-md justify-center z-10">
            <Loader />
          </div>
        )}
        <div className="">
          <h1 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            {permissionToUpdate ? (
              <LucideIcon.Edit />
            ) : (
              <LucideIcon.UploadCloud />
            )}
            {permissionToUpdate ? "Edit Permission" : "Create New Permission"}
          </h1>
        </div>
        <form onSubmit={onUpdate} className="space-y-2">
          <Input
            type="text"
            name="key"
            label="Permission Key"
            placeholder="Enter permission key"
            value={formData?.key}
            onChange={onHandleChange}
            error={errors.key}
          />

          <Textarea
            type="text"
            name="description"
            label="Permission Description"
            placeholder="Enter permission description"
            value={formData?.description}
            onChange={onHandleChange}
            error={errors.description}
          />

          <Input
            type="text"
            name="module"
            label="Module"
            placeholder="Enter module"
            value={formData?.module}
            onChange={onHandleChange}
            error={errors.module}
          />
          <div className="flex gap-2 mt-4">
            <Button
              type="submit"
              size="sm"
              icon={
                permissionToUpdate ? LucideIcon.Edit : LucideIcon.UploadCloud
              }
              className=" "
            >
              {permissionToUpdate ? "Update Permission" : "Create Permission"}
            </Button>

            <Button
              onClick={onCancel}
              type="button"
              size="sm"
              icon={LucideIcon.RotateCcw}
              variant="warning"
              className=" "
            >
              Reset
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PermissionForm;
