import React from "react";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import "./styles.css";

class Student extends React.Component {
  render() {
    const { student } = this.props;
    const { name, year } = student;

    return (
      <TableRow className="student">
        <TableCell component="th" scope="row">
          {name}
        </TableCell>

        <TableCell component="th" scope="row">
          {year}
        </TableCell>
      </TableRow>
    );
  }
}

export default Student;
