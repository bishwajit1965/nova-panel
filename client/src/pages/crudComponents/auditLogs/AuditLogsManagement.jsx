import { useState } from "react";
import { useApiQuery } from "../../../hooks/useApiQuery";
import useFetchedDataStatusHandler from "../../../hooks/useFetchedDataStatusHandler";
import API_PATHS from "../../../services/api.paths";
import AuditLogsTable from "./AuditLogsTable";
import Pagination from "../../../components/pagination/Pagination";
import Modal from "../../../components/ui/Modal";
import { normalizeDate } from "../../../utils/normalizeDate";
import { LucideIcon } from "../../../components/lib/LucideIcons";
import CountBadge from "../../../components/ui/CountBadge";
import SearchBox from "../../../components/ui/SearchBox";

const AuditLogsManagement = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [dataToView, setDataToView] = useState(null);
  const [log, setLog] = useState("");
  console.log("Loaded data", dataToView);

  /*** ---> Query Mutation API Hook to fetch audit logs  ---> */
  const {
    data: auditLogs,
    isLoading: auditLogsLoading,
    isError: auditLogsError,
    error: auditLogsErrorObj,
  } = useApiQuery({
    url: `${API_PATHS.AUDIT_LOGS.ENDPOINT}/all`,
    queryKey: API_PATHS.AUDIT_LOGS.KEY,
    options: {
      staleTime: 0,
      refetchOnWindowFocus: true,
      refetchOnReconnect: true,
    },
  });

  // Filtered logs
  const filteredLogs = auditLogs?.filter((l) => {
    const q = log?.toLowerCase();
    return (
      l?.metadata?.module?.toLowerCase()?.includes(q) ||
      l?.action?.toLowerCase()?.includes(q)
    );
  });

  /**---> PAGINATION --->*/
  const [paginatedData, setPaginatedData] = useState(auditLogs || []);
  const dataLength = log ? filteredLogs?.length : paginatedData?.length;

  /** ------> Handlers ------> */
  const handleLoadData = (log) => {
    setDataToView(log);
    handleToggleModal();
  };

  const handleToggleModal = () => {
    setIsOpenModal((prev) => !prev);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
    setDataToView(null);
  };

  const handleSearchReset = () => {
    setLog("");
  };

  /** --------> Use Fetched Data Status Handler --------> */
  const auditLogDataStatus = useFetchedDataStatusHandler({
    isLoading: auditLogsLoading,
    isError: auditLogsError,
    error: auditLogsErrorObj,
    label: "audit-logs",
  });

  return (
    <div className="">
      {/* Search Functionality */}
      <div className="lg:flex grid items-center gap-2 justify-between">
        <div className="">
          <h1 className="lg:text-xl text-sm font-extrabold flex items-center gap-2">
            AuditLogsTable • Audit Logs
            <CountBadge dataLength={auditLogs} />
          </h1>
        </div>

        <div className="">
          <SearchBox
            onReset={handleSearchReset}
            value={log}
            onChange={setLog}
          />
        </div>
      </div>

      <div className="divider m-2"></div>

      <div className="grid grid-cols-1">
        {auditLogDataStatus?.status !== "success" ? (
          auditLogDataStatus?.content
        ) : (
          <div className="lg:col-span-8 col-span-12">
            <AuditLogsTable
              auditLogs={log ? filteredLogs : paginatedData}
              logs={auditLogs}
              onLoad={handleLoadData}
            />

            {/* ----> PAGINATION READER ---->*/}
            <div className="lg:my-8 my-4">
              <Pagination
                items={log ? filteredLogs : auditLogs}
                dataLength={dataLength}
                onPaginatedDataChange={setPaginatedData}
              />
            </div>
          </div>
        )}

        {/* Modal to display audit log  */}
        {isOpenModal && (
          <Modal isOpen={isOpenModal} onClose={handleCloseModal}>
            <div className="space-y-2">
              <h1 className="flex items-center gap-2">
                <LucideIcon.ToolCase size={16} />
                <span className="font-bold badge badge-success text-base-100">
                  {dataToView?.module}
                </span>
              </h1>
              <p className="flex items-center gap-2">
                <LucideIcon.User size={16} />{" "}
                <span className="text-sm font-bold">
                  {dataToView?.actor?.name}
                </span>
              </p>
              <p className="flex flex-wrap gap-2">
                <LucideIcon.UserRoundCog size={16} />
                {dataToView?.actor?.roles?.map((r) => (
                  <span className="badge badge-outline font-bold">
                    {r?.name}
                  </span>
                ))}
              </p>
              <p className="flex items-center gap-2">
                <LucideIcon.Mail size={16} />{" "}
                <span className="text-sm">{dataToView?.actor?.email}</span>
              </p>
              <p className="flex items-center gap-2">
                <LucideIcon.CreditCard size={16} />{" "}
                <span className="text-sm font-bold">
                  {dataToView?.metadata?.planName}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <LucideIcon.Hammer size={16} />{" "}
                <span className="badge badge-success text-base-100">
                  <span className="text-sm">{dataToView?.action} </span>
                </span>
                ⇣
              </p>

              <p className="flex items-center gap-2">
                <LucideIcon.Key size={16} />
                <span className="badge bg-purple-500 text-base-100 lowercase">
                  {dataToView?.metadata?.actionKey || "N / A"}
                </span>
                <span className="text-sm text-purple-500">← Acted Upon</span>
              </p>

              <p className="flex items-center gap-2">
                <LucideIcon.HistoryIcon size={16} />{" "}
                <span className="text-xs flex flex-wrap">
                  {dataToView?.userAgent}
                </span>
              </p>
              <p className="flex items-center gap-2">
                <LucideIcon.Clock size={16} />{" "}
                <span className="text-sm">
                  {normalizeDate(dataToView?.createdAt)}
                </span>
              </p>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default AuditLogsManagement;
