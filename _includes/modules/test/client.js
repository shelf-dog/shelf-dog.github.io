Client = (options, factory) => {
  "use strict";

  /* <!-- MODULE: Provides an interface to provide common functionality --> */
  /* <!-- PARAMETERS: Receives the global app context --> */
  /* <!-- REQUIRES: Global Scope: JQuery, Underscore | App Scope: Display --> */

  /* <!-- Internal Constants --> */
  const DEFAULTS = {
    url: key => `https://script.google.com/macros/s/${key}/exec`,
    timeout: 60000
  }, FN = {};
  /* <!-- Internal Constants --> */

  /* <!-- Internal Options --> */
  options = _.defaults(options ? _.clone(options) : {}, DEFAULTS);
  /* <!-- Internal Options --> */
  
  /* <!-- Internal Variables --> */
  var s = factory.Strings();
  /* <!-- Internal Variables --> */
  
  /* <!-- Internal Functions --> */
  var _crypto = {
    
    sign : (value, key, algorithm) => {
      var sig_Sign = new KJUR.crypto.Signature({"alg": algorithm});
      sig_Sign.init(key);
      sig_Sign.updateString(value);
      return sig_Sign.sign();
    },
    
    verify : (value, signature, key, algorithm) => {
      var sig_Verify = new KJUR.crypto.Signature({"alg": algorithm});
      sig_Verify.init(key);
      sig_Verify.updateString(value);
      return sig_Verify.verify(signature);
    },
    
  };

  var _format = (user, value) => `${user} == ${value}`;
  
  var _sign = (user, value, key, algorithm) => _crypto.sign(_format(user, value), key, algorithm);
  /* <!-- Internal Functions --> */
  
  /* <!-- Public Functions --> */
  FN.client = (id, timestamp, algorithm, key) => {
    
    timestamp = (timestamp || factory.Dates.now().add(-5, "m")).toISOString();
    
    var _params = params => _.reduce(params, (memo, value, key) => `${memo}&p_${encodeURIComponent(key)}=${encodeURIComponent(value === undefined || value === null ? value : JSON.stringify(value))}`, "");
    
    var _action = (user, key, algorithm, action, params, context, timeout) => fetchJsonp(`${options.url(id)}?u=${s.base64.encode(user)}&u_k=${key}&u_a=${s.base64.encode(algorithm)}${context ? `&cx=${context}`: ""}&a=${action}${params ? _params(params) : ""}`, {
      timeout: timeout || options.timeout,
    })
    .catch(e => (factory.Flags.error(`API Call To: ${id} for ${action}`, e), null))
    .then(response => response && response.json ? _.tap(response.json(), json => factory.Flags.log(`API Call To: ${id} for ${action}`, json)) : response);
    
    return (user, action, params, admin, callee, timeout) => {
      
      var _user = _format(callee || user, timestamp),
          _key = _sign(user, timestamp, key, algorithm),
          _context = admin ? _sign(user, "admin", key, algorithm) : "";
            
      return _action(_user, _key, algorithm, action, params, _context, timeout);
      
    };
    
  };
  /* <!-- Public Functions --> */
  
  return FN;
  
};