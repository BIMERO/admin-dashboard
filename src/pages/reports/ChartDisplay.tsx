import React from "react";
import ReactApexChart from "react-apexcharts";

interface ChartProps {
  chartType: "bar" | "line" | "pie";
  data: number[];
  categories: string[];
  title: string;
  height?: number;
}

const ChartDisplay: React.FC<ChartProps> = ({
  chartType,
  data,
  categories,
  title,
}) => {
  const chartOptions = {
    chart: {
      type: chartType,
      height: 350,
    },
    xaxis: {
      categories,
    },
    title: {
      text: title,
    },
  };

  const chartSeries = [{ name: title, data }];

  return (
    <div>
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type={chartType}
        height={350}
      />
    </div>
  );
};

export default ChartDisplay;
