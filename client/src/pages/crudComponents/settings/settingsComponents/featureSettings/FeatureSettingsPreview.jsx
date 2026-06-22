import { LucideIcon } from "../../../../../components/lib/LucideIcons";
import Button from "../../../../../components/ui/Button";

const FeatureSettingsPreview = ({ data, onSelect }) => {
  const { features } = data || {};
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Maintenance</th>
              <th>Registration</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-sm space-y-1">
                <div>
                  Maintenance:{" "}
                  <span
                    className={`badge ${features?.maintenanceMode ? "badge-error text-white" : "badge-success text-white"}`}
                  >
                    {features?.maintenanceMode ? "ON" : "OFF"}
                  </span>
                </div>
              </td>
              <td>
                <div>
                  Registration:{" "}
                  <span
                    className={`badge ${features?.registrationEnabled ? "badge-success text-white" : "badge-warning text-white"}`}
                  >
                    {features?.registrationEnabled ? "ON" : "OFF"}
                  </span>
                </div>
              </td>

              <td>
                <Button
                  onClick={() => onSelect(data)}
                  size="sm"
                  icon={LucideIcon.Edit}
                >
                  Edit
                </Button>
              </td>
            </tr>
          </tbody>

          <tfoot>
            <tr>
              <th>Maintenance</th>
              <th>Registration</th>
              <th>Actions</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default FeatureSettingsPreview;
