/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

export interface GridCardProps {
    title: string;
    value: string | number | any;
    variant: "primary" | "secondary" | "success" | "danger" | "info" | "black" | "disable";
    icon: React.ReactNode;
  }
  
  interface GridCardsProps {
    data: GridCardProps[];
    columns: number;
  }
  
const GridCards: React.FC<GridCardsProps> = ({ data, columns }) => {
  return (
    <div className={`md:grid gap-4 mb-2`} style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
      {data.map((item, index) => (
        <div
          key={index}
          tabIndex={index}
          className={`mb-4 md:mb-0 rounded overflow-hidden shadow p-4 flex flex-col bg-white border border-${item.variant} cursor-pointer`}
        >
          <div className="flex">
            <div className="flex-1 pb-2">
              <h5 className="text-sm text-gray-500">{item.title}</h5>
              <h1 className="font-semibold text-lg">{item.value}</h1>
            </div>
            <div className="flex items-center">
              <div className={`rounded-lg bg-${item.variant} p-2`}>{item.icon}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};


export default GridCards;
