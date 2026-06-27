import { Input } from "../../../components/ui/Input";
import { LucideIcon } from "../../../components/lib/LucideIcons";
import Button from "../../../components/ui/Button";
import API_PATHS from "../../../services/api.paths";
import Swal from "sweetalert2";
import { useApiMutation } from "../../../hooks/useApiMutation";
import { useApiQuery } from "../../../hooks/useApiQuery";
import useFetchedDataStatusHandler from "../../../hooks/useFetchedDataStatusHandler";
import UploadCard from "./UploadCard";
import Pagination from "../../../components/pagination/Pagination";
import ConfirmDialogue from "../../../components/ui/ConfirmDialogue";
import { useEffect, useRef, useState } from "react";
import CountBadge from "../../../components/ui/CountBadge";
import NoDataFound from "../../../components/ui/NoDataFound";
import UploadViewModal from "./UploadViewModal";
import { usePermission } from "../../../hooks/hasPermission";

const UploadsManagement = () => {
  const [files, setFiles] = useState([]);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [selectedUpload, setSelectedUpload] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectEdit, setSelectEdit] = useState(null);
  const [previews, setPreviews] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef(null);
  const { can } = usePermission();

  console.log("SELECT EDIT UPLOAD", selectEdit);
  // Fetches all uploads for super admin
  const {
    data: uploads,
    isLoading: uploadsLoading,
    isError: uploadsError,
    error: uploadsErrorObj,
  } = useApiQuery({
    url: `${API_PATHS.SUPER_ADMIN_UPLOADS.ENDPOINT}/all`,
    queryKey: API_PATHS.SUPER_ADMIN_UPLOADS.KEY,
    options: {
      staleTime: 0,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  });

  /**---> PAGINATION --->*/
  const [paginatedData, setPaginatedData] = useState(uploads || []);
  const dataLength = uploads?.length;

  /*** ------> Role Mutation CREATE/UPDATE API Hook ------> */
  const uploadMutation = useApiMutation({
    method: selectEdit ? "update" : "create",
    path: (payload) =>
      selectEdit
        ? `${API_PATHS.SUPER_ADMIN_UPLOADS.ENDPOINT}/update/single/${payload.id}`
        : files?.length > 1
          ? `${API_PATHS.SUPER_ADMIN_UPLOADS.ENDPOINT}/multiple`
          : `${API_PATHS.SUPER_ADMIN_UPLOADS.ENDPOINT}/single`,
    key: API_PATHS.SUPER_ADMIN_UPLOADS.KEY, // used by useQuery

    options: {
      onUploadProgress: (progressEvent) => {
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total,
        );
        setUploadProgress(percent);
      },
    },

    onSuccess: (data) => {
      console.log("Upload/update response:", data);
      setUploadProgress(0);
      setFiles([]);
      setPreviews([]);
      setSelectEdit(null);
      setSelectedUpload(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${data.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: (error) => {
      setUploadProgress(0);
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

  /*** ------> Permission Mutation DELETE API Hook ------> */
  const uploadsDeleteMutation = useApiMutation({
    method: "delete",
    path: (id) => `${API_PATHS.SUPER_ADMIN_UPLOADS.ENDPOINT}/delete/${id}`,
    key: API_PATHS.SUPER_ADMIN_UPLOADS.KEY,
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

  useEffect(() => {
    return () => {
      previews.forEach((p) => {
        if (p?.url?.startsWith("blob:")) {
          URL.revokeObjectURL(p?.url);
        }
      });
    };
  }, [previews]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files ?? []);
    if (selectedFiles.length === 0) return;

    setFiles(selectedFiles);

    const previewUrls = selectedFiles.map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    setPreviews(previewUrls);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (files.length === 0) return;

    const formData = new FormData();

    const payload = selectEdit
      ? {
          id: selectEdit?._id,
          data: formData,
        }
      : {
          data: formData,
        };

    const isEdit = !!selectEdit;

    const isMulti = files.length > 1;

    if (isEdit || !isMulti) {
      formData.append("file", files[0]);

      uploadMutation.mutate(payload);
    } else {
      files.forEach((file) => {
        formData.append("files", file);
      });

      uploadMutation.mutate(payload);
    }
  };

  // Handler to confirm delete permission
  const handleConfirmDeleteUploads = (upload) => {
    setConfirmDelete(upload);
  };

  // Handler to delete permission
  const handleDeleteUploads = (id) => {
    const payload = id;
    uploadsDeleteMutation.mutate(payload, {
      onSuccess: () => {
        setTimeout(() => {
          setConfirmDelete(null);
        }, 600);
      },
      onError: (error) => {
        console.error("Error in deleting permission!", error);
        setTimeout(() => {
          setConfirmDelete(null);
        }, 600);
      },
    });
  };

  const handleViewUpload = (upload) => {
    setSelectedUpload(upload);
    setIsViewModalOpen(true);
    setSelectEdit(null);
  };

  const handleSelectEditUpload = (upload) => {
    setSelectEdit(upload);
    setPreviews([{ file: null, url: upload.url }]);
  };

  const handleCancelViewUploadUpdate = () => {
    setSelectEdit(null);
    setPreviews([]);
    setSelectedUpload(null);
    setFiles([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const closeViewModal = () => {
    setSelectedUpload(null);
    setIsViewModalOpen(false);
  };

  /** --------> Use Fetched Data Status Handler --------> */
  const uploadsDataStatus = useFetchedDataStatusHandler({
    isLoading: uploadsLoading,
    isError: uploadsError,
    error: uploadsErrorObj,
    label: "uploads-super-admin",
  });

  return (
    <div>
      <div className="grid lg:grid-cols-12 grid-cols-1 lg:gap-8 gap-4 justify-between">
        <div className="lg:col-span-4 col-span-12 space-y-4">
          <h1 className="lg:text-xl text-xs font-extrabold">
            Super Admin Uploads Management
          </h1>
          <div className="border border-base-content/15 lg:p-4 p-3 rounded-xl shadow-md hover:shadow-xl">
            <h1 className="lg:text-lg text-xs font-bold border-b border-base-content/15 pb-1 mb-2">
              {selectEdit ? "Replace Uploaded Image" : "Upload New Image"}
            </h1>{" "}
            <div className={`${previews?.length > 0 ? "my-4" : ""}`}>
              {previews.length > 0 && (
                <div
                  className={`relative min-h-24 ${previews?.length === 1 ? "grid grid-cols-1" : "grid grid-cols-2 gap-4"}`}
                >
                  {previews?.map((p, index) => (
                    <div key={index} className="relative min-h-24 rounded-xl">
                      <img
                        src={p.url}
                        className="min-h-24 w-full object-cover rounded-xl"
                      />
                      <p className="text-xs mt-1.25 flex justify-start text-white absolute bottom-0 left-0 bg-gray-600 px-1 py-1.5 opacity-70 rounded-bl-xl rounded-tr-md w-[76%]">
                        {p?.file?.name.length > 20
                          ? p?.file?.name.slice(0, 20)
                          : (p?.file?.name ?? selectEdit?.url)}
                      </p>
                    </div>
                  ))}
                  {previews?.length > 0 && (
                    <div className="absolute right-0 bottom-0">
                      <Button
                        onClick={handleCancelViewUploadUpdate}
                        size="xs"
                        icon={LucideIcon.RefreshCcw}
                        variant="warning"
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="mt-3">
                <Input
                  type="file"
                  name="file"
                  ref={fileInputRef}
                  icon={LucideIcon.Image}
                  label="Choose a file"
                  placeholder="Choose your file..."
                  onChange={handleFileChange}
                  multiple={!selectEdit}
                  className="p-2"
                />
              </div>
              <div className="">
                {uploadMutation.isPending && (
                  <div className="my-4">
                    <div className="flex justify-between text-xs text-base-content/70">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>

                    <div className="w-full h-2 bg-gray-200 rounded overflow-hidden">
                      <div
                        className="h-full bg-blue-500 transition-all duration-200"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}

                {can("upload.create") ? (
                  <Button
                    type="submit"
                    size="sm"
                    disabled={uploadMutation?.isPending || files.length == 0}
                  >
                    {uploadMutation?.isPending ? (
                      <LucideIcon.Loader size={18} className="animate-spin" />
                    ) : (
                      <LucideIcon.UploadCloud size={18} />
                    )}
                    {uploadMutation?.isPending
                      ? selectEdit
                        ? "Updating..."
                        : "Uploading..."
                      : selectEdit
                        ? "Update Image"
                        : "Upload Image"}
                  </Button>
                ) : (
                  <p className="font-bold">
                    You do not have permission to upload file!
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
        <div className="lg:col-span-8 col-span-12 mb-10 space-y-4">
          <h1 className="lg:text-xl text-lg font-extrabold flex items-center gap-2">
            Images displayed <CountBadge dataLength={uploads} />
          </h1>
          <div className="">
            {uploadsDataStatus.status !== "success" ? (
              uploadsDataStatus?.content
            ) : (
              <div className="grid lg:grid-cols-12 grid-cols-1 lg:gap-4 gap-2 justify-between cursor-pointer">
                {paginatedData?.length === 0 ? (
                  <NoDataFound label="Uploads" />
                ) : (
                  paginatedData?.map((upload) => (
                    <UploadCard
                      key={upload?._id}
                      upload={upload}
                      onView={handleViewUpload}
                      onSelect={handleSelectEditUpload}
                      onConfirmDelete={handleConfirmDeleteUploads}
                    />
                  ))
                )}
              </div>
            )}
          </div>
          {/* ----> PAGINATION READER ---->*/}
          <div className="lg:my-4 mt-8">
            <Pagination
              items={uploads}
              dataLength={dataLength}
              onPaginatedDataChange={setPaginatedData}
            />
          </div>

          {/* Confirm delete dialogue box */}
          {confirmDelete && (
            <ConfirmDialogue
              isOpen={confirmDelete}
              onClose={() => setConfirmDelete(null)}
              onConfirm={() => {
                handleDeleteUploads(confirmDelete._id);
              }}
              onDelete={uploadsDeleteMutation}
            />
          )}

          {/* Upload View Modal */}
          {isViewModalOpen && (
            <UploadViewModal
              isOpen={isViewModalOpen}
              onClose={closeViewModal}
              upload={selectedUpload}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadsManagement;
