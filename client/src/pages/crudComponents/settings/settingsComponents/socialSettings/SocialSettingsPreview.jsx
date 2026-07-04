import { LucideIcon } from "../../../../../components/lib/LucideIcons";
import Button from "../../../../../components/ui/Button";

const SocialSettingsPreview = ({ data, onSelect }) => {
  const { social } = data || {};
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Facebook</th>
              <th>Instagram</th>
              <th>LinkedIn</th>
              <th>Github</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-xs break-all">
                {social?.facebook || "Not set"}
              </td>
              <td className="text-xs break-all">
                {social?.instagram || "Not set"}
              </td>
              <td className="text-xs break-all">
                {social?.linkedin || "Not set"}
              </td>
              <td className="text-xs break-all">
                {social?.github || "Not set"}
              </td>
              <td>
                <Button
                  onClick={() => onSelect(data)}
                  size="xs"
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
              <th>Facebook</th>
              <th>Instagram</th>
              <th>LinkedIn</th>
              <th>Github</th>
              <th>Actions</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default SocialSettingsPreview;
