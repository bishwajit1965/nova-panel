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
              <th>Primary Color</th>
              <th>Secondary Color</th>
              <th>Footer Text</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{branding?.primaryColor || "No color set"}</td>
              <td className="font-semibold">
                {branding?.secondaryColor || "No color set"}
              </td>
              <td className="text-xs">
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
