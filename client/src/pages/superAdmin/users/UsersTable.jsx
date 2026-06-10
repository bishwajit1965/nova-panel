import Badge from "../../../components/ui/Badge";
import { MiniIconButton } from "../../../components/ui/MiniIconButton";
import { normalizeDate } from "../../../utils/normalizeDate";

const UsersTable = ({ users, onToggle }) => {
  return (
    <div>
      <div className="">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
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
              {users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={user?.avatarUrl} alt={user.name} />
                        </div>
                      </div>
                    </div>
                  </td>
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
                  <th className="w-40 lg:flex lg:flex-wrap grid gap-2">
                    <MiniIconButton
                      onClick={() => onToggle(user?._id)}
                      icon="view"
                      variant="primary"
                      size="xs"
                    />

                    <MiniIconButton icon="edit" size="xs" variant="success" />

                    <MiniIconButton
                      icon="assign"
                      tooltip="Assign Plan"
                      size="xs"
                      variant="primary"
                    />

                    <MiniIconButton
                      icon="user"
                      tooltip="Assign Role"
                      size="xs"
                      variant="success"
                    />

                    <MiniIconButton
                      icon="suspend"
                      size="xs"
                      variant="primary"
                    />

                    <MiniIconButton icon="delete" size="xs" variant="danger" />
                  </th>
                </tr>
              ))}
            </tbody>
            {/* foot */}
            <tfoot>
              <tr>
                <th>#</th>
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
    </div>
  );
};

export default UsersTable;
