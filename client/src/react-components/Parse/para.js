import React from "react";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import AddIcon from "@material-ui/icons/Add";
import Avatar from "@material-ui/core/Avatar";
import Dialog from "@material-ui/core/Dialog";
import { blue } from "@material-ui/core/colors";
import ListItem from "@material-ui/core/ListItem";
import SubjectIcon from "@material-ui/icons/Subject";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DialogTitle from "@material-ui/core/DialogTitle";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";

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
      <DialogTitle id="simple-dialog-title">Choose a Paragraph</DialogTitle>
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

        <ListItem
          autoFocus
          button
          onClick={() => handleListItemClick("newParagraph")}
        >
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="New paragraph" />
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
    props.paraArr[props.closureCount] = value
    setOpen(false);
    setSelectedValue(value);
    props.store = value;
  };

  return (
    <div>
      <Typography align="left">{selectedValue}</Typography>
      <br />
      <IconButton
        color="default"
        aria-label="paragraph"
        component="span"
        onClick={handleClickOpen}
      >
        <SubjectIcon />
      </IconButton>
      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
        paragraphs={props.paragraphs}
      />
    </div>
  );
}
