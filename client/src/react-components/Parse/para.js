import React from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import { blue } from "@material-ui/core/colors";
import ListItem from "@material-ui/core/ListItem";
import SubjectIcon from "@material-ui/icons/Subject";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ClearAllIcon from "@material-ui/icons/ClearAll";
import DialogTitle from "@material-ui/core/DialogTitle";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import "./styles.css";
const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  }
});

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = value => {
    onClose(value);
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle id="simple-dialog-title">Add a Paragraph</DialogTitle>
      <List>
        {props.paragraphs.map(
          paragraph => (
            (paragraph = paragraph[0].substring(1, paragraph[0].length - 1)),
            (
              <ListItem
                button
                onClick={() => handleListItemClick(paragraph.split("|")[1])}
                key={paragraph.split("|")[1]}
              >
                <ListItemAvatar>
                  <Avatar className={classes.avatar}>
                    <SubjectIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={paragraph.split("|")[0]} />
              </ListItem>
            )
          )
        )}

        <ListItem autoFocus button onClick={() => handleListItemClick("")}>
          <ListItemAvatar>
            <Avatar>
              <ClearAllIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Clear" />
        </ListItem>
      </List>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired
};

export default function Para(props) {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = value => {
    props.paraArr[props.closureCount] = value;
    setOpen(false);
    setSelectedValue(value);
    props.store = value;
  };

  return (
    <div>
      <Typography align="left">{selectedValue}</Typography>
      <br />
      <Grid container justify="center">
        <Button
          color="default"
          variant="outlined"
          aria-label="paragraph"
          onClick={handleClickOpen}
        >
          <SubjectIcon />
        </Button>
      </Grid>

      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        paragraphs={props.paragraphs}
      />
    </div>
  );
}
