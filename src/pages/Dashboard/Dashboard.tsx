import React, { useState } from "react";
import "./dashboard.css";
import Header from "./Header";
import { dashboardData } from "../../mockdata"; // Make sure this path is correct
import ReactApexChart from "react-apexcharts";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

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
      type: "area" as const, // Add `as const` to ensure it's treated as a specific string
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

          <section className="top-endpoints">
            <h3 style={{ marginBottom: "1rem" }}>Top Endpoints</h3>

            <TableContainer component={Paper}>
              <Table sx={{}} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Endpoint</TableCell>
                    <TableCell align="left">Total Calls</TableCell>
                    <TableCell align="left">Avg. Response Time</TableCell>
                    <TableCell align="left">Error Rate</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.topEndpoints.map((endpoint) => (
                    <TableRow
                      key={endpoint.endpoint}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell align="left">{endpoint.endpoint}</TableCell>
                      <TableCell align="left">{endpoint.totalCalls}</TableCell>
                      <TableCell align="left">
                        {endpoint.avgResponseTime}
                      </TableCell>
                      <TableCell align="left">{endpoint.errorRate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
