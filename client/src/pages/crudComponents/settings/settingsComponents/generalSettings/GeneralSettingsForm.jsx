import { LucideIcon } from "../../../../../components/lib/LucideIcons";
import Button from "../../../../../components/ui/Button";
import { Input } from "../../../../../components/ui/Input";
import Textarea from "../../../../../components/ui/Textarea";

const GeneralSettingsForm = ({
  data,
  onCancel,
  onMutation,
  selectedData,
  updateSettingsSection,
  buildSettingsPayload,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = buildSettingsPayload(selectedData, "site", data?.site);

    onMutation.mutate(payload);
  };

  return (
    <div className="lg:p-6 p-3 border border-base-content/15 rounded-xl shadow-md hover:shadow-xl">
      <h1 className="flex items-center gap-2 lg:text-xl font-bold">
        {!selectedData ? <LucideIcon.UploadCloud /> : <LucideIcon.Edit />}
        {`${selectedData ? "Update Site Settings" : "Insert Site Settings"}`}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-2">
        <Input
          name="name"
          label="Site Name"
          placeholder="Site name..."
          onChange={(e) =>
            updateSettingsSection("site", "name", e.target.value)
          }
          value={selectedData ? data?.site?.name : ""}
          required
        />

        <Input
          name="website"
          label="Website Link"
          placeholder="Website link..."
          onChange={(e) =>
            updateSettingsSection("site", "website", e.target.value)
          }
          value={selectedData ? data?.site?.website : ""}
          required
        />

        <Textarea
          onChange={(e) =>
            updateSettingsSection("site", "description", e.target.value)
          }
          value={selectedData ? data?.site?.description : ""}
          required
          label="Site Description"
          name="description"
          placeholder="Description..."
        />

        <div className="flex items-center gap-2 mt-4">
          <Button
            type="submit"
            size="xs"
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
              size="xs"
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

export default GeneralSettingsForm;
