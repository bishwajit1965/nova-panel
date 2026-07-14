import { MiniIconButton } from "../../../components/ui/MiniIconButton";
import TableDataNotFound from "../../../components/ui/TableDataNotFound";
import { normalizeDate } from "../../../utils/normalizeDate";

const AuditLogsTable = ({ auditLogs, onLoad }) => {
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th>#</th>
              <th>Module</th>
              <th>Action</th>
              <th>Actor</th>
              <th>Actor Plan</th>
              <th>Actor Email</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {auditLogs?.length === 0 ? (
              <TableDataNotFound colSpan={8} />
            ) : (
              auditLogs?.map((log, index) => (
                <tr key={log._id}>
                  <th>{index + 1}</th>
                  <td>
                    <span className="badge badge-outline text-xs uppercase">
                      {log?.module}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-success text-xs text-base-100 uppercase">
                      {log?.action}
                    </span>
                  </td>
                  <td>{log?.actor?.name}</td>
                  <td>{log?.metadata?.planName}</td>
                  <td>{log?.actor?.email}</td>

                  <td>{normalizeDate(log?.createdAt)}</td>
                  <td>
                    <MiniIconButton
                      onClick={() => onLoad(log)}
                      size="xs"
                      icon="view"
                      tooltip="View Log"
                      variant="primary"
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
          <tfoot>
            <tr>
              <th>#</th>
              <th>Module</th>
              <th>Action</th>
              <th>Actor</th>
              <th>Actor Plan</th>
              <th>Actor Email</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default AuditLogsTable;
