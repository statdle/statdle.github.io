import React from "react";

class ModalSettings extends React.Component {
  constructor(props) {
    super(props);
    this.stopPropagation = this.stopPropagation.bind(this);
  }

  stopPropagation(e) {
    e.stopPropagation();
  }

  render() {
    return (
      <div className="modal-backing" onClick={() => this.props.toggleModal()}>
        <div className="modal-content" onClick={this.stopPropagation}>
          <div className="modal-title">
            <h2>Settings</h2>
            <span
              className="material-icons btn"
              onClick={() => this.props.toggleModal()}
            >
              close
            </span>
          </div>
          <div className="modal-body">
            <a
              className="country-guess"
              href="https://www.sporcle.com/games/needapausebutton/country-ranking-showdown"
              target="_blank"
              rel="noreferrer"
            >
              play this sporcle quiz
            </a>
            <h2 className="mag-top">Things I want to add</h2>
            <ul>
              <li>
                Better search detection of countries; you cant submit/be
                suggested already inputed/wrongly spelt
              </li>
              <li>Redoing the coord data</li>
              <li>restrictions on countries</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalSettings;
