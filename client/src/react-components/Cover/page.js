import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import Parse from "../Parse";
import dimensions from "../Shared/dimensions";
import { setState } from "statezero";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: "100%"
  },
  paper: {
    padding: theme.spacing(3),
    color: theme.palette.text.secondary,
    height: "100%"
  }
}));

const MUIGrid = withStyles({
  root: {
    height: "100%",
    paddingLeft: "12px",
    paddingRight: "12px",
    position: "relative"
  }
})(Grid);

const MUITextField = withStyles({
  root: {
    marginTop: "15px",
    height: "calc(100% - 18px)",
    overflow: "scroll",
    scrollbarWidth: "none"
  }
})(TextField);

const MUIHeader = withStyles({
  root: {
    marginTop: "-15px",
    marginBottom: "2px"
  }
})(Typography);

const VisButton = withStyles({
  root: {
    position: "absolute",
    bottom: "11px",
    left: "23px",
    zIndex: "1"
  }
})(Button);

export default function Page(props) {
  const cover = props.cover;
  const classes = useStyles();
  const [data, setData] = React.useState(cover.data);
  const [visibility, setVisibility] = React.useState(true);
  const [visibilityIcon, setvisibilityIcon] = React.useState(
    <VisibilityIcon />
  );

  // Detect if mobile or laptop to orient grid
  let direction = "column";
  const { height, width } = dimensions();
  if (width >= height) {
    direction = "row";
  }

  React.useEffect(() => {
    setData(cover.data);
  }, [cover.data]);

  const handleChange = event => {
    setData(event.target.value);
    setState("cover", { id: cover._id, data: event.target.value });
  };

  const handleVisibility = () => {
    if (visibility === true) {
      setVisibility(false);
      setvisibilityIcon(<VisibilityOffIcon />);
    } else {
      setVisibility(true);
      setvisibilityIcon(<VisibilityIcon />);
    }
  };

  return (
    <div className={classes.root}>
      <MUIGrid container alignItems="stretch" spacing={2} direction={direction}>
        {visibility ? (
          <MUIGrid item xs>
            <Paper className={classes.paper} elevation={0}>
              <MUIHeader variant="h6" noWrap>
                Hack
              </MUIHeader>
              <Divider />
              <MUITextField
                id="standard-multiline-flexible"
                multiline="true"
                fullWidth="true"
                InputProps={{ disableUnderline: true }}
                value={data}
                onChange={handleChange}
                autoFocus="true"
              />
            </Paper>
          </MUIGrid>
        ) : (
          true
        )}
        <MUIGrid item xs>
          <Paper className={classes.paper} elevation={0}>
            <MUIHeader variant="h6" noWrap>
              True
            </MUIHeader>
            <Divider />
            <Parse data={data} />
          </Paper>
        </MUIGrid>

        <VisButton
          variant="contained"
          color="primary"
          onClick={handleVisibility}
        >
          {visibilityIcon}
        </VisButton>
      </MUIGrid>
    </div>
  );
}
