import React from "react";

class ModalHow extends React.Component {
  constructor(props) {
    super(props);
    this.stopPropagation = this.stopPropagation.bind(this);
  }

  stopPropagation(e) {
    e.stopPropagation();
  }

  render() {
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
            <p className="mag-top">
              <b>Example</b>
            </p>
            <div className="onboard-example">
              <h2 className="catagory-title">Alphabetically</h2>
              <div className="line-thing"></div>
              <div className="line-row">
                <span className="row-item position-symbol">↓</span>
                <span className="row-item rank-number">10</span>
                <span className="row-item country-name">Austria</span>
              </div>
              <div className="line-row">
                <span className="row-item position-symbol active">↑</span>
                <span className="row-item rank-number active">149</span>
                <span className="row-item country-name active">San Marino</span>
              </div>
              <div className="line-thing"></div>
            </div>

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
          </div>
        </div>
      </div>
    );
  }
}

export default ModalHow;
