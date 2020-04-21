/*  Full Dashboard component */
import React from "react";

import "./styles.css";

// Importing components
import Header from "./../Header";
import StudentList from "./../StudentList";
import StudentForm from "./../StudentForm";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.props.history.push("/dashboard");
  }

  render() {
    const { history } = this.props;

    return (
      <div className="App center">
        <Header />
      </div>
    );
  }
}

export default Dashboard;
