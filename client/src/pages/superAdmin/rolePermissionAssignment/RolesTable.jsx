import CountBadge from "../../../components/ui/CountBadge";
import { MiniIconButton } from "../../../components/ui/MiniIconButton";

const RolesTable = ({ roles = [], onSelect }) => {
  return (
    <div>
      <h1 className="lg:text-xl text-lg font-extrabold text-base-content/70 flex items-center gap-2">
        Roles List:
        <CountBadge dataLength={roles} color="blue-500" />
      </h1>

      <div className="overflow-x-auto">
        <table className="table table-xs">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Role Name</th>
              <th>Role Slug</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles?.map((r, index) => (
              <tr key={r.name}>
                <th>{index + 1}</th>
                <td>{r.name}</td>
                <td>{r.slug}</td>

                <td>
                  <MiniIconButton
                    variant="primary"
                    onClick={() => onSelect(r._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
          <thead>
            <tr>
              <th>#</th>
              <th>Role Name</th>
              <th>Role Slug</th>
              <th>Actions</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
};

export default RolesTable;
