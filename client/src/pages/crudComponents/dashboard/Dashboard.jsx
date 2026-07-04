import { useAuth } from "../../../hooks/useAuth";
import Badge from "../../../components/ui/Badge";
import Card, { CardContent } from "../../../components/ui/Card";
import { useApiQuery } from "../../../hooks/useApiQuery";
import API_PATHS from "../../../services/api.paths";
import useFetchedDataStatusHandler from "../../../hooks/useFetchedDataStatusHandler";
import { LucideIcon } from "../../../components/lib/LucideIcons";
import { usePermission } from "../../../hooks/hasPermission";
import AccessDenied from "../common/accessDenied/AccessDenied";

const Dashboard = () => {
  const { user } = useAuth();
  const { can } = usePermission();
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

  /**------> Data extracted to be populated in cards ------>*/
  const totalUsers = users?.length || 0;
  const activeUsers = users?.filter((u) => u.isActive)?.length || 0;
  const suspendedUsers = users?.filter((u) => !u.isActive)?.length || 0;

  const recentUsers = [...(users || [])]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const totalRoles = roles?.length || 0;
  const totalPermissions = permissions?.length || 0;
  const totalPlans = plans?.length || 0;
  const totalUploads = uploads?.length || 0;

  const recentUploads = [...(uploads || [])]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  /** --------> Use Fetched Data Status Handler --------> */
  const usersDataStatus = useFetchedDataStatusHandler({
    isLoading: usersLoading,
    isError: usersError,
    error: usersErrorObj,
    label: "users-super-admin",
  });

  /** --------> Use Fetched Data Status Handler --------> */
  const rolesStatus = useFetchedDataStatusHandler({
    isLoading: rolesLoading,
    isError: rolesError,
    error: rolesErrorObj,
    label: "roles-super-admin",
  });

  /** --------> Use Fetched Data Status Handler --------> */
  const permissionsStatus = useFetchedDataStatusHandler({
    isLoading: permissionsLoading,
    isError: permissionsError,
    error: permissionsErrorObj,
    label: "permissions-super-admin",
  });

  /** --------> Use Fetched Data Status Handler --------> */
  const plansDataStatus = useFetchedDataStatusHandler({
    isLoading: plansLoading,
    isError: plansError,
    error: plansErrorObj,
    label: "plans-super-admin",
  });

  /** --------> Use Fetched Data Status Handler --------> */
  const uploadsDataStatus = useFetchedDataStatusHandler({
    isLoading: uploadsLoading,
    isError: uploadsError,
    error: uploadsErrorObj,
    label: "uploads-super-admin",
  });

  return (
    <div className="lg:space-y-8">
      {can("dashboard.read") ? (
        <>
          <div className="">
            <div className="flex items-center gap-2 mb-2">
              <LucideIcon.Users size={25} className="text-primary" />
              <h1 className="lg:text-xl text-sm font-extrabold text-base-content/70 dark:text-gray-300">
                Users Related in a Glimpse
              </h1>
            </div>

            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-4 gap-2">
              {usersDataStatus?.status !== "success" ? (
                usersDataStatus?.content
              ) : (
                <>
                  <Card>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <img
                            src={user?.avatarUrl}
                            alt={user?.name}
                            className="w-14 h-14 rounded-full"
                          />
                          <div className="">
                            <p className="font-bold">{user?.name}</p>
                            <p className="text-sm">{user?.email}</p>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <p className="">
                            {user?.roles.map((r) => (
                              <Badge key={r?._id}>{r?.name}</Badge>
                            ))}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <LucideIcon.Users className="w-10 h-10 text-primary dark:text-gray-300" />
                        <div>
                          <p className="text-sm text-base-content/60 dark:text-gray-300">
                            Total Users
                          </p>
                          <h2 className="text-3xl font-extrabold">
                            {totalUsers || 0}
                          </h2>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <LucideIcon.Users className="w-10 h-10 text-primary dark:text-gray-300" />
                        <div>
                          <p className="text-sm text-base-content/60 dark:text-gray-300">
                            Active Users
                          </p>
                          <h2 className="text-3xl font-extrabold">
                            {activeUsers || 0}
                          </h2>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <LucideIcon.Users className="w-10 h-10 text-primary dark:text-gray-300" />
                        <div>
                          <p className="text-sm text-base-content/60 dark:text-gray-300">
                            Suspended Users
                          </p>
                          <h2 className="text-3xl font-extrabold">
                            {suspendedUsers || 0}
                          </h2>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </div>

          {/*------> ROLES , PERMISSIONS , PLANS , FEATURES  RELATED ------> */}
          <div className="">
            <div className="flex items-center gap-2 mb-2">
              <LucideIcon.Layers3 size={25} className="text-primary" />
              <h1 className="lg:text-xl text-sm font-extrabold text-base-content/70 dark:text-gray-300">
                Users Roles Permissions Plans & Uploads
              </h1>
            </div>

            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-4 gap-2">
              {/* Roles */}
              {rolesStatus?.status !== "success" ? (
                rolesStatus?.content
              ) : (
                <>
                  <Card>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <LucideIcon.CreditCard className="w-10 h-10 text-primary dark:text-gray-300" />
                        <div>
                          <p className="text-sm text-base-content/60 dark:text-gray-300">
                            Total Roles
                          </p>
                          <h2 className="text-3xl font-extrabold">
                            {totalRoles || 0}
                          </h2>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </>
              )}

              {/* Permissions */}
              {permissionsStatus?.status !== "success" ? (
                permissionsStatus?.content
              ) : (
                <Card>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <LucideIcon.CheckCircle2Icon className="w-10 h-10 text-primary dark:text-gray-300" />
                      <div>
                        <p className="text-sm text-base-content/60 dark:text-gray-300">
                          Total Permissions
                        </p>
                        <h2 className="text-3xl font-extrabold">
                          {totalPermissions || 0}
                        </h2>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Plans */}
              {plansDataStatus?.status !== "success" ? (
                plansDataStatus?.content
              ) : (
                <Card>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <LucideIcon.RocketIcon className="w-10 h-10 text-primary dark:text-gray-300" />
                      <div>
                        <p className="text-sm text-base-content/60 dark:text-gray-300">
                          Total Plans
                        </p>
                        <h2 className="text-3xl font-extrabold">
                          {totalPlans || 0}
                        </h2>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Uploads */}
              {uploadsDataStatus?.status !== "success" ? (
                uploadsDataStatus?.content
              ) : (
                <Card>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <LucideIcon.UploadCloudIcon className="w-10 h-10 text-primary dark:text-gray-300" />
                      <div>
                        <p className="text-sm text-base-content/60 dark:text-gray-300">
                          Total Uploads
                        </p>
                        <h2 className="text-3xl font-extrabold">
                          {totalUploads || 0}
                        </h2>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* ------> RECENT USERS & RECENT UPLOADS ------>*/}
          <div className="">
            <div className="flex items-center gap-2 mb-2">
              <LucideIcon.UploadCloud size={25} className="text-primary" />
              <h1 className="lg:text-xl text-sm font-extrabold text-base-content/70 dark:text-gray-300">
                Recent Users & Recent Uploads
              </h1>
            </div>
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 lg:gap-4 gap-2">
              <Card>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <LucideIcon.Users className="w-10 h-10 text-primary dark:text-gray-300" />
                    <div>
                      <p className="text-sm text-base-content/60 dark:text-gray-300">
                        Recent Users
                      </p>
                      <div>
                        {recentUsers?.map((u) => (
                          <div key={u?._id} className="">
                            {u?.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <LucideIcon.UploadCloudIcon className="w-10 h-10 text-primary dark:text-gray-300" />
                    <div>
                      <p className="text-sm text-base-content/60 dark:text-gray-300">
                        Recent Uploads
                      </p>
                      <div className="text-xs font-bold space-y-1">
                        {recentUploads.map((upload) => (
                          <div key={upload._id}>{upload.originalName}</div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </>
      ) : (
        <AccessDenied />
      )}
    </div>
  );
};

export default Dashboard;
