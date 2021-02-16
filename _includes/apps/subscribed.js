App = function() {
	"use strict";

	/* <!-- DEPENDS on JQUERY to work, but not to initialise --> */

	/* <!-- Returns an instance of this if required --> */
	if (this && this._isF && this._isF(this.App)) return new this.App().initialise(this);

	/* <!-- Internal Constants --> */
  const FN = {},
        DEFAULT_ROUTE = "subscriptions";
	/* <!-- Internal Constants --> */

	/* <!-- Internal Variables --> */
	var ಠ_ಠ, /* <!-- Context --> */
      ರ‿ರ = {}, /* <!-- Session State --> */
      ಱ = {}; /* <!-- Persistant State --> */
	/* <!-- Internal Variables --> */

	/* <!-- Internal Functions --> */
  FN.subscription = (subscription, file, latest) => {
    
    subscription.expires = subscription.expires ? new Date(subscription.expires) : "";
    subscription.file = file;

    subscription.version = subscription.file ? FN.create.version.get(subscription.file) : null;
    if (subscription.version) subscription.version_details = ಠ_ಠ.Display.doc.get("VERSION_CLIENT", subscription.version);
    subscription.latest = latest.version;

    var _name = () => subscription.file.name.indexOf("SHELF-DOG") === 0 && subscription.file.name.indexOf(" | ") > 0 ?
            subscription.file.name.split(" | ")[1].trim() : subscription.file.name;
    subscription.upgradable = subscription.file && subscription.version != subscription.latest ?
      `upgrade.${subscription.file.id}` : null;
    subscription.updateable = subscription.file && !subscription.upgradable ? `update.${subscription.file.id}` : null;
    subscription.details = subscription.upgradable ? 
      ಠ_ಠ.Display.doc.get({
        name: "UPGRADE_CLIENT",
        data: {
          name: _name(),
          version: subscription.version,
          latest: subscription.latest
        }
      }) : subscription.updateable ? ಠ_ಠ.Display.doc.get("UPDATE_CLIENT", _name()) : null;

    subscription.create_details = ಠ_ಠ.Display.doc.get("CREATE_CLIENT");
    subscription.help_details = ಠ_ಠ.Display.doc.get("HELP_CLIENT");
    subscription.cancel_details = ಠ_ಠ.Display.doc.get("CANCEL_CLIENT");

    return subscription;
    
  };
  
  FN.subscriptions = id => Promise.all([
      FN.client.user().then(user => FN.subscribe.subscriptions(user, id)),
      ಠ_ಠ.Google.files.search(ಠ_ಠ.Google.files.natives()[1], FN.create.query(), null, null, null, true),
      FN.create.latest()
    ])
      .then(results => {
   
        var subscriptions = results[0],
            files = results[1],
            version = results[2];
    
        ಠ_ಠ.Flags.log("Subscriptions:", subscriptions);
        ಠ_ಠ.Flags.log("Files:", files);
        ಠ_ಠ.Flags.log("Version:", ರ‿ರ.version = version);
    
        if (subscriptions && _.isArray(subscriptions)) {
          subscriptions.length === 1 ? ಱ.subscription = subscriptions[0] : ಱ.subscriptions = subscriptions;
          ಠ_ಠ.Display.template.show({
            template: "subscribed",
            id: "subscriptions",
            instructions: ಠ_ಠ.Display.doc.get(id && ಱ.subscription && !ಱ.subscription.file ? "INSTRUCTIONS" : "MANAGE"),
            table: ಠ_ಠ.Display.template.get({
              template: "subscriptions",
              subscriptions: _.map(subscriptions, subscription => FN.subscription(subscription,
                                                                    _.find(files, FN.create.filter(subscription.id)), version)),
            }),
            target: ಠ_ಠ.container,
          });
        }
    
      })
      .then(() => ಠ_ಠ.Display.state().enter(FN.states.subscribed.in))
      .catch(e => ಠ_ಠ.Flags.error("Subscriptions Service Error:", e))
      .then(ಠ_ಠ.Main.busy("Fetching Subscription Details"));        
  
  FN.update = id => {
      var _subscription = ಱ.subscriptions ?
          _.find(ಱ.subscriptions, 
                  subscription => subscription.id == id || (subscription.file && subscription.file.id == id)) : ಱ.subscription;
      return _subscription ? FN.create.script(FN.create.script_id.get(_subscription.file), _subscription.public)
        .then(script => Promise.all([ಠ_ಠ.Google.scripts.versions(script).list(), script]))
        .then(results => {
          var _version = _.chain(results[0]).sortBy("versionNumber").last().value();
          return [results[1], _version ? _version.versionNumber + 1 : 1];
        })
        .then(results => FN.create.app(results[0], results[1], _subscription.endpoint))
        .then(result => result ? ಠ_ಠ.Google.files.update(_subscription.file.id, FN.create.version.set(),
                                                            _subscription.file.teamDriveId || null) : result)
        .then(result => result ? {
            result: result,
            subscription: _subscription
          } : result) : Promise.resolve(false);
    };
	/* <!-- Internal Functions --> */
  
  /* <!-- Setup Functions --> */
  FN.setup = {

    modules: ["Common", "Cache", "Client", "Subscribe", "Create"],
    
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
      
      /* <!-- Show Subscriptions --> */
      if (ಱ.id) {
        
        /* <!-- Show Subscription with supplied ID --> */
        FN.subscriptions(ಱ.id);
        
      } else if (!ಠ_ಠ.Flags.initial()) {
        
        /* <!-- Default Route used in case we arrived here directly (instead of from another page) --> */
        if (ಠ_ಠ.Flags.cleared() && !ಠ_ಠ.Display.state().in(FN.states.subscribed.working)) window.location.hash = `#${DEFAULT_ROUTE}`;
        
      }
      
    },

  };
  /* <!-- Setup Functions --> */

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
        name: "Subscribed",
        state: ರ‿ರ,
        states: FN.states.all,
        start: FN.setup.routed,
        public: "PUBLIC",
        routes: {
          
          subscription: {
            matches: /ID/i,
            length: 1,
            scopes: ["https://www.googleapis.com/auth/drive.file"],
            trigger : FN.states.subscribed.working,
            fn: id => ಠ_ಠ.me ? FN.subscriptions(id) : ಱ.id = id,
          },
          
          subscriptions: {
            matches: /SUBSCRIPTIONS/i,
            length: 0,
            scopes: [
              "https://www.googleapis.com/auth/drive.file"
            ],
            trigger : FN.states.subscribed.working,
            fn: () => FN.subscriptions(),
          },
         
          create: {
            matches: /CREATE/i,
            state: FN.states.subscribed.in,
            scopes: [
              "https://www.googleapis.com/auth/script.projects",
              "https://www.googleapis.com/auth/script.deployments",
            ],
            length: 1,
            tidy: true,
            fn: code => ಱ.subscription && code == ಱ.subscription.code ?
                  FN.create.log(`SHELF-DOG | ${ಱ.subscription.name}`, ಱ.subscription.id, ಱ.subscription.code)
                    .catch(e => ಠ_ಠ.Flags.error("Logging Sheet Creation Error:", e))
                    .then(ಠ_ಠ.Main.busy("Creating Log Sheet"))
                    .then(id => id ? 
                      ಠ_ಠ.Google.scripts.create(`SHELF-DOG | ${ಱ.subscription.name} | API`, ಱ.spreadsheet = id)
                        .then(script => (ಠ_ಠ.Google.files.update(ಱ.spreadsheet, FN.create.script_id.set(script.scriptId || script)), script))
                        .then(script => script ? FN.create.script(script, ಱ.subscription.public) : script)
                        .then(script => script ? FN.create.app(script) : script)
                        .then(url => {
                          if (!url) return;
                          ಠ_ಠ.Flags.log("Created Endpoint URL:", url);
                          var _url = url.split("/"),
                              _endpoint = _url[_url.length - 2];
                          ಠ_ಠ.Flags.log("Endpoint:", _endpoint);
                          var _actions = $(`[data-code='${code}'] [data-action='create']`)
                            .css("cursor", "none")
                            .css("pointer-events", "none")
                            .removeClass("badge-dark")
                            .addClass("badge-success o-50")
                            .append($("<span />", {
                              class: "md-24 md-light material-icons",
                              text: "check_circle"
                            })).parent("div");
                          ಠ_ಠ.Display.template.show({
                            template: "link",
                            id: ಱ.spreadsheet,
                            target: _actions,
                          });

                          /* <!-- Update Service with Endpoint --> */
                          return FN.client.user()
                            .then(user => FN.subscribe.endpoint(user, ಱ.subscription.id, ಱ.subscription.code, _endpoint));

                        })
                        .catch(e => {
                          ಠ_ಠ.Flags.error("Script Creation Error:", e);
                          return id ? ಠ_ಠ.Google.files.delete(id) : id;
                        })
                        .then(ಠ_ಠ.Main.busy("Creating Script"))
                        : 
                      id) : Promise.resolve(false)
          },
          
          update: {
            matches: /UPDATE/i,
            state: FN.states.subscribed.in,
            scopes: [
              "https://www.googleapis.com/auth/script.projects",
              "https://www.googleapis.com/auth/script.deployments",
            ],
            length: 1,
            tidy: true,
            fn: id => FN.update(id).catch(e => ಠ_ಠ.Flags.error("Logging Sheet Update Error:", e)).then(ಠ_ಠ.Main.busy("Updating Script"))
          },
          
          upgrade: {
            matches: /UPGRADE/i,
            state: FN.states.subscribed.in,
            scopes: [
              "https://www.googleapis.com/auth/script.projects",
              "https://www.googleapis.com/auth/script.deployments",
            ],
            length: 1,
            tidy: true,
            fn: id => FN.update(id)
              .then(result => {
                  if (result && result.subscription) {
                    result.subscription.file.appProperties.VERSION = ರ‿ರ.version.version;
                    result.subscription = FN.subscription(result.subscription, result.subscription.file, ರ‿ರ.version);
                    ಠ_ಠ.Flags.log("Updated Subscription:", result.subscription);
                    ಠ_ಠ.Display.template.show(_.extend({
                      target: $(`tr[data-code='${result.subscription.code}']`),
                      template: "subscription",
                      replace: true,
                    }, result.subscription));
                  }
                  return result;
                })
              .catch(e => ಠ_ಠ.Flags.error("Logging Sheet Upgrade Error:", e))
              .then(ಠ_ಠ.Main.busy("Upgrading Script"))
          },
          
        },
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
    clean: () => _.each(FN.setup.modules, module => FN[module.toLowerCase()] && FN[module.toLowerCase()].clean ?
                        FN[module.toLowerCase()].clean() : false),
    
	};

};