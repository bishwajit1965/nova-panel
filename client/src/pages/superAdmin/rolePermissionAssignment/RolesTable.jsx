import { LucideIcon } from "../../../components/lib/LucideIcons";
import Button from "../../../components/ui/Button";
import CountBadge from "../../../components/ui/CountBadge";
import { MiniIconButton } from "../../../components/ui/MiniIconButton";

const RolesTable = ({
  roles = [],
  onSelect,
  onSearch,
  setRoleSearch,
  selectedRole,
  onReset,
}) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="lg:text-xl text-lg font-extrabold text-base-content/70 flex items-center gap-2 m-0">
          Roles List:
          <CountBadge dataLength={roles} color="blue-500" />
        </h1>
        <div
          className={`flex items-center gap-2 ${!selectedRole ? "w-1/4" : " w-1/2"}`}
        >
          <input
            type="text"
            placeholder="Search roles..."
            className="input input-sm input-bordered w-full"
            value={onSearch}
            onChange={(e) => setRoleSearch(e.target.value)}
          />

          <Button onClick={onReset} size="xs" variant="outline">
            <LucideIcon.RefreshCcw size={20} /> Reset
          </Button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-xs">
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
