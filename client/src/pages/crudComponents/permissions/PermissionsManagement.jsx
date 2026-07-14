import { useState } from "react";
import { useApiQuery } from "../../../hooks/useApiQuery";
import useFetchedDataStatusHandler from "../../../hooks/useFetchedDataStatusHandler";
import API_PATHS from "../../../services/api.paths";
import PermissionForm from "./PermissionForm";
import PermissionsTable from "./PermissionsTable";
import useValidator from "../../../hooks/useValidator";
import { permissionValidationRules } from "./permissionValidationRules";
import ConfirmDialogue from "../../../components/ui/ConfirmDialogue";
import Swal from "sweetalert2";
import { useApiMutation } from "../../../hooks/useApiMutation";
import Pagination from "../../../components/pagination/Pagination";
import SearchBox from "../../../components/ui/SearchBox";
import CountBadge from "../../../components/ui/CountBadge";

const PermissionsManagement = () => {
  const [permissionToUpdate, setPermissionToUpdate] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [permissionSearch, setPermissionSearch] = useState("");
  const [form, setForm] = useState({
    key: "",
    module: "",
    description: "",
  });

  /*** -----> Validator integration -----> */
  const { errors, validate } = useValidator(permissionValidationRules, {
    key: form.key,
    module: form.module,
    description: form.description,
  });

  /*** ---> Permission Query Mutation  fetch permissions API Hook ---> */
  const {
    data: permissions,
    isLoading: permissionsLoading,
    isError: permissionsError,
    error: permissionsErrorObj,
  } = useApiQuery({
    url: `${API_PATHS.SUPER_ADMIN_PERMISSIONS.ENDPOINT}/all`,
    queryKey: API_PATHS.SUPER_ADMIN_PERMISSIONS.KEY,
    options: {
      staleTime: 0,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  });

  /**---> PAGINATION --->*/
  const [paginatedData, setPaginatedData] = useState(permissions || []);
  const dataLength = permissions?.length;

  /*** ------> Permission Mutation CREATE/UPDATE API Hook ------> */
  const permissionMutation = useApiMutation({
    method: permissionToUpdate ? "update" : "create",
    path: permissionToUpdate
      ? (payload) =>
          `${API_PATHS.SUPER_ADMIN_PERMISSIONS.ENDPOINT}/edit/${payload.id}`
      : `${API_PATHS.SUPER_ADMIN_PERMISSIONS.ENDPOINT}/create`,
    key: API_PATHS.SUPER_ADMIN_PERMISSIONS.KEY, // used by useQuery

    onSuccess: (data) => {
      setPermissionToUpdate(null);
      setForm({
        key: "",
        module: "",
        description: "",
      });
      console.log("Permission create/update response:", data);
      setForm({
        key: "",
        module: "",
        description: "",
      });
      console.log("Permission create/update response:", data);
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
  const permissionDeleteMutation = useApiMutation({
    method: "delete",
    path: (id) => `${API_PATHS.SUPER_ADMIN_PERMISSIONS.ENDPOINT}/delete/${id}`,
    key: API_PATHS.SUPER_ADMIN_PERMISSIONS.KEY,
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

  /*** ------> PERMISSION RELATED HANDLERS ------> */

  //  Handler to select permission for editing
  const handleSelectPermissionEdit = (permissionId) => {
    const permission = permissions.find((p) => p._id === permissionId);
    setPermissionToUpdate(permission);
    setForm({
      key: permission.key || "",
      module: permission.module || "",
      description: permission.description || "",
    });
  };

  // Handle form input changes
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Cancel update handler
  const handleCancelPermissionUpdate = (e) => {
    e.preventDefault();
    try {
      setPermissionToUpdate(null);
      setForm({
        key: "",
        module: "",
        description: "",
      });
    } catch (error) {
      console.error("Error in canceling permission update!", error);
    }
  };

  // Update Permissions Handler
  const handleUpdatePermission = (e) => {
    e.preventDefault();
    try {
      if (!validate()) return;
      const payload = permissionToUpdate
        ? {
            id: permissionToUpdate._id,
            data: {
              key: form.key,
              module: form.module,
              description: form.description,
            },
          }
        : {
            data: {
              key: form.key,
              module: form.module,
              description: form.description,
            },
          };

      permissionMutation.mutate(payload, {
        onSuccess: () => {
          setForm({
            key: "",
            module: "",
            description: "",
          });
        },
      });
    } catch (error) {
      console.error("Error in creating/updating permission!", error);
    }
  };

  // Handler to confirm delete permission
  const handleConfirmDeletePermission = (permission) => {
    setConfirmDelete(permission);
  };

  // Handler to delete permission
  const handleDeletePermission = (id) => {
    const payload = id;
    permissionDeleteMutation.mutate(payload, {
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

  // Handle Search Reset
  const handleSearchReset = () => {
    setPermissionSearch("");
  };

  /**--------- HANDLE SEARCH QUERY ---------*/
  const filteredPermissions = permissions?.filter((p) => {
    const q = permissionSearch.toLowerCase();
    return (
      p?.key?.toLowerCase().includes(q) ||
      p?.module?.toLowerCase().includes(q) ||
      p?.description?.toLowerCase().includes(q)
    );
  });

  /** --------> Use Fetched Data Status Handler --------> */
  const permissionsStatus = useFetchedDataStatusHandler({
    isLoading: permissionsLoading,
    isError: permissionsError,
    error: permissionsErrorObj,
    label: "permissions-super-admin",
  });

  return (
    <div>
      <div className="grid lg:grid-cols-12 grid-cols-1 gap-4 justify-between">
        <div className="lg:col-span-4 col-span-12 border border-base-content/15 rounded-xl shadow-sm hover:shadow-xl p-4">
          <PermissionForm
            permissionToUpdate={permissionToUpdate}
            onUpdate={handleUpdatePermission}
            formData={form}
            errors={errors}
            onHandleChange={handleChange}
            loading={permissionMutation.isPending}
            onCancel={handleCancelPermissionUpdate}
            perMutation={permissionDeleteMutation}
          />
        </div>
        <div className="lg:col-span-8 col-span-12">
          <div className="lg:flex grid items-center justify-between gap-2">
            <div className="">
              <h1 className="lg:text-xl text-sm font-bold flex items-center gap-2">
                Permissions Management • Total{" "}
                <CountBadge dataLength={permissions} />
              </h1>
            </div>
            <div className="">
              <SearchBox
                onReset={handleSearchReset}
                value={permissionSearch}
                onChange={setPermissionSearch}
              />
            </div>
          </div>
          <div className="divider m-2"></div>
          {permissionsStatus?.status !== "success" ? (
            permissionsStatus?.content
          ) : (
            <>
              <PermissionsTable
                permissions={
                  permissionSearch ? filteredPermissions : paginatedData
                }
                onSelectPermissionEdit={handleSelectPermissionEdit}
                onConfirmDelete={handleConfirmDeletePermission}
              />
              {/* ----> PAGINATION READER ---->*/}
              <div className="lg:my-8 my-4">
                <Pagination
                  items={permissions}
                  dataLength={dataLength}
                  onPaginatedDataChange={setPaginatedData}
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Confirm delete dialogue box */}
      {confirmDelete && (
        <ConfirmDialogue
          isOpen={confirmDelete}
          onClose={() => setConfirmDelete(null)}
          onConfirmDelete={handleConfirmDeletePermission}
          onConfirm={() => {
            handleDeletePermission(confirmDelete._id);
          }}
        />
      )}
    </div>
  );
};

export default PermissionsManagement;
