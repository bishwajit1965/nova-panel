import { useState } from "react";
import { LucideIcon } from "../../../components/lib/LucideIcons";
import Pagination from "../../../components/pagination/Pagination";
import { useApiQuery } from "../../../hooks/useApiQuery";
import useFetchedDataStatusHandler from "../../../hooks/useFetchedDataStatusHandler";
import API_PATHS from "../../../services/api.paths";
import UsersTable from "./UsersTable";
import CountBadge from "../../../components/ui/CountBadge";
import Modal from "../../../components/ui/Modal";
import { LucideCreditCard, LucideMail, LucideUser } from "lucide-react";
import Badge from "../../../components/ui/Badge";

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
    <div>
      <h1 className="lg:text-xl text-xl font-extrabold text-base-content/70 flex items-center gap-2">
        <LucideIcon.Users /> Users Management → Total Users:{" "}
        <CountBadge dataLength={users} />
      </h1>
      <div className="">
        {usersDataStatus.status !== "success" ? (
          usersDataStatus?.content
        ) : (
          <>
            <UsersTable users={paginatedData} onToggle={toggleViewModal} />

            {/* ----> PAGINATION READER ---->*/}
            <Pagination
              items={users}
              dataLength={dataLength}
              onPaginatedDataChange={setPaginatedData}
            />
          </>
        )}
      </div>

      {/* USER DETAILS MODAL */}
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className="lg:space-y-4 space-y-2">
            <div className="flex items-center gap-4 text-base-content/80">
              <img
                src={
                  user?.avatarUrl
                    ? user?.avatarUrl
                    : "https://i.ibb.co.com/1z7P2wJ/girl2.jpg"
                }
                alt={user?.name}
                className="w-24 h-24 rounded-full"
              />
              <div className="space-y-2">
                <h1 className="lg:text-xl text-lg font-extrabold">
                  {user?.name}
                </h1>
                <p className="flex items-center gap-2 text-sm">
                  <LucideMail size={15} /> {user?.email}
                </p>
                <p className="text-sm font-bold">
                  Roles:&nbsp;
                  {user?.roles?.map((r) => (
                    <Badge key={r._id}> {r?.name}</Badge>
                  ))}
                </p>
                <p className="text-sm font-bold">
                  User Status:&nbsp;{" "}
                  {user?.isActive ? (
                    <Badge color="green">Active</Badge>
                  ) : (
                    <Badge color="red">Inactive</Badge>
                  )}
                </p>
              </div>
            </div>
            <div className="text-base-content/80 text-sm space-y-2">
              <h2 className="text-lg font-extrabold border-b border-base-content/15">
                User Plan Details
              </h2>

              <p className="font-bold flex items-center gap-2">
                <LucideCreditCard size={15} />
                {user?.plan?.name || "No Plan"} plan
              </p>
              <p className="font-bold">
                Price:{" "}
                {user?.plan?.price != null
                  ? `$${user.plan.price.toFixed(2)}`
                  : "No Price"}
              </p>

              <p className="font-bold">
                Duration in days: {user?.plan?.durationInDays || "No duration"}
              </p>
              <p className="text-sm">{user?.plan?.description || "No Plan"}</p>
              <p>
                Features:&nbsp;
                {user?.plan?.features?.map((f) => (
                  <Badge key={f}>{f}</Badge>
                ))}
              </p>
              <p className="font-bold">
                Package Type: {user?.plan?.packageType}
              </p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default UserManagement;
