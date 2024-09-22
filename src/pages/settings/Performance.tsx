import React from "react";

const Performance = () => {
  return (
    <section className="performance">
      <h1>Performance Setting</h1>

      <div className="global-form">
        <form action="">
          <div className="inputs">
            <label>Enable Caching</label>
            <input type="checkbox" />
          </div>

          <div className="inputs">
            <label>Cache Expiry (minutes)</label>
            <input type="number" placeholder="Enter cache expiry" />
          </div>

          <div className="inputs">
            <label>Cache Storage Location</label>
            <input type="text" placeholder="Enter storage location" />
          </div>
        </form>
      </div>
    </section>
  );
};

export default Performance;
