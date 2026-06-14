import { LucideIcon } from "../../../../../components/lib/LucideIcons";
import Button from "../../../../../components/ui/Button";
import { Input } from "../../../../../components/ui/Input";

const GeneralSettingsForm = ({
  onSelect,
  onCancel,
  onFormSubmit,
  data,
  onMutation,
  setData,
}) => {
  // 🔥 safe update helper for nested site object
  const updateSite = (key, value) => {
    setData((prev) => ({
      ...prev,
      site: {
        ...prev?.site,
        [key]: value,
      },
    }));
  };
  return (
    <div className="lg:p-6 p-3 border border-base-content/15 rounded-xl shadow-md hover:shadow-xl">
      <h1 className="flex items-center gap-2 lg:text-xl font-bold">
        {!onSelect ? <LucideIcon.UploadCloud /> : <LucideIcon.Edit />}
        {`${onSelect ? "Update Site Settings" : "Insert Site Settings"}`}
      </h1>
      <form onSubmit={onFormSubmit} className="space-y-2">
        <Input
          name="name"
          label="Site Name"
          placeholder="Site name..."
          onChange={(e) => updateSite("name", e.target.value)}
          value={onSelect ? data?.site?.name : ""}
        />
        <Input
          name="logo"
          label="Logo Url"
          placeholder="Logo url..."
          onChange={(e) => updateSite("logo", e.target.value)}
          value={onSelect ? data?.site?.logo : ""}
        />
        <Input
          name="favicon"
          label="Favicon Url"
          placeholder="Favicon url..."
          onChange={(e) => updateSite("favicon", e.target.value)}
          value={onSelect ? data?.site?.favicon : ""}
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

export default GeneralSettingsForm;
