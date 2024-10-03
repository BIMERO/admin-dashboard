import React, { useEffect, useState } from "react";
import { ApiData } from "./ApiData";
import APIManagement from "./APIManagement";
import AddNewApi from "./AddAPI/Index";
import { Endpoints } from "../../interfaces/Endpoint";
import { getApis } from "../../config/apiService";

const APIManagementPage = () => {
  const [allAPIs, setAllAPIs] = useState<Endpoints[]>([]);
  const [addAPI, setAddAPI] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const userData = await getApis();
        setAllAPIs(userData.data);
        console.log(userData.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch APIs");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

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
