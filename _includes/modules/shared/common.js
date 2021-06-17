Common = (options, factory) => {
  "use strict";

  /* <!-- MODULE: Provides an interface to provide common functionality --> */
  /* <!-- PARAMETERS: Receives the global app context --> */
  /* <!-- REQUIRES: Global Scope: JQuery, Underscore | App Scope: Display --> */

  /* <!-- Internal Constants --> */
  const FN = {},
        EMAIL_CHANGE = /([a-zA-Z0-9._-]+)"([a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/i;
  
  const REGEX_ISBN = /^(97(8|9))?\d{9}(\d|X)$/,
        REGEX_ID =  /^\d+$/,
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
    
    authors : authors => ` by ${_.isArray(authors) ? authors[0] : authors}`,
    
    book : (book, copy) => `${book.Title}${book.ISBN ? ` [${book.ISBN}]` : ""}${copy !== undefined && copy !== null && copy !== false ? ` [${copy}]` : ""}`,
    
    details : book => book ? `${book.Title}${book.Authors && book.Authors.length > 0 ? FN.format.authors(book.Authors) : ""}` : "",

  };
  
  FN.process = {
    
    book : book => book && book.values.length >= 0 ? _.object(book.columns, book.values[0]) : book,
    
    books :books => books && books.values.length >= 0 ? _.map(books.values, row => _.object(books.columns, row)) : books,
    
    user : user => {
      if (user && EMAIL_CHANGE.test(user)) {
        var _values = EMAIL_CHANGE.exec(user);
        return `${_values[1]}@${_values[2]}`;
      } else {
        return user;
      }
      
    },
    
    item: item => {
      
      var when = item.date ? factory.Dates.parse(item.date) : "",
          description = item.details || "",
          description_split = description && description.lastIndexOf ? description.lastIndexOf(" by ") : 0;
      
      return {
        identifier: item.id,
        who: item.user,
        when: when,
        description: description || null,
        title: description_split ? description.substring(0, description_split) : null,
        authors: description_split ? description.substring(description_split) : null,
      };
      
    },
    
    loan: library => loan => {
      var _loan = FN.process.item(loan),
          queried = String.equal(loan.returned, "QUERIED", true),
          disputed = String.equal(loan.returned, "DISPUTED", true),
          returned = !queried && !disputed && loan.returned && _.isString(loan.returned) ?
            factory.Dates.parse(loan.returned) : loan.returned,
          duration = _loan.when && _.isObject(_loan.when) ?
            returned && _.isObject(returned) ?
              factory.Dates.duration(returned - _loan.when) :
              factory.Dates.duration(factory.Dates.now() - _loan.when) : null;
      
      return _.extend(_loan, {
        due: library ? library.meta.capabilities.loan_length && _loan.when && _.isObject(_loan.when) ?
          _loan.when.add(library.meta.capabilities.loan_length, "days") : null : null,
        returned: returned,
        queried: queried,
        disputed: disputed,
        last: loan.last,
        duration: returned ? duration : null,
        overdue: library ? duration && !returned && library.meta.capabilities.loan_length &&
          duration.as("days") > library.meta.capabilities.loan_length ?
          `<strong class='text-warning'>Overdue by:</strong> ${duration.subtract({days:library.meta.capabilities.loan_length}).humanize()}` : null : null,
      });

    },
    
    request: request => FN.process.item(request),
    
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
    
    excluded : (book, library) => library.meta.capabilities.loan_exclusions && 
                  library.meta.capabilities.loan_exclusions.length > 0 && _.find(book.Tags,
                    tag => _.find(_.isArray(library.meta.capabilities.loan_exclusions) ? 
                                  library.meta.capabilities.loan_exclusions : 
                                  library.meta.capabilities.loan_exclusions.split(","), 
                                    excluded => String.equal(excluded, tag, true))),
  
  };
  /* <!-- Public Functions --> */

  /* <!-- Initial Calls --> */

  /* <!-- External Visibility --> */
  return FN;
  /* <!-- External Visibility --> */

};