import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ChartDisplay from "./ChartDisplay";
import CustomSelect from "../../components/customSelect/CustomSelect";

const reportTypeoptions = [
  "API Usage Reports",
  "API Performance Reports",
  "User Activity Reports",
  "Error Logs Reports",
];

const Reports = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const mockData = [30, 40, 35, 50, 49, 60, 70];
  const mockCategories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

  const handleReportTypeSelect = (selectedOption: string) => {
    console.log("Selected option:", selectedOption);
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

          <div className="inputs" style={{ width: "100%", maxWidth: "50%" }}>
            <label htmlFor="apiEndpoint">API Endpoint:</label>
            <input
              type="text"
              id="apiEndpoint"
              placeholder="Enter API Endpoint"
            />
          </div>

          {/* <div className="option-group">
          <label htmlFor="timeFrame">Time Frame:</label>
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

        <div className="option-group">
          <label htmlFor="apiEndpoint">API Endpoint:</label>
          <input
            type="text"
            id="apiEndpoint"
            placeholder="Enter API Endpoint"
          />
        </div>

        <div className="option-group">
          <label htmlFor="method">Methods:</label>
          <select id="method">
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
          </select>
        </div>

        <div className="option-group">
          <label htmlFor="status">Status:</label>
          <select id="status">
            <option>Success</option>
            <option>Failure</option>
            <option>Timeout</option>
          </select>
        </div>

        <div className="option-group">
          <label htmlFor="exportFormat">Export Format:</label>
          <select id="exportFormat">
            <option>PDF</option>
            <option>CSV</option>
            <option>Excel</option>
          </select>
        </div>

        <div className="option-group">
          <label htmlFor="includeGraphs">
            <input type="checkbox" id="includeGraphs" /> Include Graphs
          </label>
        </div> */}
        </div>

        {/* <div className="charts-section">
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
        <ChartDisplay
          chartType="pie"
          data={[45, 55]}
          categories={["Success", "Failure"]}
          title="API Success vs Failure"
          height={350}
        />
      </div> */}
      </div>
    </section>
  );
};

export default Reports;
