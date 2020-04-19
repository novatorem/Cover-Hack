import React from "react";
import BaseReactComponent from "./../BaseReactComponent";

import "./../../App.css";
import "./styles.css";

/* Component for the cover Page */
class Cover extends BaseReactComponent {
  filterState({ currentUser }) {
    return { currentUser };
  }

  render() {
    // the filtered states are now on this.state
    const { currentUser } = this.state;

    return (
      <React.Fragment>
        <div className="cover__main">
          <div className="cover">
            <h1 className="center">tofill</h1>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Cover;
