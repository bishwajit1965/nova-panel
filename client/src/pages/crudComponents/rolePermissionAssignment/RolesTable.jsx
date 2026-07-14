import CountBadge from "../../../components/ui/CountBadge";
import { MiniIconButton } from "../../../components/ui/MiniIconButton";
import SearchBox from "../../../components/ui/SearchBox";
import TableDataNotFound from "../../../components/ui/TableDataNotFound";

const RolesTable = ({
  roles = [],
  onSelect,
  onSearch,
  setRoleSearch,
  onReset,
}) => {
  return (
    <div>
      <div className="lg:flex grid gap-2 items-center justify-between">
        <div className="">
          <h1 className="lg:text-xl text-lg font-extrabold text-base-content/70 flex items-center gap-2">
            Roles List • Total Roles
            <CountBadge dataLength={roles} color="blue-500" />
          </h1>{" "}
        </div>
        <div className="">
          <SearchBox
            onReset={onReset}
            value={onSearch}
            onChange={setRoleSearch}
          />
        </div>
      </div>

      <div className="divider m-2"></div>

      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>#</th>
              <th>Role Name</th>
              <th>Role Slug</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles?.length === 0 ? (
              <TableDataNotFound colSpan={4} />
            ) : (
              roles?.map((r, index) => (
                <tr key={r.name}>
                  <th>{index + 1}</th>
                  <td>{r.name}</td>
                  <td>{r.slug}</td>

                  <td>
                    <MiniIconButton
                      variant="primary"
                      onClick={() => onSelect(r._id)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
          <thead>
            <tr>
              <th>#</th>
              <th>Role Name</th>
              <th>Role Slug</th>
              <th>Actions</th>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
};

export default RolesTable;
