import React from "react";

class ModalStats extends React.Component {
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
            <h2>Statistics</h2>
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
            <p>Sorry there arent any settings but its a pain to remove this</p>
            <h2 className="mag-top">Things I want to add</h2>
            <ul>
              <li>
                Perhaps make this the stat thing that wordle has, and store
                things in localstorage...
              </li>
              <li>Add timer thing that wordle has as well</li>
              <li>
                The incorrect entry thing has inconsistant timing and i couldnt
                fix it!!! shame
              </li>
              <li> Need a new name as well</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalStats;
