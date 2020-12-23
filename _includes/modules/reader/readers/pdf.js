PDF = (options, factory) => {
  "use strict";

  /* <!-- MODULE: Provides an interface to provide common functionality --> */
  /* <!-- PARAMETERS: Receives the global app context --> */
  /* <!-- REQUIRES: Global Scope: JQuery, Underscore | App Scope: Display --> */
  
  /* <!-- Internal Constants --> */
  const DEFAULTS = {}, FN = {};
  /* <!-- Internal Constants --> */

  
  /* <!-- Internal Options --> */
  options = _.defaults(options ? _.clone(options) : {}, DEFAULTS);
  /* <!-- Internal Options --> */
  
  
  /* <!-- Internal Variables --> */
  var ರ‿ರ = { /* <!-- Session State --> */
  };
  /* <!-- Internal Variables --> */
  
  
  /* <!-- Internal Functions --> */
  factory.Flags.log("OPTIONS:", options);
  /* <!-- Internal Functions --> */

  /* <!-- External Functions --> */
  FN.state = () => ರ‿ರ;
  
  FN.load = value => (ರ‿ರ.value = value, Promise.resolve(FN));
  /* <!-- External Functions --> */
  
  
  /* <!-- Public Functions --> */
  return FN;
  /* <!-- Public Functions --> */
  
};