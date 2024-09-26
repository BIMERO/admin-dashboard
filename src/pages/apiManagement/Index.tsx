import React, { useState } from "react";
import { apiManagementData } from "../../mockdata";
import APIManagement from "./APIManagement";
import AddNewApi from "./AddAPI/Index";

interface APIManagementProps {
  id: number;
  endpoint: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"; // restrict to common HTTP methods
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

const APIManagementPage = () => {
  const [allAPIs, setAllAPIs] = useState(apiManagementData);
  const [addAPI, setAddAPI] = useState(false);

  const handleAddApi = () => {
    setAddAPI(true);
  };

  const handleSaveAPI = (newAPI: any) => {
    setAllAPIs([...allAPIs, newAPI]);
    setAddAPI(false);
  };

  const onBack = () => {
    setAddAPI(false);
  };

  return (
    <>
      {addAPI ? (
        <AddNewApi onBack={onBack} saveAPI={handleSaveAPI} />
      ) : (
        <APIManagement
          allAPIs={allAPIs}
          onAddAPI={handleAddApi}
          setAllAPIs={setAllAPIs}
        />
      )}
    </>
  );
};

export default APIManagementPage;
