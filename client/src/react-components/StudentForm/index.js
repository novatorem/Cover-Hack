import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

import BaseReactComponent from "./../BaseReactComponent";
import Input from "./../Input";

// Importing actions/required methods
import { updateStudentForm, addStudent } from "../../actions/student";

import "./styles.css";

/* Component for the Student Form */
class StudentForm extends BaseReactComponent {
    // Access the global state paths required by your component
    // using filterState. filterState puts these state paths on
    // this.state
    filterState({ studentForm, message }) {
        return { studentForm, message };
    }

    render() {
        // the filtered states are now on this.state
        const { studentForm, message } = this.state;

        const { name, year } = studentForm;

        return (
            <React.Fragment>
                <Grid className="student-form" container spacing={4}>
                    {/* Inputs to add student */}
                    <Input
                        name="name"
                        value={name}
                        onChange={e => updateStudentForm(e.target)}
                        label="Student Name"
                    />

                    <Input
                        name="year"
                        value={year}
                        onChange={e => updateStudentForm(e.target)}
                        label="Year"
                    />

                    <Grid
                        className="student-form__button-grid"
                        item
                        xl={2}
                        lg={2}
                        md={12}
                        s={12}
                        xs={12}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={addStudent}
                            className="student-form__submit-button"
                        >
                            Add Student
                        </Button>
                    </Grid>
                </Grid>

                <p className={`student-form__message--${message.type}`}>
                    {message.body}
                </p>
            </React.Fragment>
        );
    }
}

export default StudentForm;
