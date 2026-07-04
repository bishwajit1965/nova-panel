import { LucideIcon } from "../../../../../components/lib/LucideIcons";
import Button from "../../../../../components/ui/Button";

const BrandingSettingsPreview = ({ data, onSelect }) => {
  const { branding } = data || {};
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Logo</th>
              <th>Favicon</th>
              <th>Primary Color</th>
              <th>Secondary Color</th>
              <th>Footer Text</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {branding?.logo ? (
                  <img
                    src={branding?.logo}
                    alt={branding?.name || "No logo"}
                    className="w-14 h-14 rounded-full"
                  />
                ) : (
                  <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center text-xs">
                    No Logo
                  </div>
                )}
              </td>
              <td>
                {branding?.favicon ? (
                  <img
                    src={branding?.favicon}
                    alt={branding?.name || "No favicon"}
                    className="w-14 h-14 rounded-full"
                  />
                ) : (
                  <div className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center text-xs">
                    No Favicon
                  </div>
                )}
              </td>
              <td>{branding?.primaryColor || "No color set"}</td>
              <td className="font-semibold">
                {branding?.secondaryColor || "No color set"}
              </td>
              <td className="text-xs break-all">
                {branding?.footerText || "No footer text"}
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
              <th>Logo</th>
              <th>Favicon</th>
              <th>Primary Color</th>
              <th>Secondary Color</th>
              <th>Footer Text</th>
              <th>Actions</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default BrandingSettingsPreview;
