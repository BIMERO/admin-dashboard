import React, { useState } from "react";
import { ApiData } from "./ApiData";
import APIManagement from "./APIManagement";
import AddNewApi from "./AddAPI/Index";
import { Endpoints } from "../../interfaces/Endpoint";

const APIManagementPage = () => {
  const [allAPIs, setAllAPIs] = useState(ApiData);
  const [addAPI, setAddAPI] = useState(false);

  const handleAddApi = () => {
    setAddAPI(true);
  };

  const handleSaveAPI = (newAPI: Endpoints) => {
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
