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

  /* <!-- EPUB Reader --> */
  
  /* <!-- EPUB Reader --> */
  
	/* <!-- Internal Functions --> */
  var _search = {
    
    basic: terms => ಠ_ಠ.Flags.log("SEARCHED:", terms),
    
    searcher: e => {
      /* <!-- Stop any default form actions (e.g. Post) --> */
      e.preventDefault();
      e.stopPropagation();

      /* <!-- Get the search terms from the triggering element (search up the tree) --> */
      var _input = $(e.currentTarget).parents("form[data-role='search']").find("input[role='search']"),
          _terms = _input.val();

      /* <!-- Not routed, so manually tidy up! --> */
      ಠ_ಠ.Display.tidy();

      /* <!-- Perform the search and push into the history state (to allow for blended back/forward navigation) --> */
      _search.basic(_terms);
      window.history.pushState(null, null, `#search.${ಱ.url.encode(encodeURIComponent(_terms))}`);
    },
    
  };
  
  var _settings = () => ಠ_ಠ.Display.modal("settings", {
                            id: "dialog_settings",
                            target: $("body"),
                            title:  ಠ_ಠ.Display.doc.get({
                                      name: "TITLE_READER_SETTINGS",
                                      trim: true
                                    }),
                            instructions: ಠ_ಠ.Display.doc.get("SETTINGS_INSTRUCTIONS", null, true),
                            validate: values => !!values,
                            enter: true,
                          }, dialog => {
                            ಠ_ಠ.Flags.log("DIALOG:", dialog);
                          })
                          .then(values => {
                            ಠ_ಠ.Flags.log("VALUES:", values);
                          });
  
  var _navigate = () => ಠ_ಠ.Display.modal("navigate", {
                            id: "dialog_navigate",
                            target: $("body"),
                            title:  ಠ_ಠ.Display.doc.get({
                                      name: "TITLE_READER_NAVIGATE",
                                      trim: true
                                    }),
                            instructions: ಠ_ಠ.Display.doc.get("NAVIGATE_INSTRUCTIONS", null, true),
                            contents: ರ‿ರ.reader.contents(),
                            enter: true,
                          }, dialog => {
                            ಠ_ಠ.Flags.log("DIALOG:", dialog);
                            dialog.find("[data-navigate]")
                              .on("click.navigate", e => ರ‿ರ.reader.navigate($(e.target).data("navigate")));
                          });
  
  var _read = (index, book, format, path, name) => (index === null || index === undefined ? 
        FN.libraries.first().then(library => _.tap(library, library => ರ‿ರ.index = library.code)) : FN.libraries.one(ರ‿ರ.index = index))
            .then(library => ರ‿ರ.library = library)
            .then(library => FN.libraries.download(library, path, name, true))
            .then(downloaded => {
              
              if (!downloaded) return;
              
              ಠ_ಠ.Flags.log("BOOK FORMAT:", format);
              
              if (format && format.toLowerCase() == "epub") {
                
                ಠ_ಠ.Display.template.show(_.extend({
                  template: "book",
                  target: $("#content"),
                  clear: true
                }));
                
                /* <!-- Load EPUB Method --> */
                return FN.epub.load(downloaded)
                  .then(value => ರ‿ರ.reader = value);
    
              }
              
            })
  
            /* <!-- Enter State (if a valid reader has been returned) --> */
            .then(value => value ? (ಠ_ಠ.Display.state().enter(FN.states.reader.loaded), value) : value)
  
            /* <!-- Generic Searcher (if a valid reader has been returned) --> */
            .then(value => value ? ($("header.navbar form[data-role='search'] button[type='submit']")
                .off("click.search").on("click.search", _search.searcher), value) : value)
                  
            .then(ಠ_ಠ.Main.busy("Opening Book", true));
	/* <!-- Internal Functions --> */
  
  /* <!-- Setup Functions --> */
  FN.setup = {

    /* <!-- Setup required for everything, almost NOTHING is loaded at this point (e.g. ಠ_ಠ.Flags) --> */
    now: () => {

      /* <!-- Set Up / Create the States & Events Module --> */
      FN.states = ಠ_ಠ.States();
      FN.events = ಠ_ಠ.Events();
      
      FN.backgrounds = ಠ_ಠ.Backgrounds();

      FN.decode = ಠ_ಠ.Strings().base64.decode;
      
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
      _.each(["Cache", "Client", "Libraries", "EPUB"], module => FN[module.toLowerCase()] = ಠ_ಠ[module](_options, ಠ_ಠ));

      /* <!-- Get Window Title --> */
      ಱ.title = window.document.title;
      
    },

    /* <!-- App is ready for action - e.g. is authenticated but no initial routing done! --> */
    session: () => null,

    /* <!-- App is authenticated and routed! --> */
    routed: () => {

      /* <!-- Set the Initial State --> */
      ಠ_ಠ.Display.state().change(FN.states.views, FN.states.reader.in);
      
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
        name: "Reader",
        state: ರ‿ರ,
        states: FN.states.all,
        start: FN.setup.routed,
        singular: true,
        center : true,
        instructions: [{
          match: [
            /SEARCH/i
          ],
          show: "SEARCH_INSTRUCTIONS",
          title: "Searching a Book..."
        }],
        routes: {
          
          library : {
            matches : /LIBRARY/i,
            trigger : FN.states.library.working,
            length : {
              min: 5,
              max: 6
            },
            tidy : true,
            fn : command => {
              if (ಠ_ಠ.Display.state().in(FN.states.reader.loaded)) return;
              var _run = () => _read(command[0], command[1], command[2], FN.decode(command[3]), FN.decode(command[4]));
              return (_.isArray(command) && command.length == 6 && (command[5] / 1024 / 1024) > 10) ?
                ಠ_ಠ.Display.confirm({
                  id: "reader_confirm",
                  target: $("body"),
                  center: true,
                  title: ಠ_ಠ.Display.doc.get({
                    name: "TITLE_CONFIRM_READER",
                    trim: true
                  }),
                  message: ಠ_ಠ.Display.doc.get("CONFIRM_READER", ಠ_ಠ.handlebars.bytes(command[5], 2)),
                  action: "Open"
                })
                .then(confirmation => confirmation === true ? _run() : false)
                .catch(e => e ? ಠ_ಠ.Flags.error("Open Reader Error", e) : ಠ_ಠ.Flags.log("Open Reader Cancelled")) : _run();
            }
          },
          
          font : {
            matches : /FONT/i,
            state : FN.states.reader.loaded,
            routes : {
              change : {
                matches : /^CHANGE$/i,
                length : {
                  min: 0,
                  max: 1
                },
                fn: command => ರ‿ರ.reader.font(command)
              },
              size : {
                matches : /^SIZE/i,
                length : 0,
                fn: () => ರ‿ರ.reader.size()
              },
            }
          },
          
          theme : {
            matches : /THEME/i,
            state : FN.states.reader.loaded,
            routes : {
              change : {
                matches : /^CHANGE$/i,
                length : {
                  min: 0,
                  max: 1
                },
                fn: command => ರ‿ರ.reader.theme(command)
              }
            }
          },
          
          enable : {
            matches : /^ENABLE$/i,
            keys: ["e", "E"],
            state : FN.states.reader.loaded,
            fn : () => {
              var _viewer = document.getElementById("viewer"),
                  _control = document.querySelector("a[href='#enable'] span.material-icons");
              if (_viewer.style["pointer-events"] == "none") {
                _viewer.style["pointer-events"] = "auto";
                _control.innerHTML = "link";
                _control.classList.remove("o-50");
              } else if (_viewer.style["pointer-events"] == "auto") {
                _viewer.style["pointer-events"] = "none";  
                _control.innerHTML = "link_off";
                _control.classList.add("o-50");
              }
            }
          },
          
          next : {
            matches : /NEXT/i,
            keys: ["right", "up", ".", ">"],
            actions: "swipeleft",
            state : FN.states.reader.loaded,
            fn : () => ರ‿ರ.reader.next()
          },
          
          previous : {
            matches : /PREVIOUS/i,
            keys: ["left", "down", ",", "<"],
            actions: "swiperight",
            state : FN.states.reader.loaded,
            fn : () => ರ‿ರ.reader.previous()
          },
          
          navigate : {
            matches : /NAVIGATE/i,
            keys: ["n", "N"],
            state : FN.states.reader.loaded,
            fn : _navigate
          },
          
          expand : {
            matches : /EXPAND/i,
            fn : () => screenfull && screenfull.isEnabled ? 
              screenfull.isFullscreen ? 
                screenfull.exit().then(() => ಠ_ಠ.Display.state().exit(FN.states.fullscreen)) :
                screenfull.request(document.getElementById("content")).then(() => ಠ_ಠ.Display.state().enter(FN.states.fullscreen)) : false,
          },
          
          settings : {
            matches : /SETTINGS/i,
            keys: ["s", "S"],
            fn : _settings
          },
          
          search : {
            matches : /SEARCH/i,
            state : FN.states.reader.loaded,
            length : 1,
            fn : command => _search.basic(command)
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