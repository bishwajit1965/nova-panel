import Badge from "../../../components/ui/Badge";
import CountBadge from "../../../components/ui/CountBadge";
import { MiniIconButton } from "../../../components/ui/MiniIconButton";
import SearchBox from "../../../components/ui/SearchBox";
import TableDataNotFound from "../../../components/ui/TableDataNotFound";
import { normalizeDate } from "../../../utils/normalizeDate";

const AdminUsersTable = ({
  users,
  onSelect,
  userSearch,
  setUserSearch,
  onReset,
}) => {
  return (
    <div className="">
      <div className="lg:flex grid gap-2 items-center justify-between">
        <div className="">
          <h1 className="lg:text-xl text-lg font-extrabold flex items-center gap-2">
            Admin Users • Total{" "}
            <CountBadge dataLength={users} color="blue-500" />
          </h1>
        </div>
        <div className="">
          <SearchBox
            onReset={onReset}
            value={userSearch}
            onChange={setUserSearch}
          />
        </div>
      </div>

      <div className="divider m-2"></div>

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
            {users?.length === 0 ? (
              <TableDataNotFound colSpan={7} />
            ) : (
              users?.map((u, index) => (
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
              ))
            )}
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
  );
};

export default AdminUsersTable;
