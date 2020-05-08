import React from "react";
import Container from "@material-ui/core/Container";
import BaseReactComponent from "./../BaseReactComponent";

import Info from "../Shared/info";
import VerticalDrawer from "./drawers";
import Snackbar from "../Shared/snackbar";

import "./../../App.css";
import "./styles.css";
/* Component for the cover Page */
class Cover extends BaseReactComponent {
  filterState({ coverShort, coverSuccess, userCovers, info, saveSuccess, defaultCover, currentUser }) {
    return { coverShort, coverSuccess, userCovers, info, saveSuccess, defaultCover, currentUser };
  }

  render() {
    // the filtered states are now on this.state
    const {
      coverShort,
      coverSuccess,
      userCovers,
      info,
      saveSuccess,
      defaultCover,
      currentUser
    } = this.state;

    return (
      <React.Fragment>
        <Container className="cover" maxWidth="false" disableGutters="true">
          <VerticalDrawer userCovers={userCovers} defaultCover = {defaultCover} />
        </Container>

        {coverShort === true && (
          <Snackbar
            severity="warning"
            message="Title length has to be between 1 and 12 characters"
          />
        )}

        {coverSuccess === true && (
          <Snackbar severity="success" message="Succesfully created!" />
        )}
        {saveSuccess === true && (
          <Snackbar severity="success" message="Saved" />
        )}

        {info === true && <Info currentUser={currentUser} />}
      </React.Fragment>
    );
  }
}

export default Cover;
