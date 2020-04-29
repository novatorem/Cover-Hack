import React, { useState } from "react";

import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
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

let inputArr = [];
let inputCount = -1;

const CTextField = (
  <TextField
    id="outlined-basic"
    variant="outlined"
    size="small"
    onChange={e => {
      //inputArr[inputCount] = e.target.value
      console.log(e.target.value);
    }}
  />
);

const CSelect = function(match) {
  inputArr.push("noValue");
  inputCount++;
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
          inputArr[inputCount] = e.target.value;
          console.log(inputArr);
          console.log(inputCount);
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
  let select = element.split(listRegx);

  let match;
  let indx = 1;

  while ((match = listRegx.exec(element)) !== null) {
    select.splice(indx, 0, CSelect(match[0]));
    indx += 2;
  }

  select = select.filter(item => item);
  return select;
};

function getAll(sourceStr) {
  inputArr = [];
  inputCount = -1;

  // Convert `{_}` to TextField
  const input = sourceStr.split("{_}");
  const inputDone = [...input]
    .map((e, i) => (i < input.length - 1 ? [e, CTextField] : [e]))
    .reduce((a, b) => a.concat(b));

  // Convert `{.../...}` to Select
  let selectDone = inputDone.map(createSelectors);

  return selectDone;
}

export default function Parse(props) {
  const classes = useStyles();
  const data = getAll(props.data).flat();
  const [rawData, setRawData] = useState([]);

  const showRaw = () => {
    let inRaw = 0;
    let rawList = [];
    data.forEach(dataPoint => {
      if (typeof dataPoint === "string") {
        rawList.push(dataPoint);
      } else {
        rawList.push(inputArr[inRaw]);
        inRaw++;
      }
    });
    console.log(inputArr);
    setRawData(rawList);
    console.log(rawData);
  };

  return (
    <div className={classes.root}>
      <ThemeProvider theme={darkTheme}>
        <Typography align="left" variant="subtitle2">
          {data}
        </Typography>
        <Button variant="contained" color="primary" onClick={showRaw}>
          Print Raw to Log
        </Button>
      </ThemeProvider>
    </div>
  );
}
