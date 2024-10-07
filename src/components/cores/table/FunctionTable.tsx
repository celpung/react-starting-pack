import React from "react";
import { FaDownload, FaPlusCircle, FaToggleOn } from "react-icons/fa";
import AppTable from "./AppTable";
import AppButtons, { AppButtonsProps } from "../button/AppButtons";

interface FunctionTableProps<T> {
  title?: string | React.ReactNode;
  column: Array<{ header: string; accessor: (row: T) => React.ReactNode; textAlign?: string; noWrap?: boolean }>;
  data: T[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  onDetails?: (row: T) => void;
  onCreate?: () => void;
  additionalButtons?: AppButtonsProps[];
  onExport?: () => void;
  onToggleStatus? : (row: T) => void;
  onScrollBottom?: () => void;
}

const FunctionTable = <T,>({
  title,
  column,
  data,
  onEdit,
  onDelete,
  onExport,
  onDetails,
  onCreate,
  onToggleStatus,
  onScrollBottom,
  additionalButtons,
}: FunctionTableProps<T>) => {
  const actionColumn = {
    header: "Action",
    accessor: (row: T) => (
      <div className="flex justify-center gap-1">
        {onEdit && <AppButtons label="EDIT" variant="info" fontSize="text-xs" onClick={() => onEdit(row)} />}
        {onDetails && <AppButtons label="DETAIL" variant="success" fontSize="text-xs" onClick={() => onDetails(row)} />}
        {/* {onCreate && <AppButtons variant="success" fontSize="text-xs" onClick={() => onCreate(row)} icon={<FaPlusCircle />} />} */}
        {onToggleStatus && <AppButtons variant="info" fontSize="text-xs" onClick={() => onToggleStatus(row)} icon={<FaToggleOn />} />}
        {onDelete && <AppButtons label="HAPUS" variant="danger" fontSize="text-xs" onClick={() => onDelete(row)} />}
      </div>
    ),
    textAlign: "text-center",
  };

  const allColumns = [...column, ...(onEdit || onDelete || onDetails || onCreate || onToggleStatus ? [actionColumn] : [])];

  return (
    <div className="h-full">
      <div className="sm:flex justify-between items-center mb-2">
        <span className="text-sm">{title}</span>
        <div className="sm:flex gap-2 items-center">
          <div className="sm:flex sm:flex-row sm:mt-0 md:flex md:flex-row md:mt-0 flex gap-2 mt-2">
            {onExport && (
              <AppButtons variant="success" onClick={onExport} fontSize="text-sm" label="Export" icon={<FaDownload />} />
            )}
            {onCreate && (
              <AppButtons variant="primary" onClick={onCreate} fontSize="text-sm" label="Add" icon={<FaPlusCircle />} />
            )}
            {additionalButtons && additionalButtons.map((button, index) => (
              <AppButtons
                key={index}
                onClick={button.onClick}
                fontSize="text-sm"
                label={button.label}
                icon={button.icon}
                variant={button.variant}
              />
            ))}
          </div>
        </div>
      </div>
      <AppTable columns={allColumns} data={data} onScrollBottom={onScrollBottom} />
    </div>
  );
};

export default FunctionTable;