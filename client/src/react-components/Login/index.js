import React from "react";
import Particles from "react-particles-js";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Password from "./password"

// Importing actions/required methods
import { updateLoginForm, login, register } from "../../actions/user";

import "./../../App.css";
import "./styles.css";

const theme = createMuiTheme({
  overrides: {
    MuiInput: {
      underline: {
        "&:before": {
          borderBottom: "1px solid #FFFFFF44"
        },
        "&:hover": {
          borderBottom: "1px solid #FFFFFF88"
        },
        "&:hover:not($disabled):after": {
          borderBottom: "1px solid #FFFFFF"
        },
        "&:hover:not($disabled):before": {
          borderBottom: "1px solid #FFFFFF88"
        }
      }
    }
  }
});

class Login extends React.Component {

  render() {
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
            />
            
            <Password />

            <div className="login__center">
              <Button className="login__button" onClick={login}>
                Log In
              </Button>
              <Button className="login__button" onClick={register}>
                Register
              </Button>
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Login;