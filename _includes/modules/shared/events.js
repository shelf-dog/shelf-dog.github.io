Events = () => {
  "use strict";

  /* <!-- MODULE: Provides an interface to provide common event functionality --> */

  /* <!-- Internal Constants --> */
  const EVENTS = {
    endpoints: {
      loaded : "endpoints-loaded",
    },
    library: {
      loaded : "library-loaded",
    },
    loans: {
      progress : "loans-progress",
    },
    returns: {
      progress : "returns-progress",
    },
  };
  /* <!-- Internal Constants --> */

  /* <!-- External Visibility --> */
  return EVENTS;
  /* <!-- External Visibility --> */

};