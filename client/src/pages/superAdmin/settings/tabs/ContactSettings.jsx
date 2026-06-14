import ContactSettingsForm from "../settingsComponents/contactSettings/ContactSettingsForm";
import ContactSettingsPreview from "../settingsComponents/contactSettings/ContactSettingsPreview";

const ContactSettings = ({
  data,
  setData,
  onSelect,
  selectedData,
  onCancel,
  onMutation,
  updateSettingsSection,
  buildSettingsPayload,
}) => {
  return (
    <div className="grid lg:grid-cols-12 grid-cols-1 justify-between lg:gap-4 gap-2">
      <div className="lg:col-span-4 col-span-12">
        <ContactSettingsForm
          data={data}
          setData={setData}
          onCancel={onCancel}
          onMutation={onMutation}
          updateSettingsSection={updateSettingsSection}
          selectedData={selectedData}
          buildSettingsPayload={buildSettingsPayload}
        />
      </div>
      <div className="lg:col-span-8 col-span-12">
        <ContactSettingsPreview data={data} onSelect={onSelect} />
      </div>
    </div>
  );
};

export default ContactSettings;
