import { useState } from "react";
import { LucideIcon } from "../../../components/lib/LucideIcons";
import Pagination from "../../../components/pagination/Pagination";
import { useApiQuery } from "../../../hooks/useApiQuery";
import useFetchedDataStatusHandler from "../../../hooks/useFetchedDataStatusHandler";
import API_PATHS from "../../../services/api.paths";
import CountBadge from "../../../components/ui/CountBadge";
import UsersTable from "./UsersTable";
import UserModalData from "./UserModalData";
import { useApiMutation } from "../../../hooks/useApiMutation";
import Swal from "sweetalert2";
import ConfirmAction from "../../../components/ui/ConfirmAction";
import Button from "../../../components/ui/Button";

const UserManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [confirmSuspend, setConfirmSuspend] = useState(null);
  const [userSearch, setUserSearch] = useState("");

  /*** ---> USERS Query Mutation -> fetch permissions API Hook ---> */
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

  /**------  Fetches all plans for super admin ------*/
  const {
    data: plans,
    isLoading: plansLoading,
    isError: plansError,
    error: plansErrorObj,
  } = useApiQuery({
    url: `${API_PATHS.SUPER_ADMIN_PLANS.ENDPOINT}/all`,
    queryKey: API_PATHS.SUPER_ADMIN_PLANS.KEY,
    options: {
      staleTime: 0,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  });

  /*** ------> Plan Mutation CREATE/UPDATE API Hook ------> */
  const planMutation = useApiMutation({
    method: "update",
    path: (payload) =>
      `${API_PATHS.SUPER_ADMIN_USERS.ENDPOINT}/assign/plan/${payload?.userId}`,
    key: API_PATHS.SUPER_ADMIN_USERS.KEY, // used by useQuery

    onSuccess: (data) => {
      setSelectedPlan(null);
      setUser(null);
      setIsModalOpen(false);
      console.log("Plan create/update response:", data);
      console.log("Plan create/update response:", data);
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

  /*** ------> User suspension Mutation CREATE/UPDATE API Hook ------> */
  const suspendUserMutation = useApiMutation({
    method: "update",
    path: (payload) =>
      `${API_PATHS.SUPER_ADMIN_USERS.ENDPOINT}/suspend/${payload?.userId}`,
    key: API_PATHS.SUPER_ADMIN_USERS.KEY, // used by useQuery

    onSuccess: (data) => {
      setConfirmSuspend(null);
      setUser(null);
      console.log("User suspension create/update response:", data);
      console.log("User suspension create/update response:", data);
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

  const handleAssignPlan = () => {
    const payload = {
      userId: user?._id,
      data: {
        planId: selectedPlan?._id,
      },
    };

    console.log("Payload", payload);
    planMutation.mutate(payload);
  };

  /**---> PAGINATION --->*/
  const [paginatedData, setPaginatedData] = useState(users || []);
  const dataLength = users?.length;

  /**---> HANDLERS --->*/
  const selectUser = (userId) => {
    const user = users.find((u) => u._id === userId);
    setUser(user);
  };

  const toggleViewModal = (userId) => {
    setIsModalOpen((prev) => !prev);
    selectUser(userId);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setUser(null);
  };

  const handleCancelSelect = () => {
    setSelectedPlan(null);
  };

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  // Handler to confirm suspend user
  const handleConfirmSuspendUser = (user) => {
    setConfirmSuspend(user);
  };

  // handler to suspend user finally
  const handleSuspendUser = (id) => {
    const payload = {
      userId: id,
      data: { isActive: false },
    };
    console.log("Payload of suspension", payload);
    suspendUserMutation.mutate(payload);
  };

  /**--------- HANDLE SEARCH RESET ---------*/
  const handleSearchReset = () => {
    setUserSearch("");
  };
  /**--------- HANDLE SEARCH RESET ---------*/
  const filteredUsers = users?.filter((u) => {
    const q = userSearch.toLowerCase();
    return (
      u?.name?.toLowerCase().includes(q) || u?.slug?.toLowerCase().includes(q)
    );
  });

  /** --------> Use Fetched Data Status Handler --------> */
  const usersDataStatus = useFetchedDataStatusHandler({
    isLoading: usersLoading,
    isError: usersError,
    error: usersErrorObj,
    label: "users-super-admin",
  });

  /** --------> Use Fetched Data Status Handler --------> */
  const plansDataStatus = useFetchedDataStatusHandler({
    isLoading: plansLoading,
    isError: plansError,
    error: plansErrorObj,
    label: "plans-super-admin",
  });

  return (
    <div className="">
      <div className="lg:mb-4 lg:flex grid items-center gap-2 justify-between">
        <div className="">
          <h1 className="lg:text-xl text-xs font-extrabold text-base-content/70 flex items-center flex-wrap gap-1">
            <LucideIcon.Users /> <span>User Management</span> •
            <span>Total Users:</span>
            <CountBadge dataLength={users} />
          </h1>
        </div>

        <div
          className={`flex items-center justify-between gap-2 ${!user ? "lg:w-1/4" : " w-1/2"}`}
        >
          <input
            type="text"
            placeholder="Search users..."
            className="input input-sm input-bordered w-full shadow"
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
          />

          <Button onClick={handleSearchReset} size="xs" variant="outline">
            <LucideIcon.RefreshCcw size={20} /> Reset
          </Button>
        </div>
      </div>
      <div className="">
        <div className="grid grid-cols-1">
          {usersDataStatus.status !== "success" ? (
            usersDataStatus?.content
          ) : (
            <div className="">
              <UsersTable
                users={userSearch ? filteredUsers : paginatedData}
                onToggle={toggleViewModal}
                onConfirmSuspend={handleConfirmSuspendUser}
                setUserSearch={setUserSearch}
              />

              {/* ----> PAGINATION READER ---->*/}
              <div className="lg:my-4 mt-8">
                <Pagination
                  items={users}
                  dataLength={dataLength}
                  onPaginatedDataChange={setPaginatedData}
                />
              </div>
            </div>
          )}
        </div>

        {/* USER DETAILS MODAL */}
        <UserModalData
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          user={user}
          onPlanSelectCancel={handleCancelSelect}
          onSelectPlan={handleSelectPlan}
          onAssign={handleAssignPlan}
          plans={plans}
          plansDataStatus={plansDataStatus}
          selectedPlan={selectedPlan}
        />

        {/* Confirm delete dialogue box */}
        {confirmSuspend && (
          <ConfirmAction
            confirmText={`${confirmSuspend?.isActive ? "Suspend" : "Revoke Suspension"}`}
            setState={confirmSuspend.isActive}
            isOpen={confirmSuspend}
            onClose={() => setConfirmSuspend(null)}
            onConfirmSuspend={handleConfirmSuspendUser}
            onConfirm={() => {
              handleSuspendUser(confirmSuspend._id);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default UserManagement;
