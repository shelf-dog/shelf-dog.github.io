Url = options => {
  "use strict";

  /* <!-- HELPER: Provides url helper methods --> */
  /* <!-- PARAMETERS: Options (see below) and factory (to generate other helper objects) --> */
  /* <!-- @options.default: Default Colour ([R,G,B] Array, CSS Colour String or Name) [Optional] --> */

  /* <!-- Internal Constants --> */
  const DEFAULTS = {};
  /* <!-- Internal Constants --> */

  /* <!-- Internal Variables --> */
  options = _.defaults(options ? _.clone(options) : {}, DEFAULTS);
  /* <!-- Internal Variables --> */

  /* <!-- Internal Variables --> */
  /* <!-- Internal Variables --> */

  /* <!-- Internal Functions --> */
  var _encode = value => value.replace(/\./g, "%2E").replace(/@/g, "%40");
  
  var _decode = value => value && value.replace ? value.replace(/%2E/g, ".").replace(/%40/g, "@") : value;
  /* <!-- Internal Functions --> */

  /* <!-- External Visibility --> */
  return {

    /* <!-- External Functions --> */
    decode: _decode,
    
    encode: _encode,
    /* <!-- External Functions --> */

  };
  /* <!-- External Visibility --> */
};