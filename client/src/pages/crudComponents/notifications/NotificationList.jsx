import { MiniIconButton } from "../../../components/ui/MiniIconButton";
import NoDataFound from "../../../components/ui/NoDataFound";
import { normalizeDate } from "../../../utils/normalizeDate";

const NotificationList = ({
  notifications,
  onSelect,
  onConfirmDelete,
  onView,
  handleArchiveNotice,
}) => {
  return (
    <div>
      NotificationList{notifications?.length ? notifications?.length : 0}
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>#</th>
              <th>title</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Status</th>
              <th>CreatedAt</th>
              <th>Expires</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {notifications?.length === 0 ? (
              <NoDataFound />
            ) : (
              notifications?.map((notification, index) => (
                <tr key={notification._id}>
                  <th>{index + 1}</th>
                  <td>
                    {notification?.title.length > 15
                      ? notification?.title.slice(0, 15) + "..."
                      : notification?.title}
                  </td>
                  <td>{notification?.category}</td>
                  <td>{notification?.priority}</td>
                  <td>{notification?.status}</td>
                  <td>{normalizeDate(notification?.createdAt)}</td>
                  <td>{normalizeDate(notification?.expiresAt)}</td>
                  <td className="flex items-center gap-1">
                    <MiniIconButton
                      onClick={() => onView(notification?._id)}
                      size="xs"
                      icon="view"
                      label="view"
                      variant="primary"
                    />
                    <MiniIconButton
                      onClick={() => onSelect(notification?._id)}
                      size="xs"
                      icon="edit"
                      label="edit"
                      variant="success"
                    />
                    <MiniIconButton
                      size="xs"
                      icon="publish"
                      label="publish"
                      variant="indigo"
                    />
                    <MiniIconButton
                      onClick={() => handleArchiveNotice(notification?._id)}
                      size="xs"
                      icon="archive"
                      label="archive"
                      variant="warning"
                    />
                    <MiniIconButton
                      onClick={() => onConfirmDelete(notification)}
                      size="xs"
                      icon="delete"
                      label="delete"
                      variant="danger"
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot>
            <tr>
              <th>#</th>
              <th>title</th>
              <th>Category</th>
              <th>Priority</th>
              <th>Status</th>
              <th>CreatedAt</th>
              <th>Expires</th>
              <th>Action</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default NotificationList;
