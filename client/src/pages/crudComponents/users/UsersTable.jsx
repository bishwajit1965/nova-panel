import Badge from "../../../components/ui/Badge";
import { MiniIconButton } from "../../../components/ui/MiniIconButton";
import { usePermission } from "../../../hooks/hasPermission";
import { normalizeDate } from "../../../utils/normalizeDate";

const UsersTable = ({ users, onToggle, onConfirmSuspend }) => {
  const { can } = usePermission();
  return (
    <div className="">
      <div className="overflow-x-auto">
        <table className="table table-xs">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Roles</th>
              <th>Plan</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle lg:h-12 lg:w-12 w-10 h-10">
                        <img src={user?.avatarUrl} alt={user.name} />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{user?.name}</td>
                <td>{user?.email}</td>
                <td className="capitalize">
                  {user?.roles.length > 0
                    ? user?.roles?.map((role) => (
                        <Badge
                          key={role._id}
                          color={`${user?.isActive ? "green" : "red"}`}
                        >
                          {role.name}
                        </Badge>
                      ))
                    : "No Role"}
                </td>
                <td>{user?.plan?.name || "No Plan"}</td>
                <td>
                  <Badge color={`${user.isActive ? "green" : "red"}`}>
                    {user?.isActive ? "Active" : "Inactive"}
                  </Badge>
                </td>
                <td>{normalizeDate(user.createdAt)}</td>
                <th className="flex flex-wrap lg:w-36 w-32 lg:gap-2 gap-1.25">
                  <MiniIconButton
                    onClick={() => onToggle(user?._id)}
                    icon="view"
                    variant="primary"
                    size="xs"
                  />
                  {can("user.update") && (
                    <>
                      <MiniIconButton
                        onClick={() => onToggle(user?._id)}
                        icon="assign"
                        tooltip="Assign Plan"
                        size="xs"
                        variant="success"
                      />

                      <MiniIconButton
                        onClick={() => onConfirmSuspend(user)}
                        icon="suspend"
                        tooltip={`${!user.isActive ? "Suspended" : "Suspend"}`}
                        size="xs"
                        variant={`${!user.isActive ? "warning" : "primary"}`}
                      />
                    </>
                  )}
                </th>
              </tr>
            ))}
          </tbody>
          {/* foot */}
          <tfoot>
            <tr>
              <th>#</th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Roles</th>
              <th>Plan</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
