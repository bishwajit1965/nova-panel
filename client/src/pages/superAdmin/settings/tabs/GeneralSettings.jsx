import { useState } from "react";
import GeneralSettingsForm from "../settingsComponents/generalSettings/GeneralSettingsForm";
import GeneralSettingsPreview from "../settingsComponents/generalSettings/GeneralSettingsPreview";
import { useApiMutation } from "../../../../hooks/useApiMutation";
import Swal from "sweetalert2";
import API_PATHS from "../../../../services/api.paths";

const GeneralSettings = ({ data, setData }) => {
  const [selectedSettings, setSelectedSettings] = useState(null);

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
            site: {
              name: data?.site?.name,
              logo: data?.site?.logo,
              favicon: data?.site?.favicon,
            },
          },
        }
      : {
          data: {
            site: {
              name: data?.site?.name,
              logo: data?.site?.logo,
              favicon: data?.site?.favicon,
            },
          },
        };

    siteSettingsMutation.mutate(payload, {
      onSuccess: () => {},
      onError: (error) => {
        console.error(error.response.message);
      },
    });
  };

  return (
    <div className="grid lg:grid-cols-12 grid-cols-1 justify-between lg:gap-4 gap-2">
      <div className="lg:col-span-4 col-span-12">
        <GeneralSettingsForm
          onSelect={selectedSettings}
          onCancel={handleCancelSelectSettings}
          onFormSubmit={handleSubmit}
          data={data}
          setData={setData}
          onMutation={siteSettingsMutation}
        />
      </div>
      <div className="lg:col-span-8 col-span-12">
        <GeneralSettingsPreview
          data={data}
          onSettingSelect={handleSelectSettings}
        />
      </div>
    </div>
  );
};

export default GeneralSettings;
