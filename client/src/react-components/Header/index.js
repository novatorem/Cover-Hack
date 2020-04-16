import React from "react";
import PropTypes from "prop-types";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const theme = createMuiTheme({
  overrides: {
    MuiTabs: {
      indicator: {
        backgroundColor: "#FFFFFF"
      }
    },
    MuiTab: {
      root: {
        "&:hover": {
          backgroundColor: "#FFFFFF11",
          color: "#0000FF"
        }
      },
      selected: {
        backgroundColor: "#00FF00",
        color: "#FF0000",
        "&:hover": {
          backgroundColor: "#FF0000",
          color: "#FF0000"
        }
      }
    }
  }
});

class Header extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <AppBar position="static">
            <Tabs value={value} onChange={this.handleChange} variant="fullWidth">
              <Tab label="Item One" />
              <Tab label="Item Two" />
              <Tab label="Item Three"/>
            </Tabs>
          </AppBar>
          {value === 0}
          {value === 1}
          {value === 2 && <TabContainer>Item Three</TabContainer>}
        </div>
      </MuiThemeProvider>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default Header;
