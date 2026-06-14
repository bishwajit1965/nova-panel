import { LucideIcon } from "../../../../../components/lib/LucideIcons";
import Button from "../../../../../components/ui/Button";
import { Input } from "../../../../../components/ui/Input";

const ContactSettingsForm = ({
  data,
  onCancel,
  onMutation,
  selectedData,
  updateSettingsSection,
  buildSettingsPayload,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = buildSettingsPayload(selectedData, "contact", data.contact);

    onMutation.mutate(payload);
  };
  return (
    <div className="lg:p-6 p-3 border border-base-content/15 rounded-xl shadow-md hover:shadow-xl">
      <h1 className="flex items-center gap-2 lg:text-xl font-bold">
        {!selectedData ? <LucideIcon.UploadCloud /> : <LucideIcon.Edit />}
        {`${selectedData ? "Update Contact Settings" : "Insert Contact Settings"}`}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-2">
        <Input
          name="email"
          label="Email"
          placeholder="Email..."
          onChange={(e) =>
            updateSettingsSection("contact", "email", e.target.value)
          }
          value={selectedData ? data?.contact?.email : ""}
        />
        <Input
          name="phone"
          label="Phone"
          placeholder="Phone..."
          onChange={(e) =>
            updateSettingsSection("contact", "phone", e.target.value)
          }
          value={selectedData ? data?.contact?.phone : ""}
        />
        <Input
          name="address"
          label="Address"
          placeholder="Address..."
          onChange={(e) =>
            updateSettingsSection("contact", "address", e.target.value)
          }
          value={selectedData ? data?.contact?.address : ""}
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

export default ContactSettingsForm;
