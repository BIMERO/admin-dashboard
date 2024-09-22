import React, { useState } from "react";
import "./reports.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ChartDisplay from "./ChartDisplay";
import CustomSelect from "../../components/customSelect/CustomSelect";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const reportTypeoptions = [
  "API Usage Reports",
  "API Performance Reports",
  "User Activity Reports",
  "Error Logs Reports",
];

const methodOptions = ["GET", "POST", "PUT", "DELETE"];

const reportOptions = ["CSV", "PDF", "Excel"];
const statusOptions = ["Success", "Failed"];

const Reports = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const mockData = [30, 40, 35, 50, 49, 60, 70];
  const mockCategories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

  const handleReportTypeSelect = (selectedOption: string) => {
    console.log("Selected option:", selectedOption);
  };

  const handleMethodSelect = (selectedOption: string) => {
    console.log("Selected option:", selectedOption);
  };

  const handleReportFormatSelect = (selectedOption: string) => {
    console.log("Selected option:", selectedOption);
  };

  const handleStatusSelect = (selectedOption: string) => {
    console.log("Selected option:", selectedOption);
  };

  const series = [60, 25, 10, 5];

  const options: ApexOptions = {
    chart: {
      type: "pie",
    },
    labels: ["GET", "POST", "PUT", "DELETE"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    title: {
      text: "HTTP Methods Distribution",
      align: "center",
      style: {
        fontSize: "16px",
      },
    },
  };

  return (
    <section className="reports">
      <h1>Reports Generation</h1>

      <div className="reports-container">
        <div className="report-options">
          <div style={{ width: "100%", maxWidth: "48%" }}>
            <CustomSelect
              options={reportTypeoptions}
              placeholder="Select Report Type"
              label="Report Type:"
              onSelect={handleReportTypeSelect}
            />
          </div>

          <div className="inputs" style={{ width: "100%", maxWidth: "48%" }}>
            <label htmlFor="apiEndpoint">API Endpoint:</label>
            <input
              type="text"
              id="apiEndpoint"
              placeholder="Enter API Endpoint"
            />
          </div>
        </div>

        <div
          className="inputs"
          style={{ width: "100%", marginBottom: "1.25rem" }}
        >
          <label htmlFor="timeFrame">Time Frame:</label>
          <div className="dates">
            <DatePicker
              selected={startDate}
              onChange={(date: Date | null) => setStartDate(date)}
              placeholderText="Start Date"
            />
            <DatePicker
              selected={endDate}
              onChange={(date: Date | null) => setEndDate(date)}
              placeholderText="End Date"
            />
          </div>
        </div>

        <div className="report-options">
          <div className="inputs" style={{ width: "100%", maxWidth: "48%" }}>
            <label htmlFor="apiEndpoint">API Endpoint:</label>
            <input
              type="text"
              id="apiEndpoint"
              placeholder="Enter API Endpoint"
            />
          </div>

          <div style={{ width: "100%", maxWidth: "48%" }}>
            <CustomSelect
              options={methodOptions}
              placeholder="Select Report Type"
              label="Methods:"
              onSelect={handleMethodSelect}
            />
          </div>
        </div>

        <div className="report-options">
          <div style={{ width: "100%", maxWidth: "48%" }}>
            <CustomSelect
              options={statusOptions}
              placeholder="Select Report Type"
              label="Status:"
              onSelect={handleStatusSelect}
            />
          </div>
          <div style={{ width: "100%", maxWidth: "48%" }}>
            <CustomSelect
              options={reportOptions}
              placeholder="Select Report Type"
              label="Export Format:"
              onSelect={handleReportFormatSelect}
            />
          </div>
        </div>
        <div className="option-group">
          <label htmlFor="includeGraphs">
            <input type="checkbox" id="includeGraphs" /> Include Graphs
          </label>
        </div>

        <div className="charts-section">
          <ChartDisplay
            chartType="bar"
            data={mockData}
            categories={mockCategories}
            title="API Calls Over Time"
          />
          <ChartDisplay
            chartType="line"
            data={mockData}
            categories={mockCategories}
            title="Average Response Time"
          />
          <ReactApexChart
            options={options}
            series={series}
            type="pie"
            height={350}
            width={380}
          />
        </div>
      </div>
    </section>
  );
};

export default Reports;
