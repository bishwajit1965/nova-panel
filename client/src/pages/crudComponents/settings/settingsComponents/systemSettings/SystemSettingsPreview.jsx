import { LucideIcon } from "../../../../../components/lib/LucideIcons";
import Button from "../../../../../components/ui/Button";

const SystemSettingsPreview = ({ data, onSelect }) => {
  const { system } = data || {};
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-xs">
          {/* head */}
          <thead>
            <tr>
              <th>Time Zone</th>
              <th>Date Format</th>
              <th>Time Format</th>
              <th>Language</th>
              <th>Pagination</th>
              <th>Default Theme</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-xs">{system?.timezone || "Not set"}</td>
              <td className="text-xs">{system?.dateFormat || "Not set"}</td>
              <td className="text-xs">{system?.timeFormat || "Not set"}</td>
              <td className="text-xs">{system?.language || "Not set"}</td>
              <td className="text-xs">{system?.pagination || "Not set"}</td>
              <td className="text-xs">{system?.defaultTheme || "Not set"}</td>
              <td>
                <Button
                  onClick={() => onSelect(data)}
                  size="sm"
                  variant="primary"
                  icon={LucideIcon.Edit}
                >
                  Edit
                </Button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th>Time Zone</th>
              <th>Date Format</th>
              <th>Time Format</th>
              <th>Language</th>
              <th>Pagination</th>
              <th>Default Theme</th>
              <th>Actions</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default SystemSettingsPreview;
