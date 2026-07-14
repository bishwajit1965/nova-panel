import Badge from "../../../components/ui/Badge";
import { MiniIconButton } from "../../../components/ui/MiniIconButton";
import TableDataNotFound from "../../../components/ui/TableDataNotFound";
import { usePermission } from "../../../hooks/hasPermission";
import { normalizeDate } from "../../../utils/normalizeDate";

const ProfileTable = ({
  profileUsers,
  onView,
  onEditProfile,
  onEdit,
  onSelectProfileUser,
}) => {
  const { can } = usePermission();
  return (
    <div>
      ProfileTable {profileUsers?.length > 0 ? profileUsers?.length : 0}
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
            {profileUsers?.length === 0 ? (
              <TableDataNotFound colSpan={9} />
            ) : (
              profileUsers?.map((user, index) => (
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
                  <td className="capitalize flex flex-wrap gap-2">
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
                  <th className="flex items-center py-2 flex-wrap lg:w-44 w-40 lg:gap-2 gap-1.25">
                    <MiniIconButton
                      onClick={() => onView(user?._id)}
                      icon="view"
                      variant="primary"
                      size="xs"
                    />
                    {can("user.update") && (
                      <>
                        <MiniIconButton
                          onClick={() => onEditProfile(user?._id)}
                          icon="edit"
                          tooltip="Edit Profile"
                          size="xs"
                          variant="primary"
                        />
                        <MiniIconButton
                          onClick={() => onEdit(user?._id)}
                          icon="avatar"
                          tooltip="Change Avatar"
                          size="xs"
                          variant="primary"
                        />
                        <MiniIconButton
                          onClick={() => onSelectProfileUser(user?._id)}
                          icon="password"
                          tooltip="Change Password"
                          size="xs"
                          variant="success"
                        />
                      </>
                    )}
                  </th>
                </tr>
              ))
            )}
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

export default ProfileTable;
