Libraries = (options, factory) => {
  "use strict";

  /* <!-- MODULE: Provides an interface to provide common functionality --> */
  /* <!-- PARAMETERS: Receives the global app context --> */
  /* <!-- REQUIRES: Global Scope: JQuery, Underscore | App Scope: Display --> */

  /* <!-- Internal Constants --> */
  const DEFAULTS = {
    cache: factory.Dates.duration("45", "minutes"),
    db_cache: factory.Dates.duration("30", "minutes"),
    cover_cache: factory.Dates.duration("2", "days"),
    statistics_cache: factory.Dates.duration("5", "minutes"),
    users_cache: factory.Dates.duration("60", "minutes"),
    download_cache: factory.Dates.duration("7", "days"),
    folder_cache: factory.Dates.duration("120", "minutes"),
  }, FN = {};
  /* <!-- Internal Constants --> */

  /* <!-- Internal Options --> */
  options = _.defaults(options ? _.clone(options) : {}, DEFAULTS);
  /* <!-- Internal Options --> */
  
  /* <!-- Internal Variables --> */
  var ರ‿ರ = {}, /* <!-- Session State --> */
      s = factory.Strings();
  /* <!-- Internal Variables --> */
  
  /* <!-- Internal Functions --> */
  var _endpoint = endpoint => ({
    code: endpoint.code,
    name: endpoint.name,
    admin: endpoint.admin,
    cache: endpoint.id ? key => `endpoint_${endpoint.id}${key ? `_${key.toLowerCase()}` : ""}` : false,
    api: endpoint.id ? 
      options.functions.client.action(endpoint.id, endpoint.user, endpoint.key, endpoint.algorithm, endpoint.context) : 
      () => Promise.resolve(false)
  });
  
  var _fetch = (endpoint, action, timeout) => endpoint.api(action, null, timeout).catch(e => {
          factory.Flags.error(`Endpoint: ${endpoint.id} ERRORED [${action}]`, e);
          return null;
        });
  
  var _meta = (endpoint, force) => {
    var _action = "META",
        _process = meta => {
          if (meta === null) {
            endpoint.state = "OFFLINE";
          } else {
            factory.Flags.log(`ENDPOINT META: ${endpoint.name}`, meta);
            endpoint.state = meta === false ? "NOT_AVAILABLE" : "READY";
            endpoint.meta = meta === false ? {} : meta;
          }
          return endpoint;
        };
    
    return (endpoint.cache ? 
        options.functions.cache.get(endpoint.cache(_action), options.cache, () => _fetch(endpoint, _action), force) : 
        _fetch(endpoint, _action))
      .then(_process);
    
  };
  
  var _prepare = (endpoints, force) => Promise.all(_.chain(endpoints)
                                        .map(_endpoint).map(endpoint => _meta(endpoint, force)).value());
  
  var _all = force => options.functions.cache.get("endpoints", options.cache, options.functions.client.endpoints, force)
      .then(value => {
        if (options.functions.events) factory.Main.event(options.functions.events.endpoints.loaded, 
                            value && value.endpoints ? Math.max(value.endpoints.length, 1) : 1);
        factory.Flags.log("ENDPOINTS:", value);
        return value && value.endpoints && value.endpoints.length > 0 ? _prepare(value.endpoints, force) : 
          [options.functions.demo.generate()];
      })
      .then(libraries => {
        factory.Flags.log("LIBRARIES:", libraries);
        return (ರ‿ರ.all = _.sortBy(libraries, "name"));
      });
  
  var _bytes = data => new Uint8Array(_.isArray(data) ? data : _.isString(data) ? s.base64.bytes(data) : []);
  /* <!-- Internal Functions --> */
  
  /* <!-- Public Functions --> */
  FN.all = force => !force && ರ‿ರ.all ? Promise.resolve(ರ‿ರ.all) : _all(force);
  
  FN.one = index => FN.all().then(libraries => _.isNumber(index) ? libraries[index] : /\d+/.test(index) ? 
                                    libraries[parseInt(index)] : _.find(libraries, library => String.equal(library.code, index, true))),
  
  FN.first = fn => FN.all().then(libraries => libraries ? fn ? _.find(libraries, fn) :  libraries.length > 0 ? 
                                 _.find(libraries, library => library.state == "READY") : null : null),
    
  FN.select = value => _.isObject(value) ? Promise.resolve(value) : FN.one(value);
  
  FN.refresh = value => FN.select(value).then(library => _meta(library, true)),
    
  FN.hash = value => FN.select(value).then(library => library.api("HASH"));
  
  FN.db = value => FN.select(value)
    .then(library => options.functions.cache.get(library.cache("DB"), {
      age: options.db_cache,
      fn: (stored, data) => library.api("HASH").then(hash => hash == data.hash),
    }, () => library.api("DB", {base64: true}, 60000, true).then(result => {
      if (!result) return false;
      result.data = _bytes(result.data);
      var spark_md5 = new SparkMD5.ArrayBuffer();
      spark_md5.append(result.data);
      result.local_hash = spark_md5.end();
      return result;
    })));
  
  FN.folder = (value, path) => FN.select(value)
    .then(library => options.functions.cache.get(library.cache(`FOLDER_${SparkMD5.hash(path)}`), options.folder_cache,
                                                  () => library.api("FOLDER", {path: path}, 20000, true)));
  
  FN.cover = (value, path, link, blob) => FN.select(value)
    .then(library => options.functions.cache.get(library.cache(`COVER_${SparkMD5.hash(path)}_${link ? "L" : "B"}`), options.cover_cache,
                                                  () => library.api("COVER", {path: path, link: link}, 20000, true)))
    .then(cover => !cover || link && cover.indexOf && cover.indexOf("https://") === 0 ? cover :
          blob ? new Blob([_bytes(cover)], {"type": "image/jpeg"}) :
          URL.createObjectURL(new Blob([_bytes(cover)], {"type": "image/jpeg"})));
  
  FN.download = (value, path, name, blob) => FN.select(value)
    .then(library => options.functions.cache.get(library.cache(`DOWNLOAD_${SparkMD5.hash(path)}_${SparkMD5.hash(name)}`),
                        options.download_cache, () => library.api("DOWNLOAD", {path: path, name: name, base64: true}, 60000, true)))
    .then(downloaded => downloaded && downloaded.data ? 
          blob ? new Blob([_bytes(downloaded.data)]) : 
          URL.createObjectURL(new Blob([_bytes(downloaded.data)]), {"type": downloaded.type}) : null),
  
  FN.available = (value, copies) =>  FN.select(value).then(library => library.api("AVAILABLE", {copies: copies}, null, true));
  
  FN.settings = (value, settings) => FN.select(value).then(library => library.api("SETTINGS", settings));
  
  FN.loans = {
  
    outstanding: value => FN.select(value).then(library => library.api("LOANS", null, null, true)),
    
    overdue: value => FN.select(value).then(library => library.api("LOANS", {
      overdue: true
    }, null, true)),
    
    copy: (value, copy) => FN.select(value).then(library => library.api("LOANS", {
      copy: copy
    }, null, true)),
    
    user: (value, user) => FN.select(value).then(library => library.api("LOANS", {
      user: user
    }, null, true)),
    
  };
  
  FN.request = (value, id, isbn, details, user) => FN.select(value).then(library => library.api("REQUEST", {
      user : user,
      id : id,
      isbn : isbn || "",
      details : details || ""
    }));
  
  FN.requests = {
    
    all: value => FN.select(value).then(library => library.api("REQUESTS", {
      details: true
    }, null, true)),
    
    item: (value, id) => FN.select(value).then(library => library.api("REQUESTS", {
      id: id
    }, null, true)),
    
    user: (value, user) => FN.select(value).then(library => library.api("REQUESTS", {
      user: user
    }, null, true)),
    
  };
  
  FN.statistics = value => FN.select(value).then(library => options.functions.cache.get(library.cache("STATISTICS"), options.statistics_cache,
                                                  () => library.api("STATISTICS", null, null, true)));
  
  FN.log = {
    
    loan : (value, user, id, isbn, copy, details) => FN.select(value).then(library => library.api("LOG_LOANED", {
      user : user,
      id : id,
      isbn : isbn || "",
      copy : copy,
      details : details || ""
    })),
    
    returned : (value, copy) => FN.select(value).then(library => library.api("LOG_RETURNED", {
      copy : copy
    })),
    
    concluded : (value, user, id, copy) => FN.select(value).then(library => {
      var _data = {
        user : user,
        id : id
      };
      if (copy) {
        _data.loaned = true;
        _data.copy = copy;
      }
      return library.api("LOG_CONCLUDED", _data);
    }),
    
  };
  
  FN.users = value => FN.select(value).then(library => options.functions.cache.get(library.cache("USERS"), options.users_cache,
                                                  () => library.api("USERS", null, null, true)));
  /* <!-- Public Functions --> */
  
  return FN;
  
};