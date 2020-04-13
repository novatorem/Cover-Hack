import React from "react";
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
                <div className="login__card center">
                    <h2>Cover Hack</h2>

                    <TextField
                        name="email"
                        label="Email"
                        className="login__input app__input app__horizontal-center"
                        margin="normal"
                        onChange={e => updateLoginForm(e.target)}
                    />

                    <TextField
                        name="password"
                        label="Password"
                        type="password"
                        className="login__input app__input app__horizontal-center"
                        margin="normal"
                        onChange={e => updateLoginForm(e.target)}
                    />

                    <Button
                        className="login__button app__horizontal-center"
                        onClick={login}
                    >
                        Log In
                    </Button>
                    <Button
                        className="login__button app__horizontal-center"
                        onClick={register}
                    >
                        Register
                    </Button>
                </div>
            </div>
        );
    }
}

export default Login;
