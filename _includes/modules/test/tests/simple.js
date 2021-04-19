Simple = function(options, factory) {
  "use strict";

  /* <!-- HELPER: Form data to/from JSON Object --> */
  /* <!-- PARAMETERS: Options (see below) and a factory context (to generate modules, helpers etc) --> */
  /* <!-- REQUIRES: Global Scope: JQuery, Underscore --> */
  /* <!-- REQUIRES: Factory Scope: Flags --> */

  /* <!-- Internal Constants --> */
  /* <!-- Internal Constants --> */
  
  /* <!-- Internal Variables --> */
  var assert, key;
  /* <!-- Internal Variables --> */

  /* <!-- Internal Functions --> */
  var _key = () => {
    var key = KEYUTIL.generateKeypair("RSA", 1024);
    return {
      
      public : KEYUTIL.getPEM(key.pubKeyObj),
      
      private : KEYUTIL.getPEM(key.prvKeyObj, "PKCS1PRV")
      
    };
  };
  /* <!-- Internal Functions --> */
    
  /* <!-- Scaffolding Functions --> */
  /* <!-- Scaffolding Functions --> */
      
  /* <!-- External Visibility --> */
  return {

    /* <!-- External Functions --> */
    start: () => (
      assert = chai.assert,
      key = _key(),
      factory.Flags.log("START Called").reflect(true)
    ),
    
    metadata: () => new Promise(resolve => {

      var _fail = e => resolve(factory.Flags.error("Metadata Test FAILED", e).reflect(false)),
          _succeed = () => resolve(factory.Flags.log("Metadata Test SUCCEEDED").reflect(true));
      
      try {

        options.functions.settings.get()
          .then(config => {
          
            /* <!-- Check Configuration Settings --> */
            assert.ok(config);
          
            var _client = options.functions.client.client(config.ID, null, config.ALGORITHM, config.KEY);
          
            /* <!-- No need to run sequentially, so don't need to use functions! --> */
            Promise.each([
              
              _client(config.OWNER, "META")
                .then(meta => {

                  assert.ok(meta, "Metadata returned from Client API");

                  assert.ok(meta.version, `Version: ${meta.version}`);

                  assert.equal(meta.user, config.OWNER, `User: ${meta.user}`);

                  assert.ok(meta.details, "User Details returned from Client API");

                  assert.ok(meta.details.display, `Display Name: ${meta.details.display}`);

                  assert.ok(meta.details.search && meta.details.search.length > 0, "Search Details returned from User");

                  assert.strictEqual(meta.claims.owner, true, `User: ${meta.user} is an OWNER`);

                  assert.strictEqual(meta.claims.manage, true, `User: ${meta.user} is a MANAGER`);

                }),
              
              _client(chance.email(), "META")
                .then(meta => {
                  
                  assert.strictEqual(Object.keys(meta.claims).length, 0, `User: ${meta.user} has NO claims`);
                  
                }),
              
              _client(chance.email(), "META", null, true)
                .then(meta => {
                  
                  assert.strictEqual(meta.claims.admin, true, `User: ${meta.user} is an ADMIN`);
                
                  assert.notOk(meta.claims.owner, `User: ${meta.user} is NOT an OWNER`);
                
                  assert.notOk(meta.claims.manage, `User: ${meta.user} is NOT a MANAGER`);
                  
                }),
              
            ])
            .then(_succeed)
            .catch(_fail);
          
          })
          .catch(_fail);
        
      } catch (err) {
        
        _fail(err);
        
      }

    }),
    
    invalid: () => new Promise(resolve => {
      
      var _fail = e => resolve(factory.Flags.error("Invalid Test FAILED", e).reflect(false)),
          _succeed = () => resolve(factory.Flags.log("Invalid Test SUCCEEDED").reflect(true));
      
      try {

        options.functions.settings.get()
          .then(config => {
          
            /* <!-- Check Configuration Settings --> */
            assert.ok(config);
          
            var _client = options.functions.client.client(config.ID, null, config.ALGORITHM, config.KEY),
                _yesterday = options.functions.client.client(config.ID, factory.Dates.now().add(-1, "d"),
                                                              config.ALGORITHM, config.KEY),
                _impersonate = options.functions.client.client(config.ID, null, config.ALGORITHM, key.private);
          
            /* <!-- No need to run sequentially, so don't need to use functions! --> */
            Promise.each([
              
              /* <!-- Check Attempt to call the API without a user email is rejected --> */
              _client("", "META")
                .then(meta => {
                  
                  assert.equal(meta.authorised, false, "Not Authorised Response for Empty User");
                  
                }),
              
              /* <!-- Check Attempt to call the API with a day old token fails (token replay attack) --> */
              _yesterday(config.OWNER, "META")
                .then(meta => {
                  
                  assert.equal(meta.refresh, true, "Expired Access for Out of Date Token");
                  
                }),
              
              /* <!-- Check Attempt to call the API with a different user email (token hijack attack) --> */
              _client(config.OWNER, "META", null, null, chance.email())
                .then(meta => {
                  
                  assert.equal(meta.authorised, false, "Not Authorised Response for Hijacking User");
                  
                }),
              
              _impersonate(config.OWNER, "META")
                .then(meta => {
                  
                  assert.equal(meta.authorised, false, "Not Authorised Response for Alternative Key Signature");
                  
                })
              
            ])
            .then(_succeed)
            .catch(_fail);
          
          })
          .catch(_fail);
        
      } catch (err) {
        
        _fail(err);
        
      }
      
    }),
    
    settings: () => new Promise(resolve => {

      var _fail = e => resolve(factory.Flags.error("Settings Test FAILED", e).reflect(false)),
          _succeed = () => resolve(factory.Flags.log("Settings Test SUCCEEDED").reflect(true));
      
      try {

        options.functions.settings.get()
          .then(config => {
          
            /* <!-- Check Configuration Settings --> */
            assert.ok(config);
          
            var _client = options.functions.client.client(config.ID, null, config.ALGORITHM, config.KEY);
          
            var _manager = chance.email();
          
            var _changes = [
              {
                name : "recent_items",
                value : 10
              }, {
                name : "capabilities_online_items",
                value : true
              }, {
                name : "description",
                value : "Testing Library"
              }, {
                name : "capabilities_loan",
                value : true
              }, {
                name : "managers",
                value : [factory.me.email, _manager]
              }
            ];

            var _false = [
              "capabilities_loan_requests_deny_overdue", "capabilities_loan_requests",
              "capabilities_loan", "capabilities_loan_requests", "capabilities_online_items",
              "contents_books_physical", "contents_books_audio", "contents_books_electronic",
              "readonly"
            ], _null = [
              "folder", "database", "capabilities_loan_field"
            ], _empty = [
              "capabilities_loan_exclusions", "managers"
            ], _default = [
              {
                name : "capabilities_loan_length",
                value : 0
              }, {
                name : "email_logo",
                value : "1k4_cGivHqrAKbVadl6bLXOZvFbTvQRa1"
              }, {
                name : "description",
                value : "Library"
              }, {
                name : "recent_items",
                value : 5
              }
            ];
          
            var _verify = (settings, resolve, prefix) => {

              try {

                assert.ok(settings, "Settings have been returned");

                /* <!-- Check Default False Values --> */
                _false.forEach(setting => assert.strictEqual(settings[setting], false, 
                  `${setting}: correctly set as false [${prefix}]`));

                /* <!-- Check Default Null Values --> */
                _null.forEach(setting => assert.strictEqual(settings[setting], null, 
                  `${setting}: correctly set as null [${prefix}]`));

                /* <!-- Check Default Empty Array Values --> */
                _empty.forEach(setting => assert.ok(
                  settings[setting] && typeof settings[setting] === "object" && 
                    settings[setting].constructor === Array && settings[setting].length === 0, 
                  `${setting}: correctly set as empty array [${prefix}]`));

                /* <!-- Check Default Values --> */
                _default.forEach(setting => assert.equal(settings[setting.name], setting.value, 
                  `${setting.name}: correctly set as ${setting.value} [${prefix}]`));

              } catch (e) {
                _fail(e);
              }

            };
          
            /* <!-- Use Functions to run sequentially --> */
            Promise.each([
              
              /* <!-- Check Non-Admin Users Cannot Access Settings --> */
              () => _client(config.OWNER, "SETTINGS")
                .then(settings => assert.isUndefined(settings, "Non-Admin user receives no settings")),
              
              /* <!-- Clearing Settings in case of inconsistent previous test state --> */
              () => _client(config.OWNER, "SETTINGS", {clear: true}, true)
                .then(settings => {
                  
                  /* <!-- Check Default Settings --> */
                  _verify(settings, resolve, "DEFAULT");
                  
                  var _settings = {};

                  _changes.forEach((change) => {
                    if (change.value && typeof change.value === "object" && change.value.constructor === Array) {
                      _settings[change.name] = change.value;
                    } else {
                      _settings[change.name] = change.value;
                    }
                  });
                  
                  return _client(config.OWNER, "SETTINGS", _settings, true)
                    .then(settings => {
 
                      try {
                        assert.ok(settings, "Saved Settings have been returned");
 
                        _changes.forEach((change) => assert.equal(_settings[change.name], change.value, 
                          `${change.name}: correctly set as ${change.value}`));

                        /* <!-- Use Functions to run sequentially --> */
                        return Promise.each([
                          
                          () => _client(_manager, "META")
                            .then(meta => assert.strictEqual(meta.claims.manage, true, `User: ${meta.user} is a MANAGER`)),
                          
                          () => _client(chance.email(), "META")
                            .then(meta => assert.strictEqual(Object.keys(meta.claims).length, 0, `User: ${meta.user} has NO claims`)),
                          
                          () => _client(config.OWNER, "SETTINGS", {managers : "*ALL*"}, true)
                            .then(() => _client(chance.email(), "META"))
                            .then(meta => assert.strictEqual(meta.claims.manage, true, `User: ${meta.user} is a MANAGER`))
                          
                        ]).catch(_fail);
                        
                      } catch (e) {
                        _fail(e);
                      }
                      
                    })
                    .catch(_fail);
                  
                }),
              
              /* <!-- Check Clear Settings --> */
              () => _client(config.OWNER, "SETTINGS", {clear: true}, true)
                .then(settings => _verify(settings, resolve, "CLEAR")),
                  
                  
            ])
            .then(_succeed)
            .catch(_fail);
          
          })
          .catch(_fail);

      } catch (err) {
        
        _fail(err);
        
      }
      
    }),
    
    management: () => new Promise(resolve => {
      
      var _fail = e => resolve(factory.Flags.error("Management Test FAILED", e).reflect(false)),
          _succeed = () => resolve(factory.Flags.log("Management Test SUCCEEDED").reflect(true));
      
      try {


        options.functions.settings.get()
          .then(config => {
          
            /* <!-- Check Configuration Settings --> */
            assert.ok(config);
          
            var _client = options.functions.client.client(config.ID, null, config.ALGORITHM, config.KEY);
          
            /* <!-- Use Functions to run sequentially --> */
            Promise.each([

              /* <!-- Check Non-Manager Users Cannot Access Users --> */
              () => _client(chance.email(), "USERS")
                .then(settings => assert.isUndefined(settings, "Non-Manager user receives no users")),
              
              () => _client(config.OWNER, "USERS", {notifications: true})
                .then(users => {
                  
                  assert.equal(users.length, 3, "Correct number of users returned");

                  var _users = users.filter((value) => value.id && value.name && value.display && value.notifications_to);

                  assert.equal(_users.length, 2, "Correct number of users with notifications returned");
                  
                }),
             
            ])
            .then(_succeed)
            .catch(_fail);
          
        }).catch(_fail);
        
      } catch (err) {
        
        _fail(err);
        
      }
      
    }),

    finish: () => factory.Flags.log("FINISH Called").reflect(true),
    /* <!-- External Functions --> */

  };
  /* <!-- External Visibility --> */
};