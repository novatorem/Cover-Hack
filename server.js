/* server.js nov 20 */
"use strict";
const log = console.log;

const express = require("express");
// starting the express server
const app = express();

// mongoose and mongo connection
const { mongoose } = require("./db/mongoose");

// import the mongoose models
const { Student } = require("./models/student");
const { User } = require("./models/user");

// to validate object IDs
const { ObjectID } = require("mongodb");

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// express-session for managing user sessions
const session = require("express-session");
app.use(bodyParser.urlencoded({ extended: true }));

/*** Session handling **************************************/
// Create a session cookie
app.use(
    session({
        secret: "oursecret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 60000,
            httpOnly: true
        }
    })
);

// A route to login and create a session
app.post("/users/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    log(email, password);
    // Use the static method on the User model to find a user
    // by their email and password
    User.findByEmailPassword(email, password)
        .then(user => {
            // Add the user's id to the session cookie.
            // We can check later if this exists to ensure we are logged in.
            req.session.user = user._id;
            req.session.email = user.email;
            res.send({ currentUser: user.email });
        })
        .catch(error => {
            res.status(400).send()
        });
});

// A route to logout a user
app.get("/users/logout", (req, res) => {
    // Remove the session
    req.session.destroy(error => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send()
        }
    });
});

// A route to check if a use is logged in on the session cookie
app.get("/users/check-session", (req, res) => {
    if (req.session.user) {
        res.send({ currentUser: req.session.email });
    } else {
        res.status(401).send();
    }
});

/*********************************************************/

/*** API Routes below ************************************/

/** Student resource routes **/
// a POST route to *create* a student
app.post("/students", (req, res) => {
    // log(req.body)

    // Create a new student using the Student mongoose model
    const student = new Student({
        name: req.body.name,
        year: req.body.year
    });

    // Save student to the database
    student.save().then(
        result => {
            res.send(result);
        },
        error => {
            res.status(400).send(error); // 400 for bad request
        }
    );
});

// a GET route to get all students
app.get("/students", (req, res) => {
    Student.find().then(
        students => {
            log();
            res.send({ students }); // can wrap in object if want to add more properties
        },
        error => {
            res.status(500).send(error); // server error
        }
    );
});

/// a GET route to get a student by their id.
// id is treated as a wildcard parameter, which is why there is a colon : beside it.
// (in this case, the database id, but you can make your own id system for your project)
app.get("/students/:id", (req, res) => {
    /// req.params has the wildcard parameters in the url, in this case, id.
    // log(req.params.id)
    const id = req.params.id;

    // Good practise: Validate id immediately.
    if (!ObjectID.isValid(id)) {
        res.status(404).send(); // if invalid id, definitely can't find resource, 404.
    }

    // Otherwise, findById
    Student.findById(id)
        .then(student => {
            if (!student) {
                res.status(404).send(); // could not find this student
            } else {
                /// sometimes we wrap returned object in another object:
                //res.send({student})
                res.send(student);
            }
        })
        .catch(error => {
            res.status(500).send(); // server error
        });
});

/// a DELETE route to remove a student by their id.
app.delete("/students/:id", (req, res) => {
    const id = req.params.id;

    // Validate id
    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    }

    // Delete a student by their id
    Student.findByIdAndRemove(id)
        .then(student => {
            if (!student) {
                res.status(404).send();
            } else {
                res.send(student);
            }
        })
        .catch(error => {
            res.status(500).send(); // server error, could not delete.
        });
});

// a PATCH route for changing properties of a resource.
// (alternatively, a PUT is used more often for replacing entire resources).
app.patch("/students/:id", (req, res) => {
    const id = req.params.id;

    // get the updated name and year only from the request body.
    const { name, year } = req.body;
    const body = { name, year };

    if (!ObjectID.isValid(id)) {
        res.status(404).send();
    }

    // Update the student by their id.
    Student.findByIdAndUpdate(id, { $set: body }, { new: true })
        .then(student => {
            if (!student) {
                res.status(404).send();
            } else {
                res.send(student);
            }
        })
        .catch(error => {
            res.status(400).send(); // bad request for changing the student.
        });
});

/** User routes below **/
// Set up a POST route to *create* a user of your web app (*not* a student).
app.post("/users", (req, res) => {
    log(req.body);

    // Create a new user
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });

    // Save the user
    user.save().then(
        user => {
            res.send(user);
        },
        error => {
            res.status(400).send(error); // 400 for bad request
        }
    );
});

/*** Webpage routes below **********************************/
// Serve the build
app.use(express.static(__dirname + "/client/build"));

// All routes other than above will go to index.html
app.get("*", (req, res) => {
    res.sendFile(__dirname + "/client/build/index.html");
});

/*************************************************/
// Express server listening...
const port = process.env.PORT || 3001;
app.listen(port, () => {
    log(`Listening on port ${port}...`);
});
