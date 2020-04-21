import React from "react";
import Container from "@material-ui/core/Container";
import BaseReactComponent from "./../BaseReactComponent";

import NewCover from "./new";
import VerticalTabs from "./tabs";

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
        <Container className="cover" maxWidth="xl">
          <VerticalTabs />
          <NewCover />
        </Container>
      </React.Fragment>
    );
  }
}

export default Cover;
