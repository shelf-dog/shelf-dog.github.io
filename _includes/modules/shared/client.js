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
  /* <!-- Internal Variables --> */
  
  /* <!-- Internal Functions --> */
  
  /* <!-- Internal Functions --> */
  
  /* <!-- Public Functions --> */
  FN.action = (endpoint, user, user_key, user_algorithm, context) => (action, params, timeout, idempotent) => {
    
    var _action = (action, params, timeout) => fetchJsonp(`${options.url(endpoint)}?u=${s.base64.encode(user)}&u_k=${user_key}&u_a=${s.base64.encode(user_algorithm)}${context ? `&cx=${context}`: ""}&a=${action}${params ? _.reduce(params, (memo, value, key) => `${memo}&p_${encodeURIComponent(key)}=${encodeURIComponent(value)}`, "") : ""}`, {
      timeout: timeout || options.timeout,
    });

    var _retry = times => (action, params, timeout) => {
      var _caller = timeout => _action(action, params, timeout)
        .catch(e => {
          factory.Flags.error("API | Library [Action Error]", e);
          if (/timed out\s*^/i.test(e)) {
            if (times > 0) {
              times -= 1;
              factory.Flags.log("API | Library [Retry]", action);
              return _caller(timeout * 2);
            } else {
              return undefined;
            } 
          } else {
            throw e;
          }
        });
      return _caller(timeout);
    };
                       
    return (factory.Flags.log("API | Library [Request]", action), (idempotent ? _retry(3) : _action)(action, params, timeout)
            
      .then(response => response.json())
      
      /* <!-- Do we need to refresh our user token? --> */
      .then(response => response && response.refresh === true ? FN.endpoints()
            .then(all => {
              var _refreshed = _.find(all, single => single && single.id == endpoint);
              factory.Flags.log("API | Refreshed Endpoint", _refreshed);
              if (_refreshed) {
                user = _refreshed.user;
                user_key = _refreshed.key;
                return (idempotent ? _retry(3) : _action)(action, params, timeout).then(response => response.json());
              } else {
                return response;
              }
            }) : response)
      
      .then(value => (factory.Flags.log("API | Library [Response]", value), value)));
    
  };
  
  FN.endpoints = () => factory.Google.scripts.execute(options.directory, "list")
    .then(value => (value && value.done ? 
          value.error ? 
                    factory.Flags.error("API | Directory [Error]", value = value.error) :
          value.response && value.response.result ? 
                    factory.Flags.log("API | Directory [Response]", value = value.response.result) : null : null, value));
  
  FN.user = () => factory.Google.scripts.execute(options.directory, "list", "user")
    .then(value => (value && value.done ? 
          value.error ? 
                    factory.Flags.error("Directory Error", value = value.error) :
          value.response && value.response.result ? 
                    factory.Flags.log("API | Directory [Response]", value = value.response.result) : null : null, value));
  /* <!-- Public Functions --> */
  
  return FN;
  
};