Code = (options, factory) => {
  "use strict";

  /* <!-- MODULE: Provides an interface to provide common functionality --> */
  /* <!-- PARAMETERS: Receives the global app context --> */
  /* <!-- REQUIRES: Global Scope: JQuery, Underscore | App Scope: Display --> */

  /* <!-- Internal Constants --> */
  const DEFAULTS = {
    regex : {
      array: {
        open: /\[\s*{/gi,
        close: /}\s*\]/gi
      }
    }
  }, FN = {};
  /* <!-- Internal Constants --> */


  /* <!-- Internal Options --> */
  options = _.defaults(options ? _.clone(options) : {}, DEFAULTS);
  /* <!-- Internal Options --> */

  
  /* <!-- Internal Variables --> */
  var ರ‿ರ = {}; /* <!-- Session State --> */
  /* <!-- Internal Variables --> */
  
  
  /* <!-- Internal Functions --> */
  var _version = files => {
      var _versions = _.find(files, file => file.name == "Versions"),
          _version;
      if (_versions) {
        var _open = options.regex.array.open.exec(_versions.source),
            _close = options.regex.array.close.exec(_versions.source);
        if (_open && _close) {
          var _array = _versions.source.substring(_open.index, _close.index + _close[0].length);
          if (_array) {
            _array = JSON.parse(_array.trim());
            _version = _.isArray(_array) ? _array[0] : null;
            if (_version && _.isObject(_version)) _version = _.values(_version)[0];
          }
        }
      }
      factory.Flags.log("LATEST VERSION:", _version);
      return (FN.latest = _version);
    };
    
  var _key = (files, key) => {
      var _crypto = _.find(files, file => file.name == "Crypto");
      if (_crypto && _crypto.source)
        _crypto.source = _crypto.source.replace(/\{\{\{\s?KEY\s?\}\}\}/gi,
                                                _.compact(key.trim().split(/\n|\r|\f/gm)).join("\\\n"));
      return files;
    };
    
  var _prepare = (files, key) => {
    if (!FN.latest) _version(files);
    var _code = _key(files, key);
    return _.map(_code, file => _.omit(file, "id"));
  };
  /* <!-- Internal Functions --> */

  
  /* <!-- Public Functions --> */
  FN.get = user => ರ‿ರ.files ? Promise.resolve(ರ‿ರ.files) : options.functions.subscribe.client(user)
    .then(result => result && result.result && result.result.files ? result.result.files : null)
    .then(files => files ? (_version(ರ‿ರ.files = files), files) : (delete ರ‿ರ.files, delete FN.latest, null));
  
  FN.prepare = key => FN.get().then(files => _prepare(JSON.parse(JSON.stringify(files)), key));
  /* <!-- Public Functions --> */

  return FN;

};