import React from "react";

// props: stats
const StatsDisplay = (props) => {
  return (
    <>
      <h3 className="small-space">Statistics:</h3>
      <div className="stat__container">
        <div className="stat">
          <p className="stat__text">{(props.stats.rounds || 0) + (props.stats.losingRounds || 0)}</p>
          <div>Rounds</div>
        </div>
        <div className="stat">
          <p className="stat__text">{(props.stats.average || 0)}</p>
          <div>Average</div>
        </div>
        <div className="stat">
          <p className="stat__text">{(props.stats.best || 0)}</p>
          <div>Best</div>
        </div>
      </div>
    </>
  );
};

export default StatsDisplay;
