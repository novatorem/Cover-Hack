import React from "react";
import Particles from "react-particles-js";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

// Importing actions/required methods
import { updateLoginForm, login, register } from "../../actions/user";

import "./../../App.css";
import "./styles.css";

class Login extends React.Component {

  render() {
    return (
      <div className="login__bg-image center">
        <Particles />
        <div className="login__card center">
          <h2
            id="login__h2">
            Cover Hack
          </h2>

          <TextField
            name="username"
            label="Username"
            className="login__input app__input app__horizontal-center"
            margin="normal"
            color="green"
            InputProps={{
              style: {
                color: "#FFFFFFDE"
              }
            }}
            onChange={e => updateLoginForm(e.target)}
          />

          <TextField
            name="password"
            label="Password"
            type="password"
            className="login__input app__input app__horizontal-center password"
            margin="normal"
            InputProps={{
              style: {
                color: "#FFFFFFDE"
              }
            }}
            onChange={e => updateLoginForm(e.target)}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                login()
              }
            } }
          />
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
    );
  }
}

export default Login;
