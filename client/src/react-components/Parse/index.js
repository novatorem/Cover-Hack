import React, { useState } from "react";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
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
  <TextField
    id="outlined-basic"
    variant="outlined"
    size="small"
    onChange={e => {
      console.log(e.target.value)
    }}
  />
);

const CSelect = function(match) {
  match = match.substring(1, match.length - 1);
  const matches = match.split("/");
  let menus = [];
  matches.forEach(single => {
    menus.push(<MenuItem value={single}>{single}</MenuItem>);
  });
  return (
    <FormControl>
      <Select
        onChange={e => {
          console.log(e.target.value);
        }}
      >
        {menus}
      </Select>
    </FormControl>
  );
};

const createSelectors = function(element, index, array) {
  if (typeof element === "object") {
    return element;
  }
  const listRegx = /{[\w\s-.,;:`"'()]*\/.*?}/g;
  const select = element.split(listRegx);
  let indx = 1;
  let match;
  while ((match = listRegx.exec(element)) !== null) {
    select.splice(indx, 0, CSelect(match[0]));
    indx += 2;
  }

  return select;
};

function getAll(sourceStr) {
  // Convert `{_}` to TextField
  const input = sourceStr.split("{_}");
  const inputDone = [...input]
    .map((e, i) => (i < input.length - 1 ? [e, CTextField] : [e]))
    .reduce((a, b) => a.concat(b));

  // Convert `{.../...}` to Select
  let selectDone = inputDone.map(createSelectors);

  return selectDone;
}

function formatData(sourceArray) {
  sourceArray.forEach(source => {
    if (typeof source[0] !== "string") {
      console.log(source);
      console.log(Object.values(source));
    }
  });
}

export default function Parse(props) {
  const classes = useStyles();
  const data = getAll(props.data);
  formatData(data);

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
