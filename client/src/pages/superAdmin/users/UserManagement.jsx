import { useState } from "react";
import { LucideIcon } from "../../../components/lib/LucideIcons";
import Pagination from "../../../components/pagination/Pagination";
import { useApiQuery } from "../../../hooks/useApiQuery";
import useFetchedDataStatusHandler from "../../../hooks/useFetchedDataStatusHandler";
import API_PATHS from "../../../services/api.paths";
import CountBadge from "../../../components/ui/CountBadge";
import UsersTable from "./UsersTable";
import UserModalData from "./UserModalData";

const UserManagement = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState(null);
  console.log("USER", user);

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

  /**---> PAGINATION --->*/
  const [paginatedData, setPaginatedData] = useState(users || []);
  const dataLength = users?.length;
  console.log("USERS DATA", users);

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

  /** --------> Use Fetched Data Status Handler --------> */
  const usersDataStatus = useFetchedDataStatusHandler({
    isLoading: usersLoading,
    isError: usersError,
    error: usersErrorObj,
    label: "users-super-admin",
  });

  return (
    <div className="">
      <div className="mb-2">
        <h1 className="lg:text-xl text-xs font-extrabold text-base-content/70 flex items-center flex-wrap gap-1">
          <LucideIcon.Users /> <span>User Management</span> •
          <span>Total Users:</span>
          <CountBadge dataLength={users} />
        </h1>
      </div>
      <div className="">
        <div className="grid grid-cols-1">
          {usersDataStatus.status !== "success" ? (
            usersDataStatus?.content
          ) : (
            <div className="">
              <UsersTable users={paginatedData} onToggle={toggleViewModal} />

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
        />
      </div>
    </div>
  );
};

export default UserManagement;
