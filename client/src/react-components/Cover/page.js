import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

import { getState } from "statezero";
import { getUserCovers } from "../../actions/cover";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#303030",
    display: "flex",
    marginLeft: "-25px",
    height: "100%"
  },
  tabs: {
    borderRight: "1px solid #FFFFFF22"
  }
}));

export default function VerticalTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  let counter = -1;
  let secondCounter = -1;
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Tabs
        orientation="vertical"
        value={value}
        onChange={handleChange}
        aria-label="Cover letters"
        className={classes.tabs}
      >
        {props.userCovers
          ? props.userCovers.map(userCover => {
              counter++;
              return <Tab label={userCover.title} {...a11yProps(counter)} />;
            })
          : null}
      </Tabs>
      {props.userCovers
        ? props.userCovers.map(userCover => {
            secondCounter++;
            return (
              <TabPanel value={value} index={secondCounter}>
                {/* <TabContainer data=userCover.data/> */}
                {/*userCover.data*/}
                {secondCounter}
              </TabPanel>
            );
          })
        : null}
    </div>
  );
}
