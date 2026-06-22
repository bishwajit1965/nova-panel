import { LucideIcon } from "../../../../../components/lib/LucideIcons";
import Button from "../../../../../components/ui/Button";
import { Input } from "../../../../../components/ui/Input";

const BrandingSettingForm = ({
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
      "branding",
      data.branding,
    );

    onMutation.mutate(payload);
  };

  return (
    <div className="lg:p-6 p-3 border border-base-content/15 rounded-xl shadow-md hover:shadow-xl">
      <h1 className="flex items-center gap-2 lg:text-xl font-bold">
        {!selectedData ? <LucideIcon.UploadCloud /> : <LucideIcon.Edit />}
        {`${selectedData ? "Update Brand Settings" : "Insert Brand Settings"}`}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-2">
        <Input
          name="primaryColor"
          label="Primary Color"
          placeholder="Primary color..."
          onChange={(e) =>
            updateSettingsSection("branding", "primaryColor", e.target.value)
          }
          value={selectedData ? data?.branding?.primaryColor : ""}
          required
        />
        <Input
          name="secondaryColor"
          label="Secondary Color"
          placeholder="Secondary color..."
          onChange={(e) =>
            updateSettingsSection("branding", "secondaryColor", e.target.value)
          }
          value={selectedData ? data?.branding?.secondaryColor : ""}
          required
        />
        <Input
          name="footerText"
          label="Footer text"
          placeholder="Footer text..."
          onChange={(e) =>
            updateSettingsSection("branding", "footerText", e.target.value)
          }
          value={selectedData ? data?.branding?.footerText : ""}
          required
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

export default BrandingSettingForm;
