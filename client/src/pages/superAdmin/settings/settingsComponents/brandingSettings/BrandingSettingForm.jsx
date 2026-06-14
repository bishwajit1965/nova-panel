import { LucideIcon } from "../../../../../components/lib/LucideIcons";
import Button from "../../../../../components/ui/Button";
import { Input } from "../../../../../components/ui/Input";

const BrandingSettingForm = ({
  data,
  setData,
  onSelect,
  onCancel,
  onMutation,
  onFormSubmit,
}) => {
  // 🔥 safe update helper for nested site object
  const updateSite = (key, value) => {
    setData((prev) => ({
      ...prev,
      branding: {
        ...prev?.branding,
        [key]: value,
      },
    }));
  };

  return (
    <div className="lg:p-6 p-3 border border-base-content/15 rounded-xl shadow-md hover:shadow-xl">
      <h1 className="flex items-center gap-2 lg:text-xl font-bold">
        {!onSelect ? <LucideIcon.UploadCloud /> : <LucideIcon.Edit />}
        {`${onSelect ? "Update Brand Settings" : "Insert Brand Settings"}`}
      </h1>
      <form onSubmit={onFormSubmit} className="space-y-2">
        <Input
          name="primaryColor"
          label="Primary Color"
          placeholder="Primary color..."
          onChange={(e) => updateSite("primaryColor", e.target.value)}
          value={onSelect ? data?.branding?.primaryColor : ""}
        />
        <Input
          name="secondaryColor"
          label="Secondary Color"
          placeholder="Secondary color..."
          onChange={(e) => updateSite("secondaryColor", e.target.value)}
          value={onSelect ? data?.branding?.secondaryColor : ""}
        />
        <Input
          name="footerText"
          label="Footer text"
          placeholder="Footer text..."
          onChange={(e) => updateSite("footerText", e.target.value)}
          value={onSelect ? data?.branding?.footerText : ""}
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

export default BrandingSettingForm;
