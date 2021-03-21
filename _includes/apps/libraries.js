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
    
      .then(libraries => _loaded === 0 ? (ಠ_ಠ.Display.template.show({
          template: "libraries",
          libraries: libraries,
          target: _libraries,
          clear: true
        }), libraries) : libraries)
    
      .then(libraries => {
        _.each(libraries, (library, index) => Promise.all([
          library.meta.capabilities && library.meta.capabilities.loan ? FN.libraries.loans.mine(library) : [],
          library.meta.capabilities && library.meta.capabilities.loan_requests ? FN.libraries.requests.mine(library) : []
        ]).then(results => {
          
          var _map = FN.common.process.loan(library),
              _loans = results[0] ? _.map(results[0], _map) : null,
              _requests = results[1];
          
          if (_loans) ಠ_ಠ.Flags.log(`My Loans: ${library.code} | ${library.name}`, _loans);
          if (_requests) ಠ_ಠ.Flags.log(`My Requests: ${library.code} | ${library.name}`, _requests);
          
          var _target = _libraries.find(`.library[data-index='${index}`),
              _commands = _target.find(".library-commands");
          
          if (_requests && _requests.length > 0) ಠ_ಠ.Display.template.show({
            template: "requests",
            library: index,
            count: _requests.length,
            target: _commands
          });
          
          if (_loans && _loans.length > 0) {
            ಠ_ಠ.Display.template.show({
              template: "loans",
              library: index,
              count: _loans.length,
              target: _commands
            }); 
            var _overdue = _.filter(_loans, loan => loan.overdue);
            if (_overdue.length > 0) ಠ_ಠ.Display.template.show({
              template: "overdue",
              library: index,
              count: _overdue.length,
              target: _target
            });
          }
          
        }));
      })
    
      .then(() => {
        window.removeEventListener(FN.events.endpoints.loaded, _endpoints_loaded, false);
        window.removeEventListener(FN.events.library.loaded, _library_loaded, false);
      });
    
  };
  
  var _start = () => _load().then(() => ಠ_ಠ.Display.state().enter(FN.states.landing.libraries));
	/* <!-- Internal Functions --> */
  
  
  /* <!-- Show Functions --> */
  FN.show = {
    
    generic: (type, items, library) => {
      var _items = FN.hookup.closer(ಠ_ಠ.Display.template.show({
        template: "items",
        type: type,
        code: library ? library.code : null,
        name: library ? library.name : null,
        items: items,
        target: $("#content .details"),
        clear: true
      }));
      
      if (!ರ‿ರ.libraries) ರ‿ರ.libraries = {};
      _.each(_items.filter(".detail[data-identifier]"), element => {
        
          var _element = $(element),
              _code = library ? library.code : _element.data("library"),
              _id = _element.data("identifier");
        
          if (FN.common.check.id(_id)) (ರ‿ರ.libraries[_code] === undefined ? 
            FN.libraries.db(_code, true)
            .then(result => (ರ‿ರ.libraries[_code] = result && result.data ? FN.catalog.load(result.data, 
              library ? library.meta.capabilities : {}) : null)) : Promise.resolve(ರ‿ರ.libraries[_code]))
              .then(db => FN.hookup.cover(_code, db ? FN.common.process.book(db.find.book(_id)) : null, _element, "100px"));
        
      });
      
    },
    
    loans: value => _.isObject(value) && value.code && value.name ? 
                        items => FN.show.generic("loan", items, value) : 
                        FN.show.generic("loan", value),
    
    requests: value => _.isObject(value) && value.code && value.name ? 
                        items => FN.show.generic("request", items, value) : 
                        FN.show.generic("request", value),
    
  };
  /* <!-- Show Functions --> */
  
  
  /* <!-- Process Functions --> */
  FN.process = {
    
    loans : (library, loans, type, filter) => _.chain(loans)
      .map(FN.common.process.loan(library))
      .filter(loan => filter ? filter(loan) : loan)
      .tap(loans => ಠ_ಠ.Flags.log(`My ${type} (${library.code}):`, loans))
      .value(),
    
  };
  /* <!-- Process Functions --> */

  
  /* <!-- Setup Functions --> */
  FN.setup = {

    modules: ["Common", "Cache", "Client", "Demo", "Libraries", "PWA", "Hookup", "Catalog"],
    
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
    
    refresh: {
      
      matches: /REFRESH/i,
      length: 0,
      tidy: true,
      fn: () => _load($(".libraries .library").length, true),
      
      routes : {
        
        library: {
          matches: /LIBRARY/i,
          length: 1,
          fn: command => {
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
        
      }
    },
    
    loans: {
      
      matches: /LOANS/i,
      length: 0,
      tidy: true,
      requires: ["sql-js", "spark-md5"],
      fn: () => FN.libraries.all()
        .then(libraries => _.filter(libraries, library => library.meta.capabilities && library.meta.capabilities.loan))
        .then(libraries => Promise.all(_.map(libraries, 
          library => FN.libraries.loans.mine(library)
            .then(loans => FN.process.loans(library, loans, "Loans"))
            .then(loans => _.tap(loans, loans => _.each(loans, loan => {
              loan.library = library.name;
              loan.code = library.code;
            }))))))
        .then(_.flatten)
        .then(loans => FN.show.loans(loans))
        .catch(e => ಠ_ಠ.Flags.error("Loading Loans Error", e))
        .then(ಠ_ಠ.Main.busy("Loading Loans", true)),
      
      routes : {
        
        library: {
          matches: /LIBRARY/i,
          length: 1,
          fn: command => FN.libraries.one(command)
            .then(library => FN.libraries.loans.mine(library)
                  .then(loans => FN.process.loans(library, loans, "Loans"))
                  .then(FN.show.loans(library)))
            .catch(e => ಠ_ಠ.Flags.error("Loading Loans Error", e))
            .then(ಠ_ಠ.Main.busy("Loading Loans", true))
        }
        
      }
      
    },
    
    overdue: {
      
      matches: /OVERDUE/i,
      length: 0,
      tidy: true,
      requires: ["sql-js", "spark-md5"],
      fn: () => FN.libraries.all()
        .then(libraries => _.filter(libraries, library => library.meta.capabilities && library.meta.capabilities.loan))
        .then(libraries => Promise.all(_.map(libraries, 
          library => FN.libraries.loans.mine(library)
            .then(loans => FN.process.loans(library, loans, "Overdue Loans", loan => loan.overdue))
            .then(loans => _.tap(loans, loans => _.each(loans, loan => {
              loan.library = library.name;
              loan.code = library.code;
            }))))))
        .then(_.flatten)
        .then(loans => FN.show.loans(loans))
        .catch(e => ಠ_ಠ.Flags.error("Loading Overdue Loans Error", e))
        .then(ಠ_ಠ.Main.busy("Loading Overdue Loans", true)),
      
      routes : {
        
        library: {
          matches: /LIBRARY/i,
          length: 1,
          fn: command => FN.libraries.one(command)
            .then(library => FN.libraries.loans.mine(library)
                  .then(loans => FN.process.loans(library, loans, "Overdue Loans", loan => loan.overdue))
                  .then(FN.show.loans(library)))
            .catch(e => ಠ_ಠ.Flags.error("Loading Overdue Loans Error", e))
            .then(ಠ_ಠ.Main.busy("Loading Overdue Loans", true))
        }
        
      }
      
    },
    
    requests: {
      
      matches: /REQUESTS/i,
      length: 0,
      tidy: true,
      requires: ["sql-js", "spark-md5"],
      fn: () => FN.libraries.all()
        .then(libraries => _.filter(libraries, 
          library => library.meta.capabilities && library.meta.capabilities.loan_requests))
        .then(libraries => Promise.all(_.map(libraries, 
          library => FN.libraries.requests.mine(library)
            .then(requests => FN.process.loans(library, requests, "Requests"))
            .then(requests => _.tap(requests, requests => _.each(requests, request => {
              request.library = library.name;
              request.code = library.code;
            }))))))
        .then(_.flatten)
        .then(requests => FN.show.requests(requests))
        .catch(e => ಠ_ಠ.Flags.error("Loading Requests Error", e))
        .then(ಠ_ಠ.Main.busy("Loading Requests", true)),
      
      routes : {
        
        library: {
          matches: /LIBRARY/i,
          length: 1,
          fn: command => FN.libraries.one(command)
            .then(library => FN.libraries.requests.mine(library)
                  .then(loans => FN.process.loans(library, loans, "Requests"))
                  .then(FN.show.requests(library)))
            .catch(e => ಠ_ಠ.Flags.error("Loading Requests Error", e))
            .then(ಠ_ಠ.Main.busy("Loading Requests", true))
        }
        
      }
      
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
        name: "Libraries",
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