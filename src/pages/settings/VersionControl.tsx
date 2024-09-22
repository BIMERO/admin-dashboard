import React from "react";

const VersionControl = () => {
  return (
    <section className="performance">
      <h1>Version Control</h1>

      <div className="global-form">
        <form action="">
          <div className="inputs">
            <label>Current Version</label>
            <input type="text" value="v1" readOnly />
          </div>

          <div className="inputs">
            <label>Enable Versioning</label>
            <input type="checkbox" />
          </div>
        </form>
      </div>
    </section>
  );
};

export default VersionControl;
