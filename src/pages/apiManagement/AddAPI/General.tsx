import React, { useState } from "react";
import CustomSelect from "../../../components/customSelect/CustomSelect";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";

interface GeneralProps {
  apiData: any;
  updateApiData: any;
  localBaseUrls: string[] | null;
  method: string;
  onMethodChange: any;
  next: any;
}

const General: React.FC<GeneralProps> = ({
  apiData,
  updateApiData,
  localBaseUrls,
  method,
  onMethodChange,
  next,
}) => {
  const [error, setError] = useState("");
  const [endpoint, setEndpoint] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedBaseUrl, setSelectedBaseUrl] = useState("");

  const handleEndpointChange = (e: any) => {
    let enteredEndpoint = e.target.value;

    if (!enteredEndpoint.startsWith("/")) {
      enteredEndpoint = "/" + enteredEndpoint;
    }
    setEndpoint(enteredEndpoint);
    updateApiData("endpoint", selectedBaseUrl + enteredEndpoint);
  };

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
    setSelectedBaseUrl(option);

    updateApiData("endpoint", option + endpoint);
  };

  const methodOptions = [
    { label: "GET", value: "get" },
    { label: "POST", value: "post" },
    { label: "PUT", value: "put" },
    { label: "DELETE", value: "delete" },
    { label: "PATCH", value: "patch" },
  ];

  const enableOptions = [
    { label: "Enabled", value: "enabled" },
    { label: "Disabled", value: "disabled" },
  ];

  // const handleBaseUrlChange = (selectedBaseUrl: any) => {
  //   setSelectedBaseUrl(selectedBaseUrl);
  // };

  const handleSelectStatus = (selectedOption: string) => {
    updateApiData("status", selectedOption); // Update the status in apiData
  };

  const handleNextClick = () => {
    if (
      selectedBaseUrl === "" ||
      apiData.endpoint === "" ||
      apiData.method === "" ||
      apiData.description === "" ||
      apiData.status === ""
    ) {
      setError("Please fill out all required fields.");
    } else {
      setError("");
      next(); // Move to the next tab
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: "2rem" }}>General</h2>

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
            {localBaseUrls?.map((option, index) => (
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
        <label>Endpoint:</label>
        <input
          type="text"
          id="endpoint"
          name="endpoint"
          value={endpoint}
          onChange={handleEndpointChange}
          placeholder="/endpoint"
        />
      </div>

      <CustomSelect
        options={methodOptions}
        placeholder="Select Method"
        value={apiData.method}
        onSelect={onMethodChange}
      />

      <CustomSelect
        options={enableOptions}
        placeholder="Select Status"
        value={apiData.status}
        onSelect={handleSelectStatus}
      />

      <div className="inputs" style={{ marginTop: "1.25rem" }}>
        <label>Description:</label>
        <textarea
          value={apiData.description}
          rows={5}
          cols={5}
          onChange={(e) => updateApiData("description", e.target.value)}
        />
      </div>

      <p style={{ color: "red", marginTop: "1rem" }}>{error}</p>

      <button
        onClick={handleNextClick}
        className="header-btn"
        style={{ marginTop: "4rem" }}
      >
        Next
      </button>
    </div>
  );
};

export default General;
