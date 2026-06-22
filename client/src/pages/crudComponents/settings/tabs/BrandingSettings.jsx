import BrandingSettingForm from "../settingsComponents/brandingSettings/BrandingSettingForm";
import BrandingSettingsPreview from "../settingsComponents/brandingSettings/BrandSettingsPreview";

const BrandingSettings = ({
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
    <div>
      <div className="grid lg:grid-cols-12 grid-cols-1 justify-between lg:gap-4 gap-1">
        <div className="lg:col-span-4 col-span-12">
          <BrandingSettingForm
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
          <BrandingSettingsPreview data={data} onSelect={onSelect} />
        </div>
      </div>
    </div>
  );
};

export default BrandingSettings;
