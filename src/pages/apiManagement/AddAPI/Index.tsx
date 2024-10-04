import React, { useEffect, useState } from "react";
import General from "./General";
import Headers from "./Headers";
import Body from "./Body";
import Authorization from "./Authorization";
import Params from "./Params";
import { HeaderProps } from "../../../interfaces/Headers";
import { HeadersData } from "../../../headers";
import { FaCircleArrowLeft } from "react-icons/fa6";
import { Endpoints } from "../../../interfaces/Endpoint";
import { now } from "moment";
import Queries from "./Queries";
import { createAPI } from "../../../config/apiService";
import { APIs } from "../../../interfaces/APIs";
import { IoCheckmark } from "react-icons/io5";

const AddNewApi = ({
  onBack,
  saveAPI,
}: {
  onBack: () => void;
  saveAPI: (user: any) => void;
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [apiData, setApiData] = useState<APIs>({
    id: null,
    // baseUrl: "", // no "?" here, since you're initializing it
    endpoint: "",
    // responseTime: "",
    status: "",
    created_at: "",
    method: "",
    description: "",
    headers: [], // Initialize as an empty array
    // queries: [], // Initialize as an empty array (optional)
    payload: [], // Initialize as an empty object (optional)
    parameters: [], // Provide default values if needed
    // fullUrls: "",
  });
  const [localBaseUrls, setLocalBaseUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [completedTabs, setCompletedTabs] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

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

  const handleMethodChange = (value: string) => {
    setApiData((prevData) => ({
      ...prevData,
      method: value,
    }));
  };

  const handleNext = () => {
    const updatedCompletedTabs = [...completedTabs];
    updatedCompletedTabs[activeTab] = true; // Mark current tab as complete
    setCompletedTabs(updatedCompletedTabs);

    if (activeTab === 1) {
      // Assuming tab 2 is the Headers tab
      if (apiData.method === "post") {
        setActiveTab(2); // Go to Body page if method is POST
      } else {
        setActiveTab(3); // Go to Authorization page if method is not POST
      }
    } else {
      setActiveTab((prev) => prev + 1); // Move to the next tab normally for other steps
    }
  };

  const [selectedBaseUrl, setSelectedBaseUrl] = useState("");

  const handleBaseUrlChange = (selectedBaseUrl: any) => {
    setSelectedBaseUrl(selectedBaseUrl);
  };

  const createNewAPI = async () => {
    console.log(apiData);
    try {
      const response = await createAPI(apiData);
      console.log(response);
      setLoading(false);
      alert("API created successfully");
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="user-header">
        <FaCircleArrowLeft className="icon" onClick={onBack} />
        <h1>Add API</h1>
      </div>

      <div>
        <div className="api-tabs">
          <span
            onClick={() => handleTabClick(0)}
            className={activeTab === 0 ? "active" : ""}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            General{" "}
            {completedTabs[0] && <IoCheckmark style={{ color: "#05ca05" }} />}
          </span>{" "}
          <span
            // onClick={() => handleTabClick(1)}
            className={activeTab === 1 ? "active" : ""}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            Headers{" "}
            {completedTabs[1] && <IoCheckmark style={{ color: "#05ca05" }} />}
          </span>
          {apiData.method === "post" && (
            <span
              // onClick={() => handleTabClick(2)}
              className={activeTab === 2 ? "active" : ""}
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              Body{" "}
              {completedTabs[2] && <IoCheckmark style={{ color: "#05ca05" }} />}
            </span>
          )}
          <span
            // onClick={() => handleTabClick(3)}
            className={activeTab === 3 ? "active" : ""}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            Authorization
          </span>
          <span
            // onClick={() => handleTabClick(4)}
            className={activeTab === 4 ? "active" : ""}
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
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

          {activeTab === 2 && apiData.method === "post" && (
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
              onSave={createNewAPI}
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
