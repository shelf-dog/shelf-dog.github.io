App = function() {
	"use strict";

	/* <!-- DEPENDS on JQUERY to work, but not to initialise --> */

	/* <!-- Returns an instance of this if required --> */
	if (this && this._isF && this._isF(this.App)) return new this.App().initialise(this);

	/* <!-- Internal Constants --> */
  const FN = {},
    DEFAULT_ROUTE = "personal";
	/* <!-- Internal Constants --> */

  
  /* <!-- Scope Constants --> */
  const SCOPE_DRIVE_FILE = "https://www.googleapis.com/auth/drive.file",
        SCOPE_DRIVE_APPDATA = "https://www.googleapis.com/auth/drive.appdata";
  /* <!-- Scope Constants --> */
  
  
	/* <!-- Internal Variables --> */
	var ಠ_ಠ, /* <!-- Context --> */
      ರ‿ರ = {}, /* <!-- Session State --> */
      ಱ = {}; /* <!-- Persistant State --> */
	/* <!-- Internal Variables --> */

  
	/* <!-- Internal Functions --> */
  var _holder = () => $(".settings");
  
  var _link = (form, inputs, link) => form.find(inputs).on("change.id", e => {
      var _target = $(e.target),
          _value = _target.val(),
          _destinations = _target.parents("[data-output-field]").find("a[data-action='view'");
      if (/^[a-zA-Z0-9-_]+$/.test(_value)) {
        _destinations.attr("href", link(_value));
        _destinations.removeClass("disabled");
      } else {
        _destinations.addClass("disabled");
      }
      
    });
  /* <!-- Internal Functions --> */
  
  
  /* <!-- Show Functions --> */
  FN.show = {
    
    personal : () => ಠ_ಠ.Main.authorise(SCOPE_DRIVE_APPDATA)
    
    .then(result => result === true ? FN.configuration.get()
          .catch(e => ಠ_ಠ.Flags.error("Loading Personal Settings", e))
          .then(ಠ_ಠ.Main.busy("Loading Settings", true)) : false)
    
    .then(settings => {
      
      ಠ_ಠ.Display.state().change(FN.states.settings.specific, FN.states.settings.personal);
      
      var _form = ಠ_ಠ.Display.template.show(_.extend({
        template: "personal",
        target: _holder(),
        clear: true
      }, settings ? settings : {}));

      /* <!-- Handle Link Changes --> */
      _link(_form, "input[data-type='sheet']", id => `https://docs.google.com/spreadsheets/d/${id}/edit`);

      /* <!-- Handle Settings Clear --> */
      _form.find("button[type='clear'").on("click.clear", e => {
        
        e.preventDefault();
        e.stopPropagation();
        
        _form.find("input[type='text']").val("");
        _form.find("input[type='checkbox']").prop("checked", false);
        
      });
      
      /* <!-- Handle Settings Save --> */
      _form.find("button[type='submit'").on("click.submit", e => {
        
        e.preventDefault();
        e.stopPropagation();
        
        var _values = ಠ_ಠ.Data({}, ಠ_ಠ).dehydrate(_form);
        ಠ_ಠ.Flags.log("Personal Settings Form Values", _values);

        var _settings = {
          log: _values.log ? _values.log.Value : null,
          loans: _values.loans ? _values.loans.Value : null,
        };
        
        var _isEmpty = _.every(_settings, value => !value);
        
        ಠ_ಠ.Flags.log(`Personal Settings to Save [Empty=${_isEmpty}]`, _settings);

        ಠ_ಠ.Main.authorise(SCOPE_DRIVE_APPDATA)
          .then(result => {
            if (result === true) {
              (_isEmpty ? FN.configuration.clear() : FN.configuration.set(_settings))
                .then(FN.common.result($(e.currentTarget)))
                .then(ಠ_ಠ.Main.busy("Saving Settings", true));
            } else {
              ಠ_ಠ.Flags.log("App Data Scope not granted");
            }
          });
          
      });
    })
    .catch(e => ಠ_ಠ.Flags.error("Personal Settings", e)),
    
    library : index => FN.libraries.one(index)
      .then(library => library.admin ? Promise.all(
        [Promise.resolve(library), FN.libraries.settings(library), 
          FN.libraries.db(library).then(result => FN.catalog.load(result.data, library.meta.capabilities))]
      ) : null)
      .then(results => {

        if (!results) return;

        var library = results[0], settings = results[1], db = results[2];

        ಠ_ಠ.Flags.log("LIBRARY:", library);
        ಠ_ಠ.Flags.log("SETTINGS:", settings);
        ಠ_ಠ.Flags.log("CUSTOM FIELDS:", db.fields().custom);

        $("#settings-for-library .library-name").text(library.name);

        /* <!-- Split/Join Managers into Array --> */
        if (settings.managers && settings.managers.split) 
          settings.managers = settings.managers.split(",").join("\n");

        var _form = ಠ_ಠ.Display.template.show(_.extend({
              template: "settings",
              index: index,
              target: _holder(),
              fields: db.fields().custom,
              tags: db.tags(),
              clear: true
            }, settings));
        
        /* <!-- Handle Clear for Tags Filter --> */
        $(_form.find("button[data-action='clear']"))
          .on("click.action", e => ಱ.dialog.handlers.clear($(e.currentTarget), _form));
        
        /* <!-- Handle Filter for Tags --> */
        _form.find("input[data-action='filter']")
          .on("input.action", e => ಱ.dialog.handlers.filter($(e.currentTarget), _form));
        
        /* <!-- Handle Filter for Tags --> */
        _form.find("input[type='checkbox'][data-action='filter-selected']")
          .on("change.action", e => ಱ.dialog.handlers.filter_selected($(e.currentTarget), _form));
        
        /* <!-- Handle Database Link Changes --> */
        _link(_form, "input[data-type='file']", id => `https://drive.google.com/file/d/${id}/view`);

        /* <!-- Handle Library Folder Changes --> */
        _link(_form, "input[data-type='folder']", id => `https://drive.google.com/drive/folders/${id}`);

        /* <!-- Handle Settings Save --> */
        _form.find("button[type='submit'").on("click.submit", e => {

            e.preventDefault();
            e.stopPropagation();

            var _values = ಠ_ಠ.Data({}, ಠ_ಠ).dehydrate(_form);
            ಠ_ಠ.Flags.log("Library Settings Form Values", _values);

            var _settings = _.reduce(_values, (memo, value, key) => {
              memo[key] = key == "managers" ? value.Value ? value.Value.split("\n") : [] : value.Value === undefined ? value.Values : value.Value;
              return memo;
            }, {});

            ಠ_ಠ.Flags.log("Library Settings to Save", _settings);

            FN.libraries.settings(library, _settings)
              .then(value => value ? FN.libraries.refresh(library) : value)
              .then(FN.common.result($(e.currentTarget)))
              .then(ಠ_ಠ.Main.busy("Saving Settings", true));

          });

        /* <!-- Prepare Selector (if multiple libraries) --> */
        FN.select.all($(".libraries-selection"), false, true, "Select", "swap.cancel", "library", library.code);
        
        ಠ_ಠ.Display.state().exit([
          FN.states.library.manageable,
          FN.states.libraries.single, FN.states.libraries.multiple, FN.states.libraries.selecting,
        ]);
        ಠ_ಠ.Display.state().set(FN.states.library.manageable, library.meta.claims && library.meta.claims.manage);
        ಠ_ಠ.Display.state().change(FN.states.settings.specific, FN.states.settings.library);

        /* <!-- Return positive to indicate it has been handled --> */
        return true;
        
      })
      .catch(e => ಠ_ಠ.Flags.error("Loading Library Settings", e))
      .then(ಠ_ಠ.Main.busy("Loading Settings", true))
    
      /* <!-- If nothing is returned (e.g. not an admin) - fall back to showing personal settings --> */
      .then(result => result ? result : FN.show.personal()),
    
  };
  /* <!-- Show Functions --> */
  
  
  /* <!-- Creator Functions --> */
  FN.creator = {
    
    log: () => true,
    
  };
  /* <!-- Creator Functions --> */
  
  
  /* <!-- Selector Functions --> */
  FN.selector = {
    
    logo : () => ಠ_ಠ.Router.pick.single({
                      title: "Select a Logo Image for Emails",
                      view: "SPREADSHEETS",
                      all: true,
                      recent: true,
                      team: true,
                      mime: ಠ_ಠ.Google.files.natives()[1],
                      properties: _.object([ಱ.schema.property.name], [ಱ.schema.property.value]),
                    }).then(file => {
                      if (!file) return;
                      var _log = $("#settings_log");
                      _log.val(file.id).change();
                    }),
    
    log : () => ಠ_ಠ.Router.pick.single({
                      title: "Select a Reading Log to Open",
                      view: "SPREADSHEETS",
                      all: true,
                      recent: true,
                      team: true,
                      mime: ಠ_ಠ.Google.files.natives()[1],
                      properties: _.object([ಱ.schema.property.name], [ಱ.schema.property.value]),
                    }).then(file => {
                      if (!file) return;
                      var _log = $("#settings_log");
                      _log.val(file.id).change();
                    }),
    
    database : () => ಠ_ಠ.Router.pick.single({
                      title: "Please select Database File",
                      view: "DOCS",
                      recent: true,
                      navigation: true,
                      label: "My Drive",
                      all: true,
                      team: true,
                      query: "metadata.db",
                      mime: "application/octet-stream"
                    }).then(file => {
                      if (!file) return;
                      var _database = $("#settings_database"),
                          _folder = $("#settings_folder");
                      _database.val(file.id).change();
                      if (!_folder.val() && file.parents && file.parents.length > 0)
                        _folder.val(file.parents[0]).change();
                    }),
    
    folder : () => ಠ_ಠ.Router.pick.single({
                      title: "Please select Library Folder",
                      view: "FOLDERS",
                      folders: true,
                      team: true
                    }).then(folder => {
                      if (!folder) return;
                      var _folder = $("#settings_folder");
                      _folder.val(folder.id).change();
                    }),
    
  };
  /* <!-- Selector Functions --> */
  
  
  /* <!-- Purge Functions --> */
  FN.purge = {
    
    cache: () => FN.common.delay(1000)
                  .then(FN.cache.clean)
                  .then(ಠ_ಠ.Main.busy("Purging Cache", true))
                  .then(FN.common.result($("a[data-purge='cache']"))),
    
  };
  /* <!-- Purge Functions --> */
  
  
  /* <!-- Setup Functions --> */
  FN.setup = {

    modules: ["Common", "Cache", "Client", "Configuration", "Select", "Libraries", "Catalog", "PWA"],
    
    /* <!-- Setup required for everything, almost NOTHING is loaded at this point (e.g. ಠ_ಠ.Flags) --> */
    now: () => {

      /* <!-- Set Up / Create the States Module --> */
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
      }, {
        name: "Dialog"
      }], helper => ಱ[helper.name.toLowerCase()] = ಠ_ಠ[helper.name](helper.options || null, ಠ_ಠ));

      /* <!-- Check Demo Mode --> */
      ಱ.demo = ಠ_ಠ.Flags.demo();
      
      /* <!-- Setup Function Modules --> */
      var _options = {
        functions: FN,
        state: {
          session: ರ‿ರ,
          application: ಱ
        }
      };
      _.each(FN.setup.modules, module => FN[module.toLowerCase()] = ಠ_ಠ[module](_options, ಠ_ಠ));

      /* <!-- Create Schema Reference --> */
      ಱ.schema = ಠ_ಠ.Schema().latest();
      
      /* <!-- Get Window Title --> */
      ಱ.title = window.document.title;
      
    },

    /* <!-- App is ready for action - e.g. is authenticated but no initial routing done! --> */
    session: () => null,

    /* <!-- App is authenticated and routed! --> */
    routed: () => {
      
      /* <!-- Set the Initial State --> */
      ಠ_ಠ.Display.state().change(FN.states.views, ಱ.demo ? [FN.states.demo, FN.states.settings.in] : FN.states.settings.in);
      
      /* <!-- Bind Escape --> */
      if (window.Mousetrap) {
        window.Mousetrap.unbind("esc");
        window.Mousetrap.bind("esc", () => $(".collapse.show").removeClass("show"));
      }
      
      /* <!-- Default Route used in case we arrived here directly (instead of from another page) --> */
      if (ಠ_ಠ.Flags.cleared() && !ಠ_ಠ.Flags.initial() && !ಠ_ಠ.Display.state().in(FN.states.settings.working)) 
        window.location.hash = `#${DEFAULT_ROUTE}`;
    },

  };
  /* <!-- Setup Functions --> */

  
  /* <!-- Route Handlers --> */
  FN.routes = () => ({
    
    create: {
      matches: /CREATE/i,
      routes: {
        
        log: {
          matches: /LOG/i,
          state: FN.states.settings.personal,
          scopes: SCOPE_DRIVE_FILE,
          requires: ["google"],
          length: 0,
          fn: FN.creator.log,
        },
        
      }
    },
    
    select: {
      matches: /SELECT/i,
      routes: {
        
        logo: {
          matches: /LOGO/i,
          state: FN.states.settings.specific,
          scopes: SCOPE_DRIVE_FILE,
          requires: ["google"],
          length: 0,
          fn: FN.selector.logo,
        },
        
        database: {
          matches: /DATABASE/i,
          state: FN.states.settings.specific,
          scopes: SCOPE_DRIVE_FILE,
          requires: ["google"],
          length: 0,
          fn: FN.selector.database,
        },
        
        folder: {
          matches: /FOLDER/i,
          state: FN.states.settings.specific,
          scopes: SCOPE_DRIVE_FILE,
          requires: ["google"],
          length: 0,
          fn: FN.selector.folder,
        },
        
        log: {
          matches: /LOG/i,
          state: FN.states.settings.personal,
          scopes: SCOPE_DRIVE_FILE,
          requires: ["google"],
          length: 0,
          fn: FN.selector.log,
        },
        
      }
    },
    
    library: {
      matches: /LIBRARY/i,
      length: 1,
      trigger: FN.states.settings.working,
      fn: FN.show.library,
    },

    personal: {
      matches: /PERSONAL/i,
      length: 0,
      trigger: FN.states.settings.working,
      fn: FN.show.personal,
    },
    
    swap: {
      matches: /SWAP/i,
      state: [FN.states.settings.library, FN.states.libraries.multiple],
      all: true,
      tidy: true,
      
      routes: {

        cancel: {
          matches: /CANCEL/i,
          length: 0,
          fn: () => ಠ_ಠ.Display.state().exit(FN.states.libraries.selecting)
        },
        
        show: {
          matches: /SHOW/i,
          length: 0,
          fn: () => ಠ_ಠ.Display.state().enter(FN.states.libraries.selecting),
        },
        
      },
      
    },
    
    purge: {
      matches: /PURGE/i,
      state: FN.states.settings.personal,
      tidy: true,
      
      routes: {

        cache: {
          matches: /CACHE/i,
          length: 0,
          fn: FN.purge.cache
        },

      },
      
    },
    
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
        name: "Settings",
        state: ರ‿ರ,
        states: FN.states.all,
        start: FN.setup.routed,
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