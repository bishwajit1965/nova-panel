import { LucideIcon } from "../../../components/lib/LucideIcons";
import Button from "../../../components/ui/Button";
import TableDataNotFound from "../../../components/ui/TableDataNotFound";

const PermissionsTable = ({
  permissions,
  onConfirmDelete,
  onSelectPermissionEdit,
}) => {
  return (
    <div>
      <div>
        <div className="overflow-x-auto">
          <table className="table table-xs">
            <thead>
              <tr>
                <th>#</th>
                <th>Permission Key</th>
                <th>Permission Description</th>
                <th>Permission Module</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {permissions?.length === 0 ? (
                <TableDataNotFound colSpan={6} data={permissions} />
              ) : (
                permissions?.map((permission, index) => (
                  <tr key={permission._id}>
                    <th>{index + 1}</th>
                    <td>{permission.key}</td>
                    <td>{permission.description}</td>
                    <td>{permission.module}</td>
                    <td>
                      {new Date(permission.createdAt).toLocaleDateString()}
                    </td>
                    <td className="flex gap-2">
                      <Button
                        icon={LucideIcon.Edit}
                        size="xs"
                        className="btn btn-sm btn-outline-primary"
                        onClick={() => onSelectPermissionEdit(permission?._id)}
                      >
                        Edit
                      </Button>
                      <Button
                        icon={LucideIcon.Trash2}
                        size="xs"
                        variant="danger"
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => onConfirmDelete(permission)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            <tfoot>
              <tr>
                <th>#</th>
                <th>Permission Key</th>
                <th>Permission Description</th>
                <th>Permission Module</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PermissionsTable;
