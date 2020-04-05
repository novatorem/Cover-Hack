// getState is used to get the value of a state path
// setState is used to set the value of a state path
import { getState, setState } from "statezero";

// A function to send a GET request to the web server,
//  and then loop through them and add a list element for each student.
export const getStudents = () => {
    // the URL for the request
    const url = "/students";

    // Since this is a GET request, simply call fetch on the URL
    fetch(url)
        .then(res => {
            if (res.status === 200) {
                // return a promise that resolves with the JSON body
                return res.json();
            } else {
                alert("Could not get students");
            }
        })
        .then(json => {
            // the resolved promise with the JSON body
            setState("studentList", json.students);
        })
        .catch(error => {
            console.log(error);
        });
};

export const updateStudentForm = field => {
    const { name, value } = field;
    setState(`studentForm.${name}`, value);
};

// A function to send a POST request with a new student.
export const addStudent = () => {
    // the URL for the request
    const url = "/students";

    // The data we are going to send in our request
    const student = getState("studentForm");

    // Create our request constructor with all the parameters we need
    const request = new Request(url, {
        method: "post",
        body: JSON.stringify(student),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(function(res) {
            // Handle response we get from the API.
            // Usually check the error codes to see what happened.
            if (res.status === 200) {
                // If student was added successfully, tell the user.
                setState("message", {
                    body: "Success: Added a student.",
                    type: "success"
                });
            } else {
                // If server couldn't add the student, tell the user.
                // Here we are adding a generic message, but you could be more specific in your app.
                setState("message", {
                    body: "Error: Could not add student.",
                    type: "error"
                });
            }
        })
        .catch(error => {
            console.log(error);
        });
};
