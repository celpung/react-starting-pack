import React from "react";
import Chart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

export interface AreaChartDataProps {
  name: string;
  value: number[];
}

interface AreaChartProps {
  data: AreaChartDataProps[];
  label: string[];
  title: string
}

const AreaChart: React.FC<AreaChartProps> = ({ data, label, title }) => {
  const options: ApexOptions = {
    chart: {
      id: "multiline-chart",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: label, // Use the label prop for X-axis categories
    },
    title: {
      text: title,
      align: "left",
    },
    stroke: {
      curve: "monotoneCubic",
      width: 3,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: "top",
    },
    colors: ["#2D3648", "#fd7e14", "#b51307"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        type: "vertical",
        opacityFrom: 0.7,
        opacityTo: 0.3,
        stops: [0, 100],
      },
    },
  };

  const series = data.map((item) => ({
    name: item.name,
    data: item.value,
  }));

  return (
    <div className="w-full h-full">
      <Chart options={options} series={series} type="area" width="100%" height="100%" />
    </div>
  );
};


export default AreaChart;
