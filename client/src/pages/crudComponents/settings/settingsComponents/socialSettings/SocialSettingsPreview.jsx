import { LucideIcon } from "../../../../../components/lib/LucideIcons";
import Button from "../../../../../components/ui/Button";

const SocialSettingsPreview = ({ data, onSelect }) => {
  const { links } = data || {};
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Website</th>
              <th>Facebook</th>
              <th>Instagram</th>
              <th>LinkedIn</th>
              <th>Github</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{links?.website || "Not set"}</td>
              <td className="text-xs">{links?.facebook || "Not set"}</td>
              <td className="text-xs">{links?.instagram || "Not set"}</td>
              <td className="text-xs">{links?.linkedin || "Not set"}</td>
              <td className="text-xs">{links?.github || "Not set"}</td>
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
              <th>Website</th>
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
