import React from "react";
import Container from "@material-ui/core/Container";
import BaseReactComponent from "./../BaseReactComponent";

import Delete from "./delete";
import Info from "../Shared/info";
import VerticalDrawer from "./drawers";
import Snackbar from "../Shared/snackbar";

import "./../../App.css";
import "./styles.css";
/* Component for the cover Page */
class Cover extends BaseReactComponent {
  filterState({
    cover,
    coverShort,
    coverSuccess,
    userCovers,
    info,
    deleteC,
    saveSuccess,
    introCover,
    currentUser,
    deleteSuccess
  }) {
    return {
      cover,
      coverShort,
      coverSuccess,
      userCovers,
      info,
      deleteC,
      saveSuccess,
      introCover,
      currentUser,
      deleteSuccess
    };
  }

  render() {
    // the filtered states are now on this.state
    const {
      cover,
      coverShort,
      coverSuccess,
      userCovers,
      info,
      deleteC,
      saveSuccess,
      introCover,
      currentUser,
      deleteSuccess
    } = this.state;

    return (
      <React.Fragment>
        <Container className="cover" maxWidth="false" disableGutters="true">
          <VerticalDrawer userCovers={userCovers} introCover={introCover} />
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

        {deleteSuccess === true && (
          <Snackbar severity="success" message="Deleted" />
        )}

        {info === true && <Info currentUser={currentUser} />}
        {deleteC === true && <Delete title={cover.title} />}
      </React.Fragment>
    );
  }
}

export default Cover;
