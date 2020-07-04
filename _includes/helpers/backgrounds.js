Backgrounds = () => {
  "use strict";

  /* <!-- HELPER: Provides colour helper methods --> */
  /* <!-- PARAMETERS: Options (see below) and factory (to generate other helper objects) --> */
  /* <!-- @options.default: Default Colour ([R,G,B] Array, CSS Colour String or Name) [Optional] --> */

  /* <!-- Internal Constants --> */
  const DEFAULTS = {
      min: "--background-min",
      max: "--background-max",
   };
  /* <!-- Internal Constants --> */

  /* <!-- Internal Functions --> */
  
  /* <!-- Set Random Background --> */
  var background = prefix => document.body.classList.add(`${prefix}background-${Math.randomInteger(
        parseInt(getComputedStyle(document.documentElement).getPropertyValue(DEFAULTS.min), 10),        
        parseInt(getComputedStyle(document.documentElement).getPropertyValue(DEFAULTS.max), 10)) || 1}`);  
  
  /* <!-- Internal Functions --> */
  
  /* <!-- Internal Variables --> */
  /* <!-- Internal Variables --> */

  /* <!-- External Visibility --> */
  return {

    /* <!-- External Functions --> */
    set: () => background(""),
    /* <!-- External Functions --> */

  };
  /* <!-- External Visibility --> */
};