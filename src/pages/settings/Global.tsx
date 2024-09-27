import React, { useState } from "react";

const Global = () => {
  const [baseUrl, setBaseUrl] = useState(localStorage.getItem("baseUrl") || "");
  const [endpoints, setEndpoints] = useState<string[]>([]);
  const [timeoutDuration, setTimeoutDuration] = useState(
    localStorage.getItem("timeoutDuration") || ""
  );
  const [maxCallLimit, setMaxCallLimit] = useState(
    localStorage.getItem("maxCallLimit") || ""
  );
  const [rateLimit, setRateLimit] = useState(
    localStorage.getItem("rateLimit") || ""
  );
  const [pageSize, setPageSize] = useState(
    localStorage.getItem("pageSize") || ""
  );
  const [successMessage, setSuccessMessage] = useState("");

  const handleSave = (e: any) => {
    e.preventDefault();

    // Store all inputs in localStorage
    if (baseUrl) {
      const updatedEndpoints = [...endpoints, baseUrl];
      setEndpoints(updatedEndpoints);
      localStorage.setItem("endpoints", JSON.stringify(updatedEndpoints));
      setBaseUrl(""); // Clear the input after adding
    }
    localStorage.setItem("timeoutDuration", timeoutDuration);
    localStorage.setItem("maxCallLimit", maxCallLimit);
    localStorage.setItem("rateLimit", rateLimit);
    localStorage.setItem("pageSize", pageSize);

    setSuccessMessage("Settings saved successfully!");
  };

  return (
    <section className="global">
      <h1>Global Settings</h1>
      <div className="global-form">
        <form action="submit" onSubmit={handleSave}>
          <div className="inputs">
            <label>Base API URL</label>
            <input
              type="text"
              placeholder="Enter base URL"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
            />
          </div>

          <div className="inputs">
            <label>Timeout Duration (seconds)</label>
            <input
              type="number"
              placeholder="Enter timeout duration"
              value={timeoutDuration}
              onChange={(e) => setTimeoutDuration(e.target.value)}
            />
          </div>

          <div className="inputs">
            <label>Max API Call Limit</label>
            <input
              type="number"
              placeholder="Enter call limit"
              value={maxCallLimit}
              onChange={(e) => setMaxCallLimit(e.target.value)}
            />
          </div>

          <div className="inputs">
            <label>Rate Limiting (requests per minute)</label>
            <input
              type="number"
              placeholder="Set rate limit"
              value={rateLimit}
              onChange={(e) => setRateLimit(e.target.value)}
            />
          </div>

          <div className="inputs">
            <label>Pagination Settings</label>
            <input
              type="number"
              placeholder="Enter default page size"
              value={pageSize}
              onChange={(e) => setPageSize(e.target.value)}
            />
          </div>

          <button type="submit">Save</button>
        </form>

        <p>{successMessage}</p>
        <ul>
          {endpoints.map((endpoint, index) => (
            <li key={index}>{endpoint}</li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Global;
