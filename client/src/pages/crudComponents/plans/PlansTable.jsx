import { LucideIcon } from "../../../components/lib/LucideIcons";
import Button from "../../../components/ui/Button";
import { usePermission } from "../../../hooks/hasPermission";
import { normalizeDate } from "../../../utils/normalizeDate";

const PlansTable = ({ plans, onSelect }) => {
  const { can, isSuperAdmin } = usePermission();
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Slug</th>
              <th>Price</th>
              <th>Features Count</th>
              <th>Duration</th>
              <td>Updated At</td>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {plans?.map((p, index) => (
              <tr key={p?._id}>
                <th>{index + 1}</th>
                <td>{p?.name}</td>
                <td>{p?.slug}</td>
                <td>{p?.price.toFixed(2)}</td>
                <td>
                  {p?.features?.map((f) => (
                    <div>{f}</div>
                  ))}
                </td>
                <td>{p?.durationInDays}</td>
                <td>{normalizeDate(p?.updatedAt)}</td>
                <td className="flex items-center gap-2">
                  {!isSuperAdmin && !can("plan.update") && (
                    <Button
                      type="submit"
                      onClick={() => onSelect(p?._id)}
                      size="xs"
                    >
                      <LucideIcon.Eye size={15} /> View
                    </Button>
                  )}

                  {can("plan.update") && (
                    <Button
                      type="submit"
                      onClick={() => onSelect(p?._id)}
                      size="xs"
                    >
                      <LucideIcon.Edit size={15} /> Edit
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Slug</th>
              <th>Price</th>
              <th>Features Count</th>
              <th>Duration</th>
              <td>Updated At</td>
              <th>Actions</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default PlansTable;
