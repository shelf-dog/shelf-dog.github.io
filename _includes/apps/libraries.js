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
        _loaded = null,
        _endpoints_loaded = e => _current > (_loaded = e.detail) ? 
          _libraries.find(`.library:gt(${e.detail - 1})`).addClass("hide") :
          _placeholder(e.detail),
        _library_loaded = e => {
          var _index = e.detail,
              _library = FN.libraries.loaded(_index);
          ಠ_ಠ.Flags.log(`LIBRARY ${_index} LOADED:`, _library);
          if (_library) {
            _loaded -= 1;
            ಠ_ಠ.Display.template.show({
              template: "library",
              id: _index,
              admin: _library.admin,
              code: _library.code,
              meta: _library.meta,
              name: _library.name,
              state: _library.state,
              target: _libraries.find(`.library:eq(${_index})`),
              replace: true
            });
          }
        };
      
    window.addEventListener(FN.events.endpoints.loaded, _endpoints_loaded, false);
    window.addEventListener(FN.events.library.loaded, _library_loaded, false);
    
    return FN.libraries.all(force, null)
      .then(libraries => _loaded === 0 ? ಠ_ಠ.Display.template.show({
          template: "libraries",
          libraries: libraries,
          target: _libraries,
          clear: true
        }) : true)
      .then(() => {
        window.removeEventListener(FN.events.endpoints.loaded, _endpoints_loaded, false);
        window.removeEventListener(FN.events.library.loaded, _library_loaded, false);
      });
  };
  
  var _start = () => _load().then(() => ಠ_ಠ.Display.state().enter(FN.states.landing.libraries));
	/* <!-- Internal Functions --> */
  
  
  /* <!-- Setup Functions --> */
  FN.setup = {

    modules: ["Common", "Cache", "Client", "Demo", "Libraries", "PWA"],
    
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

      /* <!-- Get Window Title --> */
      ಱ.title = window.document.title;
      
    },

    /* <!-- App is ready for action - e.g. is authenticated but no initial routing done! --> */
    session: () => null,

    /* <!-- App is authenticated and routed! --> */
    routed: () => {

      /* <!-- Set the Initial State --> */
      ಠ_ಠ.Display.state().change(FN.states.views, ಱ.demo ? [FN.states.demo, FN.states.landing.in] : FN.states.landing.in);
      
      /* <!-- Bind Escape --> */
      if (window.Mousetrap) {
        window.Mousetrap.unbind("esc");
        window.Mousetrap.bind("esc", () => $(".collapse.show").removeClass("show"));
      }
      
      /* <!-- Load the Libraries --> */
      /* <!-- Default Route used in case we arrived here directly (instead of from another page) --> */
      if (ಠ_ಠ.Flags.cleared() && !ಠ_ಠ.Flags.initial() && !ಠ_ಠ.Display.state().in(FN.states.libraries.working)) _start();
      
    },

  };
  /* <!-- Setup Functions --> */

  
  /* <!-- Route Handlers --> */
  FN.routes = () => ({
    
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
        name: "Landing",
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