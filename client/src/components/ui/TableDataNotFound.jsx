const TableDataNotFound = ({ colSpan }) => {
  return (
    <tr>
      <td
        colSpan={colSpan}
        className="text-center text-sm font-bold text-gray-500"
      >
        Wrong search input or data not available !
      </td>
    </tr>
  );
};

export default TableDataNotFound;
