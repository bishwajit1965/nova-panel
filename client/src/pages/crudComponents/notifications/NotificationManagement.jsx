import { useState } from "react";
import API_PATHS from "../../../services/api.paths";
import { useApiQuery } from "../../../hooks/useApiQuery";
import useFetchedDataStatusHandler from "../../../hooks/useFetchedDataStatusHandler";
import NotificationForm from "./NotificationForm";
import NotificationList from "./NotificationList";
import useValidator from "../../../hooks/useValidator";
import { notificationValidationRules } from "./notificationValidationRules";
import { useApiMutation } from "../../../hooks/useApiMutation";
import Swal from "sweetalert2";
import ConfirmDialogue from "../../../components/ui/ConfirmDialogue";
import Modal from "../../../components/ui/Modal";
import { normalizeDate } from "../../../utils/normalizeDate";
import { LucideIcon } from "../../../components/lib/LucideIcons";
import { MiniIconButton } from "../../../components/ui/MiniIconButton";
import ReadMore from "../../../components/tsxtShortenerReadMoreOrLess/TextShortenerReadMoreReadLess";
import ArchivedNotificationList from "./ArchivedNotificationList";
import SoftDeletedNotificationList from "./SoftDeletedNotificationList";
import ConfirmActionDialogue from "../../../components/ui/ConfirmActionDialogue";
import Pagination from "../../../components/pagination/Pagination";
import Button from "../../../components/ui/Button";
import CountBadge from "../../../components/ui/CountBadge";

const NotificationManagement = () => {
  const [noticeToUpdate, setNoticeToUpdate] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [confirmSoftDelete, setConfirmSoftDelete] = useState(null);
  const [viewNotification, setViewNotification] = useState(false);
  const [conformAction, setConfirmAction] = useState(null);
  const [confirmArchive, setConfirmArchive] = useState(null);
  const [confirmRevokeNotice, setConfirmRevokeNotice] = useState(null);
  const [notificationSearch, setNotificationSearch] = useState("");

  const isExpired =
    viewNotification?.expiresAt &&
    new Date(viewNotification.expiresAt) <= new Date();

  const getInitialForm = () => ({
    key: "notifications.read",
    title: "",
    message: "",
    module: "notifications",
    category: "general",
    priority: "normal",
    type: "info",
    status: "draft",
    authority:
      "Principal, Nova Panel Model College, Dhaka-23D, Ghulshan-20/c, Bangladesh",
    scheduledAt: "",
    expiresAt: "",
  });

  const [form, setForm] = useState(getInitialForm());

  // Reset form
  const resetForm = () => {
    setNoticeToUpdate(null);
    setForm(getInitialForm());
  };

  // Reset Form Action
  const resetFormAction = () => {
    setConfirmAction(null);
    setConfirmArchive(null);
    setConfirmRevokeNotice(null);
  };

  /*** ---> Notification Query Mutation  fetch notification API Hook ---> */
  const {
    data: notifications,
    isLoading: notificationsLoading,
    isError: notificationsError,
    refetch: refetchNotifications,
    error: notificationsErrorObj,
  } = useApiQuery({
    url: `${API_PATHS.NOTIFICATION.ENDPOINT}/all`,
    queryKey: API_PATHS.NOTIFICATION.KEYS.ALL,
    options: {
      staleTime: 0,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  });

  /**---> PAGINATION --->*/
  const [paginatedData, setPaginatedData] = useState(notifications || []);
  const dataLength = notifications ? notifications?.length : [];

  /*** ---> Archived Notification Query Mutation  fetch notification API Hook ---> */
  const {
    data: archivedNotifications,
    isLoading: archivedNotificationsLoading,
    isError: archivedNotificationsError,
    refetch: refetchArchivedNotifications,
    error: archivedNotificationsErrorObj,
  } = useApiQuery({
    url: `${API_PATHS.NOTIFICATION.ENDPOINT}/archived`,
    queryKey: API_PATHS.NOTIFICATION.KEYS.ARCHIVED,
    options: {
      staleTime: 0,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  });

  /*** ---> Soft-deleted Notification Query Mutation  fetch notification API Hook ---> */
  const {
    data: softDeletedNotifications,
    isLoading: softDeletedNotificationsLoading,
    isError: softDeletedNotificationsError,
    refetch: refetchSoftDeletedNotifications,
    error: softDeletedNotificationsErrorObj,
  } = useApiQuery({
    url: `${API_PATHS.NOTIFICATION.ENDPOINT}/soft/deleted`,
    queryKey: API_PATHS.NOTIFICATION.KEYS.SOFT_DELETED,
    options: {
      staleTime: 0,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  });

  /*** ------> Notification Mutation CREATE/UPDATE API Hook ------> */
  const notificationMutation = useApiMutation({
    method: noticeToUpdate ? "update" : "create",
    path: noticeToUpdate
      ? (payload) => `${API_PATHS.NOTIFICATION.ENDPOINT}/edit/${payload.id}`
      : `${API_PATHS.NOTIFICATION.ENDPOINT}/create`,
    key: API_PATHS.NOTIFICATION.KEYS.UPDATE, // used by useQuery

    onSuccess: (data) => {
      refetchAll();
      resetForm();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${data.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: (error) => {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `${error.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
      console.error(error);
    },
  });

  /*** ------> PUBLISH Notification Mutation API Hook ------> */
  const publishNotificationMutation = useApiMutation({
    method: "update",
    path: (payload) =>
      `${API_PATHS.NOTIFICATION.ENDPOINT}/publish/${payload?.id}`,
    key: API_PATHS.NOTIFICATION.KEYS.PUBLISHED,
    onSuccess: (data) => {
      refetchAll();
      resetFormAction();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${data.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: (error) => {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `${error.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
      console.error(error);
    },
  });

  /*** ------> Notification Mutation ARCHIVE API Hook ------> */
  const archiveNoticeMutation = useApiMutation({
    method: "update",
    path: (payload) =>
      `${API_PATHS.NOTIFICATION.ENDPOINT}/archive/${payload?.id}`,
    key: API_PATHS.NOTIFICATION.KEYS.ARCHIVED,
    onSuccess: (data) => {
      refetchAll();
      resetFormAction();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${data.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: (error) => {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `${error.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
      console.error(error);
    },
  });

  /*** ------> SOFT DELETE Notification Mutation API Hook ------> */
  const notificationSoftDeleteMutation = useApiMutation({
    method: "delete",
    path: (payload) =>
      `${API_PATHS.NOTIFICATION.ENDPOINT}/soft/delete/${payload?.id}`,
    key: API_PATHS.NOTIFICATION.KEYS.SOFT_DELETED,
    onSuccess: (data) => {
      refetchAll();
      setTimeout(() => {
        setConfirmSoftDelete(null);
      }, 600);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${data.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: (error) => {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `${error.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
      console.error(error);
    },
  });

  /*** ------> DELETE Notification Mutation API Hook ------> */
  const notificationDeleteMutation = useApiMutation({
    method: "delete",
    path: (id) => `${API_PATHS.NOTIFICATION.ENDPOINT}/delete/${id}`,
    key: API_PATHS.NOTIFICATION.KEYS.DELETE,
    onSuccess: (data) => {
      refetchAll();
      setConfirmDelete(null);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${data.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: (error) => {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `${error.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
      console.error(error);
    },
  });

  /*** ------> REVOKE ARCHIVED Notification Mutation API Hook ------> */
  const revokeArchivedMutation = useApiMutation({
    method: "update",
    path: (payload) =>
      `${API_PATHS.NOTIFICATION.ENDPOINT}/revoke/archived/${payload?.id}`,
    key: API_PATHS.NOTIFICATION.KEYS.REVOKE_ARCHIVED,
    onSuccess: (data) => {
      refetchAll();
      resetFormAction();
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${data.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: (error) => {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: `${error.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
      console.error(error);
    },
  });

  /*** -----> Validator integration -----> */
  const { errors, validate } = useValidator(notificationValidationRules, {
    key: form?.key,
    title: form?.title,
    message: form?.message,
    module: form?.module,
    authority: form?.authority,
  });

  /*** ------> NOTIFICATION RELATED HANDLERS ------> */
  const getNoticeData = () => ({
    key: form.key,
    title: form.title,
    message: form.message,
    category: form.category,
    priority: form.priority,
    type: form.type,
    module: form.module,
    status: form.status,
    authority: form.authority,
    scheduledAt: form.scheduledAt,
    expiresAt: form.expiresAt,
  });

  // Form data mapper to set in form
  const mapNoticeToForm = (notice) => ({
    key: notice.key ?? "",
    module: notice.module ?? "",
    title: notice.title ?? "",
    message: notice.message ?? "",
    category: notice.category ?? "",
    priority: notice.priority ?? "",
    type: notice.type ?? "",
    status: notice.status ?? "",
    authority: notice.authority ?? "",
    scheduledAt: notice.scheduledAt ?? "",
    expiresAt: notice.expiresAt ?? "",
  });

  //  Handler to select permission for editing
  const handleSelectNoticeToEdit = (noticeId) => {
    const notice = notifications?.find((n) => n._id === noticeId);
    setNoticeToUpdate(notice);
    setViewNotification(null);
    setForm(mapNoticeToForm(notice));
  };

  // Cancel update handler
  const handleCancelNotificationUpdate = (e) => {
    e.preventDefault();
    try {
      resetForm();
    } catch (error) {
      console.error("Error in canceling notification update!", error);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Handle confirm soft delete notification
  const handleConfirmSoftDeleteNotification = (noticeId, dataSource) => {
    const notice = dataSource?.find(
      (n) => n?._id.toString() === noticeId.toString(),
    );
    if (notice) {
      setConfirmSoftDelete(notice);
    }
  };

  // Handle soft delete
  const handleSoftDeleteNotification = (noticeId) => {
    const payload = {
      id: noticeId,
      data: { status: "softDeleted" },
    };

    notificationSoftDeleteMutation.mutate(payload, {
      onSuccess: () => {
        setTimeout(() => {
          setConfirmSoftDelete(null);
        }, 600);
      },
      onError: (error) => {
        console.error("Error", error);
      },
    });
  };

  // Handler to confirm delete permission
  const handleConfirmDeleteNotification = (notification) => {
    setConfirmDelete(notification);
  };

  // Handler to delete notification
  const handleDeleteNotification = (id) => {
    const payload = id;
    notificationDeleteMutation.mutate(payload, {
      onSuccess: () => {
        setTimeout(() => {
          setConfirmDelete(null);
        }, 600);
      },
      onError: (error) => {
        console.error("Error in deleting notification!", error);
        setTimeout(() => {
          setConfirmDelete(null);
        }, 600);
      },
    });
  };

  // Handle view notification
  const handleViewNotification = (noticeId, dataSource) => {
    const notice = dataSource?.find(
      (n) => n._id.toString() === noticeId.toString(),
    );
    if (notice) {
      setViewNotification(notice);
      setNoticeToUpdate(null);
    }
  };

  // Handle close modal
  const handleCloseModal = () => {
    setViewNotification(null);
  };

  const handleConfirmArchive = (noticeId, dataSource) => {
    const notice = dataSource?.find(
      (n) => n._id.toString() === noticeId.toString(),
    );
    if (notice) {
      setConfirmArchive(notice);
    }
  };

  const handleArchiveNotice = (noticeId) => {
    const payload = {
      id: noticeId,
      data: { status: "archived" },
    };

    archiveNoticeMutation.mutate(payload);
  };

  // Handle confirm revoke notice
  const handleConfirmRevokeNotification = (noticeId, dataSource) => {
    const notice = dataSource?.find(
      (n) => n?._id.toString() === noticeId.toString(),
    );
    if (notice) {
      setConfirmRevokeNotice(notice);
    }
  };

  // Handle revoke archived notice
  const handleRevokeArchivedNotice = (noticeId) => {
    const payload = {
      id: noticeId,
      data: { status: "draft" },
    };

    revokeArchivedMutation.mutate(payload);
  };

  // Handle confirm action
  const handleConfirmAction = (noticeId, dataSource) => {
    const notice = dataSource.find(
      (n) => n?._id.toString() === noticeId.toString(),
    );

    if (notice) {
      setConfirmAction(notice);
    }
  };

  // Handle publish notification
  const handlePublishNotification = (noticeId) => {
    try {
      const payload = {
        id: noticeId,
        data: { status: "published" },
      };

      publishNotificationMutation.mutate(payload);
    } catch (error) {
      console.error("Error in publishing notification", error);
    }
  };

  const refetchAll = async () => {
    await Promise.all([
      refetchNotifications(),
      refetchArchivedNotifications(),
      refetchSoftDeletedNotifications(),
    ]);
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (!validate()) return;
      const payload = noticeToUpdate
        ? {
            id: noticeToUpdate?._id,
            data: getNoticeData(),
          }
        : {
            data: getNoticeData(),
          };

      notificationMutation.mutate(payload);
    } catch (error) {
      console.error("Error in creating/updating permission!", error);
    }
  };

  /**--------- HANDLE SEARCH RESET ---------*/
  const handleSearchReset = () => {
    setNotificationSearch("");
  };

  /**--------- HANDLE SEARCH QUERY ---------*/
  const filteredNotifications = notifications?.filter((n) => {
    const q = notificationSearch.toLowerCase();
    return (
      n?.title?.toLowerCase().includes(q) || n?.title?.toLowerCase().includes(q)
    );
  });

  /** --------> Use Fetched Data Status Handlers --------> */
  const notificationDataStatus = useFetchedDataStatusHandler({
    isLoading: notificationsLoading,
    isError: notificationsError,
    error: notificationsErrorObj,
    label: "notifications-super-admin",
  });

  const archivedNotificationDataStatus = useFetchedDataStatusHandler({
    isLoading: archivedNotificationsLoading,
    isError: archivedNotificationsError,
    error: archivedNotificationsErrorObj,
    label: "archived-notifications-super-admin",
  });

  const softDeletedNotificationDataStatus = useFetchedDataStatusHandler({
    isLoading: softDeletedNotificationsLoading,
    isError: softDeletedNotificationsError,
    error: softDeletedNotificationsErrorObj,
    label: "soft-deleted-notifications-super-admin",
  });

  return (
    <div>
      <div className="grid lg:grid-cols-12 grid-cols-1 gap-4 justify-between">
        <div className="lg:col-span-5 col-span-12 border border-base-content/15 rounded-xl shadow-sm hover:shadow-xl p-4">
          <NotificationForm
            onFormSubmit={handleSubmit}
            formData={form}
            onHandleChange={handleChange}
            noticeToUpdate={noticeToUpdate}
            errors={errors}
            onCancel={handleCancelNotificationUpdate}
          />
        </div>
        <div className="lg:col-span-7 col-span-12 border border-base-content/15 rounded-xl shadow-sm hover:shadow-xl p-4">
          <div className="lg:flex grid lg:grid-cols-12 items-center grid-cols-1 lg:gap-4 gap-2 justify-between lg:mb-4 mb-2">
            <div className="lg:col-span-6 col-span-12">
              <h1 className="lg:text-xl text-sm font-bold flex items-center gap-2">
                Notification List
                <CountBadge dataLength={notifications} />
              </h1>
            </div>
            <div
              className={`lg:col-span-6 col-span-12 flex items-center justify-between gap-2 ${!notificationSearch ? "lg:w-1/3 w-full" : "lg:w-1/2  w-full"}`}
            >
              <input
                type="text"
                placeholder="Search notice..."
                className="input input-sm input-bordered w-full shadow"
                value={notificationSearch}
                onChange={(e) => setNotificationSearch(e.target.value)}
              />

              <Button onClick={handleSearchReset} size="sm" variant="outline">
                <LucideIcon.RefreshCcw size={20} /> Reset
              </Button>
            </div>
          </div>
          {notificationDataStatus?.status !== "success" ? (
            notificationDataStatus?.content
          ) : (
            <NotificationList
              notifications={
                notificationSearch ? filteredNotifications : paginatedData
              }
              onSelect={handleSelectNoticeToEdit}
              onConfirmDelete={handleConfirmDeleteNotification}
              onView={handleViewNotification}
              handleArchiveNotice={handleArchiveNotice}
              onConfirmAction={handleConfirmAction}
              onConfirmArchive={handleConfirmArchive}
              onSoftDelete={handleConfirmSoftDeleteNotification}
            />
          )}

          {/* ----> PAGINATION READER ---->*/}
          <div className="lg:my-4 mt-8">
            <Pagination
              items={notifications}
              dataLength={dataLength}
              onPaginatedDataChange={setPaginatedData}
            />
          </div>

          {/* Archived notification table */}
          {archivedNotificationDataStatus?.status !== "success" ? (
            archivedNotificationDataStatus?.content
          ) : (
            <ArchivedNotificationList
              archivedNotifications={archivedNotifications}
              onView={handleViewNotification}
              onRevoke={handleRevokeArchivedNotice}
              onConfirmAction={handleConfirmAction}
              onConfirmSoftDeleteNotification={
                handleConfirmSoftDeleteNotification
              }
              onConfirmRevoke={handleConfirmRevokeNotification}
            />
          )}

          {/* Soft deleted notification table */}
          {softDeletedNotificationDataStatus?.status !== "success" ? (
            softDeletedNotificationDataStatus?.content
          ) : (
            <SoftDeletedNotificationList
              softDeletedNotifications={softDeletedNotifications}
              onView={handleViewNotification}
              onConfirmDelete={handleConfirmDeleteNotification}
              onConfirmAction={handleConfirmAction}
              onConfirmArchive={handleConfirmArchive}
              onConfirmRevoke={handleConfirmRevokeNotification}
            />
          )}
        </div>
      </div>

      {/* Confirm Action */}
      {conformAction && (
        <ConfirmActionDialogue
          isOpen={conformAction}
          action="Publishing Notice"
          onClose={() => setConfirmAction(null)}
          onConfirm={() => handlePublishNotification(conformAction?._id)}
        />
      )}

      {/* Confirm Archiving */}
      {confirmArchive && (
        <ConfirmActionDialogue
          isOpen={confirmArchive}
          onClose={() => setConfirmArchive(null)}
          action="Archiving Notice"
          onConfirm={() => handleArchiveNotice(confirmArchive?._id)}
        />
      )}

      {/* Confirm Revoke Archived or Soft Deleted Notice */}
      {confirmRevokeNotice && (
        <ConfirmActionDialogue
          isOpen={confirmRevokeNotice}
          onClose={() => setConfirmRevokeNotice(null)}
          onConfirm={() => handleRevokeArchivedNotice(confirmRevokeNotice?._id)}
          action="Revoking Notice"
        />
      )}

      {/* Confirm soft delete */}
      {confirmSoftDelete && (
        <ConfirmDialogue
          isOpen={confirmSoftDelete}
          onClose={() => setConfirmSoftDelete(null)}
          onConfirm={() => handleSoftDeleteNotification(confirmSoftDelete?._id)}
        />
      )}

      {/* Confirm delete dialogue box */}
      {confirmDelete && (
        <ConfirmDialogue
          isOpen={confirmDelete}
          onClose={() => setConfirmDelete(null)}
          onConfirmDelete={handleConfirmDeleteNotification}
          onConfirm={() => {
            handleDeleteNotification(confirmDelete._id);
          }}
        />
      )}

      {/* Open notice view modal */}
      {viewNotification && (
        <Modal
          isOpen={viewNotification}
          onClose={handleCloseModal}
          title="Notice Details View"
        >
          <div className="space-y-2 ">
            <p className="flex items-center gap-1.5 mt-2">
              <LucideIcon.Megaphone
                size={35}
                className="animate-pulse text-primary"
              />
              <span className="badge badge-primary border-4 border-emerald-500 capitalize p-3">
                Category • {viewNotification?.category}
              </span>
            </p>
            <div className="divider"></div>
            <h1 className="lg:text-lg text-sm font-bold">
              {viewNotification?.title}
            </h1>
            <div className="max-h-96 overflow-y-auto">
              <ReadMore text={viewNotification?.message} maxLength={300} />
            </div>
            <div className="divider"></div>
            <p className="font-bold flex items-center gap-1.5">
              {viewNotification?.authority}
            </p>
            <div className="divider"></div>

            <div className="lg:flex grid items-center gap-2">
              <p>
                <span className="badge badge-info capitalize">
                  Priority: {viewNotification?.priority}
                </span>
              </p>
              <p className="flex items-center gap-2 capitalize">
                <span
                  className={`capitalize ${viewNotification?.type === "info" ? "badge badge-primary" : viewNotification?.type === "success" ? "badge badge-success" : viewNotification?.type === "warning" ? "badge badge-warning" : viewNotification?.type === "error" ? "badge badge-error" : ""}`}
                >
                  Type: {viewNotification?.type}
                </span>
              </p>
              <p className="">
                <span className="badge badge-outline capitalize font-bold hover:bg-gray-900 hover:text-white">
                  Status: {viewNotification?.status}
                </span>
              </p>
            </div>
            <div className="lg:flex grid lg:items-center gap-1.5">
              <p className="flex items-center gap-1.5 badge badge-primary">
                <LucideIcon.CalendarDaysIcon size={16} /> Created on &nbsp;
                {normalizeDate(viewNotification?.createdAt)}
              </p>
              <p className="flex items-center gap-1.5 badge badge-primary">
                <LucideIcon.CalendarDaysIcon size={16} /> Updated on &nbsp;
                {normalizeDate(viewNotification?.updatedAt)}
              </p>
              <p>
                {!viewNotification?.expiresAt ? (
                  <span className="badge badge-dash border-2 bg-warning border-green-500">
                    No Expiry
                  </span>
                ) : isExpired ? (
                  <span className="badge badge-dash border-2 bg-warning border-green-500">
                    Expired
                  </span>
                ) : (
                  <span className="badge badge-dash border-2 bg-success text-white border-green-500 font-semibold">
                    Active
                  </span>
                )}
              </p>
            </div>
            <div className="divider"></div>
            <div className="flex justify-end">
              <MiniIconButton
                onClick={handleCloseModal}
                size="sm"
                icon="close"
                variant="danger"
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default NotificationManagement;
