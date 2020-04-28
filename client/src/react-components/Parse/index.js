import React, { useState } from "react";

import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch"
    }
  }
}));

const CTextField = (
  <TextField id="outlined-basic" variant="outlined" size="small" />
);

function getAll(sourceStr) {
  const temp = sourceStr.split("{_}");
  return [...temp]
    .map((e, i) => (i < temp.length - 1 ? [e, CTextField] : [e]))
    .reduce((a, b) => a.concat(b));
}

export default function Parse(props) {
  const classes = useStyles();
  const data = getAll(props.data);
  return (
    <div className={classes.root}>
      <ThemeProvider theme={darkTheme}>
        <Typography align="left" variant="subtitle2">
          {data}
        </Typography>
      </ThemeProvider>
    </div>
  );
}
