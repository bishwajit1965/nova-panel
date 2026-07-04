import { LucideIcon } from "../../../../../components/lib/LucideIcons";
import Button from "../../../../../components/ui/Button";

const GeneralSettingsPreview = ({ data, onSelect }) => {
  const { contact, features, seo, site } = data || {};
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>Seo</th>
              <th>Features</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="font-semibold">{site?.name || "Not set"}</td>
              <td className="text-xs">
                {contact?.address || "No address"} <br />
                {contact?.email || "No email"} <br />
                {contact?.phone || "No phone"}
              </td>

              <td className="font-medium">
                {seo?.title || "No title"} <br />
                {seo?.description || "No description"}
              </td>

              <td className="text-sm space-y-1">
                <div>
                  Maintenance:{" "}
                  <span
                    className={`badge ${features?.maintenanceMode ? "badge-error text-white" : "badge-success text-white"}`}
                  >
                    {features?.maintenanceMode ? "ON" : "OFF"}
                  </span>
                </div>

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
              <th>Name</th>
              <th>Address</th>
              <th>Seo</th>
              <th>Features</th>
              <th>Actions</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default GeneralSettingsPreview;
