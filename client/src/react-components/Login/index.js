import React from "react";
import Particles from "react-particles-js";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import BaseReactComponent from "./../BaseReactComponent";
import {
  MuiThemeProvider,
  createMuiTheme,
  withStyles
} from "@material-ui/core/styles";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

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
    overflow: "hidden"
  }
}))(DialogContent);

const theme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

class Login extends BaseReactComponent {
  // Prepare all the snackbars
  filterState({
    failedLogin,
    invalidUsername,
    passwordShort,
    registered,
    tryCover
  }) {
    return {
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
              <Button
                className="login__button"
                onClick={(this.handleOpen)}
              >
                Try Me
              </Button>
            </div>
            <div className="login__center">
              <Button className="login__button" onClick={login}>
                Log In
              </Button>
              <Button className="login__button" onClick={register}>
                Register
              </Button>
            </div>
          </div>

          <Dialog
            maxWidth={false}
            open={this.state.trying}
            onClose={this.handleClose}
          >
            <DialogTitle>Try Me</DialogTitle>
            <MUIDialogContent dividers={false}>
              <Page cover={tryCover} />
            </MUIDialogContent>
            <DialogActions>
              <Button
                variant="outlined"
                onClick={this.handleClose}
                color="default"
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>

          {/* Snackbars for notifications */}
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
