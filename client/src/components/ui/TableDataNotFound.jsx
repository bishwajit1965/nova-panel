const TableDataNotFound = ({ colSpan }) => {
  return (
    <tr>
      <td
        colSpan={colSpan}
        className="text-center text-sm font-bold text-gray-500"
      >
        No data is available at this moment !
      </td>
    </tr>
  );
};

export default TableDataNotFound;
