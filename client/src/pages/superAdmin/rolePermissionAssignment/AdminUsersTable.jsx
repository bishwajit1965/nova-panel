import { LucideIcon } from "../../../components/lib/LucideIcons";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";
import CountBadge from "../../../components/ui/CountBadge";
import { MiniIconButton } from "../../../components/ui/MiniIconButton";
import { normalizeDate } from "../../../utils/normalizeDate";

const AdminUsersTable = ({
  users,
  onSelect,
  userSearch,
  setUserSearch,
  selectedUser,
  onReset,
}) => {
  return (
    <div className="">
      <div className="lg:flex grid gap-2 items-center justify-between mb-4">
        <h1 className="lg:text-xl text-lg font-extrabold flex items-center gap-2">
          Admin Users <CountBadge dataLength={users} color="blue-500" />
        </h1>
        <div
          className={`flex items-center gap-2 ${!selectedUser ? "lg:w-1/4 w-full" : "w-1/2"}`}
        >
          <input
            type="text"
            placeholder="Search users..."
            className="input input-sm input-bordered w-full"
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
          />
          <Button onClick={onReset} size="xs" variant="outline">
            <LucideIcon.RefreshCcw size={20} /> Reset
          </Button>
        </div>
      </div>

      <div className="">
        <div className="overflow-x-auto">
          <table className="table table-xs">
            <thead>
              <tr>
                <th>#</th>
                <th>User Name</th>
                <th>Users Email</th>
                <th>Roles Name</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((u, index) => (
                <tr key={u.name}>
                  <th>{index + 1}</th>
                  <td>{u?.name}</td>
                  <td>{u?.email}</td>
                  <td className="">
                    {u?.roles.map((r) => (
                      <Badge color="green">{r?.name}</Badge>
                    ))}
                  </td>
                  <td>{normalizeDate(u?.createdAt)}</td>
                  <td>{normalizeDate(u?.updatedAt)}</td>
                  <td className="flex items-center gap-2">
                    <MiniIconButton
                      onClick={() => onSelect(u?._id)}
                      variant="primary"
                      icon="select"
                      label="Select"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th>#</th>
                <th>User Name</th>
                <th>Users Email</th>
                <th>Roles Name</th>
                <th>Created At</th>
                <th>Updated At</th>
                <th>Actions</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsersTable;
