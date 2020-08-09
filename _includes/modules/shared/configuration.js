Configuration = (options, factory) => {
  "use strict";

  /* <!-- MODULE: Provides an interface to provide common functionality --> */
  /* <!-- PARAMETERS: Receives the global app context --> */
  /* <!-- REQUIRES: Global Scope: JQuery, Underscore | App Scope: Display --> */

  /* <!-- Internal Constants --> */
  const DEFAULTS = {
    key: "CONFIG",
    age: factory.Dates.duration("24", "hours"),
    missing: "NO_CONFIG"
  }, FN = {};
  /* <!-- Internal Constants --> */

  /* <!-- Internal Options --> */
  options = _.defaults(options ? _.clone(options) : {}, DEFAULTS);
  /* <!-- Internal Options --> */
  
  /* <!-- Internal Variables --> */
  var ರ‿ರ = {}; /* <!-- Session State --> */
  /* <!-- Internal Variables --> */
  
  /* <!-- Internal Functions --> */
  var _setup = () => {
    ರ‿ರ.fn = factory.Config({
        fields: {
          comparison: ["log"],
          array: [],
          complex: [],
          simple: ["loans"]
        },
        state: options.functions.states.config.in
      }, factory);
  };
  
  var _load = () => ರ‿ರ.fn.find()
                    .then(result => result ? 
                          (factory.Flags.log("Config File:", result), ರ‿ರ.fn.load(ರ‿ರ.file = result)) : result)
                    .then(config => config ? 
                          (factory.Flags.log("Config Data:", config), config.settings) : config)
                    .then(settings => settings ? (factory.Flags.log("Config Settings:", settings), settings) : options.missing);
  
  var _process = config => {
    ರ‿ರ.processed = true;
    if (config === options.missing) {
      ರ‿ರ.missing = true;
      delete ರ‿ರ.config;
      delete ರ‿ರ.file;
    } else {
      delete ರ‿ರ.missing;
      ರ‿ರ.config = config;
    }
  };
  
  var _cache = values => options.functions.cache.set(options.key, values);
  
  var _create = values => ರ‿ರ.fn.create(values)
    .then(config => {
      ರ‿ರ.file = config.id;
      return (ರ‿ರ.config = config.settings);
    })
    .then(_cache);
  
  var _update = (id, values) => ರ‿ರ.fn.update(id, values)
    .then(config => ರ‿ರ.config = config.settings)
    .then(_cache);
  
  var _get = () => ರ‿ರ.missing ? false : ರ‿ರ.config;
  
  var _set = values => ರ‿ರ.file ? _update(ರ‿ರ.file.id, values) : _create(values);
  
  var _clear = id => id ? ರ‿ರ.fn.clear(id).then(result => result ? _cache(options.missing) : result) : Promise.resolve(false);
  
  var _start = force => ರ‿ರ.promise = options.functions.cache.get(options.key, options.age, _load, force)
                                        .then(_process);
  /* <!-- Internal Functions --> */
  
  /* <!-- Initial Setup --> */
  _setup();
  /* <!-- Initial Setup --> */
  
  /* <!-- Public Functions --> */
  FN.start = _start;
  
  FN.clear = id => id || ರ‿ರ.file ? _clear(id || ರ‿ರ.file.id) : Promise.resolve(false);
  
  FN.get = () => (ರ‿ರ.promise || _start()).then(_get);
  
  FN.set = _set;
  /* <!-- Public Functions --> */
  
  return FN;
  
};