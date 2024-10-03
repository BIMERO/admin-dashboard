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

  useEffect(() => {
    const storedBaseUrls = localStorage.getItem("endpoints");
    if (storedBaseUrls) {
      setLocalBaseUrls(JSON.parse(storedBaseUrls));
    }
  }, []);

  // Retrieve and initialize data from localStorage on mount
  useEffect(() => {
    const savedData = localStorage.getItem("APIEndpoints");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setApiData(parsedData[0] || null); // Set the first saved endpoint as default or null
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

  const [selectedBaseUrl, setSelectedBaseUrl] = useState("");

  const handleBaseUrlChange = (selectedBaseUrl: any) => {
    setSelectedBaseUrl(selectedBaseUrl);
  };

  // const handleSaveApi = () => {
  //   console.log("Base URL:", apiData.baseUrl); // Debugging the base URL
  //   console.log("Endpoint:", apiData.endpoint); // Debugging the endpoint
  //   console.log("Method:", apiData.method);

  //   if (apiData.baseUrl && apiData.endpoint && apiData.method) {
  //     const completeUrl = `${apiData.baseUrl}${apiData.endpoint}`;

  //     // Safely retrieve existing APIResources from localStorage
  //     const existingResources = localStorage.getItem("APIResources");
  //     console.log("Existing Resources in localStorage:", existingResources);

  //     const apiResourcesArray = existingResources
  //       ? JSON.parse(existingResources)
  //       : [];

  //     // Create the new API resource object
  //     const newApiResource = {
  //       baseUrl: apiData.baseUrl,
  //       endpoint: apiData.endpoint,
  //       requestType: apiData.method,
  //       fullUrl: completeUrl,
  //       responseTime: apiData.responseTime,
  //       status: apiData.status,
  //       timeStamp: apiData.timeStamp,
  //       method: apiData.method,
  //       description: apiData.description,
  //       headers: apiData.headers, // Initialize as an empty array
  //       queries: apiData.queries, // Initialize as an empty array (optional)
  //       enabled: true, // Or set to false if you want it disabled by default
  //       payload: apiData.payload, // Initialize as an empty object (optional)
  //       parameters: apiData.parameters, // Provide default values if needed
  //       fullUrls: completeUrl,
  //     };

  //     // Add the new API resource to the array
  //     apiResourcesArray.push(newApiResource);

  //     // Save the updated array back to localStorage
  //     localStorage.setItem("APIResources", JSON.stringify(apiResourcesArray));

  //     // Log the saved data to confirm it's being stored
  //     console.log("Updated APIResources array:", apiResourcesArray);

  //     alert("Endpoint saved successfully!");
  //   } else {
  //     alert("Error");
  //   }
  // };

  const updateApiResourceInLocalStorage = (updatedData: Partial<Endpoints>) => {
    if (!apiData) return;

    // Safely retrieve existing APIResources from localStorage
    const existingResources = localStorage.getItem("APIEndpoints");
    const apiResourcesArray = existingResources
      ? JSON.parse(existingResources)
      : [];

    // Find the index of the resource you want to update by `id`
    const resourceIndex = apiResourcesArray.findIndex(
      (resource: Endpoints) => resource.id === apiData.id
    );

    // Update the resource and save it back to localStorage
    if (resourceIndex !== -1) {
      apiResourcesArray[resourceIndex] = {
        ...apiResourcesArray[resourceIndex],
        ...updatedData,
      };
      localStorage.setItem("APIEndpoints", JSON.stringify(apiResourcesArray));
      setApiData(apiResourcesArray[resourceIndex]); // Update local state as well
    }
  };

  const createNewAPI = async () => {
    try {
      const response = await createAPI(apiData);
      console.log(response.data);
      setLoading(false);
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
            style={{ cursor: "pointer" }}
          >
            General
          </span>{" "}
          <span
            onClick={() => handleTabClick(1)}
            className={activeTab === 1 ? "active" : ""}
            style={{ cursor: "pointer" }}
          >
            Queries
          </span>
          <span
            onClick={() => handleTabClick(2)}
            className={activeTab === 2 ? "active" : ""}
            style={{ cursor: "pointer" }}
          >
            Headers
          </span>
          {apiData.method === "POST" && (
            <span
              onClick={() => handleTabClick(3)}
              className={activeTab === 3 ? "active" : ""}
              style={{ cursor: "pointer" }}
            >
              Body
            </span>
          )}
          <span
            onClick={() => handleTabClick(4)}
            className={activeTab === 4 ? "active" : ""}
            style={{ cursor: "pointer" }}
          >
            Authorization
          </span>
          <span
            onClick={() => handleTabClick(5)}
            className={activeTab === 5 ? "active" : ""}
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
              updateLocalApiData={(updatedData: Partial<Endpoints>) =>
                updateApiResourceInLocalStorage(updatedData)
              }
            />
          )}
          {activeTab === 1 && (
            <Queries
              apiData={apiData}
              updateApiData={updateApiData}
              next={handleNext}
              updateLocalApiData={(updatedData: Partial<Endpoints>) =>
                updateApiResourceInLocalStorage(updatedData)
              }
            />
          )}
          {activeTab === 2 && (
            <Headers
              apiData={apiData}
              updateApiData={updateApiData}
              next={handleNext}
              updateLocalApiData={(updatedData: Partial<Endpoints>) =>
                updateApiResourceInLocalStorage(updatedData)
              }
            />
          )}

          {activeTab === 3 && (
            <Body
              apiData={apiData}
              updateApiData={updateApiData}
              next={handleNext}
              updateLocalApiData={(updatedData: Partial<Endpoints>) =>
                updateApiResourceInLocalStorage(updatedData)
              }
            />
          )}
          {activeTab === 4 && (
            <Authorization
              apiData={apiData}
              updateApiData={updateApiData}
              next={handleNext}
              onSave={handleSave}
              updateLocalApiData={(updatedData: Partial<Endpoints>) =>
                updateApiResourceInLocalStorage(updatedData)
              }
              // onLocal={handleSaveApi}
            />
          )}
          {activeTab === 5 && (
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
