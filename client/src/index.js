import React from "react";
import ReactDOM from "react-dom";
import { startLogging } from "statezero";

import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { setEmptyState } from "./actions/helpers";

import "./index.css";

// Initially set all state paths needed in your app as empty.
setEmptyState();

// startLogging from statezero logs updated state paths to the console
// as your app sets/unsets state path values (very useful for debugging)
startLogging();

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
