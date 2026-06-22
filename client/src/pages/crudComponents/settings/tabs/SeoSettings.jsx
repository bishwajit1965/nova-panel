import SeoSettingsForm from "../seoSettings/SeoSettingsForm";
import SeoSettingsPreview from "../seoSettings/SeoSettingsPreview";

const SeoSettings = ({
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
      <h1 className="lg:text-xl text-lg font-bold">Seo Settings</h1>

      <div className="grid lg:grid-cols-12 grid-cols-1 justify-between lg:gap-4 gap-1">
        <div className="lg:col-span-4 col-span-12">
          <SeoSettingsForm
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
          <SeoSettingsPreview data={data} onSelect={onSelect} />
        </div>
      </div>
    </div>
  );
};

export default SeoSettings;
