import React from "react";
import Button from "@material-ui/core/Button";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { logout } from "./../../actions/user";

import "./../../App.css";
import "./styles.css";

/* The Header Component */
class Header extends React.Component {
    logoutUser = () => {
        this.props.history.push("/");
        logout();
    };

    render() {
        return (
            <div className="header">
              <Tabs
                variant="fullWidth"
                textColor="#0000FF"
                aria-label="icon label tabs example"
                indicatorColor="#00FF00"
              >
                <Tab label="test1" />
                <Tab label="test2" />
                <Tab label="test3" />
              </Tabs>
            </div>
        );
    }
}

export default Header;
