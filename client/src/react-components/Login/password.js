import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Particles from "react-particles-js";
import Button from "@material-ui/core/Button";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Password from "./password";

import getState from "statezero";

// Importing actions/required methods
import { updateLoginForm, login, register } from "../../actions/user";

import "./../../App.css";
import "./styles.css";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center"
  },
  margin: {
    margin: theme.spacing(1)
  },
  withoutLabel: {
    marginTop: theme.spacing(3)
  },
  textField: {
    width: "250px"
  }
}));

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
          borderBottom: "1px solid #FFFFFFAA"
        },
        "&:after": {
          borderBottom: "1px solid #FFFFFF44"
        }
      }
    },
    MuiInputLabel: {
      root: {
        color: "#FFFFFFDC",
        "&$focused": {
          color: "#FFFFFF"
        }
      }
    },
    MuiIconButton: {
      root: {
        color: "#FFFFFFDC"
      }
    },
    MuiInputBase: {
      root: {
        color: "#FFFFFFDC"
      }
    }
  }
});

export default function InputAdornments() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false
  });

  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value });
    updateLoginForm(event.target);
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = event => {
    event.preventDefault();
  };

  return (
    <MuiThemeProvider theme={theme}>
      <div className={classes.root}>
        <FormControl
          fullWidth
          className={clsx(classes.margin, classes.textField)}
        >
          <InputLabel htmlFor="standard-adornment-password">
            Password
          </InputLabel>
          <Input
            id="standard-adornment-password"
            type={values.showPassword ? "text" : "password"}
            value={values.password}
            name="password"
            className="password"
            margin="normal"
            fullWidth="true"
            required="true"
            onChange={handleChange("password")}
            onKeyDown={e => {
              if (e.keyCode === 13) {
                login();
              }
            }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {values.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </div>
    </MuiThemeProvider>
  );
}
