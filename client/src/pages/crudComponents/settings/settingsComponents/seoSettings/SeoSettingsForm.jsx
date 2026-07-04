import { LucideIcon } from "../../../../../components/lib/LucideIcons";
import Button from "../../../../../components/ui/Button";
import { Input } from "../../../../../components/ui/Input";

const SeoSettingsForm = ({
  data,
  onCancel,
  onMutation,
  selectedData,
  updateSettingsSection,
  buildSettingsPayload,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = buildSettingsPayload(selectedData, "seo", data.seo);

    onMutation.mutate(payload);
  };

  return (
    <div className="lg:p-6 p-3 border border-base-content/15 rounded-xl shadow-md hover:shadow-xl">
      <h1 className="flex items-center gap-2 lg:text-xl font-bold">
        {!selectedData ? <LucideIcon.UploadCloud /> : <LucideIcon.Edit />}
        {`${selectedData ? "Update Seo Settings" : "Insert Seo Settings"}`}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-2">
        <Input
          name="title"
          label="Seo Title"
          placeholder="Seo title..."
          onChange={(e) =>
            updateSettingsSection("seo", "title", e.target.value)
          }
          value={selectedData ? data?.seo?.title : ""}
          required
        />
        <Input
          name="description"
          label="Seo Description"
          placeholder="Seo description..."
          onChange={(e) =>
            updateSettingsSection("seo", "description", e.target.value)
          }
          value={selectedData ? data?.seo?.description : ""}
          required
        />
        <Input
          name="keywords"
          label="Seo keywords"
          placeholder="Seo keywords..."
          onChange={(e) =>
            updateSettingsSection(
              "seo",
              "keywords",
              e.target.value
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean),
            )
          }
          value={selectedData ? data?.seo?.keywords : ""}
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

export default SeoSettingsForm;
