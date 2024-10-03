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
  updateLocalApiData: any;
}

const General: React.FC<GeneralProps> = ({
  apiData,
  updateApiData,
  localBaseUrls,
  method,
  onMethodChange,
  next,
  updateLocalApiData,
}) => {
  const handleEndpointChange = (e: any) => {
    let enteredEndpoint = e.target.value;

    if (!enteredEndpoint.startsWith("/")) {
      enteredEndpoint = "/" + enteredEndpoint;
    }
    updateApiData("endpoint", enteredEndpoint);
    updateLocalApiData("endpoint", enteredEndpoint);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
    handleBaseUrlChange(option);
    updateApiData("baseUrl", option);
    updateLocalApiData("baseUrl", option);
  };

  const methodOptions = [
    { label: "GET", value: "GET" },
    { label: "POST", value: "POST" },
    { label: "PUT", value: "PUT" },
    { label: "DELETE", value: "DELETE" },
    { label: "PATCH", value: "PATCH" },
  ];

  const [selectedBaseUrl, setSelectedBaseUrl] = useState("");

  const handleBaseUrlChange = (selectedBaseUrl: any) => {
    setSelectedBaseUrl(selectedBaseUrl);
  };

  const handleNext = () => {
    next();
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
          name=""
          value={apiData.endpoint}
          onChange={handleEndpointChange}
          placeholder="/endpoint"
        />
      </div>

      <CustomSelect
        options={methodOptions}
        placeholder="Select Method"
        value={method}
        onSelect={onMethodChange}
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

      <button
        onClick={handleNext}
        className="header-btn"
        style={{ marginTop: "4rem" }}
      >
        Next
      </button>
    </div>
  );
};

export default General;
