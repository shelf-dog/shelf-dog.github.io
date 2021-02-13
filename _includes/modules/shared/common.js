Common = () => {
  "use strict";

  /* <!-- MODULE: Provides an interface to provide common functionality --> */
  /* <!-- PARAMETERS: Receives the global app context --> */
  /* <!-- REQUIRES: Global Scope: JQuery, Underscore | App Scope: Display --> */

  /* <!-- Internal Constants --> */
  const FN = {},
        EMAIL_CHANGE = /([a-zA-Z0-9._-]+)"([a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/i;
  
  const REGEX_ISBN = /^(97(8|9))?\d{9}(\d|X)$/,
        REGEX_ID =  /\d+/,
        REGEX_EMAIL = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
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
  FN.delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  
  FN.capabilities = {
    
    touch : _touch,
  
  };
  
  FN.format = {
    
    book : (book, copy) => `${book.Title}${book.ISBN ? ` [${book.ISBN}]` : ""}${copy !== undefined && copy !== null && copy !== false ? ` [${copy}]` : ""}`,
    
    details : book => book ? `${book.Title}${book.Authors && book.Authors.length > 0 ? ` by ${_.isArray(book.Authors) ? book.Authors[0] : book.Authors}` : ""}` : "",

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
  
  FN.result = target => (value, details) => {
    var _result = value ? target.find(".material-icons.result-success") : target.find(".material-icons.result-failure"),
        _existing = target.find(".material-icons:visible");
    _existing.addClass("d-none");
    var _title;
    if (details) {
      _title = _result.attr("title") || "";
      _result.attr("title", details);
    }
    _result.removeClass("d-none");
    _.delay(() => {
      _result.addClass("d-none");
      _existing.removeClass("d-none");
      if (details) _result.attr("title", _title);
    }, 5000);
    return _result;
  };
  
  FN.check = {
    
    email : value => REGEX_EMAIL.test(value),
    
    id : value => REGEX_ID.test(value),
    
    isbn : value => REGEX_ISBN.test(value),
    
    user : value => REGEX_EMAIL.test(value),
  
  };
  /* <!-- Public Functions --> */

  /* <!-- Initial Calls --> */

  /* <!-- External Visibility --> */
  return FN;
  /* <!-- External Visibility --> */

};