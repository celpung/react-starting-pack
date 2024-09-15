import React, { useEffect, useRef, useState } from "react";

type Column<T> = {
  header: string;
  accessor: (row: T) => React.ReactNode;
  textAlign?: string;
  textColor?: string;
  bgColor?: string;
  wrap?: boolean;
};

type AppTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  onScrollBottom?: () => void;
};

const getMaxTableHeight = (viewportHeight: number): number => {
  return viewportHeight - viewportHeight / 3.4;
};

const AppTable = <T,>({ columns, data, onScrollBottom }: AppTableProps<T>) => {
  const tableContainerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState<number>(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setContainerHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (tableContainerRef.current) {
      const maxHeight = getMaxTableHeight(containerHeight);
      tableContainerRef.current.style.maxHeight = `${maxHeight}px`;
    }
  }, [containerHeight]);

  useEffect(() => {
    const handleScroll = () => {
      if (tableContainerRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = tableContainerRef.current;
        if (scrollTop + clientHeight >= scrollHeight) {
          if (onScrollBottom) onScrollBottom();
        }
      }
    };

    const tableContainer = tableContainerRef.current;
    if (tableContainer) {
      tableContainer.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (tableContainer) {
        tableContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, [onScrollBottom]);

  return (
    <div ref={tableContainerRef} className="overflow-auto pb-8">
      <table className="min-w-full divide-y divide-gray-200 border">
        <thead className="sticky top-0 z-10 bg-gray-200">
          <tr className="divide-x divide-gray-300">
            {columns.map((column, index) => (
              <th key={index} className={`px-6 py-3 text-xs font-medium uppercase tracking-wider ${column.textAlign || "text-left"}`}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-50 divide-x divide-gray-300">
              {columns.map((column, colIndex) => {
                const cellValue = column.accessor(row);
                const shouldApplyStyles = cellValue !== "0" && cellValue !== "" && cellValue !== null;
                const cellClassName = `px-6 py-1 text-sm text-gray-800 ${
                  column.textAlign || "text-left"
                } ${column.wrap ? "" : "whitespace-nowrap"} ${shouldApplyStyles ? `${column.bgColor} ${column.textColor}` : ""}`;

                return (
                  <td key={colIndex} className={cellClassName}>
                    {cellValue}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppTable;
