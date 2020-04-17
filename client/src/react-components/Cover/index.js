import React from "react";
import { uid } from "react-uid";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";

import BaseReactComponent from "./../BaseReactComponent";
import Student from "./../Student";

// Importing actions/required methods
import { getStudents } from "../../actions/student";

import "./../../App.css";
import "./styles.css";

/* Component for the List of Students */
class Cover extends BaseReactComponent {
    // Access the global state paths required by your component
    // using filterState. filterState puts these state paths on
    // this.state
    filterState({ studentList }) {
        return { studentList };
    }

    render() {
        // the filtered states are now on this.state
        const { studentList } = this.state;

        return (
            <React.Fragment>
                <Button
                    onClick={getStudents}
                    className="student-list__button app__horizontal-center"
                    variant="contained"
                >
                    Set Students
                </Button>
                <Table className="student-list">
                    <TableBody>
                        {studentList.map(student => (
                            <Student
                                key={uid(
                                    student
                                )} /* unique id required to help React render more efficiently when we delete students. */
                                student={student}
                            />
                        ))}
                    </TableBody>
                </Table>
            </React.Fragment>
        );
    }
}

export default Cover;
