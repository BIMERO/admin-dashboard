import React from "react";
import { dashboardData } from "../../mockdata";

const Header = () => {
  const data = dashboardData[0].dashboard;

  const totalApiCalls = data.apiUsage.reduce(
    (total: any, usage: any) => total + usage.totalCalls,
    0
  );

  const avgResponseTime = (
    data.apiUsage.reduce(
      (total, usage) => total + parseFloat(usage.avgResponseTime),
      0
    ) / data.apiUsage.length
  ).toFixed(2); // Assuming response time is in milliseconds

  const errorRate = (
    data.topEndpoints.reduce(
      (total, endpoint) => total + parseFloat(endpoint.errorRate),
      0
    ) / data.topEndpoints.length
  ).toFixed(2); // Calculating average error rate across top endpoints

  const dataTransfer = "N/A"; // Placeholder since no data provided for Data Transfer
  const serverHealth = "Good";

  return (
    <section className="dashboard-header">
      <div className="card">
        <span className="icon"></span>
        <div className="card-info">
          <h3>Total API Calls</h3>
          <small>Active APIs in the system</small>
          <p>{totalApiCalls}</p>
        </div>
      </div>
      <div className="card">
        <span className="icon"></span>
        <div className="card-info">
          <h3>Average Response Time</h3>
          <small>response time of API calls</small>
          <p>{avgResponseTime} m/s</p>
        </div>
      </div>
      <div className="card">
        <span className="icon"></span>
        <div className="card-info">
          <h3>Error Rate</h3>
          <small>response time of API calls</small>
          <p>{errorRate}%</p>
        </div>
      </div>
      <div className="card">
        <span className="icon"></span>
        <div className="card-info">
          <h3>Data Transfer</h3>
          <small>Total transfer till date</small>
          <p>{dataTransfer}</p>
        </div>
      </div>
      <div className="card">
        <span className="icon"></span>
        <div className="card-info">
          <h3>Server Health</h3>
          <small>Total health of the server</small>
          <p>{serverHealth}</p>
        </div>
      </div>
    </section>
  );
};

export default Header;
