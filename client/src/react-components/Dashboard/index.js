/*  Full Dashboard component */
import React from "react";

import "./styles.css";

// Importing components
//import Header from "./../Header";
import Cover from "./../Cover";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.props.history.push("/dashboard");
  }

  render() {

    return (
      <div className="App center">
        {/*<Header />*/}
        <Cover/>
      </div>
    );
  }
}

export default Dashboard;
