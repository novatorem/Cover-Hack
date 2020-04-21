import React from "react";
import Container from "@material-ui/core/Container";
import BaseReactComponent from "./../BaseReactComponent";

import NewCover from "./new";
import VerticalTabs from "./tabs";
import Snackbar from "../Shared/snackbar";

import "./../../App.css";
import "./styles.css";

/* Component for the cover Page */
class Cover extends BaseReactComponent {
  filterState({ coverShort, coverSuccess }) {
    return { coverShort, coverSuccess };
  }

  render() {
    // the filtered states are now on this.state
    const { coverShort, coverSuccess } = this.state;

    return (
      <React.Fragment>
        <Container className="cover" maxWidth="xl">
          <VerticalTabs />
          <NewCover />
        </Container>
        
        {coverShort == true && <Snackbar severity="warning" message="Title length has to be between 1 and 12 characters"/>}
        {coverSuccess == true && <Snackbar severity="success" message="Succesfully created!"/>}
        
      </React.Fragment>
    );
  }
}

export default Cover;
