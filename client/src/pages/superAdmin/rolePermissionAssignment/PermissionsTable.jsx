import Badge from "../../../components/ui/Badge";
import CountBadge from "../../../components/ui/CountBadge";

const PermissionsTable = ({ permissions }) => {
  return (
    <div>
      <h1 className="lg:text-xl text-lg font-extrabold text-base-content/70 flex items-center gap-2 my-4">
        Permissions List{" "}
        <CountBadge
          dataLength={permissions}
          color="blue-500"
          border="blue-500"
        />
      </h1>
      {permissions?.map((p) => (
        <div key={p._id} className="inline-flex gap-2 mb-2">
          <Badge color="green">{p.key.concat(", ")}</Badge>
        </div>
      ))}
    </div>
  );
};

export default PermissionsTable;
