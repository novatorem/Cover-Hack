/* The Authenticated View (after logging in) */

import React from "react";
// Importing react-router-dom to use the React Router
import { Route, Switch, BrowserRouter } from "react-router-dom";

import Dashboard from "./react-components/Dashboard";

class MainView extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route
                        exact
                        path={["/", "/dashboard"]}
                        render={({ history }) => (
                            <Dashboard history={history} />
                        )}
                    />
                    <Route render={() => <div>404 Not found</div>} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default MainView;
