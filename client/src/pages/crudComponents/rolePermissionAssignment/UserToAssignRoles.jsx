import { LucideIcon } from "../../../components/lib/LucideIcons";
import Badge from "../../../components/ui/Badge";
import Button from "../../../components/ui/Button";

const UserToAssignRoles = ({
  selectedUser,
  roles,
  selectedRoles,
  toggleRole,
  onSubmit,
  onCancel,
  rolesDataStatus,
  roleMutation,
}) => {
  return (
    <div className={`${!selectedUser ? "hidden p-0" : "block"}`}>
      {selectedUser && (
        <>
          <div className="border border-base-content/10 rounded-xl shadow-lg:md p-2">
            <div className="lg:space-y-4 space-y-2">
              <div className=" ">
                <h1 className="lg:text-xl text-sm font-extrabold text-base-content/70 flex items-center gap-2">
                  Assign Roles to
                </h1>
              </div>
              <div className="">
                <h1 className="flex flex-wrap items-center capitalize">
                  {selectedUser?.roles?.map((r, index) => (
                    <Badge key={index} color="green" className="">
                      {r?.name}
                    </Badge>
                  ))}
                </h1>
              </div>

              <div className="lg:grid flex lg:grid-cols-12 items-center grid-cols-1 gap-4 justify-between">
                <div className="lg:col-span-2 col-span-12">
                  <img
                    src={selectedUser?.avatarUrl}
                    alt={selectedUser?.name}
                    className="w-12 h-12 rounded-full"
                  />
                </div>
                <div className="lg:col-span-10 col-span-12 text-sm">
                  {/* <p>{selectedUser._id}</p> */}
                  <p>{selectedUser?.name}</p>
                  <p>{selectedUser?.email}</p>
                </div>
              </div>
            </div>

            <div className="divider lg:text-[16px] text-sm font-semibold text-base-content/70">
              ADMIN USER ROLE(S)
            </div>
            {/* Roles & Permissions */}

            {rolesDataStatus.status !== "success" ? (
              rolesDataStatus?.content
            ) : (
              <div className="lg:grid lg:grid-cols-12 grid-cols-1 lg:gap-4 gap-6 items-center justify-between">
                <div className="lg:col-span-4 col-span-12">
                  <p className="capitalize font-bold">
                    {selectedUser?.roles?.map((r) => (
                      <label key={r.name} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          disabled
                          key={r._id}
                          checked={selectedRoles.includes(r?._id)}
                          onChange={() => toggleRole(r?._id)}
                          className="font-bold"
                        />
                        {r?.name}
                      </label>
                    ))}
                  </p>
                </div>
              </div>
            )}

            <div className="divider lg:text-[16px] text-sm font-semibold text-base-content/70">
              ASSIGN ROLES
            </div>

            {/* ALL ROLES AND PERMISSIONS DISPLAYED */}
            <form onSubmit={onSubmit}>
              <div className="space-y-6">
                <div className="">
                  <h2 className="lg:text-xl text-lg font-bold">Roles</h2>
                  <div className="flex flex-wrap">
                    {roles.map((role) => (
                      <label
                        key={role.name}
                        className="flex flex-wrap items-center gap-1 mr-4"
                      >
                        <input
                          key={role._id}
                          type="checkbox"
                          checked={selectedRoles.includes(role._id)}
                          onChange={() => toggleRole(role._id)}
                        />
                        {role.name}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
              {/* ACTION BUTTONS */}
              <div className="flex items-center gap-2 mt-4">
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  disabled={roleMutation.isPending}
                >
                  {roleMutation.isPending ? (
                    <LucideIcon.Loader size={20} className="animate-spin" />
                  ) : (
                    <LucideIcon.CheckCircle2 size={20} />
                  )}
                  {roleMutation.isPending ? "Assigning..." : "Assign Role"}
                </Button>
                <Button
                  type="button"
                  variant="warning"
                  size="sm"
                  onClick={onCancel}
                >
                  <LucideIcon.RotateCcw size={20} /> Cancel
                </Button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default UserToAssignRoles;
