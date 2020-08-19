Semiotics = (options, factory) => {
  "use strict";

  /* <!-- MODULE: Provides an interface to provide common functionality --> */

  /* <!-- Internal Constants --> */
  const DEFAULTS = {};
  /* <!-- Internal Constants --> */

  /* <!-- Internal Options --> */
  options = _.defaults(options ? _.clone(options) : {}, DEFAULTS);
  /* <!-- Internal Options --> */

  /* <!-- Internal Functions --> */
  factory.Flags.log("Semiotics Created");
  /* <!-- Internal Functions --> */
  
  /* <!-- External Visibility --> */
  return {
    
  };
  /* <!-- External Visibility --> */

};