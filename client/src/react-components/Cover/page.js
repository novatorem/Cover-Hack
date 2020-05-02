import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import Parse from "../Parse";
import { setState } from "statezero";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height: "100%"
  },
  grid: {
    height: "100%"
  },
  paper: {
    padding: theme.spacing(3),
    color: theme.palette.text.secondary,
    height: "95%"
  }
}));

export default function Page(props) {
  let cover = props.cover;
  const classes = useStyles();
  const [data, setData] = React.useState(cover.data);

  React.useEffect(() => {
    setData(cover.data);
  }, [cover.data]);

  const handleChange = event => {
    setData(event.target.value);
    setTimeout(function() {
      setState("cover", { id: cover._id, data: data });
    }, 1500);
  };

  return (
    <div className={classes.root}>
      <Grid container alignItems="stretch" spacing={2}>
        <Grid item xs>
          <Typography variant="subtitle1" noWrap>
            Hack
          </Typography>
          <Paper className={classes.paper}>
            <TextField
              id="standard-multiline-flexible"
              multiline="true"
              fullWidth="true"
              rows={33}
              rowsMax={33}
              InputProps={{ disableUnderline: true }}
              value={data}
              onChange={handleChange}
            />
          </Paper>
        </Grid>
        <Grid item xs>
          <Typography variant="subtitle1" noWrap>
            True
          </Typography>
          <Paper className={classes.paper}>
            <Parse data={data} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
