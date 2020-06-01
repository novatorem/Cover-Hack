import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  createMuiTheme,
  ThemeProvider,
  withStyles
} from "@material-ui/core/styles";

import Page from "../Cover/page";
import { setState, getState } from "statezero";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

const MUIDialogContent = withStyles(theme => ({
  root: {
    overflow: "hidden"
  }
}))(DialogContent);

export default function ScrollDialog(props) {
  const handleClose = () => {
    console.log(getState("trying"))
    setState("trying", false);
    console.log(getState("trying"))
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Dialog maxWidth={false} open={getState("trying")} onClose={handleClose}>
        <DialogTitle>Try Me</DialogTitle>
        <MUIDialogContent dividers={false}>
          <Page cover={props.tryCover} />
        </MUIDialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose} color="default">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
