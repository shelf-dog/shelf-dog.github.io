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
  var _load = (number, force) => {
    var _libraries = $(".libraries"),
        _placeholder = number => (ಠ_ಠ.Display.template.show({
          template: "libraries",
          libraries: _.times(number, () => ({
            name: "Loading Library …",
            loading: true
          })),
          target: _libraries,
          clear: true
        }), number),
        _current = _placeholder(number || _.random(4, 10)),
        _loaded = e => _current > e.detail ? 
          _libraries.find(`.library:gt(${e.detail - 1})`).addClass("hide") :
          _placeholder(e.detail);
      
    window.addEventListener(FN.events.endpoints.loaded, _loaded, false);
    return FN.libraries.all(force)
      .then(libraries => ಠ_ಠ.Display.template.show({
          template: "libraries",
          libraries: libraries,
          target: _libraries,
          clear: true
        }))
      .then(() => {
        window.removeEventListener(FN.events.endpoints.loaded, _loaded, false);
      });
  };
	/* <!-- Internal Functions --> */
  
  /* <!-- Setup Functions --> */
  FN.setup = {

    /* <!-- Setup required for everything, almost NOTHING is loaded at this point (e.g. ಠ_ಠ.Flags) --> */
    now: () => {

      /* <!-- Set Up / Create the States & Events Module --> */
      FN.states = ಠ_ಠ.States();
      FN.events = ಠ_ಠ.Events();
      
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
      _.each(["Common", "Cache", "Client", "Demo", "Libraries", "PWA"], 
             module => FN[module.toLowerCase()] = ಠ_ಠ[module](_options, ಠ_ಠ));

      /* <!-- Get Window Title --> */
      ಱ.title = window.document.title;
      
    },

    /* <!-- App is ready for action - e.g. is authenticated but no initial routing done! --> */
    session: () => null,

    /* <!-- App is authenticated and routed! --> */
    routed: () => {

      /* <!-- Set the Initial State --> */
      ಠ_ಠ.Display.state().change(FN.states.views, FN.states.landing.in);
      
      /* <!-- Bind Escape --> */
      if (window.Mousetrap) {
        window.Mousetrap.unbind("esc");
        window.Mousetrap.bind("esc", () => $(".collapse.show").removeClass("show"));
      }
      
      /* <!-- Load the Libraries --> */
      _load().then(() => ಠ_ಠ.Display.state().enter(FN.states.landing.libraries));
      
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
        name: "Landing",
        state: ರ‿ರ,
        states: FN.states.all,
        start: FN.setup.routed,
        routes: {
          refresh_all: {
            matches: /REFRESH/i,
            length: 0,
            fn: () => {
              ಠ_ಠ.Display.tidy();
              _load($(".libraries .library").length, true);
            }
          },
          refresh_library: {
            matches: /REFRESH/i,
            length: 1,
            fn: command => {
              ಠ_ಠ.Display.tidy();
              ಠ_ಠ.Display.template.show({
                template: "library",
                loading: true,
                id: command,
                target: $(`.libraries .library[data-index='${command}']`),
                replace: true
              });
              FN.libraries.refresh(command)
                .then(result => ಠ_ಠ.Display.template.show(_.extend({
                  template: "library",
                  id: command,
                  target: $(`.libraries .library[data-index='${command}']`),
                  replace: true
                }, _.omit(result, ["api", "cache"]))));
            },
          }
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