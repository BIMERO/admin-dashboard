import React, { useState } from "react";
import General from "./General";
import Headers from "./Headers";
import Body from "./Body";
import Authorization from "./Authorization";

interface APIManagementProps {
  id: number;
  endpoint: string;
  method: ""; // restrict to common HTTP methods
  description: string;
  headers: {
    "Content-Type": string;
    [key: string]: string; // allows additional header fields if needed
  };
  payload: Record<string, any>; // flexible type for payload (can be empty or contain data)
  parameters: {
    limit?: number;
    offset?: number;
    [key: string]: any; // allows additional parameters if needed
  };
  enabled: boolean;
}

const methodOptions = [
  { label: "GET", value: "GET" },
  { label: "POST", value: "POST" },
  { label: "PUT", value: "PUT" },
  { label: "DELETE", value: "DELETE" },
  { label: "PATCH", value: "PATCH" },
];

const AddNewApi = ({
  onBack,
  saveAPI,
}: {
  onBack: () => void;
  saveAPI: (user: any) => void;
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [apiData, setApiData] = useState({
    id: Date.now(), // or another unique identifier
    endpoint: "",
    method: "GET",
    description: "",
    headers: {},
    payload: {},
    parameters: {},
    enabled: true,
    baseUrlId: null, // store selected base URL ID
  });

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  const updateApiData = (key: any, value: any) => {
    setApiData((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = () => {
    saveAPI(apiData);
    onBack();
  };

  const handleMethodChange = (value: string) => {
    setApiData((prevData) => ({
      ...prevData,
      method: value,
    }));
  };

  return (
    <div>
      <h1>Add New API</h1>
      <div>
        <div className="api-tabs">
          <span
            onClick={() => handleTabClick(0)}
            className={activeTab === 0 ? "active" : ""}
          >
            General
          </span>{" "}
          <span
            onClick={() => handleTabClick(1)}
            className={activeTab === 1 ? "active" : ""}
          >
            Headers
          </span>
          {apiData.method === "POST" && (
            <span
              onClick={() => handleTabClick(2)}
              className={activeTab === 2 ? "active" : ""}
            >
              Body
            </span>
          )}
          <span
            onClick={() => handleTabClick(3)}
            className={activeTab === 3 ? "active" : ""}
          >
            Authorization
          </span>
        </div>

        <div className="settings-content">
          {activeTab === 0 && (
            <General
              apiData={apiData}
              updateApiData={updateApiData}
              method={apiData.method}
              onMethodChange={handleMethodChange}
            />
          )}
          {activeTab === 1 && (
            <Headers apiData={apiData} updateApiData={updateApiData} />
          )}
          {activeTab === 2 && (
            <Body apiData={apiData} updateApiData={updateApiData} />
          )}
          {activeTab === 3 && (
            <Authorization apiData={apiData} updateApiData={updateApiData} />
          )}

          <button
            onClick={handleSave}
            className="header-btn"
            style={{ marginTop: "4rem" }}
          >
            Save API
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewApi;
