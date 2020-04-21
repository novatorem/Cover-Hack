// getState is used to get the value of a state path
// setState is used to set the value of a state path
import { getState, setState } from "statezero";
import { setEmptyState } from "./helpers";

export const newCover = title => {
  const url = "/covers/new";

  //Early error detection
  if ((title.length > 12) ^ (title.length < 1)) {
    setState("coverShort", true);
    setTimeout(function() {
      setState("coverShort", false);
    }, 3250);
    return;
  }

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
        setState("coverSuccess", true);
        setTimeout(function() {
          setState("coverSuccess", false);
        }, 3250);
        return res.json();
      }
    })
    .catch(error => {
      console.log(error);
    });
};
