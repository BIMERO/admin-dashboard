import React from "react";

const Logging = () => {
  return (
    <section className="logging">
      <h1>Logging & Monitoring</h1>

      <div className="global-form">
        <form action="">
          <div className="inputs">
            <label>Enable API Logging</label>
            <input type="checkbox" />
          </div>

          <div className="inputs">
            <label>Log Retention Period (days)</label>
            <input type="number" placeholder="Enter retention period" />
          </div>

          <div className="inputs">
            <label>Log Storage Location</label>
            <input type="text" placeholder="Enter storage location" />
          </div>
        </form>
      </div>
    </section>
  );
};

export default Logging;
