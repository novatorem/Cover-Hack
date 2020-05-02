import { setState } from "statezero";

// Initialize all state paths used by your app as empty.
// These are the states that you can filter using filterState()
// as needed by specific components. All component classes that read
// from these state paths must extend BaseReactComponent class.
//
// - currentUser state path is used by the root App component
// - studentForm and message state paths are used by the StudentForm component
// - studentList state path is used by the StudentList component
export const setEmptyState = () => {
  setState("currentUser", null);
  setState("loginForm", { username: "", password: "" });
  setState("userID", null);
  
  // Snackbar login resources
  setState("loginFailed", false);
  setState("registered", false);
  setState("passwordShort", false);
  setState("invalidUsername", false);
  
  // Snackbar Cover resources
  setState("coverTitle", null);
  setState("coverShort", false);
  setState("coverSuccess", false);
  
  // Cover Resources
  setState("userCovers", null);
  setState("cover", null);
};
