// getState is used to get the value of a state path
// setState is used to set the value of a state path
import { getState, setState } from "statezero";

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
      owner: getState("userID"),
      title: title,
      data: ""
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
        getUserCovers();
        return res.json();
      }
    })
    .catch(error => {
      console.log(error);
    });
};

export const getUserCovers = () => {
  // the URL for the request
  const url = "/covers/" + getState("userID");

  // Since this is a GET request, simply call fetch on the URL
  fetch(url)
    .then(res => {
      if (res.status === 200) {
        // return a promise that resolves with the JSON body
        return res.json();
      } else {
        alert("Could not get anything");
      }
    })
    .then(json => {
      // the resolved promise with the JSON body
      setState("userCovers", json);
    })
    .catch(error => {
      console.log(error);
    });
};

export const saveUserCover = async () => {
  // Wait 3 seconds to make sure the state is updated
  await new Promise(resolve => setTimeout(resolve, 500));
  const cover = getState("cover");
  
  // Oddly, it's _id for some, id for others
  let url;
  if (cover._id !== undefined) {
    url = "/covers/" + cover._id;
  } else {
    url = "/covers/" + cover.id;
  }

  const request = new Request(url, {
    method: "PATCH",
    body: JSON.stringify({
      data: cover.data
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
        setState("saveSuccess", true);
        setTimeout(function() {
          setState("saveSuccess", false);
        }, 3250);
        return res.json();
      } else {
        console.log(res);
      }
    })
    .catch(error => {
      console.log(error);
    });
};
