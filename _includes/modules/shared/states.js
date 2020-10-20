States = () => {
  "use strict";

  /* <!-- MODULE: Provides an interface to provide common state functionality --> */
  /* <!-- PARAMETERS: Receives the global app context --> */
  /* <!-- REQUIRES: Global Scope: JQuery, Underscore | App Scope: Display --> */

  /* <!-- Internal Constants --> */
  const STATE_CONFIG = "config",
        
        STATE_LANDING = "landing",
        STATE_LANDING_LIBRARIES = "landing-libaries",
        
        STATE_LIBRARIES = "libraries",
        STATE_LIBRARIES_LOADED = "libraries-loaded",
        STATE_LIBRARIES_OVERVIEW = "libraries-overview",
        
        STATE_LIBRARY = "library",
        STATE_LIBRARY_WORKING = "library-working",
        STATE_LIBRARY_LOADED = "library-loaded",
        STATE_LIBRARY_MANAGEABLE = "library-manageable",
        STATE_LIBRARY_LOANABLE = "library-loanable",
        STATE_LIBRARY_ITEM = "library-item",
        STATE_LIBRARY_AVAILABLE = "library-available",
        STATE_LIBRARY_RETURNABLE = "library-returnable",
        
        STATE_MANAGE = "manage",
        STATE_MANAGE_WORKING = "manage-working",
        STATE_MANAGE_LOADED = "manage-loaded",
        
        STATE_SETTINGS = "settings",
        STATE_SETTINGS_PERSONAL = "settings-personal",
        STATE_SETTINGS_ALL = "settings-all",
        STATE_SETTINGS_LIBRARY = "settings-library",
        
        STATE_SUBSCRIBED = "subscribed",
        
        STATES = [
          STATE_CONFIG, STATE_LANDING, STATE_LANDING_LIBRARIES, 
          STATE_LIBRARIES, STATE_LIBRARIES_LOADED, STATE_LIBRARIES_OVERVIEW,
          STATE_LIBRARY, STATE_LIBRARY_WORKING, STATE_LIBRARY_LOADED, STATE_LIBRARY_MANAGEABLE, STATE_LIBRARY_LOANABLE, STATE_LIBRARY_ITEM, STATE_LIBRARY_AVAILABLE, STATE_LIBRARY_RETURNABLE,
          STATE_MANAGE, 
          STATE_SETTINGS, STATE_SETTINGS_PERSONAL, STATE_SETTINGS_ALL, STATE_SETTINGS_LIBRARY,
          STATE_SUBSCRIBED
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
    
    config : {
      in : STATE_CONFIG,
    },
    
    landing : {
      in : STATE_LANDING,
      libraries : STATE_LANDING_LIBRARIES,
    },
    
    libraries : {
      in : STATE_LIBRARIES,
      loaded : STATE_LIBRARIES_LOADED,
      overview : STATE_LIBRARIES_OVERVIEW,
    },
    
    library : {
      in : STATE_LIBRARY,
      working : STATE_LIBRARY_WORKING,
      loaded : STATE_LIBRARY_LOADED,
      manageable : STATE_LIBRARY_MANAGEABLE,
      loanable : STATE_LIBRARY_LOANABLE,
      item : STATE_LIBRARY_ITEM,
      available : STATE_LIBRARY_AVAILABLE,
      returnable : STATE_LIBRARY_RETURNABLE,
      specific :[
        STATE_LIBRARY_LOADED
      ],
      items : [
        STATE_LIBRARY_ITEM, 
        STATE_LIBRARY_AVAILABLE,
        STATE_LIBRARY_RETURNABLE
      ],
    },
    
    manage : {
      in : STATE_MANAGE,
      working : STATE_MANAGE_WORKING,
      loaded : STATE_MANAGE_LOADED,
    },
    
    settings : {
      in : STATE_SETTINGS,
      personal : STATE_SETTINGS_PERSONAL,
      all : STATE_SETTINGS_ALL,
      library : STATE_SETTINGS_LIBRARY,
      specific :[
        STATE_SETTINGS_PERSONAL, STATE_SETTINGS_ALL, STATE_SETTINGS_LIBRARY
      ],
    },
    
    subscribed: {
      in : STATE_SUBSCRIBED,
    },
    
    views : [
      STATE_LANDING, STATE_LIBRARY, STATE_MANAGE, STATE_SETTINGS
    ],
    
  };
  /* <!-- External Visibility --> */

};