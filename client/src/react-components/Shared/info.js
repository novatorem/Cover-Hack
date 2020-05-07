import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import { setState } from "statezero";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

export default function FullScreenDialog() {

  const handleClose = () => {
    setState("info", false);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Dialog fullWidth={true} maxWidth="lg" open={true} onClose={handleClose}>
        <DialogTitle id="max-width-dialog-title">Cover Hack</DialogTitle>
        <DialogContent>
          <DialogContentText>Yaba daba doo</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}
