import { LucideIcon } from "../../../../../components/lib/LucideIcons";
import Button from "../../../../../components/ui/Button";
import { Input } from "../../../../../components/ui/Input";

const SocialSettingsForm = ({
  data,
  onCancel,
  onMutation,
  selectedData,
  updateSettingsSection,
  buildSettingsPayload,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = buildSettingsPayload(selectedData, "social", data.social);

    onMutation.mutate(payload);
  };
  return (
    <div className="lg:p-6 p-3 border border-base-content/15 rounded-xl shadow-md hover:shadow-xl">
      <h1 className="flex items-center gap-2 lg:text-xl font-bold">
        {!selectedData ? <LucideIcon.UploadCloud /> : <LucideIcon.Edit />}
        {`${selectedData ? "Update Social Settings" : "Insert Social Settings"}`}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-2">
        <Input
          name="facebook"
          label="Facebook Url"
          placeholder="Facebook url..."
          onChange={(e) =>
            updateSettingsSection("social", "facebook", e.target.value)
          }
          value={selectedData ? data?.social?.facebook : ""}
          required
        />
        <Input
          name="instagram"
          label="Instagram Url"
          placeholder="Instagram url..."
          onChange={(e) =>
            updateSettingsSection("social", "instagram", e.target.value)
          }
          value={selectedData ? data?.social?.instagram : ""}
          required
        />
        <Input
          name="linkedin"
          label="LinkedIn Url"
          placeholder="LinkedIn url..."
          onChange={(e) =>
            updateSettingsSection("social", "linkedin", e.target.value)
          }
          value={selectedData ? data?.social?.linkedin : ""}
        />
        <Input
          name="github"
          label="GitHub Url"
          placeholder="GitHub url..."
          onChange={(e) =>
            updateSettingsSection("social", "github", e.target.value)
          }
          value={selectedData ? data?.social?.github : ""}
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

export default SocialSettingsForm;
