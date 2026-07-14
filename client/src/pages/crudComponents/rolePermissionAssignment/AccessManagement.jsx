import { useState } from "react";
import { useApiQuery } from "../../../hooks/useApiQuery";
import useFetchedDataStatusHandler from "../../../hooks/useFetchedDataStatusHandler";
import API_PATHS from "../../../services/api.paths";

import AdminUsersTable from "./AdminUsersTable";
import UserToAssignRoles from "./UserToAssignRoles"; // (renamed clean version)
import Swal from "sweetalert2";
import { useApiMutation } from "../../../hooks/useApiMutation";

const AccessManagement = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [userSearch, setUserSearch] = useState("");

  console.log("Selected roles:", selectedRoles);

  /* ---------------- USERS ---------------- */
  const {
    data: users,
    isLoading: usersLoading,
    isError: usersError,
    error: usersErrorObj,
  } = useApiQuery({
    url: `${API_PATHS.SUPER_ADMIN_USERS.ENDPOINT}/all`,
    queryKey: API_PATHS.SUPER_ADMIN_USERS.KEY,
    options: {
      staleTime: 0,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  });

  /* ---------------- ROLES ---------------- */
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

  /*** ------> Role Mutation UPDATE API Hook ------> */
  const roleMutation = useApiMutation({
    method: "update",
    path: (payload) =>
      `${API_PATHS.SUPER_ADMIN_USERS.ENDPOINT}/edit/${payload.userId}`,
    key: API_PATHS.SUPER_ADMIN_USERS.KEY, // used by useQuery

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

  /* ---------------- USER SELECT ---------------- */
  const handleSelectUser = (userId) => {
    const user = users.find((u) => u._id === userId);

    const userRoles =
      user?.roles?.map((r) => (typeof r === "object" ? r._id : r)) || [];

    setSelectedUser(user);
    setSelectedRoles(userRoles);
  };

  /* ---------------- ROLE TOGGLE ---------------- */
  const toggleRole = (roleId) => {
    setSelectedRoles((prev) =>
      prev.includes(roleId)
        ? prev.filter((r) => r !== roleId)
        : [...prev, roleId],
    );
  };

  /* ---------------- CANCEL ---------------- */
  const handleCancel = () => {
    setSelectedUser(null);
    setSelectedRoles([]);
  };

  /**--------- HANDLE SEARCH RESET ---------*/
  const handleSearchReset = () => {
    setUserSearch("");
  };

  /* ------------- SEARCH USERS ------------- */
  const filteredUsers = users?.filter((u) => {
    const q = userSearch.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  });

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = (e) => {
    e.preventDefault();

    // FINAL PAYLOAD (IMPORTANT)
    const payload = {
      userId: selectedUser?._id,
      data: {
        roles: selectedRoles,
      },
    };

    /**------> ROLE MUTATION TO UPDATE DATA ------>*/
    roleMutation.mutate(payload);
  };

  /* ---------------- STATUS HANDLERS ---------------- */
  const usersStatus = useFetchedDataStatusHandler({
    isLoading: usersLoading,
    isError: usersError,
    error: usersErrorObj,
    label: "users",
  });

  const rolesDataStatus = useFetchedDataStatusHandler({
    isLoading: rolesLoading,
    isError: rolesError,
    error: rolesErrorObj,
    label: "roles",
  });

  /* ---------------- UI ---------------- */
  return (
    <>
      <div className="grid lg:grid-cols-12 grid-cols-1 justify-between lg:gap-4 gap-2 text-base-content/70">
        {/* LEFT: USER EDITOR */}
        <div
          className={`${selectedUser ? "lg:col-span-4 col-span-12" : "hidden"}`}
        >
          {selectedUser && (
            <UserToAssignRoles
              selectedUser={selectedUser}
              roles={roles}
              selectedRoles={selectedRoles}
              toggleRole={toggleRole}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              roleMutation={roleMutation}
              rolesDataStatus={rolesDataStatus}
            />
          )}
        </div>
        {/* RIGHT: USERS + ROLES LIST */}
        <div
          className={`${
            selectedUser ? "lg:col-span-8 col-span-12" : "col-span-12"
          }`}
        >
          {/* USERS TABLE */}
          {usersStatus.status !== "success" ? (
            usersStatus.content
          ) : (
            <AdminUsersTable
              users={filteredUsers}
              onSelect={handleSelectUser}
              userSearch={userSearch}
              setUserSearch={setUserSearch}
              selectedUser={selectedUser}
              onReset={handleSearchReset}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default AccessManagement;
