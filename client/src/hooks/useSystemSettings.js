import API_PATHS from "../services/api.paths";
import { useApiQuery } from "./useApiQuery";
import useFetchedDataStatusHandler from "./useFetchedDataStatusHandler";

const useSystemSettings = () => {
  /*** -> System Settings Query Mutation  fetch permissions API Hook -> */
  const {
    data: systemSettings,
    isLoading: systemSettingsLoading,
    isError: systemSettingsError,
    error: systemSettingsErrorObj,
  } = useApiQuery({
    url: `${API_PATHS.SYSTEM_SETTINGS.ENDPOINT}/public`,
    queryKey: API_PATHS.SYSTEM_SETTINGS.KEY,
    options: {
      staleTime: 0,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  });

  /** --------> Use Fetched Data Status Handler --------> */
  const systemSettingsDataStatus = useFetchedDataStatusHandler({
    isLoading: systemSettingsLoading,
    isError: systemSettingsError,
    error: systemSettingsErrorObj,
    label: "system-settings",
  });

  return { systemSettings, systemSettingsLoading, systemSettingsDataStatus };
};

export default useSystemSettings;
