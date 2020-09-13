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
  
  var _reset = header => {
    var _element = _holder(),
        _button = _element.find(".forward-button");
    _button.attr("href", _button.data("href") || _button.attr("href"));
    if (header) _element.find(".back-button").attr("href", "#overview");
    $(`${header ? "header.navbar " : ""}form[data-role='search'] input[role='search']:visible`).focus();
  };
  
  var _display = (element, results) => {
    var _results_element = element.find("#search-results").removeClass("d-none").find(".results");
    element.find("#library-details")[results ? "addClass" : "removeClass"]("d-none");
    return _results_element;
  };
  
  var _book = id => Promise.resolve(ರ‿ರ.db.find.book(id))
    .then(book => book ? _.tap(_.object(book.columns, book.values[0]), book => ಠ_ಠ.Flags.log("BOOK:", book)) : book)
    .then(book => ($("header.navbar form[data-role='search'] input[role='search']").focus(), book))
    .then(book => book ? Promise.resolve(ಠ_ಠ.Display.template.show({
                  template: "item",
                  target: _display(_holder(), book),
                  data: book,
                  clear: true
                }))
          .then(element => {
            /* <!-- Start Cover Download --> */
            if (book && book.Cover === 1) FN.libraries.cover(ರ‿ರ.library, book.Path)
                .then(cover => ಠ_ಠ.Display.template.show({
                  template: "cover",
                  target: element.find(".img-placeholder"),
                  image: cover || "",
                  replace: true
                }));
            /* <!-- Check Availability --> */
            if (ರ‿ರ.library.meta.capabilities.loan) 
              FN.libraries.available(ರ‿ರ.library, book[ರ‿ರ.library.meta.capabilities.loan_field || "ID"])
                .then(availability => {
                  ಠ_ಠ.Flags.log("AVAILABILITY:", availability);
                  if (ರ‿ರ.library.meta.capabilities.loan_field) {
                    var _row = element.find(`tr[data-field='${ರ‿ರ.library.meta.capabilities.loan_field}']`);
                    _.each(availability, copy => _row.find($(`td .badge:contains('${copy.copy}')`))
                           .append(ಠ_ಠ.Display.template.get(_.extend({template: "availability"}, copy), true)));
                  } else if (availability.length === 1) {
                    element.find("tr[data-field='ID']")
                      .find($(`td div:contains('${availability[0].copy}')`))
                      .append(ಠ_ಠ.Display.template.get(_.extend({template: "availability"}, availability[0]), true));
                  }
                });

             _reset(true);
      
            var _button = _holder().find(".forward-button"),
                _url = _button.data("href") || _button.attr("href");
            _button.data("href", _url);
            _button.attr("href", `${_url}.${book.ID}`);
      
            return book;
          }) : book);
  
  var _hookup = element => {
    var _query = "[data-action='click'][data-href]:visible";
    element.find(_query).off("dblclick.action").on("dblclick.action", e => {
      var _target = $(e.currentTarget);
      if (!_target.is("span")) {
        _target = _target.is(_query) ? _target : _target.parents(_query);
        window.location.hash = _target.data("href"); 
      }
    });
    return element;
  };
  
  var _search = (terms, element) => {
    var _results = terms ? ರ‿ರ.db.search.books(terms == "*" ? "" : terms) : null,
        _results_element = _display(element, _results);
    ಠ_ಠ.Flags.log("RESULTS:", _results);
    _results ? _results.values.length === 1 ? _book(_results.values[0][0]) : 
    _hookup(ಠ_ಠ.Display.template.show(_.extend({
      template: "results",
      target: _results_element,
      clear: true
    }, _results))) : ಠ_ಠ.Display.template.show({
      template: "empty",
      target: _results_element,
      clear: true
    });
    _reset(true);
  };
  
  var _searcher = e => {
                /* <!-- Stop any default form actions (e.g. Post) --> */
                e.preventDefault();
                e.stopPropagation();
    
                /* <!-- Get the search terms from the triggering element (search up the tree) --> */
                var _input = $(e.currentTarget).parents("form[data-role='search']").find("input[role='search']"),
                    _terms = _input.val();
    
                /* <!-- Not routed, so manually tidy up! --> */
                ಠ_ಠ.Display.tidy();
    
                /* <!-- Perform the search and push into the history state (to allow for blended back/forward navigation) --> */
                _search(_terms, _holder());
                window.history.pushState(null, null, `#search.${ಠ_ಠ.url.encode(encodeURIComponent(_terms))}`);
              };
  
  var _overview = (element, index) => Promise.resolve(ಠ_ಠ.Display.template.show({
                template: "details",
                target: element,
                details: ಠ_ಠ.Display.doc.get("LIBRARY"),
                clear: true,
                query: window.location.search,
                index: index,
                results: _.tap(ರ‿ರ.db.recent.all(5), recent => ಠ_ಠ.Flags.log("RECENT:", recent)),
              })).then(element => _hookup(element).find("form[data-role='search'] button[type='submit']")
                .off("click.search").on("click.search", _searcher));
  
  var _library = index => FN.libraries.one(ರ‿ರ.index = index)
          .then(library => ರ‿ರ.library = library)
          .then(library => FN.libraries.db(library)
            .then(result => (ಠ_ಠ.Flags.log("LIBRARY:", library), FN.catalog.load(result.data)))
            .then(db => ರ‿ರ.db = db)
            .then(() => {
              ಠ_ಠ.Display.state().change(FN.states.library.specific, FN.states.library.loaded);
              $("#explore-library .library-name").text(library.name);
            
              _overview(_holder(), index);
            
              $("header.navbar form[data-role='search'] button[type='submit']")
                .off("click.search").on("click.search", _searcher);
            
              ಠ_ಠ.Display.state().set(FN.states.library.manageable, library.meta.claims && library.meta.claims.manage);
              $("input[role='search']:visible").focus();

            }))
            .then(ಠ_ಠ.Main.busy("Opening Library", true));
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
      }, {
        name: "Url"
      }], helper => ಱ[helper.name.toLowerCase()] = ಠ_ಠ[helper.name](helper.options || null, ಠ_ಠ));

      /* <!-- Setup Function Modules --> */
      var _options = {
        functions: FN,
        state: {
          session: ರ‿ರ,
          application: ಱ
        }
      };
      _.each(["Cache", "Client", "Demo", "Libraries", "Catalog", "Lexer"], 
             module => FN[module.toLowerCase()] = ಠ_ಠ[module](_options, ಠ_ಠ));

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
        instructions: [{
          match: [
            /SEARCH/i,
            /FREE/i
          ],
          show: "SEARCH_FREETEXT_INSTRUCTIONS",
          title: "Free Text Searching ..."
        }, {
          match: [
            /SEARCH/i,
            /STRUCTURED/i
          ],
          show: "SEARCH_STRUCTURED_INSTRUCTIONS",
          title: "Structured Searching ..."
        }, {
          match: [
            /SEARCH/i
          ],
          show: "SEARCH_INSTRUCTIONS",
          title: "Searching a Library ..."
        }],
        routes : {
          book : {
            matches : /BOOK/i,
            state : FN.states.library.loaded,
            length : 1,
            tidy : true,
            fn : _book,
          },
          search : {
            matches : /SEARCH/i,
            state : FN.states.library.loaded,
            length : 1,
            tidy : true,
            fn : command => {
              var _terms = decodeURIComponent(ಱ.url.decode(command));
              $("header.navbar form[data-role='search'] input[role='search']").val(_terms);
              _search(_terms, _holder());
            },
          },
          library : {
            matches : /LIBRARY/i,
            length : 1,
            tidy : true,
            fn : _library,
          },
          overview : {
            matches : /OVERVIEW/i,
            length : 0,
            tidy : true,
            fn : () => {
              _overview(_holder(), ರ‿ರ.index);
              _reset();
            },
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