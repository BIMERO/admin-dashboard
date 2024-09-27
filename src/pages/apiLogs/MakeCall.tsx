import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const MakeAPICall = ({ handleCloseCall }: { handleCloseCall: () => void }) => {
  const [apiResources, setApiResources] = useState<any[]>([]);
  const [selectedResource, setSelectedResource] = useState<any | null>(null);
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectOption = (option: any) => {
    setSelectedOption(option.fullUrl);
    setIsDropdownOpen(false);
    handleBaseUrlChange(option);
  };

  const handleBaseUrlChange = (selectedResource: any[]) => {
    setSelectedResource(selectedResource);
  };

  useEffect(() => {
    const storedApiResources = localStorage.getItem("APIResources");
    if (storedApiResources) {
      setApiResources(JSON.parse(storedApiResources));
    }
  }, []);

  // const handleMakeApiCall = (apiResource: any) => {
  //   const { fullUrl, requestType } = apiResource;

  //   fetch(fullUrl, {
  //     method: requestType,
  //     headers: {
  //       "Content-Type": "application/json",
  //       // Other headers if needed
  //     },
  //     // Include a body if it's a POST or PUT request
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("API Response:", data);
  //       // Display the response in your UI
  //     })
  //     .catch((error) => console.error("Error making API call:", error));
  // };

  const handleExecute = async () => {
    if (!selectedResource) {
      setError("No API resource selected.");
      console.log("No API resource selected.");
      return;
    }

    try {
      const res = await axios({
        method: selectedResource.requestType.toLowerCase(),
        url: selectedResource.fullUrl,
      });
      setResponse(JSON.stringify(res.data, null, 2));
      console.log("API Response:", res.data);
      setError(null);
    } catch (err) {
      setError("Error occurred while making API call.");
      setResponse(null);
    }
  };

  return (
    <section className="edit-user">
      <div className="edit-user-modal">
        <div className="modal-header">
          <h2>Make API Call</h2>{" "}
          <button className="header-btn" onClick={handleCloseCall}>
            Close
          </button>
        </div>
        <div>
          <div
            className="custom-select-container"
            style={{ marginBottom: "1.25rem" }}
          >
            <label htmlFor="custom-select">Select Base Url</label>
            <div
              className="custom-select"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span className="selected-option">
                {selectedOption ? selectedOption : "Select Base URL"}
              </span>
              <span className={`${isDropdownOpen ? "open" : ""}`}>
                <MdOutlineKeyboardArrowDown style={{ fontSize: "1rem" }} />
              </span>
            </div>

            {isDropdownOpen && (
              <ul className="dropdown-list">
                {apiResources?.map((option, index) => (
                  <li
                    key={index}
                    className={`dropdown-item ${
                      option === selectedOption ? "selected" : ""
                    }`}
                    onClick={() => handleSelectOption(option)}
                  >
                    {option.fullUrl} ({option.requestType})
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button className="header-btn" onClick={handleExecute}>
            Execute
          </button>

          <div className="inputs" style={{ marginTop: "1.5rem" }}>
            <label>Response:</label>
            <textarea
              readOnly
              value={response || (error ? error : "No response yet")}
              rows={40}
              cols={60}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MakeAPICall;
