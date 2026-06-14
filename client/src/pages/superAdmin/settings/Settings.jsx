import { useState } from "react";
import { useApiQuery } from "../../../hooks/useApiQuery";
import API_PATHS from "../../../services/api.paths";
import GeneralSettings from "./tabs/GeneralSettings";
import BrandingSettings from "./tabs/BrandingSettings";
import SeoSettings from "./tabs/SeoSettings";
import SocialSettings from "./tabs/SocialSettings";
import ContactSettings from "./tabs/ContactSettings";
import FeatureSettings from "./tabs/FeatureSettings";
import useFetchedDataStatusHandler from "../../../hooks/useFetchedDataStatusHandler";
import { useEffect } from "react";
import { useRef } from "react";
import { useApiMutation } from "../../../hooks/useApiMutation";
import Swal from "sweetalert2";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [formData, setFormData] = useState(null);
  const [selectedSettings, setSelectedSettings] = useState(null);
  const initialized = useRef(false);

  /*** ---> Permission Query Mutation  fetch permissions API Hook ---> */
  const {
    data: settings,
    isLoading: permissionsLoading,
    isError: permissionsError,
    error: permissionsErrorObj,
  } = useApiQuery({
    url: `${API_PATHS.SUPER_ADMIN_SETTINGS.ENDPOINT}/all`,
    queryKey: API_PATHS.SUPER_ADMIN_SETTINGS.KEY,
    options: {
      staleTime: 0,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  });

  console.log("SETTINGS", settings);
  const rawSettings = settings?.settings || settings;

  useEffect(() => {
    if (rawSettings && !initialized.current) {
      setFormData(rawSettings);
      initialized.current = true;
    }
  }, [rawSettings]);

  /*** ------> Permission Mutation CREATE/UPDATE API Hook ------> */
  const siteSettingsMutation = useApiMutation({
    method: selectedSettings ? "update" : "create",
    path: selectedSettings
      ? (payload) =>
          `${API_PATHS.SUPER_ADMIN_SETTINGS.ENDPOINT}/edit/${payload.id}`
      : `${API_PATHS.SUPER_ADMIN_SETTINGS.ENDPOINT}/create`,
    key: API_PATHS.SUPER_ADMIN_SETTINGS.KEY, // used by useQuery

    onSuccess: (data) => {
      setSelectedSettings(null);

      console.log("Permission create/update response:", data);

      console.log("Permission create/update response:", data);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${data.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: (error) => {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `${error.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
      console.error(error);
    },
  });

  /** ------>HANDLERS ------>*/
  const handleSelectSettings = (data) => {
    setSelectedSettings(data);
    // setData(data);
  };

  const handleCancelSelectSettings = () => {
    setSelectedSettings(null);
  };

  const buildSettingsPayload = (selectedData, section, sectionData) => ({
    ...(selectedData && { id: selectedData._id }),
    data: {
      [section]: sectionData,
    },
  });

  const updateSettingsSection = (section, key, value) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev?.[section],
        [key]: value,
      },
    }));
  };

  const renderTab = () => {
    switch (activeTab) {
      case "general":
        return <GeneralSettings data={formData} setData={setFormData} />;

      case "branding":
        return <BrandingSettings data={formData} setData={setFormData} />;

      case "seo":
        return <SeoSettings data={formData} setData={setFormData} />;

      case "social":
        return (
          <SocialSettings
            data={formData}
            setData={setFormData}
            onSelect={handleSelectSettings}
            selectedData={selectedSettings}
            onCancel={handleCancelSelectSettings}
            onMutation={siteSettingsMutation}
            updateSettingsSection={updateSettingsSection}
            buildSettingsPayload={buildSettingsPayload}
          />
        );

      case "contact":
        return (
          <ContactSettings
            data={formData}
            setData={setFormData}
            onSelect={handleSelectSettings}
            selectedData={selectedSettings}
            onCancel={handleCancelSelectSettings}
            onMutation={siteSettingsMutation}
            updateSettingsSection={updateSettingsSection}
            buildSettingsPayload={buildSettingsPayload}
          />
        );

      case "features":
        return <FeatureSettings data={formData} setData={setFormData} />;

      default:
        return null;
    }
  };

  /** --------> Use Fetched Data Status Handler --------> */
  const settingsDataStatus = useFetchedDataStatusHandler({
    isLoading: permissionsLoading,
    isError: permissionsError,
    error: permissionsErrorObj,
    label: "permissions-super-admin",
  });

  return (
    <div className="space-y-6">
      {/* Tabs */}
      {settingsDataStatus.status !== "success" ? (
        settingsDataStatus?.content
      ) : (
        <>
          <div role="tablist" className="tabs tabs-lift tabs-border w-fit">
            {[
              "general",
              "branding",
              "seo",
              "social",
              "contact",
              "features",
            ].map((tab) => (
              <button
                key={tab}
                className={`tab ${activeTab === tab ? "tab-active text-blue-500 capitalize" : "capitalize"}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Active Section */}
          {renderTab()}
        </>
      )}
    </div>
  );
};

export default Settings;
