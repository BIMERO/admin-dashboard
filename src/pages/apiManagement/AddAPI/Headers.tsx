import React, { useState } from "react";

const Headers = ({ apiData, updateApiData }: any) => {
  const [newHeaderKey, setNewHeaderKey] = useState("");
  const [newHeaderValue, setNewHeaderValue] = useState("");

  const handleHeaderChange = (key: any, value: any) => {
    updateApiData("headers", {
      ...apiData.headers,
      [key]: value,
    });
  };

  const handleAddHeader = () => {
    if (newHeaderKey && newHeaderValue) {
      handleHeaderChange(newHeaderKey, newHeaderValue);
      setNewHeaderKey("");
      setNewHeaderValue("");
    }
  };

  const handleRemoveHeader = (key: any) => {
    const updatedHeaders = { ...apiData.headers };
    delete updatedHeaders[key];
    updateApiData("headers", updatedHeaders);
  };

  return (
    <div className="headers-container">
      <h2 style={{ marginBottom: "2rem" }}>Headers</h2>
      {Object.keys(apiData.headers).map((key) => (
        <div key={key} className="inputs" style={{ marginBottom: "10px" }}>
          <label>{key}:</label>
          <input
            type="text"
            value={apiData.headers[key]}
            onChange={(e) => handleHeaderChange(key, e.target.value)}
            style={{ marginBottom: "1.25rem" }}
          />
          <button
            onClick={() => handleRemoveHeader(key)}
            className="header-btn"
          >
            Remove
          </button>
        </div>
      ))}
      <div className="input-flex">
        <div className="inputs">
          <input
            type="text"
            placeholder="Enter header key"
            value={newHeaderKey}
            onChange={(e) => setNewHeaderKey(e.target.value)}
            style={{ marginRight: "10px" }}
          />
        </div>
        <div className="inputs">
          <input
            type="text"
            placeholder="Enter header value"
            value={newHeaderValue}
            onChange={(e) => setNewHeaderValue(e.target.value)}
            className=""
          />
        </div>
      </div>
      <button onClick={handleAddHeader} className="header-btn">
        Add Header
      </button>
    </div>
  );
};

export default Headers;
