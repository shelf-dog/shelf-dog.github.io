Client = (options, factory) => {
  "use strict";

  /* <!-- MODULE: Provides an interface to provide common functionality --> */
  /* <!-- PARAMETERS: Receives the global app context --> */
  /* <!-- REQUIRES: Global Scope: JQuery, Underscore | App Scope: Display --> */

  /* <!-- Internal Constants --> */
  const DEFAULTS = {
    url: key => `https://script.google.com/macros/s/${key}/${factory.Flags.development() && factory.Flags.verbose() ? "dev" : "exec"}`,
    directory: "MOFNm99Z2DvtFrKmYIiYQC1UssP2KT1jI",
    timeout: 20000
  }, FN = {};
  /* <!-- Internal Constants --> */

  /* <!-- Internal Options --> */
  options = _.defaults(options ? _.clone(options) : {}, DEFAULTS);
  /* <!-- Internal Options --> */
  
  /* <!-- Internal Variables --> */
  var s = factory.Strings();
  /* <!-- Internal Functions --> */
  
  /* <!-- Public Functions --> */
  FN.action = (endpoint, user, user_key, user_algorithm, context) => (action, params, timeout) => fetchJsonp(`${options.url(endpoint)}?u=${s.base64.encode(user)}&u_k=${user_key}&u_a=${s.base64.encode(user_algorithm)}${context ? `&cx=${context}`: ""}&a=${action}${params ? _.reduce(params, (memo, value, key) => `${memo}&p_${key}=${value}`, "") : ""}`, {
    timeout: timeout || options.timeout,
  })
    .then(response => response.json())
    .then(value => (factory.Flags.log(`Web API Result: ${JSON.stringify(value)}`, value), value));
  
  FN.endpoints = () => factory.Google.scripts.execute(options.directory, "list")
    .then(value => (value && value.done ? 
          value.error ? 
                    factory.Flags.error("Directory Error", value = value.error) :
          value.response && value.response.result ? 
                    factory.Flags.log("API Response", value = value.response.result) : null : null, value));
  
  FN.user = () => factory.Google.scripts.execute(options.directory, "list", "user")
    .then(value => (value && value.done ? 
          value.error ? 
                    factory.Flags.error("Directory Error", value = value.error) :
          value.response && value.response.result ? 
                    factory.Flags.log("API Response", value = value.response.result) : null : null, value));
  /* <!-- Public Functions --> */
  
  return FN;
  
};