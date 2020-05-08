import React from "react";

import MainView from "./MainView";
import Login from "./react-components/Login";
import HttpsRedirect from "react-https-redirect";
import BaseReactComponent from "./react-components/BaseReactComponent";

import { readCookie } from "./actions/user";

import "./App.css";

class App extends BaseReactComponent {
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
      <HttpsRedirect>
        <div className="app">{!currentUser ? <Login /> : <MainView />}</div>
      </HttpsRedirect>
    );
  }
}

export default App;
