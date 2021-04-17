Subscribe = (options, factory) => {
  "use strict";

  /* <!-- MODULE: Provides an interface to provide common functionality --> */
  /* <!-- PARAMETERS: Receives the global app context --> */
  /* <!-- REQUIRES: Global Scope: JQuery, Underscore | App Scope: Display --> */
  
  /* <!-- Public Constants --> */
  const DEFAULTS = {
    url: key => `https://script.google.com/macros/s/${key}/exec`,
    endpoint: "AKfycbwg-hyA1WmSyFqZdHwxNGizL6WQR2MiUoz58xHuFRTNugtq3Z41",
    timeout: 50000
  }, FN = {};
  /* <!-- Public Constants --> */
  
  /* <!-- Internal Variables --> */
  var s = factory.Strings(), e = s.base64.encode;
  /* <!-- Internal Functions --> */
  
  /* <!-- Internal Options --> */
  options = _.defaults(options ? _.clone(options) : {}, DEFAULTS);
  /* <!-- Internal Options --> */
  
  /* <!-- Public Functions --> */
  FN.action = (user, user_key, user_algorithm) => (action, params, timeout) => fetchJsonp(`${DEFAULTS.url(DEFAULTS.endpoint)}?u=${s.base64.encode(user)}&u_k=${user_key}&u_a=${s.base64.encode(user_algorithm)}&a=${action}${params ? _.reduce(params, (memo, value, key) => `${memo}&p_${key}=${value}`, "") : ""}`, {
    timeout: timeout || options.timeout,
  })
    .then(response => response.json())
    .then(value => (factory.Flags.log(`Web API Result: ${JSON.stringify(value)}`, value), value));
  
  FN.subscribe = (tier, client, price, email, name, domain, type) => {
    factory.Flags.log(`Creating ${type} Subscription for: ${domain}`);
    var customer = uuidv4();
    fetchJsonp(`${DEFAULTS.url(DEFAULTS.endpoint)}?i=${e(customer)}&t=${e(tier)}&p=${e(price)}&e=${e(email)}&n=${e(name)}${domain ? `&d=${e(domain)}` : ""}`)
    .then(response => response.json())
    .then(value => {
      factory.Flags.log("Subscription Customer Creation:", value);
      var stripe = Stripe(client);
      return stripe.redirectToCheckout({
        lineItems: [{price: price, quantity: 1}],
        mode: "subscription",
        successUrl: factory.Flags.full(`subscribed?i=google,id.${customer}`),
        cancelUrl: factory.Flags.full("pricing"),
        customerEmail: email,
        clientReferenceId: customer,
      });
    })
    .then(result => {
      factory.Flags.log("Stripe Result:", result);
      if (result.error) factory.Flags.error("Stripe Error:", result.error);
    })
    .catch(e => factory.Flags.error("Subscribe Error:", e))
    .then(factory.Display.busy({
      target : $(document.body),
      status : "Processing Subscription Request",
      fn : true
    }));
  };
  
  FN.subscriptions = (user, id) => {
    factory.Flags.log(`Fetching Subscription${id ? ` ${id}` : "s"} for:`, user.email);
    return FN.action(user.user, user.key, user.algorithm)("subscriptions", id ? {id: id} : null);
  };
  
  FN.client = user => {
    factory.Flags.log("Fetching Client for:", user.email);
    return FN.action(user.user, user.key, user.algorithm)("client");
  };
  
  FN.endpoint = (user, id, code, endpoint) => {
    factory.Flags.log(`Updating Endpoint for Subscription ${id}:`, endpoint);
    return FN.action(user.user, user.key, user.algorithm)("endpoint", {id: id, code: code, endpoint: endpoint});
  };
  /* <!-- Public Functions --> */
  
  return FN;
  
};