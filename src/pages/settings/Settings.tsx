import React, { useState } from "react";
import "./settings.css";
import Global from "./Global";
import Authentication from "./Authentication";
import Security from "./Security";
import Logging from "./Logging";
import Performance from "./Performance";
import ErrorHandling from "./ErrorHandling";
import VersionControl from "./VersionControl";

const Settings = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };
  return (
    <section className="settings">
      <h1>Settings</h1>
      <div className="settings-container">
        <div className="settings-tabs">
          <span
            onClick={() => handleTabClick(0)}
            className={activeTab === 0 ? "active" : ""}
          >
            Global API
          </span>{" "}
          <span
            onClick={() => handleTabClick(1)}
            className={activeTab === 1 ? "active" : ""}
          >
            Authentication
          </span>
          <span
            onClick={() => handleTabClick(2)}
            className={activeTab === 2 ? "active" : ""}
          >
            Security
          </span>
          <span
            onClick={() => handleTabClick(3)}
            className={activeTab === 3 ? "active" : ""}
          >
            Logging
          </span>
          <span
            onClick={() => handleTabClick(4)}
            className={activeTab === 4 ? "active" : ""}
          >
            Performance
          </span>
          <span
            onClick={() => handleTabClick(5)}
            className={activeTab === 5 ? "active" : ""}
          >
            Error Handling
          </span>
          <span
            onClick={() => handleTabClick(6)}
            className={activeTab === 6 ? "active" : ""}
          >
            Version Control
          </span>
        </div>

        <div className="settings-content">
          {activeTab === 0 && <Global />}
          {activeTab === 1 && <Authentication />}
          {activeTab === 2 && <Security />}
          {activeTab === 3 && <Logging />}
          {activeTab === 4 && <Performance />}
          {activeTab === 5 && <ErrorHandling />}
          {activeTab === 6 && <VersionControl />}
        </div>
      </div>
    </section>
  );
};

export default Settings;
