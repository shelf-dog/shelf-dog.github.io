App = function() {
	"use strict";

	/* <!-- DEPENDS on JQUERY to work, but not to initialise --> */

	/* <!-- Returns an instance of this if required --> */
	if (this && this._isF && this._isF(this.App)) return new this.App().initialise(this);

  
	/* <!-- Internal Constants --> */
  const FN = {},
        DEFAULT_ROUTE = "subscriptions";
	/* <!-- Internal Constants --> */

  
  /* <!-- Scope Constants --> */
  const SCOPE_DRIVE_FILE = "https://www.googleapis.com/auth/drive.file",
        SCOPE_SCRIPT_PROJECTS = "https://www.googleapis.com/auth/script.projects",
        SCOPE_SCRIPT_DEPLOYMENTS = "https://www.googleapis.com/auth/script.deployments";
  /* <!-- Scope Constants --> */
  
  
	/* <!-- Internal Variables --> */
	var ಠ_ಠ, /* <!-- Context --> */
      ರ‿ರ = {}, /* <!-- Session State --> */
      ಱ = {}; /* <!-- Persistant State --> */
	/* <!-- Internal Variables --> */

  
	/* <!-- Internal Functions --> */
  FN.create = subscription => FN.sheet.log(`SHELF-DOG | ${subscription.name}`, subscription.id, subscription.code)
    .catch(e => ಠ_ಠ.Flags.error("Logging Sheet Creation Error:", e))
    .then(ಠ_ಠ.Main.busy("Creating Log Sheet"))
    .then(id => id ? 
      ಠ_ಠ.Google.scripts.create(`SHELF-DOG | ${subscription.name} | API`, ಱ.spreadsheet = id)
        .then(script => (ಠ_ಠ.Google.files.update(ಱ.spreadsheet, FN.sheet.script_id.set(script.scriptId || script)), script))
        .then(script => script ? FN.sheet.script(script, subscription.public) : script)
        .then(script => script ? FN.sheet.app(script) : script)
        .then(url => {
          if (!url) return;
          ಠ_ಠ.Flags.log("Created Endpoint URL:", url);
          var _url = url.split("/"),
              _endpoint = _url[_url.length - 2];
          ಠ_ಠ.Flags.log("Endpoint:", _endpoint);
          var _actions = $(`[data-code='${subscription.code}'] [data-action='create']`)
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
            .then(user => FN.subscribe.endpoint(user, subscription.id, subscription.code, _endpoint));

        })
        .catch(e => {
          ಠ_ಠ.Flags.error("Script Creation Error:", e);
          return id ? ಠ_ಠ.Google.files.delete(id) : id;
        })
        .then(ಠ_ಠ.Main.busy("Creating Script"))
        : 
      id);
  
  FN.subscription = (subscription, file, latest) => {
    
    subscription.expires = subscription.expires ? new Date(subscription.expires) : "";
    subscription.file = file;

    subscription.version = subscription.file ? FN.sheet.version.get(subscription.file) : null;
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
  
  FN.subscriptions = id => FN.client.user()
    .then(user => Promise.all([
      FN.subscribe.subscriptions(user, id),
      FN.code.get(user),
      ಠ_ಠ.Google.files.search(ಠ_ಠ.Google.files.natives()[1], FN.sheet.query(), null, null, null, true),
    ]))
    .then(results => {

      var subscriptions = results[0],
          code = results[1],
          files = results[2],
          version = FN.code.latest;

      ಠ_ಠ.Flags.log("Subscriptions:", subscriptions);
      ಠ_ಠ.Flags.log("Code:", code);
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
                              _.find(files, FN.sheet.filter(subscription.id)), version)),
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
      return _subscription ? FN.sheet.script(FN.sheet.script_id.get(_subscription.file), _subscription.public)
        .then(script => Promise.all([ಠ_ಠ.Google.scripts.versions(script).list(), script]))
        .then(results => {
          var _version = _.chain(results[0]).sortBy("versionNumber").last().value();
          return [results[1], _version ? _version.versionNumber + 1 : 1];
        })
        .then(results => FN.sheet.app(results[0], results[1], _subscription.endpoint))
        .then(result => result ? ಠ_ಠ.Google.files.update(_subscription.file.id, FN.sheet.version.latest(),
                                                            _subscription.file.teamDriveId || null) : result)
        .then(result => result ? {
            result: result,
            subscription: _subscription
          } : result) : Promise.resolve(false);
    };
  
  FN.verify = file => {
    var _details = FN.sheet.details(file);
    ಠ_ಠ.Flags.log("Details:", _details);

    var _deployments = _details.script ? 
      ಠ_ಠ.Google.scripts.deployments(_details.script).list()
        .catch(e => (ಠ_ಠ.Flags.error("Deployments List Error:", e), []))
              .then(ಠ_ಠ.Main.busy("Verifying Deployments"))
      : Promise.resolve([]);

    return _deployments.then(deployments => {
      if (deployments && deployments.length > 0) 
        ಠ_ಠ.Flags.log("Deployments:", deployments);
      return ಠ_ಠ.Display.modal("verify", {
        id: "verify",
        target: $("body"),
        title: "Verify Library",
        instructions: ಠ_ಠ.Display.doc.get("VERIFY", null, true),
        deployments: _.map(deployments, deployment => ({
          id : deployment.deploymentId,
          updated : ಠ_ಠ.Dates.parse(deployment.updateTime),
          details : _.chain(deployment.entryPoints)
            .filter(entry => entry.entryPointType === "WEB_APP")
            .map("webApp")
            .map(entry => ({
              url: entry.url,
              for: entry.entryPointConfig.access,
              by: entry.entryPointConfig.executeAs,
            }))
            .first()
            .value()                                   
        })),
        details: _details,
        action: "Save",
      })
      .then(values => {
        if (!values) return;

        var _details = _.deepExtend({},
          values.Endpoint && values.Endpoint.Value === true ? 
                                    FN.sheet.endpoint.set() : {},
          values.Script && values.Script.Value ? 
                                    FN.sheet.script_id.set(values.Script.Value) : {},
          values.Subscription && values.Subscription.Value ?  
                                    FN.sheet.subscription.set(values.Subscription.Value) : {},
          values.Version && values.Version.Value ?
            FN.sheet.version.set(values.Version.Value) : {});

        ಠ_ಠ.Flags.log("UPDATED DETAILS:", _details);

        return _.keys(_details).length > 0 ? 
          ಠ_ಠ.Google.files.update(file.id, _details, file.teamDriveId || null)
            .catch(e => ಠ_ಠ.Flags.error("Script Creation Error:", e))
            .then(ಠ_ಠ.Main.busy("Updating Sheet")) : true;

      });

    });
  };
	/* <!-- Internal Functions --> */
  
  
  /* <!-- Setup Functions --> */
  FN.setup = {

    modules: ["Common", "Cache", "Client", "Subscribe", "Code", "Sheet"],
    
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
      
      /* <!-- Use Deep Extend --> */
      if (window.underscoreDeepExtend && window._) _.mixin({
        "deepExtend": underscoreDeepExtend(_)
      });
      
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

  
  /* <!-- Route Handlers --> */
  FN.routes = () => ({

    subscription: {
      matches: /ID/i,
      length: 1,
      scopes: [
        SCOPE_DRIVE_FILE
      ],
      trigger : FN.states.subscribed.working,
      fn: id => ಠ_ಠ.me ? FN.subscriptions(id) : ಱ.id = id,
    },

    subscriptions: {
      matches: /SUBSCRIPTIONS/i,
      length: 0,
      scopes: [
        SCOPE_DRIVE_FILE
      ],
      trigger : FN.states.subscribed.working,
      fn: () => FN.subscriptions(),
    },

    create: {
      matches: /CREATE/i,
      state: FN.states.subscribed.in,
      scopes: [
        SCOPE_SCRIPT_PROJECTS,
        SCOPE_SCRIPT_DEPLOYMENTS,
      ],
      length: 1,
      tidy: true,
      fn: code => ಱ.subscription && code == ಱ.subscription.code ? FN.create(ಱ.subscription) : Promise.resolve(false)
    },

    update: {
      matches: /UPDATE/i,
      state: FN.states.subscribed.in,
      scopes: [
        SCOPE_SCRIPT_PROJECTS,
        SCOPE_SCRIPT_DEPLOYMENTS,
      ],
      length: 1,
      tidy: true,
      fn: id => FN.update(id).catch(e => ಠ_ಠ.Flags.error("Logging Sheet Update Error:", e)).then(ಠ_ಠ.Main.busy("Updating Script"))
    },

    upgrade: {
      matches: /UPGRADE/i,
      state: FN.states.subscribed.in,
      scopes: [
        SCOPE_SCRIPT_PROJECTS,
        SCOPE_SCRIPT_DEPLOYMENTS,        
      ],
      length: 1,
      tidy: true,
      fn: id => FN.update(id)
        .then(result => {
            if (result && result.subscription) {
              FN.sheet.version.update(result.subscription.file, ರ‿ರ.version.version);
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
    
    verify: {
      matches: /VERIFY/i,
      state: FN.states.subscribed.in,
      scopes: [
        SCOPE_DRIVE_FILE,
        SCOPE_SCRIPT_PROJECTS,
        SCOPE_SCRIPT_DEPLOYMENTS,
      ],
      requires: ["google"],
      length: 0,
      tidy: true,
      fn: () => ಠ_ಠ.Router.pick.single({
                  title: "Select a Library to Verify",
                  view: "SPREADSHEETS",
                  all: true,
                  recent: true,
                  team: true,
                  mime: ಠ_ಠ.Google.files.natives()[1],
                }).then(file => file ? FN.verify(file) : file)
                .catch(e => e ? ಠ_ಠ.Flags.error("Details Error", e) : ಠ_ಠ.Flags.log("Details Cancelled"))
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
        name: "Subscribed",
        state: ರ‿ರ,
        states: FN.states.all,
        start: FN.setup.routed,
        public: "PUBLIC",
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
    clean: () => _.each(FN.setup.modules, module => FN[module.toLowerCase()] && FN[module.toLowerCase()].clean ?
                        FN[module.toLowerCase()].clean() : false),
    
	};

};