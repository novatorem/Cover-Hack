import React from "react";
import Particles from "react-particles-js";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import CloseIcon from "@material-ui/icons/Close";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import BaseReactComponent from "./../BaseReactComponent";
import LinearProgress from "@material-ui/core/LinearProgress";

import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles
} from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

// Importing actions/required methods

import Page from "../Cover/page";
import Password from "./password";
import Snackbar from "../Shared/snackbar";
import { setState, getState } from "statezero";
import { updateLoginForm, login, register } from "../../actions/user";

import "./styles.css";
import "./../../App.css";

const MUIDialogContent = withStyles(theme => ({
  root: {
    overflow: "scroll",
    scrollbarWidth: "none"
  }
}))(DialogContent);

const MUILinearProgress = withStyles(theme => ({
  root: {
    margin: "2rem"
  }
}))(LinearProgress);

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

const styles = theme => ({
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const MUIDialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
  return (
    <DialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
});

class Login extends BaseReactComponent {
  // Prepare all the snackbars
  filterState({
    loginClick,
    loginError,
    failedLogin,
    invalidUsername,
    passwordShort,
    registered,
    tryCover
  }) {
    return {
      loginClick,
      loginError,
      failedLogin,
      invalidUsername,
      passwordShort,
      registered,
      tryCover
    };
  }
  constructor(props) {
    super(props);

    this.state = { trying: false };
    this.handleOpen = e => {
      e.preventDefault();
      this.setState({ trying: true });
    };
    this.handleClose = e => {
      e.preventDefault();
      this.setState({ trying: false });
    };
  }

  render() {
    const {
      loginClick,
      loginError,
      failedLogin,
      invalidUsername,
      passwordShort,
      registered,
      tryCover
    } = this.state;
    return (
      <MuiThemeProvider theme={theme}>
        <div className="login__bg-image center">
          <Particles />
          <div className="login__card center">
            <h2 id="login__h2">Cover Hack</h2>

            <TextField
              name="username"
              label="Username"
              className="login__input app__input app__horizontal-center"
              margin="normal"
              autoFocus="true"
              InputProps={{
                style: {
                  color: "#FFFFFFDE"
                }
              }}
              onChange={e => updateLoginForm(e.target)}
              onKeyDown={e => {
                if (e.keyCode === 13) {
                  login();
                }
              }}
            />

            <Password />

            <div className="login__center">
              <Button className="login__button" onClick={this.handleOpen}>
                Try Me
              </Button>
              <Button className="login__button" onClick={register}>
                Register
              </Button>
            </div>
            <div className="login__center">
              <Button className="login__button" onClick={login}>
                Log In
              </Button>
            </div>
          </div>

          <Dialog
            maxWidth={false}
            open={this.state.trying}
            onClose={this.handleClose}
          >
            <MUIDialogTitle onClose={this.handleClose}>Try Me</MUIDialogTitle>
            <Divider />
            <MUIDialogContent dividers={false}>
              <Page cover={tryCover} />
            </MUIDialogContent>
          </Dialog>

          {loginClick === true && <MUILinearProgress />}

          {/* Snackbars for notifications */}
          {loginError === true && (
            <Snackbar
              severity="error"
              message="Error logging in, please refresh. If this continues, post an issue on github."
            />
          )}
          {failedLogin === true && (
            <Snackbar
              severity="error"
              message="Invalid username/password combination"
            />
          )}
          {invalidUsername === true && (
            <Snackbar
              severity="error"
              message="Failed to register, choose a different username"
            />
          )}
          {passwordShort === true && (
            <Snackbar
              severity="warning"
              message="Password too short, minimum of 6 characters"
            />
          )}
          {registered === true && (
            <Snackbar severity="success" message="Registered, welcome!" />
          )}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Login;
