import React from "react";
import List from "@material-ui/core/List";
import Slide from "@material-ui/core/Slide";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import Divider from "@material-ui/core/Divider";
import Toolbar from "@material-ui/core/Toolbar";
import CloseIcon from "@material-ui/icons/Close";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import DialogTitle from "@material-ui/core/DialogTitle";
import ListItemText from "@material-ui/core/ListItemText";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import { setState } from "statezero";

const useStyles = makeStyles(theme => ({
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
}));
const darkTheme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

export default function FullScreenDialog() {
  const classes = useStyles();

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
