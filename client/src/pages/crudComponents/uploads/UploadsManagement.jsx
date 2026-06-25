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
import { useRef, useState } from "react";
import CountBadge from "../../../components/ui/CountBadge";
import NoDataFound from "../../../components/ui/NoDataFound";
import UploadViewModal from "./UploadViewModal";

const UploadsManagement = () => {
  const [file, setFile] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [selectedUpload, setSelectedUpload] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const fileInputRef = useRef(null);

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
    method: "create",
    path: () => `${API_PATHS.SUPER_ADMIN_UPLOADS.ENDPOINT}/single`,
    key: API_PATHS.SUPER_ADMIN_UPLOADS.KEY, // used by useQuery

    onSuccess: (data) => {
      console.log("Upload/update response:", data);
      setFile(null);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);

    const payload = {
      data: formData,
    };

    uploadMutation.mutate(payload);
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
          <h1 className="lg:text-xl text-lg font-extrabold">
            Super Admin Uploads Management
          </h1>
          <div className="border border-base-content/15 lg:p-6 p-3 rounded-xl shadow-md hover:shadow-xl">
            <h1 className="lg:text-lg text-xs font-bold border-b border-base-content/15 pb-1 mb-4">
              Select file & Upload
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="file"
                name="file"
                ref={fileInputRef}
                icon={LucideIcon.Image}
                label="Choose a file"
                placeholder="Choose your file..."
                onChange={(e) => setFile(e.target.files[0])}
                className="p-2"
              />
              <div className="">
                <Button
                  type="submit"
                  size="sm"
                  disabled={uploadMutation?.isPending}
                >
                  {uploadMutation?.isPending ? (
                    <LucideIcon.Loader2 size={20} className="animate-spin" />
                  ) : (
                    <LucideIcon.UploadCloud size={20} />
                  )}
                  {uploadMutation?.isPending ? "Uploading..." : "Upload"}
                </Button>
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
