import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import Parse from "../Parse";
import { setState } from "statezero";
import dimensions from "../Shared/dimensions";

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
    paddingRight: "12px"
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

const MUIPaper = withStyles({
  // root: {
  //   position: "relative",
  //   overflow: "auto"
  // }
})(Paper);

export default function Page(props) {
  const cover = props.cover;
  const classes = useStyles();
  const [data, setData] = React.useState(cover.data);

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

  return (
    <div className={classes.root}>
      <MUIGrid container alignItems="stretch" spacing={2} direction={direction}>
        <MUIGrid item xs>
          <Paper className={classes.paper}>
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
        <MUIGrid item xs>
          <MUIPaper className={classes.paper}>
            <MUIHeader variant="h6" noWrap>
              True
            </MUIHeader>
            <Divider />
            <Parse data={data} />
          </MUIPaper>
        </MUIGrid>
      </MUIGrid>
    </div>
  );
}
