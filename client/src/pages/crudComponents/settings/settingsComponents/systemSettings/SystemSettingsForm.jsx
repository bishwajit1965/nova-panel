import { LucideIcon } from "../../../../../components/lib/LucideIcons";
import Button from "../../../../../components/ui/Button";
import { Input } from "../../../../../components/ui/Input";

const SystemSettingsForm = ({
  data,
  onCancel,
  onMutation,
  selectedData,
  updateSettingsSection,
  buildSettingsPayload,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = buildSettingsPayload(selectedData, "system", data?.system);

    onMutation.mutate(payload);
  };
  return (
    <div className="lg:p-6 p-4 border border-base-content/15 rounded-xl shadow-md hover:shadow-xl">
      <h1 className="flex items-center gap-2 lg:text-xl font-bold">
        {!selectedData ? <LucideIcon.UploadCloud /> : <LucideIcon.Edit />}
        {`${selectedData ? "Update System Settings" : "Insert System Settings"}`}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-2">
        <Input
          type="text"
          label="Time Zone"
          name="timezone"
          placeholder="Time zone..."
          onChange={(e) =>
            updateSettingsSection("system", "timezone", e.target.value)
          }
          value={selectedData ? data?.system?.timezone : ""}
          required
        />
        <Input
          type="text"
          label="Date Format"
          name="dateFormat"
          placeholder="Date format..."
          onChange={(e) =>
            updateSettingsSection("system", "dateFormat", e.target.value)
          }
          value={selectedData ? data?.system?.dateFormat : ""}
          required
        />
        <Input
          type="text"
          label="Time Format"
          name="timeFormat"
          placeholder="Time format..."
          onChange={(e) =>
            updateSettingsSection("system", "timeFormat", e.target.value)
          }
          value={selectedData ? data?.system?.timeFormat : ""}
          required
        />
        <Input
          type="text"
          label="Language"
          name="language"
          placeholder="Language..."
          onChange={(e) =>
            updateSettingsSection("system", "language", e.target.value)
          }
          value={selectedData ? data?.system?.language : ""}
          required
        />
        <div className="flex items-center gap-2">
          <Input
            type="number"
            label="Pagination"
            name="pagination"
            placeholder="Pagination..."
            onChange={(e) =>
              updateSettingsSection("system", "pagination", e.target.value)
            }
            value={selectedData ? data?.system?.pagination : ""}
            required
          />
          <Input
            type="text"
            label="Default Theme"
            name="defaultTheme"
            placeholder="Default theme..."
            onChange={(e) =>
              updateSettingsSection("system", "defaultTheme", e.target.value)
            }
            value={selectedData ? data?.system?.defaultTheme : ""}
            required
          />
        </div>
        <div className="flex items-center gap-2">
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
            <Button size="sm" variant="warning" onClick={onCancel}>
              <LucideIcon.RefreshCcw size={18} />
              Cancel
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SystemSettingsForm;
