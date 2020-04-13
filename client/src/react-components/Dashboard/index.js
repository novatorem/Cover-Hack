/*  Full Dashboard component */
import React from "react";

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
            <div className="App">
                {/* Header component with text props. */}
                <Header
                    title="Dashboard"
                    subtitle="You are logged in."
                    history={history}
                />

                {/* The Student Form */}
                <StudentForm />

                {/* The Student List */}
                <StudentList />
            </div>
        );
    }
}

export default Dashboard;
