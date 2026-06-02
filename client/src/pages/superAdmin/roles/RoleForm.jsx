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
  console.log("The role selected to update:", roleToUpdate);
  console.log(errors);
  console.log(errors.description);
  return (
    <div>
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-70 backdrop-blur-sm flex items-center justify-center z-10">
          <Loader />
        </div>
      )}
      <div className="">
        <h1 h1 className="text-2xl font-semibold mb-4 flex items-center gap-2">
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
        {errors.name && (
          <p className="text-red-600 absolute bottom-1 right-8">
            <span className="text-xs">{errors.name}</span>
          </p>
        )}
        <Textarea
          type="text"
          name="description"
          label="Role Description"
          placeholder="Enter role description"
          value={formData?.description}
          onChange={onHandleChange}
          error={errors.description}
        />
        {errors.description && (
          <p className="text-red-600 absolute bottom-1 right-8">
            <span className="text-xs">{errors.description}</span>
          </p>
        )}
        <Input
          type="text"
          name="slug"
          label="Role Slug"
          icon={LucideIcon.ArrowBigRight}
          placeholder="Enter role slug"
          value={formData?.slug}
          onChange={onHandleChange}
          error={errors.slug}
        />
        {errors.slug && (
          <p className="text-red-600 absolute bottom-1 right-8">
            <span className="text-xs">{errors.slug}</span>
          </p>
        )}
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
  );
};

export default RoleForm;
