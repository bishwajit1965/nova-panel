import { useState } from "react";
import { useApiQuery } from "../../../hooks/useApiQuery";
import useFetchedDataStatusHandler from "../../../hooks/useFetchedDataStatusHandler";
import API_PATHS from "../../../services/api.paths";

import RolesTable from "./RolesTable";
import { useApiMutation } from "../../../hooks/useApiMutation";
import Swal from "sweetalert2";
import { LucideIcon } from "../../../components/lib/LucideIcons";
import Button from "../../../components/ui/Button";
import CountBadge from "../../../components/ui/CountBadge";

const RolePermissionControl = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [selectedPermissions, setSelectedPermissions] = useState([]);

  console.log("Selected Role", selectedRole);
  console.log("Selected Permissions", selectedPermissions);

  // Fetches all roles for super admin
  const {
    data: roles,
    isLoading: rolesLoading,
    isError: rolesError,
    error: rolesErrorObj,
  } = useApiQuery({
    url: `${API_PATHS.SUPER_ADMIN_ROLES.ENDPOINT}/all`,
    queryKey: API_PATHS.SUPER_ADMIN_ROLES.KEY,
    options: {
      staleTime: 0,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  });

  /*** ---> Permission Query Mutation -> fetch permissions API Hook ---> */
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

  /*** ------> Role Mutation UPDATE API Hook ------> */
  const rolePermissionsMutation = useApiMutation({
    method: "update",
    path: (payload) =>
      `${API_PATHS.SUPER_ADMIN_ROLES.ENDPOINT}/edit/${payload.roleId}`,
    key: API_PATHS.SUPER_ADMIN_ROLES.KEY, // used by useQuery

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

  /**----------> ROLE PERMISSION HANDLERS ---------->*/
  const handleSelectRole = (roleId) => {
    const roleSelected = roles?.find((r) => r._id === roleId);

    const PermissionsSelected =
      roleSelected?.permissions?.flatMap((p) =>
        typeof p === "object" ? p._id : p,
      ) || [];
    setSelectedRole(roleSelected);
    setSelectedPermissions(PermissionsSelected);
  };

  const togglePermission = (permissionId) => {
    setSelectedPermissions((prev) =>
      prev.includes(permissionId)
        ? prev.filter((p) => p !== permissionId)
        : [...prev, permissionId],
    );
  };

  const handleCancelEdit = () => {
    setSelectedRole(null);
    setSelectedPermissions([]);
  };

  /** --------> ASSIGN PERMISSION TO ROLE HANDLER --------> */
  const handleSubmit = (e) => {
    e.preventDefault();
    // FINAL PAYLOAD (IMPORTANT)
    const payload = {
      roleId: selectedRole?._id,
      data: {
        permissions: selectedPermissions,
      },
    };

    // UPDATE MUTATION FIRES
    rolePermissionsMutation.mutate(payload);
  };

  /**------GROUP PERMISSIONS AS PER MODULE ------*/
  const groupedPermissions =
    permissions?.reduce((acc, permission) => {
      const moduleName = permission.module || "General";

      if (!acc[moduleName]) {
        acc[moduleName] = [];
      }

      acc[moduleName].push(permission);

      return acc;
    }, {}) || {};

  /** --------> ROLES-> Use Fetched Data Status Handler --------> */
  const rolesDataStatus = useFetchedDataStatusHandler({
    isLoading: rolesLoading,
    isError: rolesError,
    error: rolesErrorObj,
    label: "roles-super-admin",
  });

  /** --------> Use Fetched Data Status Handler --------> */
  const permissionsDataStatus = useFetchedDataStatusHandler({
    isLoading: permissionsLoading,
    isError: permissionsError,
    error: permissionsErrorObj,
    label: "permissions-super-admin",
  });

  return (
    <div>
      <div className="grid lg:grid-cols-12 grid-cols-1 gap-4 justify-between">
        <div
          className={`${selectedRole ? "lg:col-span-6 col-span-12" : "col-span-0"}`}
        >
          {/* USER TOM ASSIGN ROLES AND PERMISSIONS */}
          <div className="space-y-4">
            {selectedRole && (
              <>
                <div className="">
                  <h1 className="lg:text-xl text-lg font-extrabold capitalize flex items-center gap-2">
                    <LucideIcon.UserCircle /> {selectedRole?.name} → Has{" "}
                    {
                      <CountBadge
                        dataLength={selectedPermissions}
                        color="blue-500"
                      />
                    }{" "}
                    Permission/(s)
                  </h1>
                </div>

                {/* PERMISSIONS ASSIGNABLE TO ROLE */}
                {permissionsDataStatus.status !== "success" ? (
                  permissionsDataStatus?.content
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-2">
                      {Object.entries(groupedPermissions).map(
                        ([moduleName, modulePermissions]) => (
                          <div
                            key={moduleName}
                            className="border rounded-lg shadow hover:shadow-lg border-base-content/15 p-2"
                          >
                            <h3 className="font-bold text-lg capitalize ">
                              {moduleName}
                            </h3>

                            <div className="grid lg:grid-cols-3 gap-2 text-sm">
                              {modulePermissions?.map((permission) => (
                                <label
                                  key={permission._id}
                                  className="flex items-center gap-1"
                                >
                                  <input
                                    type="checkbox"
                                    checked={selectedPermissions.includes(
                                      permission._id,
                                    )}
                                    onChange={() =>
                                      togglePermission(permission._id)
                                    }
                                  />

                                  <span>{permission.key}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        ),
                      )}
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="flex items-center gap-2 mt-4">
                      <Button
                        type="submit"
                        variant="primary"
                        size="sm"
                        disabled={rolePermissionsMutation.isPending}
                      >
                        {rolePermissionsMutation.isPending ? (
                          <LucideIcon.Loader
                            size={20}
                            className="animate-spin"
                          />
                        ) : (
                          <LucideIcon.CheckCircle2 size={20} />
                        )}
                        {rolePermissionsMutation.isPending
                          ? "Assigning..."
                          : "Assign Permission"}
                      </Button>
                      <Button
                        type="button"
                        variant="warning"
                        size="sm"
                        onClick={handleCancelEdit}
                      >
                        <LucideIcon.RotateCcw size={20} /> Cancel
                      </Button>
                    </div>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
        {/* ADMIN USERS DATA */}
        <div
          className={`${selectedRole ? "lg:col-span-6 col-span-12" : "col-span-12"}`}
        >
          {rolesDataStatus.status !== "success" ? (
            rolesDataStatus.content
          ) : (
            <RolesTable
              roles={roles}
              onSelect={handleSelectRole}
              selectedRole={selectedRole}
              handleSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RolePermissionControl;
