import { useState } from "react";
import { useApiMutation } from "../../../../hooks/useApiMutation";
import API_PATHS from "../../../../services/api.paths";
import SeoSettingsForm from "../seoSettings/SeoSettingsForm";
import SeoSettingsPreview from "../seoSettings/SeoSettingsPreview";
import Swal from "sweetalert2";

const SeoSettings = ({ data, setData, onMutation }) => {
  const [selectedSettings, setSelectedSettings] = useState(null);

  /*** ----> Permission Mutation CREATE/UPDATE API Hook ----> */
  const seoSettingsMutation = useApiMutation({
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
            seo: {
              title: data?.seo?.title,
              description: data?.seo?.description,
              keyWords: data?.seo?.keyWords,
            },
          },
        }
      : {
          data: {
            seo: {
              title: data?.seo?.title,
              description: data?.seo?.description,
              keyWords: data?.seo?.keyWords,
            },
          },
        };

    seoSettingsMutation.mutate(payload, {
      onSuccess: () => {},
      onError: (error) => {
        console.error(error.response.message);
      },
    });
  };
  return (
    <div>
      <h1 className="lg:text-xl text-lg font-bold">Seo Settings</h1>

      <div className="grid lg:grid-cols-12 grid-cols-1 justify-between lg:gap-4 gap-1">
        <div className="lg:col-span-4 col-span-12">
          <SeoSettingsForm
            onSelect={selectedSettings}
            onCancel={handleCancelSelectSettings}
            onFormSubmit={handleSubmit}
            data={data}
            setData={setData}
            onMutation={seoSettingsMutation}
          />
        </div>
        <div className="lg:col-span-8 col-span-12">
          <SeoSettingsPreview
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

export default SeoSettings;
