Common = () => {
  "use strict";

  /* <!-- MODULE: Provides an interface to provide common functionality --> */
  /* <!-- PARAMETERS: Receives the global app context --> */
  /* <!-- REQUIRES: Global Scope: JQuery, Underscore | App Scope: Display --> */

  /* <!-- Internal Constants --> */
  const FN = {},
        EMAIL_CHANGE = /([a-zA-Z0-9._-]+)"([a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/i;
  /* <!-- Internal Constants --> */

  /* <!-- Internal Options --> */
  /* <!-- Internal Options --> */

  /* <!-- Internal Variables --> */
  var _touch = (() => {
    if ("ontouchstart" in window) {
      return true;
    } else if(window.navigator.msPointerEnabled) {
      if(navigator.msMaxTouchPoints) return true;
    }
  })();
  /* <!-- Internal Variables --> */

  /* <!-- Internal Functions --> */
  /* <!-- Internal Functions --> */
  
  /* <!-- Public Functions --> */
  FN.capabilities = {
    
    touch : _touch,
  
  };
  
  FN.format = {
    
    book : (book, copy) => `${book.Title}${book.ISBN ? ` [${book.ISBN}]` : ""}${copy !== undefined && copy !== null && copy !== false ? ` [${copy}]` : ""}`
    
  };
  
  FN.process = {
    
    user : user => {
      if (user && EMAIL_CHANGE.test(user)) {
        var _values = EMAIL_CHANGE.exec(user);
        return `${_values[1]}@${_values[2]}`;
      } else {
        return user;
      }
      
    },
    
  };
  /* <!-- Public Functions --> */

  /* <!-- Initial Calls --> */

  /* <!-- External Visibility --> */
  return FN;
  /* <!-- External Visibility --> */

};