States = () => {
  "use strict";

  /* <!-- MODULE: Provides an interface to provide common state functionality --> */
  /* <!-- PARAMETERS: Receives the global app context --> */
  /* <!-- REQUIRES: Global Scope: JQuery, Underscore | App Scope: Display --> */

  /* <!-- Internal Constants --> */
  const STATE_LANDING = "landing",
        STATE_LIBRARY = "library",
        STATE_MANAGE = "manage",
        STATES = [
          STATE_LANDING, STATE_LIBRARY, STATE_MANAGE
        ];
  /* <!-- Internal Constants --> */

  /* <!-- Internal Options --> */
  
  /* <!-- Internal Options --> */

  /* <!-- Internal Variables --> */
  /* <!-- Internal Variables --> */

  /* <!-- Internal Functions --> */
  /* <!-- Internal Functions --> */

  /* <!-- Initial Calls --> */

  /* <!-- External Visibility --> */
  return {

    all : STATES,
    
    landing : {
      in : STATE_LANDING,
    },
    
    library : {
      in : STATE_LIBRARY,
    },
    
    manage : {
      in : STATE_MANAGE,
    },
    
    views : [
      STATE_LANDING, STATE_LIBRARY, STATE_MANAGE
    ],
    
  };
  /* <!-- External Visibility --> */

};