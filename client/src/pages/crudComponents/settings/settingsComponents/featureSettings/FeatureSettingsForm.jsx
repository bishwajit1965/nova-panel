import { LucideIcon } from "../../../../../components/lib/LucideIcons";
import Button from "../../../../../components/ui/Button";

const FeatureSettingsForm = ({
  data,
  onCancel,
  onMutation,
  selectedData,
  updateSettingsSection,
  buildSettingsPayload,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = buildSettingsPayload(
      selectedData,
      "features",
      data.features,
    );

    onMutation.mutate(payload);
  };
  return (
    <div className="lg:p-6 p-3 border border-base-content/15 rounded-xl shadow-md hover:shadow-xl">
      <h1 className="flex items-center gap-2 lg:text-xl font-bold">
        {!selectedData ? <LucideIcon.UploadCloud /> : <LucideIcon.Edit />}
        {`${selectedData ? "Update Feature Settings" : "Insert Feature Settings"}`}
      </h1>
      <form onSubmit={handleSubmit} className="grid gap-2 lg:py-4 py-2">
        <label className="label">
          <input
            type="checkbox"
            checked={data?.features?.maintenanceMode || false}
            onChange={(e) =>
              updateSettingsSection(
                "features",
                "maintenanceMode",
                e.target.checked,
              )
            }
            className="checkbox checkbox-sm input-info text-white"
          />
          Maintenance
        </label>

        <label className="label">
          <input
            type="checkbox"
            checked={data?.features?.registrationEnabled || false}
            onChange={(e) =>
              updateSettingsSection(
                "features",
                "registrationEnabled",
                e.target.checked,
              )
            }
            className="checkbox checkbox-sm input-info text-white"
          />{" "}
          Registration
        </label>

        <div className="flex items-center gap-2 mt-4">
          <Button
            type="submit"
            size="sm"
            variant="primary"
            disabled={onMutation?.isPending}
          >
            {selectedData && !onMutation?.isPending ? (
              <LucideIcon.Edit size={18} />
            ) : onMutation?.isPending ? (
              <LucideIcon.Loader className="animate-spin" size={18} />
            ) : (
              <LucideIcon.UploadCloud size={18} />
            )}
            {selectedData && !onMutation?.isPending
              ? "Update"
              : onMutation?.isPending
                ? "Updating..."
                : "Upload"}
          </Button>
          {selectedData && (
            <Button
              type="button"
              size="sm"
              variant="warning"
              icon={LucideIcon.RefreshCcw}
              onClick={onCancel}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default FeatureSettingsForm;
