import React, { useState } from "react";

interface ApiKey {
  key: string;
  value: string;
  baseUrl: string;
}

const Global = ({ goBack, handleSaveSetting }: any) => {
  const [baseUrl, setBaseUrl] = useState(localStorage.getItem("baseUrl") || "");
  const [endpoints, setEndpoints] = useState<string[]>(() => {
    const storedEndpoints = localStorage.getItem("endpoints");
    return storedEndpoints ? JSON.parse(storedEndpoints) : []; // Initialize from localStorage
  });
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

  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);

  // State to hold current input values
  const [keyName, setKeyName] = useState("");
  const [keyValue, setKeyValue] = useState("");

  // State for the selected base URL (Live/Test)
  const [baseUrlType, setBaseUrlType] = useState("live");
  const [error, setError] = useState("");

  // const addApiKey = () => {
  //   // Validation: Ensure keyName and keyValue are not empty
  //   if (!keyName || !keyValue) {
  //     setError("Both key name and key value are required.");
  //     return;
  //   }

  //   // Add the new API key to the apiKeys array
  //   setApiKeys([
  //     ...apiKeys,
  //     { key: keyName, value: keyValue, baseUrl: baseUrlType },
  //   ]);

  //   // Clear input fields and errors after successful addition
  //   setKeyName("");
  //   setKeyValue("");
  //   setError(""); // Clear the error message
  // };

  const handleBaseUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBaseUrlType(event.target.value);
  };

  // Handle deleting an API key
  const deleteApiKey = (index: number) => {
    const updatedApiKeys = apiKeys.filter((_, i) => i !== index);
    setApiKeys(updatedApiKeys);
  };

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
          <div className="base_radio">
            <label>Base URL Type:</label>
            <label>
              <input
                type="radio"
                value="live"
                checked={baseUrlType === "live"}
                onChange={handleBaseUrlChange}
              />
              Live
            </label>
            <label>
              <input
                type="radio"
                value="test"
                checked={baseUrlType === "test"}
                onChange={handleBaseUrlChange}
              />
              Test
            </label>
          </div>

          <div className="add-headers">
            <div className="inputs">
              <label>API Key Name:</label>
              <input
                type="text"
                value={keyName}
                onChange={(e) => setKeyName(e.target.value)}
                placeholder="Enter API key name"
              />
            </div>

            {/* Input for API key value */}
            <div className="inputs">
              <label>API Key Value:</label>
              <input
                type="text"
                value={keyValue}
                onChange={(e) => setKeyValue(e.target.value)}
                placeholder="Enter API key value"
              />
            </div>
          </div>

          {error && <p style={{ color: "red" }}>{error}</p>}

          <div className="input-flex">
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
          </div>

          <div className="input-flex">
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
          </div>

          <button type="submit">Save</button>
        </form>

        <div className="addedkeys">
          <h3>Added API Keys</h3>
          {apiKeys.length > 0 ? (
            <ul>
              {apiKeys.map((api, index) => (
                <li key={index}>
                  <p>
                    Key: <span>{api.key}</span>
                  </p>
                  <p>
                    Value: <span>{api.value}</span>
                  </p>
                  <p>
                    BaseUrl Type: <span>{api.baseUrl}</span>
                  </p>

                  <button
                    onClick={() => deleteApiKey(index)}
                    style={{ maxWidth: "fit-content" }}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No API keys added yet.</p>
          )}
        </div>

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
