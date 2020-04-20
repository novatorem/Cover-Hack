// getState is used to get the value of a state path
// setState is used to set the value of a state path
import { getState, setState } from "statezero";
import { setEmptyState } from "./helpers";

export const readCookie = () => {
  const url = "/users/check-session";

  fetch(url)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then(json => {
      if (json && json.currentUser) {
        setState("currentUser", json.currentUser);
      }
    })
    .catch(error => {
      console.log(error);
    });
};

export const updateLoginForm = field => {
  const { name, value } = field;
  setState(`loginForm.${name}`, value);
};

export const login = () => {
  // Create our request constructor with all the parameters we need
  const request = new Request("/users/login", {
    method: "post",
    body: JSON.stringify(getState("loginForm")),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    }
  });
  // Send the request with fetch()
  fetch(request)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        alert("Invalid username/password combination");
        setState("failedLogin", true);
      }
    })
    .then(json => {
      if (json.currentUser !== undefined) {
        setState("currentUser", json.currentUser);
      } 
    })
    .catch(error => {
      console.log(error);
    });
};

export const register = event => {
  // Create our request constructor with all the parameters we need
  const request = new Request("/users/register", {
    method: "post",
    body: JSON.stringify(getState("loginForm")),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    }
  });

  // Send the request with fetch()
  fetch(request)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
    })
    .then(json => {
      if (json !== undefined) {
        alert("Registered as " + getState("loginForm").username);
        login();
      } else if (getState("loginForm").password.length < 6) {
        alert("Password requires a minimum of 6 characters");
      } else {
        alert(
          "Registration failed, username " +
            getState("loginForm").username +
            " taken"
        );
      }
    })
    .catch(error => {
      console.log(error);
    });
};

export const logout = () => {
  const url = "/users/logout";

  fetch(url)
    .then(res => {
      setEmptyState();
    })
    .catch(error => {
      console.log(error);
    });
};
