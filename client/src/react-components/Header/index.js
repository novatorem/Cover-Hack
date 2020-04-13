import React from "react";
import Button from "@material-ui/core/Button";

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
        const { title, subtitle } = this.props;

        return (
            <div className="header">
                <h1>{title}</h1>
                <h3>{subtitle}</h3>
                <Button
                    onClick={this.logoutUser}
                    className="app__horizontal-center"
                    variant="contained"
                >
                    Logout
                </Button>
            </div>
        );
    }
}

export default Header;
