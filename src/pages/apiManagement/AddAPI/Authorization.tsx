import React from "react";
import CustomSelect from "../../../components/customSelect/CustomSelect";

const Authorization = ({ apiData, updateApiData, next }: any) => {
  const authOptions = [
    { label: "Basic Auth", value: "basic" },
    { label: "Bearer Token", value: "bearer" },
  ];

  const handleAuthChange = (key: any, value: any) => {
    updateApiData("headers", {
      ...apiData.headers,
      [key]: value,
    });
  };

  const handleNextClick = () => {
    next();
  };

  return (
    <div className="headers-container">
      <h2 style={{ marginBottom: "2rem" }}>Authorization</h2>

      <div className="input-flex">
        <div className="inputs">
          <CustomSelect
            options={authOptions}
            label="Select Authorization"
            placeholder="Select Authorization Type"
            value={apiData.headers["Authorization-Type"] || ""}
            onSelect={(value) => handleAuthChange("Authorization-Type", value)}
          />
        </div>

        {apiData.headers["Authorization-Type"] === "basic" && (
          <div className="basic-auth-inputs">
            <div className="inputs">
              <label>Username:</label>
              <input
                type="text"
                value={apiData.headers["Username"] || ""}
                onChange={(e) => handleAuthChange("Username", e.target.value)}
              />
            </div>
            <div className="inputs">
              <label>Password:</label>
              <input
                type="password"
                value={apiData.headers["Password"] || ""}
                onChange={(e) => handleAuthChange("Password", e.target.value)}
              />
            </div>
          </div>
        )}

        {apiData.headers["Authorization-Type"] === "bearer" && (
          <div className="inputs">
            <div className="inputs">
              <label>Bearer Token:</label>
              <input
                type="text"
                value={apiData.headers["Bearer-Token"] || ""}
                onChange={(e) =>
                  handleAuthChange("Bearer-Token", e.target.value)
                }
              />
            </div>
          </div>
        )}
      </div>

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

export default Authorization;
