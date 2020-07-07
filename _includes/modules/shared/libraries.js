Libraries = (options, factory) => {
  "use strict";

  /* <!-- MODULE: Provides an interface to provide common functionality --> */
  /* <!-- PARAMETERS: Receives the global app context --> */
  /* <!-- REQUIRES: Global Scope: JQuery, Underscore | App Scope: Display --> */

  /* <!-- Internal Constants --> */
  const DEFAULTS = {}, FN = {};
  /* <!-- Internal Constants --> */

  /* <!-- Internal Options --> */
  options = _.defaults(options ? _.clone(options) : {}, DEFAULTS);
  /* <!-- Internal Options --> */
  
  /* <!-- Internal Variables --> */
  var ರ‿ರ = {}; /* <!-- Session State --> */
  /* <!-- Internal Variables --> */
  
  /* <!-- Internal Functions --> */
  var _endpoint = endpoint => ({
    name: endpoint.name,
    admin: endpoint.admin,
    api: endpoint.id ? 
      options.functions.client.action(endpoint.id, endpoint.user, endpoint.key, endpoint.algorithm) : 
      () => Promise.resolve(false),
  });
  
  var _meta = endpoint => endpoint.api("META")
                   .then(response => {
                     factory.Flags.log(`ENDPOINT META: ${endpoint.name}`, response);
                     endpoint.state = response === false ? "NOT_AVAILABLE" : "READY";
                     endpoint.meta = response === false ? {} : response;
                     return endpoint;
                   })
                   .catch(e => {
                     factory.Flags.error(`Endpoint: ${endpoint.id} ERRORED`, e);
                     endpoint.state = "OFFLINE";
                     return endpoint;
                   });
  
  var _prepare = endpoints => Promise.all(_.chain(endpoints).map(_endpoint).map(_meta).value());
  /* <!-- Internal Functions --> */
  
  /* <!-- Public Functions --> */
  FN.all = () => ರ‿ರ.all ? 
    Promise.resolve(ರ‿ರ.all) : 
    options.functions.client.endpoints()
      .then(value => {
        factory.Main.event(options.functions.events.endpoints.loaded, 
                            value && value.endpoints ? Math.max(value.endpoints.length, 1) : 1);
        factory.Flags.log("ENDPOINTS:", value);
        return value && value.endpoints && value.endpoints.length > 0 ? _prepare(value.endpoints) : [options.functions.demo.generate()];
      })
      .then(libraries => {
        factory.Flags.log("LIBRARIES:", libraries);
        return (ರ‿ರ.all = _.sortBy(libraries, "name"));
      });
  /* <!-- Public Functions --> */
  
  return FN;
  
};