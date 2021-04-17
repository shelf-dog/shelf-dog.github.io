Configuration = (options, factory) => {
  "use strict";

  /* <!-- MODULE: Provides an interface to provide common functionality --> */
  /* <!-- PARAMETERS: Receives the global app context --> */
  /* <!-- REQUIRES: Global Scope: JQuery, Underscore | App Scope: Display --> */

  /* <!-- Internal Constants --> */
  const DEFAULTS = {
    missing: "NO_CONFIG",
    default: false,
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
      name: "testing-config.json",
      fields: {
        comparison: ["client", "script"],
        array: [],
        complex: [],
        simple: ["algorithm", "key"]
      },
      state: options.functions.states.client.configured
    }, factory);
  };
  
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
  
  var _create = values => ರ‿ರ.fn.create(values)
    .then(config => {
      ರ‿ರ.file = config.id;
      return (ರ‿ರ.config = config.settings);
    });
  
  var _update = (id, values) => ರ‿ರ.fn.update(id, values)
    .then(config => ರ‿ರ.config = config.settings);
  
  var _get = () => Promise.resolve(ರ‿ರ.missing ? options.default : ರ‿ರ.config);
  
  var _set = values => ರ‿ರ.file ? 
      _update(ರ‿ರ.file.id, values) : 
      ರ‿ರ.fn.find().then(file => file && file.id ? _update((ರ‿ರ.file = file).id, values) : _create(values));
  
  var _clear = id => id ? ರ‿ರ.fn.clear(id).then(result => result ? (_process(options.missing), result) : result) :
      Promise.resolve(false);
  
  var _load = () => ರ‿ರ.fn.find()
      .then(result => result ? 
            (factory.Flags.log("Config File:", result), ರ‿ರ.fn.load(ರ‿ರ.file = result)) : result)
      .then(config => config ? 
            (factory.Flags.log("Config Data:", config), _process(config.settings), config.settings) : config)
      .then(settings => settings ? 
            (factory.Flags.log("Config Settings:", settings), settings) : options.default);
  /* <!-- Internal Functions --> */
  
  
  /* <!-- Initial Setup --> */
  _setup();
  /* <!-- Initial Setup --> */
  
  
  /* <!-- Public Functions --> */
  FN.clear = id => id || ರ‿ರ.file ? _clear(id || ರ‿ರ.file.id) : Promise.resolve(true);
  
  FN.get = _get;
  
  FN.load = _load;
  
  FN.set = _set;
  /* <!-- Public Functions --> */
  
  
  return FN;
  
};