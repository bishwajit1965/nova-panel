import { LucideIcon } from "../../../components/lib/LucideIcons";
import Button from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import Loader from "../../../components/ui/Loader";
import Textarea from "../../../components/ui/Textarea";

const RoleForm = ({
  roleToUpdate,
  onCancel,
  onUpdate,
  onHandleChange,
  loading,
  errors,
  formData,
}) => {
  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 top-0 left-0 bg-white bg-opacity-70 backdrop-blur-sm flex items-center justify-center rounded-md z-10">
          <Loader />
        </div>
      )}

      <div className="">
        <h1 className="text-2xl font-semibold mb- flex items-center gap-2">
          {roleToUpdate ? <LucideIcon.Edit /> : <LucideIcon.UploadCloud />}
          {roleToUpdate ? "Edit Role" : "Create New Role"}
        </h1>
      </div>
      <form onSubmit={onUpdate} className="space-y-2">
        <Input
          type="text"
          name="name"
          label="Role Name"
          placeholder="Enter role name"
          value={formData?.name}
          onChange={onHandleChange}
          error={errors.name}
        />

        <Textarea
          type="text"
          name="description"
          label="Role Description"
          placeholder="Enter role description"
          value={formData?.description}
          onChange={onHandleChange}
          error={errors?.description}
          className="textarea"
        />

        <Input
          type="text"
          name="slug"
          label="Role Slug"
          placeholder="Enter role slug"
          value={formData?.slug}
          onChange={onHandleChange}
          error={errors.slug}
        />

        <div className="flex gap-2 mt-4">
          <Button
            type="submit"
            size="sm"
            disabled={loading}
            icon={roleToUpdate ? LucideIcon.Edit : LucideIcon.UploadCloud}
            className=" "
          >
            {roleToUpdate ? "Update Role" : "Create Role"}
          </Button>

          {roleToUpdate && (
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
          )}
        </div>
      </form>
    </div>
  );
};

export default RoleForm;
