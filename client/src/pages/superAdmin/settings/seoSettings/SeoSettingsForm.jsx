import { LucideIcon } from "../../../../components/lib/LucideIcons";
import Button from "../../../../components/ui/Button";
import { Input } from "../../../../components/ui/Input";

const SeoSettingsForm = ({
  onSelect,
  onCancel,
  data,
  setData,
  onMutation,
  onFormSubmit,
}) => {
  // 🔥 safe update helper for nested SEO object
  const updateSite = (key, value) => {
    setData((prev) => ({
      ...prev,
      seo: {
        ...prev?.seo,
        [key]: value,
      },
    }));
  };
  return (
    <div className="lg:p-6 p-3 border border-base-content/15 rounded-xl shadow-md hover:shadow-xl">
      <h1 className="flex items-center gap-2 lg:text-xl font-bold">
        {!onSelect ? <LucideIcon.UploadCloud /> : <LucideIcon.Edit />}
        {`${onSelect ? "Update Seo Settings" : "Insert Seo Settings"}`}
      </h1>
      <form onSubmit={onFormSubmit} className="space-y-2">
        <Input
          name="title"
          label="Seo Title"
          placeholder="Seo title..."
          onChange={(e) => updateSite("title", e.target.value)}
          value={onSelect ? data?.seo?.title : ""}
        />
        <Input
          name="description"
          label="Seo Description"
          placeholder="Seo description..."
          onChange={(e) => updateSite("description", e.target.value)}
          value={onSelect ? data?.seo?.description : ""}
        />
        <Input
          name="keywords"
          label="Seo keywords"
          placeholder="Seo keywords..."
          onChange={(e) => updateSite("keywords", e.target.value)}
          value={onSelect ? data?.seo?.keywords : ""}
        />

        <div className="flex items-center gap-2 mt-4">
          <Button
            type="submit"
            size="xs"
            variant="primary"
            disabled={onMutation?.isPending}
          >
            {onSelect && !onMutation?.isPending ? (
              <LucideIcon.Edit size={18} />
            ) : onMutation?.isPending ? (
              <LucideIcon.Loader className="animate-spin" size={18} />
            ) : (
              <LucideIcon.UploadCloud size={18} />
            )}
            {onSelect && !onMutation?.isPending
              ? "Update"
              : onMutation?.isPending
                ? "Updating..."
                : "Upload"}
          </Button>
          {onSelect && (
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
