import Badge from "../../../components/ui/Badge";
import CountBadge from "../../../components/ui/CountBadge";
import { MiniIconButton } from "../../../components/ui/MiniIconButton";
import { normalizeDate } from "../../../utils/normalizeDate";

const AdminUsersTable = ({ users, onSelect }) => {
  return (
    <div className="">
      <h1 className="lg:text-xl text-lg font-extrabold flex items-center gap-2">
        Admin Users <CountBadge dataLength={users} color="blue-500" />
      </h1>

      <div className="">
        <div className="overflow-x-auto">
          <table className="table table-xs">
            <thead>
              <tr>
                <th>#</th>
                <th>User Name</th>
                <th>Roles Name</th>
                {/* <th>Module</th> */}
                {/* <th>Role Key</th> */}
                <th>Created At</th>
                <th>Updated At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((u, index) => (
                <tr key={u.name}>
                  <th>{index + 1}</th>

                  <td>{u?.name}</td>

                  <td className="">
                    {u?.roles.map((r) => (
                      <Badge color="green">{r?.name}</Badge>
                    ))}
                  </td>

                  {/* <td className=" ">
                    {u?.roles?.map((r) =>
                      r?.permissions?.map((p) => (
                        <div className="flex items-center flex-wrap flex-1/12 mr-4">
                          <span className=""> {p?.module}</span>
                        </div>
                      )),
                    )}
                  </td> */}

                  {/* <td className=" ">
                    {u?.roles?.map((r) =>
                      r?.permissions?.map((p) => (
                        <div className="flex items-center flex-wrap flex-1/12 mr-4">
                          <span className="">{p?.key}</span>
                        </div>
                      )),
                    )}
                  </td> */}

                  <td>{normalizeDate(u?.createdAt)}</td>

                  <td>{normalizeDate(u?.updatedAt)}</td>

                  <td className="flex items-center gap-2">
                    <MiniIconButton
                      onClick={() => onSelect(u?._id)}
                      variant="primary"
                      icon="select"
                      label="Select"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th>#</th>
                <th>User Name</th>
                <th>Roles Name</th>
                {/* <th>Module</th>
                <th>Role Key</th> */}
                <th>Created At</th>
                <th>Updated At</th>
                <th>Actions</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsersTable;
