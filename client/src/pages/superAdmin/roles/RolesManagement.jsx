import { useApiQuery } from "../../../hooks/useApiQuery";
import API_PATHS from "../../../services/api.paths";
import useFetchedDataStatusHandler from "../../../hooks/useFetchedDataStatusHandler";
import RolesTable from "./RolesTable";
import RoleForm from "./RoleForm";
import { useState } from "react";
import { useApiMutation } from "../../../hooks/useApiMutation";
import Swal from "sweetalert2";
import useValidator from "../../../hooks/useValidator";
import { roleValidationRules } from "./roleValidationRules";
import ConfirmDialogue from "../../../components/ui/ConfirmDialogue";

const RolesManagement = () => {
  const [roleToUpdate, setRoleToUpdate] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [form, setForm] = useState({
    name: "",
    slug: "",
    description: "",
  });

  console.log("Role to edit", roleToUpdate);
  console.log("Form data", form);

  /*** -----> Validator integration -----> */
  const { errors, validate } = useValidator(roleValidationRules, {
    name: form.name,
    slug: form.slug,
    description: form.description,
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

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

  /*** ------> Role Mutation CREATE/UPDATE API Hook ------> */
  const roleMutation = useApiMutation({
    method: roleToUpdate ? "update" : "create",
    path: roleToUpdate
      ? (payload) =>
          `${API_PATHS.SUPER_ADMIN_ROLES.ENDPOINT}/edit/${payload.id}`
      : `${API_PATHS.SUPER_ADMIN_ROLES.ENDPOINT}/create`,
    key: API_PATHS.SUPER_ADMIN_ROLES.KEY, // used by useQuery

    onSuccess: (data) => {
      setRoleToUpdate(null);
      setForm({
        name: "",
        slug: "",
        description: "",
      });
      console.log("Role create/update response:", data);
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

  /*** ------> Role Mutation DELETE API Hook ------> */
  const roleDeleteMutation = useApiMutation({
    method: "delete",
    path: (id) => `${API_PATHS.SUPER_ADMIN_ROLES.ENDPOINT}/delete/${id}`,
    key: API_PATHS.SUPER_ADMIN_ROLES.KEY,
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

  /* -------->  Handlers --------> */
  const handleSelectRoleEdit = (roleId) => {
    const role = roles.find((r) => r._id === roleId);
    setRoleToUpdate(role);
    setForm({
      name: role.name || "",
      slug: role.slug || "",
      description: role.description || "",
    });
  };

  // Cancel update handler
  const handleCancelRoleUpdate = (e) => {
    e.preventDefault();
    setRoleToUpdate(null);
    setForm({
      name: "",
      slug: "",
      description: "",
    });
  };

  // Update Roles  Handler
  const handleUpdateRole = (e) => {
    e.preventDefault();
    try {
      if (!validate()) return;
      const payload = roleToUpdate
        ? {
            id: roleToUpdate._id,
            data: {
              name: form.name,
              slug: form.slug,
              description: form.description,
            },
          }
        : {
            data: {
              name: form.name,
              slug: form.slug,
              description: form.description,
            },
          };

      roleMutation.mutate(payload, {
        onSuccess: () => {
          setForm({
            name: "",
            slug: "",
            description: "",
          });
        },
      });
    } catch (error) {
      console.error("Error in creating/updating role!", error);
    }
  };

  const handleConfirmDeleteRole = (role) => {
    setConfirmDelete(role);
  };

  const handleDeleteRole = (id) => {
    const payload = id;
    roleDeleteMutation.mutate(payload, {
      onSuccess: () => {
        setTimeout(() => {
          setConfirmDelete(null);
        }, 600);
      },
      onError: (error) => {
        console.error("Error in deleting role!", error);
        setTimeout(() => {
          setConfirmDelete(null);
        }, 600);
      },
    });
  };

  /** --------> Use Fetched Data Status Handler --------> */
  const rolesStatus = useFetchedDataStatusHandler({
    isLoading: rolesLoading,
    isError: rolesError,
    error: rolesErrorObj,
    label: "roles-super-admin",
  });

  return (
    <div>
      <div className="grid lg:grid-cols-12 gap-4 justify-between">
        <div className="lg:col-span-4 col-span-12 border border-base-content/15 rounded-xl shadow-sm hover:shadow-xl p-4">
          <RoleForm
            roleToUpdate={roleToUpdate}
            loading={roleMutation.isPending}
            onCancel={handleCancelRoleUpdate}
            onUpdate={handleUpdateRole}
            onHandleChange={handleChange}
            formData={form}
            errors={errors}
          />
        </div>
        <div className="lg:col-span-8 col-span-12">
          {/* Roles section data status handler */}
          {rolesStatus.status !== "success" ? (
            rolesStatus.content
          ) : (
            <RolesTable
              roles={roles}
              onSelectRoleEdit={handleSelectRoleEdit}
              onConfirmDelete={handleConfirmDeleteRole}
            />
          )}
        </div>
      </div>

      {/* Confirm delete dialogue box */}
      {confirmDelete && (
        <ConfirmDialogue
          isOpen={confirmDelete}
          onClose={() => setConfirmDelete(null)}
          onConfirm={() => {
            handleDeleteRole(confirmDelete._id);
          }}
        />
      )}
    </div>
  );
};

export default RolesManagement;
