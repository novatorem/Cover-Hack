import React from "react";

import MainView from "./MainView";
import BaseReactComponent from "./react-components/BaseReactComponent";
import Login from "./react-components/Login";

import { readCookie } from "./actions/user";

import "./App.css";

class App extends BaseReactComponent {
    // Access the global state paths required by your component
    // using filterState. filterState puts these state paths on
    // this.state.
    // Note: all available global state paths are initialized in
    // setEmptyState() in actions/helpers.js
    filterState({ currentUser }) {
        return { currentUser };
    }

    constructor(props) {
        super(props);
        readCookie();
    }

    render() {
        const { currentUser } = this.state;

        return (
            <div className="app">{!currentUser ? <Login /> : <MainView />}</div>
        );
    }
}

export default App;
