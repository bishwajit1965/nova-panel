import { LucideIcon } from "../../../components/lib/LucideIcons";
import Button from "../../../components/ui/Button";

const RolesTable = ({ roles, onSelectRoleEdit, onConfirmDelete }) => {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>#</th>
              <th>Role Name</th>
              <th>Role Description</th>
              <th>Role Slug</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles?.map((role, index) => (
              <tr key={role._id}>
                <th>{index + 1}</th>
                <td>{role.name}</td>
                <td>{role.description}</td>
                <td>{role.slug}</td>
                <td>{new Date(role.createdAt).toLocaleDateString()}</td>
                <td className="flex gap-2">
                  <Button
                    icon={LucideIcon.Edit}
                    size="xs"
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => onSelectRoleEdit(role?._id)}
                  >
                    Edit
                  </Button>
                  <Button
                    icon={LucideIcon.Trash2}
                    size="xs"
                    variant="danger"
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => onConfirmDelete(role)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th>#</th>
              <th>Role Name</th>
              <th>Role Description</th>
              <th>Role Slug</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default RolesTable;
