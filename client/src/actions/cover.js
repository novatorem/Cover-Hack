// getState is used to get the value of a state path
// setState is used to set the value of a state path
import { getState, setState } from "statezero";
import { setEmptyState } from "./helpers";

export const newCover = title => {
  const url = "/covers/new";
  // Create our request constructor with all the parameters we need
  const request = new Request(url, {
    method: "post",
    body: JSON.stringify({
      owner: getState("loginForm").username,
      title: title
    }),
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json"
    }
  });
  // Send the request with fetch()
  fetch(request)
    .then(res => {
      if (res.status === 200) {
        alert(1);
        return res.json();
      } else {
        alert(2);
      }
    })
    .then(json => {
      if (json.currentUser !== undefined) {
        alert(3);
      }
    })
    .catch(error => {
      alert(4);
      console.log(error);
    });
};
