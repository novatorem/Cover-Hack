import React, { useState } from "react";

import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import FormControl from "@material-ui/core/FormControl";

import {
  createMuiTheme,
  ThemeProvider,
  withStyles
} from "@material-ui/core/styles";

import "./styles.css";

const darkTheme = createMuiTheme({
  palette: {
    type: "dark"
  }
});

const MUITextField = withStyles({
  root: {}
})(TextField);

const MUIFormControl = withStyles({
  root: {
    marginTop: "-2px",
    marginBottom: "2px"
  }
})(FormControl);

const MUIButton = withStyles(theme => ({
  root: {
    position: "absolute",
    bottom: "1%",
    right: "1%"
  }
}))(Button);

const MUITypography = withStyles({
  root: {
    overflow: "auto",
    marginTop: "15px"
  }
})(Typography);

let inputArr = [];
let inputCount = -1;
let selectArr = [];
let selectCount = -1;

const CTextField = function() {
  return (function() {
    inputCount++;
    inputArr.push("");
    let closureCount = inputCount;
    return (
      <MUITextField
        id="outlined-basic"
        size="small"
        onChange={e => {
          inputArr[closureCount] = e.target.value;
        }}
      />
    );
  })();
};

const CSelect = function(match) {
  return (function() {
    selectCount++;
    selectArr.push("");
    let closureCount = selectCount;

    match = match.substring(1, match.length - 1);
    const matches = match.split("/");
    let menus = [];

    matches.forEach(single => {
      menus.push(<MenuItem value={single}>{single}</MenuItem>);
    });

    return (
      <MUIFormControl>
        <Select
          onChange={e => {
            selectArr[closureCount] = e.target.value;
          }}
        >
          {menus}
        </Select>
      </MUIFormControl>
    );
  })();
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
  if (sourceStr.length < 1) {
    return [];
  }

  inputCount = -1;
  selectCount = -1;

  // Convert `{_}` to TextField
  const input = sourceStr.split("{_}");
  const inputDone = [...input]
    .map((e, i) => (i < input.length - 1 ? [e, CTextField()] : [e]))
    .reduce((a, b) => a.concat(b));

  // Convert `{.../...}` to Select
  let selectDone = inputDone.map(createSelectors);

  return selectDone;
}

export default function Parse(props) {
  const data = getAll(props.data).flat();
  //const [rawData, setRawData] = useState([]);

  const showRaw = () => {
    let inRaw = 0;
    let slRaw = 0;
    let rawList = [];

    inputArr = inputArr.filter(item => item);
    selectArr = selectArr.filter(item => item);

    data.forEach(dataPoint => {
      if (typeof dataPoint === "string") {
        rawList.push(dataPoint);
      } else if (dataPoint.props.id !== undefined) {
        rawList.push(inputArr[inRaw]);
        inRaw++;
      } else {
        rawList.push(selectArr[slRaw]);
        slRaw++;
      }
    });

    //setRawData(rawList);
    console.log(rawList.join(""));
    navigator.clipboard.writeText(rawList.join(""));
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <MUITypography align="left">{data}</MUITypography>
      <MUIButton
        variant="outlined"
        color="default"
        onClick={showRaw}
        startIcon={<FileCopyIcon />}
      >
        Copy to clipboard
      </MUIButton>
    </ThemeProvider>
  );
}
