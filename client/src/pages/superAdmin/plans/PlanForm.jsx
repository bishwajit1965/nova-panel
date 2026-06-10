import { LucideIcon } from "../../../components/lib/LucideIcons";
import Button from "../../../components/ui/Button";
import { Input } from "../../../components/ui/Input";
import Textarea from "../../../components/ui/Textarea";

const PlanForm = ({
  onPlanSubmit,
  formData,
  onHandleChange,
  planToUpdate,
  onCancel,
  PLAN_LIMIT_PRESETS,
  setForm,
  planMutation,
  errors,
}) => {
  return (
    <div>
      <div className="border border-base-content/15 rounded-xl lg:p-6 p-4">
        <h1 className="flex items-center gap-2 lg:text-xl text-lg font-extrabold">
          {planToUpdate ? <LucideIcon.Edit /> : <LucideIcon.UploadCloudIcon />}{" "}
          {planToUpdate ? "Update Plan" : "Create Plan"}
        </h1>
        <form onSubmit={onPlanSubmit} className="space-y-2">
          <Input
            label="Name"
            type="text"
            name="name"
            placeholder="Plan name..."
            value={formData?.name}
            onChange={onHandleChange}
            error={errors.name}
          />
          <Input
            type="text"
            name="slug"
            label="Slug"
            placeholder="Plan slug..."
            value={formData?.slug}
            onChange={onHandleChange}
            error={errors.slug}
          />
          <Input
            type="number"
            name="durationInDays"
            label="Duration"
            placeholder="Plan duration..."
            value={formData?.durationInDays}
            onChange={onHandleChange}
            error={errors.durationInDays}
          />
          <Input
            type="text"
            name="features"
            label="Features"
            placeholder="Plan features..."
            value={formData?.features}
            onChange={onHandleChange}
            error={errors.features}
          />

          <Input
            label="Price"
            type="number"
            name="price"
            placeholder="Plan price..."
            value={formData?.price}
            onChange={onHandleChange}
            error={errors.price}
          />

          <select
            name="packageType"
            value={formData.packageType || ""}
            onChange={(e) => {
              const pkg = e.target.value;

              setForm((prev) => ({
                ...prev,
                packageType: pkg,
                limitPackages: PLAN_LIMIT_PRESETS[pkg] || {},
              }));
            }}
            className={`select w-full transition-all duration-150 border ${
              errors?.packageType
                ? "border-red-500 focus:border-red-500"
                : "border-base-content/25 focus:border-blue-500"
            }`}
            error={errors.packageType}
          >
            <option value="">Select Package</option>
            <option value="starter">Starter</option>
            <option value="pro">Pro</option>
            <option value="enterprise">Enterprise</option>
          </select>

          <Textarea
            label="Description"
            type="text"
            name="description"
            placeholder="Plan description.."
            value={formData?.description}
            onChange={onHandleChange}
            className="textarea w-full"
            error={errors.description}
          />

          <div className="flex items-center gap-2">
            <Button variant="primary" disabled={planMutation.isPending}>
              {planMutation.isPending ? (
                <LucideIcon.Loader className="animate-spin" size={20} />
              ) : planToUpdate ? (
                <LucideIcon.Edit size={20} />
              ) : (
                <LucideIcon.UploadCloudIcon size={20} />
              )}
              {planMutation.isPending
                ? "Updating..."
                : planToUpdate
                  ? "Update Plan"
                  : "Create Plan"}
            </Button>
            {planToUpdate && (
              <Button type="button" variant="warning" onClick={onCancel}>
                <LucideIcon.RotateCcw size={20} /> Cancel Cancel
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlanForm;
