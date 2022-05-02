import React from "react";
import CatagoryGroup from "./CatagoryGroup";

class ModalHow extends React.Component {
  constructor(props) {
    super(props);
    this.stopPropagation = this.stopPropagation.bind(this);
  }

  stopPropagation(e) {
    e.stopPropagation();
  }
  // props: values[<catgoryName>, high, highname, low, lowName, target], active<[0, 0, 0, 0]>
  render() {
    const exampleOne = (
      <div className="onboard-example">
        <CatagoryGroup
          values={[
            "alp",
            {
              high: 10,
              highName: "Austria",
              low: 149,
              lowName: "San Marino",
              target: 11,
            },
          ]}
          active={[0, 0, 1, 0]}
          key={"ex1"}
        />
      </div>
    );

    const exampleTwo = (
      <div className="onboard-example">
        <CatagoryGroup
          values={[
            "alp",
            {
              high: 10,
              highName: "Austria",
              low: 149,
              lowName: "San Marino",
              target: 11,
            },
          ]}
          active={[0, 0, 0, 1]}
          key={"ex2"}
        />
      </div>
    );

    return (
      <div className="modal-backing" onClick={() => this.props.toggleModal(0)}>
        <div className="modal-content" onClick={this.stopPropagation}>
          <div className="modal-title">
            <h2>How to Play</h2>
            <span
              className="material-icons btn"
              onClick={() => this.props.toggleModal(0)}
            >
              close
            </span>
          </div>
          <div className="modal-body">
            <p>
              Find the Secret Nation-<em>State</em> using <em>Stat</em>istics!
            </p>
            <p className="mag-top">
              Guessing a country will show its rank on 4 random catagories, and
              how it compares to the <em> Secret Country</em>
            </p>
            <h3 className="mag-top">Example</h3>
            {exampleOne}
            <ul>
              <li>
                <em>Austria</em> is rank 10 Alphabetically, above the
                <em> Secret Country</em>
              </li>
              <li>
                <em>San Marino</em> is rank 149 Alphabetically, below the
                <em> Secret Country</em>
              </li>
            </ul>
            <p className="mag-top">
              Further guesses will only retain the countries closest to the
              <em> Secret Country</em>, and will display a line to represent
              this.
            </p>
            <h3 className="mag-top">Example</h3>
            {exampleTwo}
            <ul>
              <li>A new guess, like Zimbabwe is lower than San Marino</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalHow;
