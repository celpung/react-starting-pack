import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export interface ColumnBarChartDataProps {
  name: string;
  value: number[];
}

interface ColumnBarChartProps {
  data: ColumnBarChartDataProps[];
  label: string[];
  title: string
}

const ColumnChart: React.FC<ColumnBarChartProps> = ({data, label, title}) => {
  const options: ApexOptions = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        // columnWidth: "55%",
        borderRadius: 10,
        borderRadiusApplication: "around",
      },
    },
    colors: ["#2D3648", "#FF4500", "#32CD32"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: label,
    },
    // yaxis: {
    //   title: {
    //     text: "$ (thousands)",
    //   },
    // },
    fill: {
      opacity: 1,
    },
    // tooltip: {
    //   y: {
    //     formatter: function (val) {
    //       return "$ " + val + " thousands";
    //     },
    //   },
    // },
    title: {
        text: title,
    },
  };

  const series = data.map((item) => ({
    name: item.name,
    data: item.value,
  }));

  return (
    <div className="w-full h-full">
      <Chart options={options} series={series} type="bar" />
    </div>
  );
};

export default ColumnChart;
