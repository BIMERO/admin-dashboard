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
        <div className="settings-tabs" style={{ justifyContent: "flex-start" }}>
          <span
            onClick={() => handleTabClick(0)}
            className={activeTab === 0 ? "active" : ""}
            style={{ cursor: "pointer" }}
          >
            Global API
          </span>{" "}
          <span
            onClick={() => handleTabClick(1)}
            className={activeTab === 1 ? "active" : ""}
            style={{ cursor: "pointer" }}
          >
            Authentication
          </span>
        </div>

        <div className="settings-content">
          {activeTab === 0 && <Global />}
          {activeTab === 1 && <Authentication />}
        </div>
      </div>
    </section>
  );
};

export default Settings;
