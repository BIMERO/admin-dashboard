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
  const handleEndpointChange = (e: any) => {
    updateApiData("endpoint", e.target.value);
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelectOption = (option: string) => {
    setSelectedOption(option);
    setIsDropdownOpen(false);
    handleBaseUrlChange(option);
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

  const handleSave = () => {
    if (selectedBaseUrl && apiData.endpoint) {
      const completeUrl = `${selectedBaseUrl}${apiData.endpoint}`;

      // Safely retrieve existing APIResources from localStorage
      const existingResources = localStorage.getItem("APIResources");
      const apiResourcesArray = existingResources
        ? JSON.parse(existingResources)
        : [];

      // Add the new complete URL to the array
      apiResourcesArray.push(completeUrl);

      // Save the updated array back to localStorage
      localStorage.setItem("APIResources", JSON.stringify(apiResourcesArray));

      alert("Endpoint saved successfully!");
    } else {
      alert("Please select a base URL and enter an endpoint.");
    }
  };

  const handleNext = () => {
    next();
    handleSave();
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
