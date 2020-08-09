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
  var _holder = () => $(".library");
  
  var _all = () => FN.libraries.all()
    .then(libraries => {
        var _selector = ಠ_ಠ.Display.template.show({
              template: "selector",
              libraries: libraries,
              cancel: "/app/library",
              select_text: "Select",
              select_url: "#google,library",
              target: _holder(),
              clear: true
            });
      
        ಠ_ಠ.Display.state().change(FN.states.library.specific, FN.states.library.all);
      
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
    })
    .catch(e => ಠ_ಠ.Flags.error("Loading Libraries", e))
    .then(ಠ_ಠ.Main.busy("Loading Libraries", true));
  
  var _library = index => FN.libraries.one(index)
          .then(library => FN.libraries.db(library)
            .then(result => (ಠ_ಠ.Flags.log("LIBRARY:", library), FN.catalog.load(result.data)))
            .then(db => ರ‿ರ.db = db)
            .then(db => {
              ಠ_ಠ.Display.state().change(FN.states.library.specific, FN.states.library.loaded);
              $("#explore-library .library-name").text(library.name);
            
              var _element = _holder(),
                  _search = $("header.navbar form[data-role='search']"),
                  _input = _search.find("input[role='search']").focus();
            
              _search.find("button[type='submit']").off("click.search").on("click.search", e => {
                e.preventDefault();
                e.stopPropagation();
                var _terms = _input.val(),
                    _results = _terms ? db.search.books(_terms == "*" ? "" : _terms) : null,
                    _results_element = _element.find("#search-results").removeClass("d-none").find(".results");
                ಠ_ಠ.Flags.log("RESULTS:", _results);
                _element.find("#library-details")[_results ? "addClass" : "removeClass"]("d-none");
                _results ? ಠ_ಠ.Display.template.show(_.extend({
                  template: "results",
                  target: _results_element,
                  clear: true
                }, _results)) : ಠ_ಠ.Display.template.show({
                  template: "empty",
                  target: _results_element,
                  clear: true
                });
              });
            
              ಠ_ಠ.Display.template.show(_.extend({
                template: "details",
                target: _element,
                clear: true
              }, {
                count: db.count.books(),
                tags: db.count.tags()
              }));
            
            }))
            .then(ಠ_ಠ.Main.busy("Opening Library", true));
  
  var _book = id => Promise.resolve(ರ‿ರ.db.find.book(id))
    .then(book => book ? ಠ_ಠ.Display.template.show(_.extend({
                  template: "results",
                  target: _holder().find("#search-results .results"),
                  clear: true
                }, book)) : book)
    .then(() => $("header.navbar form[data-role='search'] input[role='search']").focus());
  
  var _search = terms => $("header.navbar form[data-role='search'] input[role='search']").val(terms)
    .parents("form").find("button[type='submit']").click();
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
      _.each(["Cache", "Client", "Demo", "Libraries", "Catalog"], module => FN[module.toLowerCase()] = ಠ_ಠ[module](_options, ಠ_ಠ));

      /* <!-- Get Window Title --> */
      ಱ.title = window.document.title;
      
    },

    /* <!-- App is ready for action - e.g. is authenticated but no initial routing done! --> */
    session: () => null,

    /* <!-- App is authenticated and routed! --> */
    routed: () => {

      /* <!-- Sets the currently focussed date | Done here as this is called when app restarts etc. --> */
      /* <!-- Overidden when a file is loaded --> */
      ರ‿ರ.current = ಠ_ಠ.Dates.now().startOf("day");
      
      /* <!-- Set the Initial State --> */
      ಠ_ಠ.Display.state().change(FN.states.views, FN.states.library.in);
      
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
        name : "Library",
        state : ರ‿ರ,
        states : FN.states.all,
        start : FN.setup.routed,
        routes : {
          book : {
            matches : /BOOK/i,
            state : FN.states.library.loaded,
            length : 1,
            fn : _book,
          },
          search : {
            matches : /SEARCH/i,
            state : FN.states.library.loaded,
            length : 1,
            fn : command => _search(decodeURIComponent(command)),
          },
          library : {
            matches : /LIBRARY/i,
            length : 1,
            fn : _library,
          },
          all : {
            matches : /ALL/i,
            length : 0,
            fn : _all,
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