import { LucideIcon } from "../../../../components/lib/LucideIcons";
import Button from "../../../../components/ui/Button";

const SeoSettingsPreview = ({ data, onSettingSelect }) => {
  const { seo } = data || {};
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Keywords</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{seo?.title || "No title set"}</td>
              <td className="font-semibold">
                {seo?.description || "No description set"}
              </td>
              <td className="font-semibold">
                {seo?.keywords?.map((kw) => (
                  <span className="badge badge-success ml-2" key={kw}>
                    {kw}
                  </span>
                )) || "No keywords set"}
              </td>

              <td>
                <Button
                  onClick={() => onSettingSelect(data)}
                  size="sm"
                  icon={LucideIcon.Edit}
                >
                  {onSettingSelect ? "Update" : " dit"}
                </Button>
              </td>
            </tr>
          </tbody>

          <tfoot>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Keywords</th>
              <th>Actions</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default SeoSettingsPreview;
