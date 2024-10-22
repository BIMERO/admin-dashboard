import React, { useState } from "react";
import "./dashboard.css";
import Header from "./Header";
import { dashboardData } from "../../mockdata";
import ReactApexChart from "react-apexcharts";
import MUIDataTable from "mui-datatables";

interface ApiUsage {
  date: string;
  totalCalls: number;
  successfulCalls: number;
  failedCalls: number;
  avgResponseTime: string;
}

interface TopEndpoint {
  endpoint: string;
  totalCalls: number;
  avgResponseTime: string;
  errorRate: string;
}

interface DashboardData {
  apiUsage: ApiUsage[];
  topEndpoints: TopEndpoint[];
}

const Dashboard: React.FC = () => {
  const data: DashboardData = dashboardData[0].dashboard;

  const [chartOptions] = useState<ApexCharts.ApexOptions>({
    chart: {
      type: "area" as const,
      height: 300,
      zoom: { enabled: false },
    },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth" },
    xaxis: {
      type: "datetime",
      categories: data.apiUsage.map((usage) => usage.date),
    },
    yaxis: { title: { text: "API Calls" } },
    tooltip: { x: { format: "dd/MM/yy" } },
  });

  const [chartSeries] = useState([
    {
      name: "Total API Calls",
      data: data.apiUsage.map((usage) => usage.totalCalls),
    },
    {
      name: "Successful Calls",
      data: data.apiUsage.map((usage) => usage.successfulCalls),
    },
    {
      name: "Failed Calls",
      data: data.apiUsage.map((usage) => usage.failedCalls),
    },
  ]);

  const columns = [
    { name: "endpoint", label: "Endpoint" },
    { name: "totalCalls", label: "Total Calls" },
    { name: "avgResponseTime", label: "Avg. Response Time" },
    { name: "errorRate", label: "Error Rate" },
  ];

  const topEndpointsData = data.topEndpoints.map((endpoint) => ({
    endpoint: endpoint.endpoint,
    totalCalls: endpoint.totalCalls,
    avgResponseTime: endpoint.avgResponseTime,
    errorRate: endpoint.errorRate,
  }));

  return (
    <div className="container">
      <Header />
      <div>
        <div className="dashboard p-6">
          <section className="api-usage mb-8">
            <h2 className="text-xl font-bold mb-4">API Usage</h2>

            {/* Area Chart for API Calls Over Time */}
            <div className="area-chart">
              <ReactApexChart
                options={chartOptions}
                series={chartSeries}
                type="area"
                height={350}
                className="charts"
              />
            </div>
          </section>

          {/* <section className="top-endpoints">
            <h3 style={{ marginBottom: "1rem" }}>Top Endpoints</h3>
          </section> */}
          <MUIDataTable
            title={"Top Endpoints"}
            data={topEndpointsData}
            columns={columns}
            options={{
              filterType: "checkbox",
              responsive: "vertical",
              selectableRows: "none",
              elevation: 0,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
