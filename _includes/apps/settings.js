App = function() {
	"use strict";

	/* <!-- DEPENDS on JQUERY to work, but not to initialise --> */

	/* <!-- Returns an instance of this if required --> */
	if (this && this._isF && this._isF(this.App)) return new this.App().initialise(this);

	/* <!-- Internal Constants --> */
  const FN = {};
	/* <!-- Internal Constants --> */

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
  
  var _personal = () => FN.configuration.get()
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

        (_isEmpty ? FN.configuration.clear() : FN.configuration.set(_settings))
          .then(FN.common.result($(e.currentTarget)))
          .then(ಠ_ಠ.Main.busy("Saving Settings", true));

      });
    }).then(ಠ_ಠ.Main.busy("Loading Settings", true));
 
  var _library = index => FN.libraries.one(index)
              .then(library => Promise.all(
                [Promise.resolve(library), FN.libraries.settings(library), 
                  FN.libraries.db(library).then(result => FN.catalog.load(result.data, library.meta.capabilities))]
              ))
              .then(results => {

                var library = results[0], settings = results[1], db = results[2];

                ಠ_ಠ.Flags.log("LIBRARY:", library);
                ಠ_ಠ.Flags.log("SETTINGS:", settings);
                ಠ_ಠ.Flags.log("CUSTOM FIELDS:", db.fields().custom);

                ಠ_ಠ.Display.state().change(FN.states.settings.specific, FN.states.settings.library);
                $("#settings-for-library .library-name").text(library.name);

                /* <!-- Split/Join Managers into Array --> */
                if (settings.managers && settings.managers.split) 
                  settings.managers = settings.managers.split(",").join("\n");

                var _form = ಠ_ಠ.Display.template.show(_.extend({
                      template: "settings",
                      target: _holder(),
                      fields: db.fields().custom,
                      clear: true
                    }, settings));

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
                      memo[key] = key == "managers" ? value.Value ? value.Value.split("\n") : [] : value.Value;
                      return memo;
                    }, {});

                    ಠ_ಠ.Flags.log("Library Settings to Save", _settings);

                    FN.libraries.settings(library, _settings)
                      .then(value => value ? FN.libraries.refresh(library) : value)
                      .then(FN.common.result($(e.currentTarget)))
                      .then(ಠ_ಠ.Main.busy("Saving Settings", true));

                  });

              })
              .catch(e => ಠ_ಠ.Flags.error("Loading Settings", e))
              .then(ಠ_ಠ.Main.busy("Loading Settings", true));
  
  var _all = () => FN.libraries.all()
              .then(libraries => _.filter(libraries, "admin"))
              .then(libraries => {
                ಠ_ಠ.Display.state().change(FN.states.settings.specific, FN.states.settings.all);
                if (libraries.length > 0) {
                  var _selector = ಠ_ಠ.Display.template.show({
                        template: "selector",
                        libraries: libraries,
                        cancel: "/app/settings/",
                        select_text: "Select",
                        select_url: "#google,library",
                        target: _holder(),
                        clear: true
                      });
                  _selector.find("select").on("change.option", e => {
                        var _selected = $(e.target).find("option:selected"),
                            _value = _selected.val(),
                            _valid = _value && _value.startsWith("library"),
                            _button = _selector.find("a[data-role='select']");
                        _button.toggleClass("disabled", !_valid);
                        if (_valid) {
                          var _href = _button.attr("href").split(",");
                          if (_href.length == 2) {
                            _href[1] = _value;
                            _button.attr("href", _href.join(","));
                          }
                        } else {
                          _button.attr("href", _button.data("href"));           
                        }
                      });
                }
              })
              .catch(e => ಠ_ಠ.Flags.error("Loading Libraries", e))
              .then(ಠ_ಠ.Main.busy("Loading Libraries", true));
  
  var _select = {
    
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
	/* <!-- Internal Functions --> */
  
  /* <!-- Setup Functions --> */
  FN.setup = {

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
      }], helper => ಱ[helper.name.toLowerCase()] = ಠ_ಠ[helper.name](helper.options || null, ಠ_ಠ));

      /* <!-- Setup Function Modules --> */
      var _options = {
        functions: FN,
        state: {
          session: ರ‿ರ,
          application: ಱ
        }
      };
      _.each(["Common", "Cache", "Client", "Configuration", "Libraries", "Catalog"], 
             module => FN[module.toLowerCase()] = ಠ_ಠ[module](_options, ಠ_ಠ));

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
      ಠ_ಠ.Display.state().change(FN.states.views, FN.states.settings.in);
      
      /* <!-- Bind Escape --> */
      if (window.Mousetrap) {
        window.Mousetrap.unbind("esc");
        window.Mousetrap.bind("esc", () => $(".collapse.show").removeClass("show"));
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
        name: "Settings",
        state: ರ‿ರ,
        states: FN.states.all,
        start: FN.setup.routed,
        routes: {
          select: {
            matches: /SELECT/i,
            routes: {
              logo: {
                matches: /LOGO/i,
                scopes: ["https://www.googleapis.com/auth/drive.file"],
                requires: ["google"],
                length: 0,
                fn: _select.logo,
              },
              database: {
                matches: /DATABASE/i,
                scopes: ["https://www.googleapis.com/auth/drive.file"],
                requires: ["google"],
                length: 0,
                fn: _select.database,
              },
              folder: {
                matches: /FOLDER/i,
                scopes: ["https://www.googleapis.com/auth/drive.file"],
                requires: ["google"],
                length: 0,
                fn: _select.folder,
              },
              log: {
                matches: /LOG/i,
                scopes: ["https://www.googleapis.com/auth/drive.file"],
                requires: ["google"],
                length: 0,
                fn: _select.log,
              },
            }
          },
          library: {
            matches: /LIBRARY/i,
            length: 1,
            fn: _library,
          },
          all: {
            matches: /ALL/i,
            length: 0,
            fn: _all,
          },
          personal: {
            matches: /PERSONAL/i,
            length: 0,
            fn: _personal,
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
    clean: () => FN.cache && FN.cache.clear ? FN.cache.clear() : false,
    
	};

};