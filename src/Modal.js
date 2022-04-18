import React from "react";
import ModalHow from "./ModalHow";
import ModalSettings from "./ModalSettings";
import ModalWin from "./ModalWin";

// refactor this

/*props win
history
guessCount
toggleModalOff */

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.stopPropagation = this.stopPropagation.bind(this);
  }

  stopPropagation(e) {
    e.stopPropagation();
  }

  render() {
    let ModalType;
    let ModalTitle;
    let mt = this.props.modalType;

    if (mt === "win") {
      ModalType = (
        <ModalWin
          history={this.props.history}
          guessCount={this.props.guessCount}
          reset={this.props.reset}
          catagories={this.props.catagories}
        />
      );
      ModalTitle = "Results";
    } else if (mt === "settings") {
      ModalType = <ModalSettings />;
      ModalTitle = "Settings";
    } else {
      ModalType = <ModalHow />;
      ModalTitle = "How to Play";
    }

    return (
      <div
        className="modal-backing"
        onClick={() => this.props.toggleModalOff()}
      >
        <div className="modal-content" onClick={this.stopPropagation}>
          <div className="modal-title">
            <h2>{ModalTitle}</h2>
            <span
              className="material-icons btn"
              onClick={() => this.props.toggleModalOff()}
            >
              close
            </span>
          </div>
          <div className="modal-body">{ModalType}</div>
        </div>
      </div>
    );
  }
}

export default Modal;
