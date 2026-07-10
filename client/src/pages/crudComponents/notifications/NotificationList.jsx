import { MiniIconButton } from "../../../components/ui/MiniIconButton";
import TableDataNotFound from "../../../components/ui/TableDataNotFound";
import { normalizeDate } from "../../../utils/normalizeDate";

const NotificationList = ({
  notifications,
  onSelect,
  onView,
  onConfirmAction,
  onConfirmArchive,
  onSoftDelete,
}) => {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>#</th>
              <th>title</th>
              <th>Cate</th>
              <th>Pri</th>
              <th>Stat</th>
              <th>Cre</th>
              <th>Exp</th>
              <th>Pub</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {notifications?.length === 0 ? (
              <TableDataNotFound colSpan={9} />
            ) : (
              notifications?.map((notification, index) => (
                <tr key={notification._id}>
                  <th>{index + 1}</th>
                  <td className="break-all">
                    {notification?.title.length > 15
                      ? notification?.title.slice(0, 15) + "..."
                      : notification?.title}
                  </td>
                  <td>{notification?.category}</td>
                  <td>{notification?.priority}</td>
                  <td>{notification?.status}</td>
                  <td>{normalizeDate(notification?.createdAt)}</td>
                  <td>{normalizeDate(notification?.expiresAt)}</td>
                  <td>{normalizeDate(notification?.publishedAt)}</td>
                  <td className="flex items-center gap-1">
                    <MiniIconButton
                      onClick={() => onView(notification?._id, notifications)}
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
                    {notification?.status === "draft" && (
                      <MiniIconButton
                        onClick={() =>
                          onConfirmAction(notification._id, notifications)
                        }
                        size="xs"
                        icon="publish"
                        label="publish"
                        variant="indigo"
                      />
                    )}
                    <MiniIconButton
                      onClick={() =>
                        onConfirmArchive(notification?._id, notifications)
                      }
                      size="xs"
                      icon="archive"
                      label="archive"
                      variant="warning"
                    />
                    <MiniIconButton
                      onClick={() =>
                        onSoftDelete(notification?._id, notifications)
                      }
                      size="xs"
                      icon="soft"
                      label="soft"
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
              <th>Cate</th>
              <th>Pri</th>
              <th>Stat</th>
              <th>Cre</th>
              <th>Exp</th>
              <th>Pub</th>
              <th>Actions</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default NotificationList;
