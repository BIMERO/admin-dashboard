import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

const MakeAPICall = ({ handleCloseCall }: { handleCloseCall: () => void }) => {
  const [apiResources, setApiResources] = useState<string[]>([]);
  const [selectedResource, setSelectedResource] = useState<string>("");
  const [requestType, setRequestType] = useState<string>("GET");
  const [response, setResponse] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
    handleBaseUrlChange(option);
  };

  const handleBaseUrlChange = (selectedResource: any) => {
    setSelectedResource(selectedResource);
  };

  useEffect(() => {
    const storedApiResources = localStorage.getItem("APIResources");
    if (storedApiResources) {
      setApiResources(JSON.parse(storedApiResources));
    }
  }, []);

  const handleExecute = async () => {
    try {
      const res = await axios({
        method: requestType.toLowerCase(),
        url: selectedResource,
      });
      setResponse(JSON.stringify(res.data, null, 2));
      setError(null);
    } catch (err) {
      setError("Error occurred while making API call.");
      setResponse(null);
    }
  };

  return (
    <section className="edit-user">
      <div className="edit-user-modal">
        <h2 style={{ marginBottom: "1.25rem" }}>Make API Call</h2>
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
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="inputs">
            <label>Select Request Type</label>
            <select
              value={requestType}
              onChange={(e) => setRequestType(e.target.value)}
            >
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="DELETE">DELETE</option>
            </select>
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
              cols={100}
            />
          </div>
        </div>

        <button className="header-btn" onClick={handleCloseCall}>
          Close
        </button>
      </div>
    </section>
  );
};

export default MakeAPICall;
