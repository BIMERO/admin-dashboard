import React, { useEffect, useState } from "react";
import General from "./General";
import Headers from "./Headers";
import Body from "./Body";
import Authorization from "./Authorization";
import Params from "./Params";
import { HeaderProps } from "../../../../interfaces/Headers";
import { HeadersData } from "../../../headers";
import { FaCircleArrowLeft } from "react-icons/fa6";

interface APIManagementProps {
  id: number;
  endpoint: string;
  method: ""; // restrict to common HTTP methods
  description: string;
  headers: HeaderProps[];
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
    id: Date.now(),
    endpoint: "",
    method: "GET",
    description: "",
    headers: [],
    payload: {},
    parameters: {},
    enabled: true,
    baseUrlId: null,
  });
  const [localBaseUrls, setLocalBaseUrls] = useState<string[]>([]);

  useEffect(() => {
    const storedBaseUrls = localStorage.getItem("endpoints");
    if (storedBaseUrls) {
      setLocalBaseUrls(JSON.parse(storedBaseUrls));
    }
  }, []);

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

  const handleNext = () => {
    if (activeTab === 2 && apiData.method !== "POST") {
      // Skip the Body tab if method is not POST
      setActiveTab(activeTab + 2);
    } else if (activeTab < 4) {
      // Proceed to the next tab
      setActiveTab(activeTab + 1);
    }
  };

  return (
    <div>
      <div className="user-header">
        <FaCircleArrowLeft className="icon" onClick={onBack} />

        <h1>Add User</h1>
      </div>

      <div>
        <div className="api-tabs">
          <span
            onClick={() => handleTabClick(0)}
            className={activeTab === 0 ? "active" : ""}
            style={{ cursor: "pointer" }}
          >
            General
          </span>{" "}
          <span
            onClick={() => handleTabClick(1)}
            className={activeTab === 1 ? "active" : ""}
            style={{ cursor: "pointer" }}
          >
            Headers
          </span>
          {apiData.method === "POST" && (
            <span
              onClick={() => handleTabClick(2)}
              className={activeTab === 2 ? "active" : ""}
              style={{ cursor: "pointer" }}
            >
              Body
            </span>
          )}
          <span
            onClick={() => handleTabClick(3)}
            className={activeTab === 3 ? "active" : ""}
            style={{ cursor: "pointer" }}
          >
            Authorization
          </span>
          <span
            onClick={() => handleTabClick(4)}
            className={activeTab === 4 ? "active" : ""}
            style={{ cursor: "pointer" }}
          >
            Params
          </span>
        </div>

        <div className="settings-content">
          {activeTab === 0 && (
            <General
              apiData={apiData}
              updateApiData={updateApiData}
              localBaseUrls={localBaseUrls}
              method={apiData.method}
              onMethodChange={handleMethodChange}
              next={handleNext}
            />
          )}
          {activeTab === 1 && (
            <Headers
              apiData={apiData}
              updateApiData={updateApiData}
              next={handleNext}
            />
          )}
          {activeTab === 2 && (
            <Body
              apiData={apiData}
              updateApiData={updateApiData}
              next={handleNext}
            />
          )}
          {activeTab === 3 && (
            <Authorization
              apiData={apiData}
              updateApiData={updateApiData}
              next={handleNext}
            />
          )}
          {activeTab === 4 && (
            <Params
              apiData={apiData}
              updateApiData={updateApiData}
              onSave={handleSave}
            />
          )}

          {/* <button
            onClick={handleSave}
            className="header-btn"
            style={{ marginTop: "4rem" }}
          >
            Save API
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default AddNewApi;
