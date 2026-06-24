import { Outlet } from "react-router-dom";
import MaintenancePage from "../pages/publicPages/MaintenancePage";
import useSystemSettings from "../hooks/useSystemSettings";

const MaintenanceGuard = () => {
  const { systemSettings, systemSettingsLoading } = useSystemSettings();
  console.log("System settings", systemSettings);

  if (systemSettingsLoading) return null;

  if (systemSettings?.features?.maintenanceMode) {
    return <MaintenancePage />;
  }

  return <Outlet />;
};

export default MaintenanceGuard;
