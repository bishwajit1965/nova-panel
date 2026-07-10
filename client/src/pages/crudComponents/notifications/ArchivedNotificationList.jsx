import { useState } from "react";
import Pagination from "../../../components/pagination/Pagination";
import CountBadge from "../../../components/ui/CountBadge";
import { MiniIconButton } from "../../../components/ui/MiniIconButton";
import TableDataNotFound from "../../../components/ui/TableDataNotFound";
import { normalizeDate } from "../../../utils/normalizeDate";

const ArchivedNotificationList = ({
  archivedNotifications,
  onView,
  onConfirmSoftDeleteNotification,
  onConfirmAction,
  onConfirmRevoke,
}) => {
  /**---> PAGINATION --->*/
  const [paginatedData, setPaginatedData] = useState(
    archivedNotifications || [],
  );
  const dataLength = archivedNotifications ? archivedNotifications?.length : [];
  return (
    <div>
      <div className="lg:my-4 my-2">
        <h1 className="lg:text-xl font-bold flex items-center gap-2">
          Archived Notifications List
          <CountBadge dataLength={archivedNotifications} />
        </h1>
      </div>
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
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData?.length === 0 ? (
              <TableDataNotFound colSpan={9} />
            ) : (
              paginatedData?.map((notification, index) => (
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
                      onClick={() =>
                        onView(notification?._id, archivedNotifications)
                      }
                      size="xs"
                      icon="view"
                      label="view"
                      variant="primary"
                    />

                    <MiniIconButton
                      onClick={() =>
                        onConfirmAction(
                          notification?._id,
                          archivedNotifications,
                        )
                      }
                      size="xs"
                      icon="publish"
                      label="publish"
                      variant="success"
                    />
                    <MiniIconButton
                      onClick={() =>
                        onConfirmRevoke(
                          notification?._id,
                          archivedNotifications,
                        )
                      }
                      size="xs"
                      icon="revoke"
                      label="revoke"
                      variant="success"
                    />

                    <MiniIconButton
                      onClick={() =>
                        onConfirmSoftDeleteNotification(
                          notification?._id,
                          archivedNotifications,
                        )
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
              <th>Category</th>
              <th>Priority</th>
              <th>Status</th>
              <th>CreatedAt</th>
              <th>Expires</th>
              <th>Actions</th>
            </tr>
          </tfoot>
        </table>
        {/* ----> PAGINATION READER ---->*/}
        <div className="lg:my-4 mt-8">
          <Pagination
            items={archivedNotifications}
            dataLength={dataLength}
            onPaginatedDataChange={setPaginatedData}
          />
        </div>
      </div>
    </div>
  );
};

export default ArchivedNotificationList;
