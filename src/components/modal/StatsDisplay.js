import React from "react";

// props: stats
const StatsDisplay = (props) => {
  return (
    <>
      <p className="modal-subtitle">Statistics:</p>
      <div className="stat-container">
        <div className="stat-item">
          <h1>{props.stats.rounds}</h1>
          <div>Rounds</div>
        </div>
        <div className="stat-item">
          <h1>{props.stats.average}</h1>
          <div>Average</div>
        </div>
        <div className="stat-item">
          <h1>{props.stats.best}</h1>
          <div>Best</div>
        </div>
      </div>
    </>
  );
};

export default StatsDisplay;
