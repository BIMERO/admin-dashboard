import React, { useState } from "react";
import { settingsData, SettingsProps } from "./settingsData";
import Global from "./Global";
import Settings from "./Settings";

const SettingsPage = () => {
  const [allSettings, setAllSettings] = useState(settingsData);
  const [addSetting, setAddSetting] = useState(false);

  const handleAddSetting = () => {
    setAddSetting(true);
  };

  const handleSaveSetting = (setting: SettingsProps) => {
    setAllSettings([...allSettings, setting]);
    setAddSetting(false);
  };

  const goBack = () => {
    setAddSetting(false);
  };

  return (
    <div>
      {addSetting ? (
        <Global goBack={goBack} handleSaveSetting={handleSaveSetting} />
      ) : (
        <Settings
          allSettings={allSettings}
          handleAddSetting={handleAddSetting}
        />
      )}
    </div>
  );
};

export default SettingsPage;
