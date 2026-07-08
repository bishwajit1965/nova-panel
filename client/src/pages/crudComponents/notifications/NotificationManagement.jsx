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

const NotificationManagement = () => {
  const [noticeToUpdate, setNoticeToUpdate] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [viewNotification, setViewNotification] = useState(false);

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

  /*** ---> Notification Query Mutation  fetch notification API Hook ---> */
  const {
    data: notifications,
    isLoading: notificationsLoading,
    isError: notificationsError,
    error: notificationsErrorObj,
  } = useApiQuery({
    url: `${API_PATHS.NOTIFICATION.ENDPOINT}/all`,
    queryKey: API_PATHS.NOTIFICATION.KEY,
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
    key: API_PATHS.NOTIFICATION.KEY, // used by useQuery

    onSuccess: (data) => {
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

  /*** ------> Notification Mutation ARCHIVE API Hook ------> */
  const archiveNoticeMutation = useApiMutation({
    method: "update",
    path: (payload) =>
      `${API_PATHS.NOTIFICATION.ENDPOINT}/archive/${payload?.id}`,
    key: API_PATHS.NOTIFICATION.KEY,
    onSuccess: (data) => {
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

  /*** ------> Notification Mutation DELETE API Hook ------> */
  const notificationDeleteMutation = useApiMutation({
    method: "delete",
    path: (id) => `${API_PATHS.NOTIFICATION.ENDPOINT}/delete/${id}`,
    key: API_PATHS.NOTIFICATION.KEY,
    onSuccess: (data) => {
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

  // Handler to confirm delete permission
  const handleConfirmDeleteNotification = (notification) => {
    setConfirmDelete(notification);
  };

  // Handler to delete permission
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
  const handleViewNotification = (noticeId) => {
    const notice = notifications?.find(
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

  const handleArchiveNotice = (noticeId) => {
    const payload = {
      id: noticeId,
      data: { status: "archived" },
    };

    archiveNoticeMutation.mutate(payload);
  };

  // handle form submit
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

  /** --------> Use Fetched Data Status Handler --------> */
  const notificationDataStatus = useFetchedDataStatusHandler({
    isLoading: notificationsLoading,
    isError: notificationsError,
    error: notificationsErrorObj,
    label: "notifications-super-admin",
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
          {notificationDataStatus?.status !== "success" ? (
            notificationDataStatus?.content
          ) : (
            <NotificationList
              notifications={notifications}
              onSelect={handleSelectNoticeToEdit}
              onConfirmDelete={handleConfirmDeleteNotification}
              onView={handleViewNotification}
              handleArchiveNotice={handleArchiveNotice}
            />
          )}
        </div>
      </div>
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
                {" "}
                <span
                  className={`capitalize ${viewNotification?.type === "info" ? "badge badge-primary" : viewNotification?.type === "success" ? "badge badge-success" : viewNotification?.type === "warning" ? "badge badge-warning" : viewNotification?.type === "error" ? "badge badge-error" : ""}`}
                >
                  Type: {viewNotification?.type}
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
                  <span>No Expiry</span>
                ) : isExpired ? (
                  <span className="badge badge-dash border-2 bg-warning border-green-500">
                    <LucideIcon.X size={16} /> Expired
                  </span>
                ) : (
                  <span className="badge badge-dash border-2 bg-success text-white border-green-500 font-semibold">
                    <LucideIcon.CheckCircle size={16} /> Active
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
