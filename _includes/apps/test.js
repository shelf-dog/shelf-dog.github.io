App = function() {
	"use strict";

	/* <!-- DEPENDS on JQUERY to work, but not to initialise --> */

	/* <!-- Returns an instance of this if required --> */
	if (this && this._isF && this._isF(this.App)) return new this.App().initialise(this);

  
	/* <!-- Internal Constants --> */
  const FN = {},
        ID = "Unit_Tests";
	/* <!-- Internal Constants --> */

  
  /* <!-- Scope Constants --> */
  const SCOPE_DRIVE_FILE = "https://www.googleapis.com/auth/drive.file",
        SCOPE_DRIVE_APPDATA = "https://www.googleapis.com/auth/drive.appdata",
        SCOPE_SCRIPT_PROJECTS = "https://www.googleapis.com/auth/script.projects",
        SCOPE_SCRIPT_DEPLOYMENTS = "https://www.googleapis.com/auth/script.deployments";
  /* <!-- Scope Constants --> */
  
  
	/* <!-- Internal Variables --> */
	var ಠ_ಠ, /* <!-- Context --> */
      ರ‿ರ = {}, /* <!-- Session State --> */
      ಱ = {}; /* <!-- Persistant State --> */
	/* <!-- Internal Variables --> */

  
  /* <!-- General Functions --> */
  const RANDOM = (lower, higher) => Math.random() * (higher - lower) + lower,
        ARRAYS = value => value === undefined || value === null ? [] : _.isArray(value) ? value : [value],
        SIMPLIFY = value => value && _.isArray(value) && value.length === 1 ? value[0] : value,
        NUMBER = /^\+?[1-9][\d]*$/,
        DELAY = ms => new Promise(resolve => setTimeout(resolve, ms)),
        RACE = time => promise => {
          var _timeout, _time = time ? time : 1000;
          var _success = val => {
              clearTimeout(_timeout);
              return Promise.resolve(val);
            },
            _failure = err => {
              clearTimeout(_timeout);
              return Promise.reject(err);
            };
          return Promise.race([
            promise.then(_success).catch(_failure),
            new Promise((resolve, reject) => _timeout = setTimeout(() =>
              reject(new Error(`Test Timed Out after running for ${_time} ms`)), _time))
          ]);
        },
        PROMISIFY = (fn, value) => new Promise(resolve => resolve(fn ? ಠ_ಠ._isF(fn) ? fn(value) : fn : true));
  /* <!-- General Functions --> */
  
  
  /* <!-- Interface Functions --> */
  FN.interface = {
    
    update : (result, expected) => {
      ಠ_ಠ.running -= 1;
      var _success = (result === (expected ?
        /^\s*(false|0)\s*$/i.test(expected) ?
        false : _.isString(expected) ?
        expected.toLowerCase() : true : true));
      ಠ_ಠ.succeeded += _success ? 1 : 0;
      $(`#${ID}_counter .content`)
        .html(`${ಠ_ಠ.succeeded}/${ಠ_ಠ.total}  <strong>${Math.round(ಠ_ಠ.succeeded/ಠ_ಠ.total*100)}%</strong>`)
        .toggleClass("text-success", ಠ_ಠ.succeeded == ಠ_ಠ.total);
      return _success;
    },

    click : buttons => Promise.each(_.map(buttons, button => () => new Promise((resolve, reject) => {

      var running, observer = new MutationObserver((mutationsList, observer) => {
        for (var mutation of mutationsList) {
          if (mutation.type == "attributes" && mutation.attributeName == "class") {
            if (button.classList.contains("loader")) {
              running = true;
            } else if (running) {
              if (button.classList.contains("success")) {
                observer.disconnect();
                resolve();
              } else if (button.classList.contains("failure")) {
                observer.disconnect();
                reject();
              }
            }
          }
        }
      });

      observer.observe(button, {
        attributes: true
      });
      button.click();

    }))),
    
  };
  /* <!-- Interface Functions --> */
  
  
  /* <!-- Run Functions --> */
  FN.run = {
    
    all : (module, id, times) => {

      var _this = $(`#${id}`),
        _buttons = _this.parent().siblings("a.btn").toArray();
      ಠ_ಠ.Flags.log("TEST BUTTONS:", _buttons);

      /* <!-- Clear the status and indicate busy status --> */
      _this.removeClass("success failure").addClass("loader disabled").find("i.result").addClass("d-none");

      /* <!-- Not returning as we are using a Singleton Router (for testing), which doesn't allow us to run parallel routes! --> */
      new Promise((resolve, reject) => {
        (times && times > 1 ?
          Promise.each(_.map(_.range(0, times), () => () => FN.interface.click(_buttons))) : FN.interface.click(_buttons))
        .then(() => {
            _this.removeClass("loader disabled").addClass("success")
              .find("i.result-success").removeClass("d-none");
            resolve();
          })
          .catch(() => {
            _this.removeClass("loader disabled").addClass("failure")
              .find("i.result-failure").removeClass("d-none");
            reject();
          });
      });

    },

    one : (module, test, id, expected) => {

      /* <!-- Check we have a module and a button --> */
      var _module = ಠ_ಠ._tests[module],
        _id = $(`#${id}`);
      if (!_module || _id.length === 0) return ಠ_ಠ.Flags.log(`No module called ${module} or no test id`).reflect();

      /* <!-- Clear the status and indicate busy status --> */
      _id.removeClass("success failure").addClass("loader disabled").find("i.result").addClass("d-none");

      /* <!-- Instatiate the Module if required, and call all relevant methods --> */
      _module = ಠ_ಠ._isF(_module) ? _module.call(ಠ_ಠ, {
          functions: FN
      }, ಠ_ಠ) : _module;
      var _start = _module.start,
        _finish = _module.finish,
        _command = _module[test],
        _result;

      /* <!-- Increment the total tests run counter --> */
      ಠ_ಠ.total += 1;

      /* <!-- Used to set overall success --> */
      var _outcome;

      PROMISIFY(_start)
        .then(value => PROMISIFY(_command, value))
        .then(result => {
          result = _.isArray(result) ? _.reduce(result, 
            (outcome, result) => outcome === false || result === false ? false : result, null) : result;
          _outcome = FN.interface.update((_result = result), expected);
          return PROMISIFY(_finish, {
            test: test,
            result: _result
          });
        })
        .catch(e => {
          _outcome = FN.interface.update("error", expected);
          ಠ_ಠ.Flags.error(`Module: ${module} | Test: ${test}`, e);
        })
        .then(() => _id.removeClass("loader disabled")
          .addClass(_outcome ? "success" : "failure")
          .find(`i.result-${_result ? "success" : "failure"}`)
          .removeClass("d-none"));
    },

    test : (module, test, id, expected) => test == "__all" ?
      FN.run.all(module, id, expected && NUMBER.test(expected) ? parseInt(expected, 10) : null) :
      (ಠ_ಠ.running += 1) && FN.run.one(module, test, id, expected),

    everything : () => {

      var _this = $("#____run_everything"),
        _buttons = $(".btn.test-all:visible").toArray();
      ಠ_ಠ.Flags.log("ALL TEST BUTTONS:", _buttons);

      /* <!-- Clear the status and indicate busy status --> */
      _this.removeClass("success failure").addClass("loader disabled").find("i.result").addClass("d-none");

      /* <!-- Not returning as we are using a Singleton Router (for testing), which doesn't allow us to run parallel routes! --> */
      FN.interface.click(_buttons)
        .then(() => _this.removeClass("loader disabled").addClass("success")
          .find("i.result-success").removeClass("d-none"))
        .catch(() => _this.removeClass("loader disabled").addClass("failure")
          .find("i.result-failure").removeClass("d-none"));

    },
    
  };
  /* <!-- Run Functions --> */
  
  
  /* <!-- Settings Functions --> */
  FN.settings = {
    
    configure: () => FN.settings.load()
      .then(settings => ಠ_ಠ.Display.modal("settings", {
              id: "settings",
              target: $("body"),
              title: "Client Test Settings",
              instructions: ಠ_ಠ.Display.doc.get("SETTINGS", null, true),
              settings: settings,
              action: "Save",
              action_desc: ಠ_ಠ.Display.doc.get("SAVE_SETTINGS", null, true),
            }, dialog => {
              
              ಠ_ಠ.Display.tooltips(dialog);
        
              var _update = (field, value) => {
                var _$ = (_.isString(field) ? dialog.find(field) : field).val(value).change();
                if (_$.is("textarea.resizable") && window && window.autosize) autosize.update(_$[0]);
              };
        
              /* <!-- Handle Clear --> */
              dialog.find("button[type='clear']").on("click.clear", e => {
                e.preventDefault();
                e.stopPropagation();
                dialog.find("input, textarea").each((i, element) => {
                  var _this = $(element);
                  _this.is(":checkbox") ?
                    _this.prop("checked", _this.data("default") == "true" || _this.data("default") === true || false)
                    .change() : _update(_this, "");
                });
              });
        
              /* <!-- Handle Reset --> */
              dialog.find("button[type='reset'][data-targets]").on("click.reset", e => {
                e.preventDefault();
                e.stopPropagation();
                _update(`#${e.currentTarget.dataset.targets}`, "");
              });
        
              /* <!-- Handle Populate Client / Endpoint Fields from Google Sheet --> */
              var _handle = () => ಠ_ಠ.Router.pick.single({
                    title: "Select a Client to Test",
                    view: "SPREADSHEETS",
                    all: true,
                    recent: true,
                    team: true,
                    mime: ಠ_ಠ.Google.files.natives()[1],
                  }).then(file => {
                    
                    if (!file) return;
                    
                    ಠ_ಠ.Flags.log("Google Drive Client Picked", file);
                    var _details = FN.sheet.details(file);
                    ಠ_ಠ.Flags.log("Details:", _details);

                    _update("[data-output-field='Client']", file.id);
                    if (_details && _details.script) _update("[data-output-field='Script']", _details.script);
                  });

              dialog.find("button[data-action='load-g-client'], a[data-action='load-g-client']")
                .off("click.client").on("click.client", _handle);
              
              dialog.find("textarea:visible, input:visible").first().focus();
        
            }))
    
      .then(values => {
          if (!values) return;

          var _settings = _.reduce(["Client", "Script", "Algorithm", "Key"], (memo, field) => {
            memo[field.toLowerCase()] = values[field] ? values[field].Value : null;
            return memo;
          }, {}),
          _isFull = _.every(_settings, value => value),
          _isEmpty = _.every(_settings, value => !value);
        
          ಠ_ಠ.Flags.log(`Test Settings to Save [Empty=${_isEmpty}]`, _settings);
        
          ಠ_ಠ.Display.state().set(FN.states.client.configured, _isFull);
          
          if (values.Persist && values.Persist.Value === true) {
            ಠ_ಠ.Flags.log("Persisting Settings to App Configuration");
            ಠ_ಠ.Main.authorise(SCOPE_DRIVE_APPDATA)
              .then(result => {
                if (result === true) {
                  (_isEmpty ? FN.configuration.clear() : FN.configuration.set(_settings))
                    .then(ಠ_ಠ.Main.busy("Saving Settings", true));
                } else {
                  ಠ_ಠ.Flags.log("App Data Scope not granted");
                }
              });
          }
        
      }),

    get: () => ರ‿ರ.settings ? Promise.resolve(ರ‿ರ.settings) :
      ಠ_ಠ.Main.authorise([
        SCOPE_DRIVE_FILE,
        SCOPE_SCRIPT_PROJECTS,
        SCOPE_SCRIPT_DEPLOYMENTS
      ]).then(result => result === true ? FN.configuration.get().then(FN.settings.process)
            .catch(e => ಠ_ಠ.Flags.error("Processing Test Settings", e))
            .then(ಠ_ಠ.Main.busy("Processing Settings", true)) : false),

    
    load: () => ಠ_ಠ.Main.authorise(SCOPE_DRIVE_APPDATA)
    
      .then(result => result === true ? FN.configuration.load()
            .catch(e => ಠ_ಠ.Flags.error("Loading Test Settings", e))
            .then(ಠ_ಠ.Main.busy("Loading Settings", true)) : false),

    process : settings => {
      if (!settings || !settings.script) return null;
      return Promise.all([
        ಠ_ಠ.Google.scripts.deployments(settings.script).list(),
        ಠ_ಠ.Google.scripts.get(settings.script),
      ])
      .then(results => {
        if (!results || !results[0] || !results[1]) return;
        var _settings = {
          ALGORITHM : settings.algorithm,
          KEY : settings.key,
          OWNER : results[1].creator.email,
          ID : _.chain(results[0])
                .filter(deployment => deployment.entryPoints && _.find(deployment.entryPoints, entry => entry.entryPointType == "WEB_APP" &&
                                                                      entry.webApp.entryPointConfig.access == "ANYONE_ANONYMOUS" &&
                                                                      entry.webApp.entryPointConfig.executeAs == "USER_DEPLOYING"))
                .sortBy("updateTime")
                .pluck("deploymentId")
                .last()
                .value()
        };
        ಠ_ಠ.Flags.log("Client Test Settings", _settings);
        return (ರ‿ರ.settings = _settings);
      });
    },
    
  };
  /* <!-- Settings Functions --> */
  
  
  /* <!-- Setup Functions --> */
  FN.setup = {

    modules: ["Common", "Configuration", "Client", "Sheet"],
    
    initialise: () => {
      ಠ_ಠ.total = 0;
      ಠ_ಠ.succeeded = 0;
      ಠ_ಠ.running = 0;
    },
    
    /* <!-- Setup required for everything, almost NOTHING is loaded at this point (e.g. ಠ_ಠ.Flags) --> */
    now: () => {

      /* <!-- Set Up / Create the State and Background Module --> */
      FN.states = ಠ_ಠ.States();
      
      FN.backgrounds = ಠ_ಠ.Backgrounds();

    },

    /* <!-- Start App after fully loaded (but BEFORE routing or authentication) --> */
    initial: () => {
      
      /* <!-- Set Random Background --> */
      FN.backgrounds.set();
      
      /* <!-- Setup Helpers --> */
      _.each([{
        name: "Strings"
      }], helper => ಱ[helper.name.toLowerCase()] = ಠ_ಠ[helper.name](helper.options || null, ಠ_ಠ));

      /* <!-- Setup Function Modules --> */
      var _options = {
        functions: FN,
        state: {
          session: ರ‿ರ,
          application: ಱ
        }
      };
      
      _.each(FN.setup.modules, module => FN[module.toLowerCase()] = ಠ_ಠ[module](_options, ಠ_ಠ));

      /* <!-- Get Window Title --> */
      ಱ.title = window.document.title;
      
      FN.setup.initialise();
      
    },

    /* <!-- App is ready for action - e.g. is authenticated but no initial routing done! --> */
    session: () => null,

    /* <!-- App is authenticated and routed! --> */
    routed: () => {
      
      /* <!-- Bind Escape --> */
      if (window.Mousetrap) {
        window.Mousetrap.unbind("esc");
        window.Mousetrap.bind("esc", () => $(".collapse.show").removeClass("show"));
      }
      
      var _start = () => {
        ಠ_ಠ.Display.template.show({
          template: "host",
          id: ID,
          target: ಠ_ಠ.container,
          instructions: ಠ_ಠ.Display.doc.get({
            name: "INSTRUCTIONS"
          }),
          run_all: ಠ_ಠ.Display.doc.get({
            name: "RUN_ALL"
          }),
          tests: ಠ_ಠ.Display.doc.get({
            name: "TESTS"
          }),
          clear: !ಠ_ಠ.container || ಠ_ಠ.container.children().length !== 0
        });

        /* <!-- Handle Highlights --> */
        ಠ_ಠ.Display.highlight();

        return true;
      };
      
      /* <!-- Show Tests --> */
      return _start();
      
    },

  };
  /* <!-- Setup Functions --> */
  
  
  /* <!-- Route Handlers --> */
  FN.routes = () => ({

    run: {
      
      matches: /RUN/i,
      length: {
        min: 3,
        max: 4
      },
      tidy: true,
      fn: command => FN.run.test.apply(this, command),
      
      routes: {
        
        all: {
          matches: /ALL/i,
          length: 0,
          fn: FN.run.everything,
        }
        
      }
      
    },
    
    settings: {
      matches: /SETTINGS/i,
      state: FN.states.authenticated,
      scopes: [
        SCOPE_DRIVE_FILE,
        SCOPE_DRIVE_APPDATA,
        SCOPE_SCRIPT_PROJECTS,
        SCOPE_SCRIPT_DEPLOYMENTS,
      ],
      requires: ["google"],
      length: 0,
      fn: FN.settings.configure,
    }
    
  });
  /* <!-- Route Handlers --> */

	/* <!-- External Visibility --> */
	return {

		/* <!-- External Functions --> */
		initialise: function(container) {

			/* <!-- Get a reference to the Container --> */
			ಠ_ಠ = container;

			/* <!-- Set Container Reference to this --> */
			container.App = this;
			
      /* <!-- Initial Setup Call --> */
      FN.setup.now();
      
			/* <!-- Set Up the Default Router --> */
      this.route = ಠ_ಠ.Router.create({
        name: "Test",
        state: ರ‿ರ,
        states: FN.states.all,
        start: FN.setup.routed,
        public: "PUBLIC",
        simple: true,
        singular: true,
        routes: FN.routes(),
        route: () => false, /* <!-- PARAMETERS: handled, command --> */
      });

			/* <!-- Return for Chaining --> */
			return this;

		},
    
    /* <!-- Setup Methods --> */
    start: FN.setup.initial,

    ready: FN.setup.session,

    
    /* <!-- Present Internal Modules / Functions (for debugging etc) --> */
    fn: FN,
    
    
    /* <!-- Present Internal State (for debugging etc) --> */
    state: ರ‿ರ,
    
    
    /* <!-- Present Persistent State (for debugging etc) --> */
    persistent: ಱ,
    
    
    /* <!-- Logged Out / Clean --> */
    clean: () => (FN.setup.initialise(), _.each(FN.setup.modules, module => FN[module.toLowerCase()] && FN[module.toLowerCase()].clean ?
                        FN[module.toLowerCase()].clean() : false)),
    
    
    /* <!-- Status Functions --> */
    running: ರ‿ರ.running,
    
    
    /* <!-- Helper Functions --> */
    delay: DELAY,

    race: RACE,

    arrays: ARRAYS,

    promisify: PROMISIFY,
    
    random: RANDOM,

    simplify: SIMPLIFY,

	};

};