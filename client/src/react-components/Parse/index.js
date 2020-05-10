import React from "react";

import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import FormControl from "@material-ui/core/FormControl";

import Para from "./para";

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
  root: {
    marginTop: "-1px",
    marginBottom: "1px"
  }
})(TextField);

const MUIFormControl = withStyles({
  root: {
    marginTop: "-3px",
    marginBottom: "3px"
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
let paraArr = [];
let paraCount = -1;

let paragraphData = [];

const CTextField = function() {
  return (function() {
    inputCount++;
    inputArr.push("");
    let closureCount = inputCount;
    return (
      <MUITextField
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

const CParagraph = function() {
  return (function() {
    paraCount++;
    paraArr.push("");
    let closureCount = paraCount;
    return <Para paragraphs={paragraphData} store={paraArr[closureCount]} />;
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

const filterParagraphs = function(element, index, array) {
  if (typeof element[0] !== "string") {
    return element;
  }
  paragraphData = [];
  const listRegx = /{\w*\d*\s*:.*?}/g;
  let select = element.split(listRegx);

  let match;

  while ((match = listRegx.exec(element)) !== null) {
    paragraphData.push(match);
  }

  select = select.filter(item => item);

  return select;
};

const createParagraphs = function(element, index, array) {
  if (typeof element[0] !== "string") {
    return element;
  }

  const listRegx = /{\*}/g;
  let paragraph = element.split(listRegx);

  let indx = 1;

  while (listRegx.exec(element) !== null) {
    paragraph.splice(indx, 0, CParagraph());
    indx += 2;
  }

  paragraph = paragraph.filter(item => item);
  return paragraph;
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

  // Convert `{.../.../...}` to Select
  let selectDone = inputDone.map(createSelectors).flat();

  // Create the paragraphs from `{...:... ....}`
  let paraFilter = selectDone.map(filterParagraphs).flat();

  // Convert `{*}` to Paragraph
  let paraDone = paraFilter.map(createParagraphs).flat();

  return paraDone;
}

export default function Parse(props) {
  const data = getAll(props.data);

  const showRaw = () => {
    let inRaw = 0;
    let slRaw = 0;
    let rawList = [];

    //Trailing whitespaces issue, ignore or remove?
    //while (inputArr.pop() === "");
    //while (selectArr.pop() === "");
    
    data.forEach(dataPoint => {
      if (typeof dataPoint === "string") {
        rawList.push(dataPoint);
      } else if (dataPoint.props.size === "small") {
        rawList.push(inputArr[inRaw]);
        inRaw++;
      } else if (dataPoint.props.store !== undefined) {
        rawList.push(dataPoint.props.store[0]);
        console.log(dataPoint.props.store)
      } else {
        rawList.push(selectArr[slRaw]);
        slRaw++;
      }
    });

    console.log(rawList.join(""));
    navigator.clipboard.writeText(rawList.join(""));
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <MUITypography align="left" style={{ whiteSpace: "pre-line" }}>
        {data}
      </MUITypography>
      <MUIButton
        color="primary"
        onClick={showRaw}
        variant="contained"
        startIcon={<FileCopyIcon />}
      >
        Copy to clipboard
      </MUIButton>
    </ThemeProvider>
  );
}
