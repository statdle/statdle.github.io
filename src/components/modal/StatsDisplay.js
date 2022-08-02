import React from "react";

// props: stats
const StatsDisplay = (props) => {
  return (
    <>
      <h3 className="small-space">Statistics:</h3>
      <div className="stat__container">
        <div className="stat">
          <p className="stat__text">{props.stats.rounds + props.stats.losingRounds}</p>
          <div>Rounds</div>
        </div>
        <div className="stat">
          <p className="stat__text">{props.stats.average}</p>
          <div>Average</div>
        </div>
        <div className="stat">
          <p className="stat__text">{props.stats.best}</p>
          <div>Best</div>
        </div>
      </div>
    </>
  );
};

export default StatsDisplay;
