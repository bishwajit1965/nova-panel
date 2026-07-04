import SystemSettingsForm from "../settingsComponents/systemSettings/SystemSettingsForm";
import SystemSettingsPreview from "../settingsComponents/systemSettings/SystemSettingsPreview";

const SystemSettings = ({
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
      {/* <h1 className="lg:text-xl text-sm font-extrabold">System Settings</h1> */}
      <div className="grid lg:grid-cols-12 grid-cols-1 justify-between lg:gap-4 gap-2">
        <div className="lg:col-span-4 col-span-12">
          <SystemSettingsForm
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
          <SystemSettingsPreview data={data} onSelect={onSelect} />
        </div>
      </div>
    </div>
  );
};

export default SystemSettings;
