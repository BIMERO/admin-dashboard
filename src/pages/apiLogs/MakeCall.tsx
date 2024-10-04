import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { getApis } from "../../config/apiService";

const MakeAPICall = ({ handleCloseCall }: { handleCloseCall: () => void }) => {
  const [allAPIs, setAllAPIs] = useState<any[]>([]);
  const [apiResources, setApiResources] = useState<any[]>([]);
  const [selectedResource, setSelectedResource] = useState<any | null>(null);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [queryParams, setQueryParams] = useState<{ [key: string]: string }>({});
  const [payloadFields, setPayloadFields] = useState<{ [key: string]: string }>(
    {}
  ); // State for POST payloads
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [loading, setLoading] = useState(false); // State for loading

  // Fetch API resources from localStorage on mount
  // useEffect(() => {
  //   const storedApiResources = localStorage.getItem("APIResources");
  //   if (storedApiResources) {
  //     setApiResources(JSON.parse(storedApiResources));
  //   }
  // }, []);

  useEffect(() => {
    const fetchApis = async () => {
      setLoading(true);
      try {
        const userData = await getApis();
        setAllAPIs(userData.data);
        console.log(userData.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch APIs");
        setLoading(false);
      }
    };

    fetchApis();
  }, []);

  // Detect placeholders in the URL and initialize query parameters
  const extractPlaceholders = (url: string) => {
    const regex = /\{([^}]+)\}/g;
    const matches = Array.from(url.matchAll(regex)); // Convert iterator to an array
    const params: { [key: string]: string } = {};

    matches.forEach((match) => {
      const paramName = match[1];
      params[paramName] = selectedResource?.queries?.[paramName] || ""; // Pre-fill from queries or default to ""
    });

    setQueryParams(params);
  };

  const handleSelectOption = (option: any) => {
    setSelectedOption(option.endpoint);
    setSelectedResource(option);
    setIsDropdownOpen(false);

    // Extract placeholders from the selected fullUrl
    extractPlaceholders(option.endpoint);

    // Fetch payload from localStorage and set it
    const storedPayload = option.payload.reduce(
      (
        acc: { [key: string]: string },
        field: { key: string; value: string }
      ) => {
        acc[field.key] = field.value;
        return acc;
      },
      {}
    );
    setPayloadFields(storedPayload);
  };

  const handleQueryChange = (key: string, value: string) => {
    setQueryParams((prevParams) => ({
      ...prevParams,
      [key]: value,
    }));
  };

  const handlePayloadChange = (key: string, value: string) => {
    setPayloadFields((prevPayload) => ({
      ...prevPayload,
      [key]: value,
    }));
  };

  const handleExecute = async () => {
    if (!selectedResource) return;

    // Replace placeholders with the user input from queryParams
    let fullUrl = selectedResource.endpoint;
    console.log("fullUrl", fullUrl);
    Object.keys(queryParams).forEach((key) => {
      fullUrl = fullUrl.replace(`{${key}}`, queryParams[key]);
    });

    console.log("fullUrl", fullUrl);

    try {
      const res = await axios({
        method: selectedResource.method,
        url: fullUrl,
        data:
          selectedResource.method.toLowerCase() === "post"
            ? payloadFields
            : undefined, // Include payload for POST requests
      });
      setResponse(JSON.stringify(res.data, null, 2));
      console.log(res);
      setError(null);
    } catch (err) {
      setResponse("Error occurred while making API call.");
      setError("");
    }
  };

  const filteredBaseUrls = allAPIs.filter((resources) =>
    resources.endpoint.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="edit-user">
      <div
        className="edit-user-modal"
        style={{ padding: "2rem", minHeight: "100vh" }}
      >
        <div className="modal-header">
          <h2>Make API Call</h2>
          <button className="header-btn" onClick={handleCloseCall}>
            Close
          </button>
        </div>

        {/* Dropdown to select Base URL */}
        <div
          className="custom-select-container"
          style={{ marginBottom: "2rem" }}
        >
          <label>Select Base URL</label>
          <div
            className="custom-select"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span>{selectedOption || "Select Base URL"}</span>
            <MdOutlineKeyboardArrowDown />
          </div>
          {isDropdownOpen && (
            <ul className="dropdown-list">
              <li className="inputs">
                <input
                  type="search"
                  name="searchapis"
                  id="searchapis"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </li>
              {filteredBaseUrls.map((option, index) => (
                <li key={index} onClick={() => handleSelectOption(option)}>
                  {option.endpoint} ({option.method.toUpperCase()})
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Input fields for dynamic placeholders like {id}, {name}, etc. */}
        {Object.keys(queryParams).length > 0 && (
          <div className="query-params">
            <h3>Query Parameters</h3>
            {Object.keys(queryParams).map((param, index) => (
              <div key={index} className="inputs">
                <label>{param}:</label>
                <input
                  type="text"
                  value={queryParams[param]}
                  onChange={(e) => handleQueryChange(param, e.target.value)}
                  placeholder={`Enter value for ${param}`}
                />
              </div>
            ))}
          </div>
        )}

        {/* Input fields for POST payload if the request type is POST */}
        {selectedResource &&
          selectedResource.method.toLowerCase() === "post" && (
            <div>
              <h3 style={{ marginBottom: "1rem" }}>Payload</h3>
              {Object.keys(payloadFields).map((key, index) => (
                <div key={index} className="inputs">
                  <label>{key}:</label>
                  <input
                    type="text"
                    value={payloadFields[key]}
                    onChange={(e) => handlePayloadChange(key, e.target.value)}
                    placeholder={`Enter value for ${key}`}
                  />
                </div>
              ))}
            </div>
          )}

        <button className="header-btn" onClick={handleExecute}>
          Execute
        </button>

        {/* Display response */}
        {response && (
          <div className="inputs" style={{ marginTop: "2rem" }}>
            <label>Response:</label>
            <textarea readOnly value={response} rows={10} />
          </div>
        )}
      </div>
    </section>
  );
};

export default MakeAPICall;
