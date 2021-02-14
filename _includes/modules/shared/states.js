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
        STATE_LIBRARIES_MULTIPLE = "libraries-multiple",
        STATE_LIBRARIES_SINGLE = "libraries-single",
        STATE_LIBRARIES_SELECTING = "libraries-selecting",
        
        STATE_LIBRARY = "library",
        STATE_LIBRARY_WORKING = "library-working",
        STATE_LIBRARY_LOADED = "library-loaded",
        STATE_LIBRARY_MANAGEABLE = "library-manageable",
        STATE_LIBRARY_LOANABLE = "library-loanable",
        STATE_LIBRARY_ITEM = "library-item",
        STATE_LIBRARY_AVAILABLE = "library-available",
        STATE_LIBRARY_RETURNABLE = "library-returnable",
        STATE_LIBRARY_REQUESTABLE = "library-requestable",
        
        STATE_MANAGE = "manage",
        STATE_MANAGE_WORKING = "manage-working",
        STATE_MANAGE_LOADED = "manage-loaded",
        STATE_MANAGE_LOG = "manage-log",
        
        STATE_SETTINGS = "settings",
        STATE_SETTINGS_PERSONAL = "settings-personal",
        STATE_SETTINGS_LIBRARY = "settings-library",
        STATE_SETTINGS_WORKING = "settings-working",
        
        STATE_SUBSCRIBED = "subscribed",
        STATE_SUBSCRIBED_WORKING = "subscribed-working",
        
        STATE_READER = "reader",
        STATE_READER_LOADED = "reader-loaded",
        
        STATE_FULLSCREEN_AVAILABLE = "fullscreen-available",
        STATE_FULLSCREEN_CONTENT = "fullscreen-content",
        STATE_FULLSCREEN_ENABLED = "fullscreen-enabled",
        
        STATE_SEARCHED = "searched",
        
        /* <!-- All States is used for testing whether the app has been used! --> */
        STATES = [
          STATE_CONFIG, STATE_LANDING, STATE_LANDING_LIBRARIES, 
          STATE_LIBRARIES, STATE_LIBRARIES_LOADED, STATE_LIBRARIES_OVERVIEW, STATE_LIBRARIES_MULTIPLE, STATE_LIBRARIES_SINGLE, STATE_LIBRARIES_SELECTING,
          STATE_LIBRARY, STATE_LIBRARY_WORKING, STATE_LIBRARY_LOADED, STATE_LIBRARY_MANAGEABLE, STATE_LIBRARY_LOANABLE, STATE_LIBRARY_ITEM, STATE_LIBRARY_AVAILABLE, STATE_LIBRARY_RETURNABLE, STATE_LIBRARY_REQUESTABLE,
          STATE_MANAGE, STATE_MANAGE_WORKING, STATE_MANAGE_LOADED, STATE_MANAGE_LOG,
          STATE_SETTINGS, STATE_SETTINGS_PERSONAL, STATE_SETTINGS_LIBRARY, STATE_SETTINGS_WORKING,
          STATE_SUBSCRIBED,
          STATE_READER, STATE_READER_LOADED,
          STATE_SEARCHED
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
      multiple : STATE_LIBRARIES_MULTIPLE,
      single : STATE_LIBRARIES_SINGLE,
      selecting : STATE_LIBRARIES_SELECTING,
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
      requestable : STATE_LIBRARY_REQUESTABLE,
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
      log : STATE_MANAGE_LOG,
    },
    
    reader : {
      in : STATE_READER,
      loaded : STATE_READER_LOADED
    },
    
    settings : {
      in : STATE_SETTINGS,
      personal : STATE_SETTINGS_PERSONAL,
      library : STATE_SETTINGS_LIBRARY,
      working : STATE_SETTINGS_WORKING,
      specific :[
        STATE_SETTINGS_PERSONAL, STATE_SETTINGS_LIBRARY
      ],
    },
    
    subscribed: {
      in : STATE_SUBSCRIBED,
      working : STATE_SUBSCRIBED_WORKING,
    },
    
    fullscreen: {
      available : STATE_FULLSCREEN_AVAILABLE,
      content : STATE_FULLSCREEN_CONTENT,
      enabled : STATE_FULLSCREEN_ENABLED,
    },
    
    searched: STATE_SEARCHED,
    
    views : [
      STATE_LANDING, STATE_LIBRARY, STATE_MANAGE, STATE_SETTINGS, STATE_READER
    ],
    
  };
  /* <!-- External Visibility --> */

};