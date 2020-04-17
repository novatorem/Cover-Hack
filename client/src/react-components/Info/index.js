import React from "react";
import BaseReactComponent from "./../BaseReactComponent";

import "./../../App.css";
import "./styles.css";

/* Component for the Info Page */
class Info extends BaseReactComponent {
  // Access the global state paths required by your component
  // using filterState. filterState puts these state paths on
  // this.state
  filterState({ currentUser }) {
    return { currentUser };
  }

  render() {
    // the filtered states are now on this.state
    const { currentUser } = this.state;

    return (
      <React.Fragment>
        <div className="info__main">
          <div className="info">
            <h1 className="center">Hi there {currentUser}</h1>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Info;
