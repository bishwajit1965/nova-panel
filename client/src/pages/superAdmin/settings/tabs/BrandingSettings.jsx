import Swal from "sweetalert2";
import { useApiMutation } from "../../../../hooks/useApiMutation";
import API_PATHS from "../../../../services/api.paths";
import BrandingSettingForm from "../settingsComponents/brandingSettings/BrandingSettingForm";
import BrandingSettingsPreview from "../settingsComponents/brandingSettings/BrandSettingsPreview";
import { useState } from "react";

const BrandingSettings = ({ data, setData, onMutation }) => {
  const [selectedSettings, setSelectedSettings] = useState(null);

  /*** ----> Permission Mutation CREATE/UPDATE API Hook ----> */
  const brandSettingsMutation = useApiMutation({
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
    setData(data);
  };

  const handleCancelSelectSettings = () => {
    setSelectedSettings(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = selectedSettings
      ? {
          id: selectedSettings._id,
          data: {
            branding: {
              primaryColor: data?.branding?.primaryColor,
              secondaryColor: data?.branding?.secondaryColor,
              footerText: data?.branding?.footerText,
            },
          },
        }
      : {
          data: {
            branding: {
              primaryColor: data?.branding?.primaryColor,
              secondaryColor: data?.branding?.secondaryColor,
              footerText: data?.branding?.footerText,
            },
          },
        };

    brandSettingsMutation.mutate(payload, {
      onSuccess: () => {},
      onError: (error) => {
        console.error(error.response.message);
      },
    });
  };
  return (
    <div>
      <h1 className="lg:text-xl text-lg font-bold">Branding Settings</h1>
      <div className="grid lg:grid-cols-12 grid-cols-1 justify-between lg:gap-4 gap-1">
        <div className="lg:col-span-4 col-span-12">
          <BrandingSettingForm
            onSelect={selectedSettings}
            onCancel={handleCancelSelectSettings}
            onFormSubmit={handleSubmit}
            data={data}
            setData={setData}
            onMutation={brandSettingsMutation}
          />
        </div>
        <div className="lg:col-span-8 col-span-12">
          <BrandingSettingsPreview
            data={data}
            setData={setData}
            onMutation={onMutation}
            onSettingSelect={handleSelectSettings}
          />
        </div>
      </div>
    </div>
  );
};

export default BrandingSettings;
