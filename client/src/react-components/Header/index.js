import React from "react";
import PropTypes from "prop-types";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import InfoIcon from "@material-ui/icons/Info";
import DescriptionIcon from "@material-ui/icons/Description";
import ExitToAppRoundedIcon from "@material-ui/icons/ExitToAppRounded";

import Info from "../Info";
import Cover from "../Cover";
import { logout } from "../../actions/user";

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
        backgroundColor: "#FFFFFF99"
      }
    },
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: "#212121"
      }
    },
    MuiTab: {
      root: {
        backgroundColor: "#00000000",
        color: "#FFFFFFCD",
        "&:hover": {
          backgroundColor: "#FFFFFF11",
          color: "#FFFFFF"
        }
      },
      selected: {
        backgroundColor: "#303030",
        color: "#FFFFFFCD",
        "&:hover": {
          backgroundColor: "#303030",
          color: "#FFFFFF"
        }
      }
    }
  }
});

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      render: "Cover",
      value: 1
    };
  }

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleClick(compName, e) {
    console.log(compName);
    this.setState({ render: compName });
  }

  _renderSubComp() {
    switch (this.state.render) {
      case "Info": {
        return <Info />;
      }
      case "Cover": {
        return <Cover />;
      }
    }
  }

  render() {
    const { value } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <AppBar position="static" color="primary">
          <Tabs value={value} onChange={this.handleChange} variant="fullWidth">
            <Tab
              aria-label="Info"
              icon={<InfoIcon />}
              onClick={this.handleClick.bind(this, "Info")}
            />
            <Tab
              aria-label="Cover"
              icon={<DescriptionIcon />}
              onClick={this.handleClick.bind(this, "Cover")}
            />
            <Tab aria-label="Exit" icon={<ExitToAppRoundedIcon />} />
          </Tabs>
        </AppBar>
        {value === 0}
        {value === 1}
        {value === 2 && logout()}

        {this._renderSubComp()}
      </MuiThemeProvider>
    );
  }
}

export default Header;
