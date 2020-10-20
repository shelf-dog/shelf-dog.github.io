App = function() {
	"use strict";

	/* <!-- DEPENDS on JQUERY to work, but not to initialise --> */

	/* <!-- Returns an instance of this if required --> */
	if (this && this._isF && this._isF(this.App)) return new this.App().initialise(this);

	/* <!-- Internal Constants --> */
  const FN = {},
        DEFAULT_ROUTE = "library";
	/* <!-- Internal Constants --> */

	/* <!-- Internal Variables --> */
	var ಠ_ಠ, /* <!-- Context --> */
      ರ‿ರ = {}, /* <!-- Session State --> */
      ಱ = {}; /* <!-- Persistant State --> */
	/* <!-- Internal Variables --> */

	/* <!-- Internal Functions --> */
  var _holder = () => $(".library");
  
  var _clear = () => {
    delete ರ‿ರ.book;
    delete ರ‿ರ.availability;
    delete ರ‿ರ.available;
    ಠ_ಠ.Display.state().exit(FN.states.library.items);
  };
  
  var _reset = header => {
    var _element = _holder(),
        _button = _element.find(".forward-button:visible");
    _button.attr("href", _button.data("href") || _button.attr("href"));
    if (header) _element.find(".back-button").attr("href", "#overview");
    $(`${header ? "header.navbar " : ""}form[data-role='search'] input[role='search']:visible`).focus();
  };
  
  var _display = (element, results) => {
    var _results_element = element.find("#search-results").removeClass("d-none"),
        _header_element = _results_element.find(".header");
    _results_element = _results_element.find(".results");
    element.find("#library-details")[results ? "addClass" : "removeClass"]("d-none");
    if (results) _.isArray(results.values) && results.values.length > 0 ?
        _header_element.removeClass("d-none").text(`${results.values.length} Result${results.values.length > 1 ? "s" : ""}`) :
        _header_element.addClass("d-none").text("Results");
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
            
            /* <!-- Set Item Selected State --> */
            ಠ_ಠ.Display.state().enter(FN.states.library.item);
      
            /* <!-- Start Cover Download --> */
            if (book && book.Cover === 1) FN.libraries.cover(ರ‿ರ.library, book.Path)
                .then(cover => ಠ_ಠ.Display.template.show({
                  template: "cover",
                  target: element.find(".img-placeholder"),
                  image: cover || "",
                  replace: true
                }));
      
            /* <!-- Available Tagging --> */
            ರ‿ರ.available = availability => {
                
              ರ‿ರ.availability = availability;
              ಠ_ಠ.Flags.log("AVAILABILITY:", availability);

              /* <!-- Set Appropriate States --> */
              ಠ_ಠ.Display.state().set(FN.states.library.available, 
                                      availability && _.find(availability, value => value.available === true));
              ಠ_ಠ.Display.state().set(FN.states.library.returnable, 
                                      availability && _.find(availability, value => value.available === false));

              /* <!-- Remove existing tags --> */
              element.find("i[data-available]").remove();

              if (ರ‿ರ.library.meta.capabilities.loan_field) {
                var _row = element.find(`tr[data-field='${ರ‿ರ.library.meta.capabilities.loan_field}']`);
                _.each(availability, copy => _row.find($(`td .badge:contains('${copy.copy}')`))
                       .append(ಠ_ಠ.Display.template.get(_.extend({template: "availability"}, copy), true)));
              } else if (availability.length === 1) {
                element.find("tr[data-field='ID']")
                  .find($(`td div:contains('${availability[0].copy}')`))
                  .append(ಠ_ಠ.Display.template.get(_.extend({template: "availability"}, availability[0]), true));
              }
            };
      
            /* <!-- Check Availability --> */
            if (ರ‿ರ.library.meta.capabilities && ರ‿ರ.library.meta.capabilities.loan) 
              FN.libraries.available(ರ‿ರ.library, book[ರ‿ರ.library.meta.capabilities.loan_field || "ID"])
                .then(ರ‿ರ.available);

            _reset(true);
      
            var _button = _holder().find(".forward-button"),
                _url = _button.data("href") || _button.attr("href");
            _button.data("href", _url);
            _button.attr("href", `${_url}.${book.ID}`);
      
            return (ರ‿ರ.book = book);
          }) : (delete ರ‿ರ.book, delete ರ‿ರ.availability, delete ರ‿ರ.available, book));
  
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
    
    /* <!-- Clear any selected Book states --> */
    _clear();
    
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
                results: _.tap(ರ‿ರ.db.recent.all(!ರ‿ರ.library.meta || ರ‿ರ.library.meta.recent === undefined ? 
                                                 5 : ರ‿ರ.library.meta.recent),
                                recent => ಠ_ಠ.Flags.log("RECENT:", recent)),
              }))
    .then(element => _hookup(element).find("form[data-role='search'] button[type='submit']")
                .off("click.search").on("click.search", _searcher))
    .then(() => {
      /* <!-- Set Manageable and Loanable States --> */
      ಠ_ಠ.Display.state().exit([FN.states.library.manageable, FN.states.library.loanable]);
      ಠ_ಠ.Display.state().set(FN.states.library.manageable, ರ‿ರ.library.meta.claims && ರ‿ರ.library.meta.claims.manage);
      ಠ_ಠ.Display.state().set(FN.states.library.loanable, ರ‿ರ.library.meta.capabilities && ರ‿ರ.library.meta.capabilities.loan);
    })
    .then(_clear);
  
  var _library = (index, book) => (index === null || index === undefined ? 
      FN.libraries.first().then(library => _.tap(library, library => ರ‿ರ.index = library.code)) : FN.libraries.one(ರ‿ರ.index = index))
          .then(library => ರ‿ರ.library = library)
          .then(library => FN.libraries.db(library)
            .then(result => (ಠ_ಠ.Flags.log("LIBRARY:", library), FN.catalog.load(result.data)))
            .then(db => ರ‿ರ.db = db)
            .then(() => {
              ಠ_ಠ.Display.state().change(FN.states.library.specific, FN.states.library.loaded);
              $("#explore-library .library-name").text(library.name);
            
              _overview(_holder(), ರ‿ರ.index).then(() => book !== undefined && book !== null ? _book(book) : null);
            
              $("header.navbar form[data-role='search'] button[type='submit']")
                .off("click.search").on("click.search", _searcher);
            
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
      _.each(["Common", "Cache", "Client", "Demo", "Libraries", "Catalog", "Lexer"], 
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
      
      /* <!-- Default Route used in case we arrived here directly (instead of from another page) --> */
      if (ಠ_ಠ.Flags.cleared() && !ಠ_ಠ.Display.state().in(FN.states.library.working)) window.location.hash = `#${DEFAULT_ROUTE}`;
      
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
        center : true,
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
            trigger : FN.states.library.working,
            length : 1,
            tidy : true,
            fn : _book,
          },
          
          search : {
            matches : /SEARCH/i,
            state : FN.states.library.loaded,
            trigger : FN.states.library.working,
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
            trigger : FN.states.library.working,
            length : {
              min: 0,
              max: 2
            },
            tidy : true,
            fn : command => command && _.isArray(command) && command.length == 2 ? _library(command[0], command[1]) : _library(command),
          },
          
          item : {
            matches : /ITEM/i,
            state : FN.states.library.item,
            tidy: true,
            routes : {
              
              loan : {
                matches : /LOAN/i,
                fn: () => {
                  
                  /* <!-- Get Available Copies --> */
                  var _available = _.filter(ರ‿ರ.availability, available => available.available === true),
                      _process = availability => availability ? ರ‿ರ.available(availability) : false,
                      _error = e => e ? ಠ_ಠ.Flags.error("Loan Book Error", e) : ಠ_ಠ.Flags.log("Loan Book Cancelled"),
                      _loan = copy => ಠ_ಠ.Display.text({
                        id: "loan_confirm",
                        title: ಠ_ಠ.Display.doc.get({
                          name: "TITLE_CONFIRM_LOAN",
                          trim: true
                        }),
                        message: ಠ_ಠ.Display.doc.get("CONFIRM_LOAN", FN.common.format.book(ರ‿ರ.book, copy)),
                        action: "Loan",
                        simple: true
                      })
                      .then(user => FN.libraries.log.loan(ರ‿ರ.library, user, ರ‿ರ.book.ID, ರ‿ರ.book.ISBN, copy)
                            .then(ಠ_ಠ.Main.busy("Loaning Book", true))
                            .then(_process))
                      .catch(_error);
                      
                    _available.length === 1 ? _loan(_available[0].copy) : ಠ_ಠ.Display.choose({
                      id: "return_choose",
                      title: ಠ_ಠ.Display.doc.get({
                        name: "TITLE_CHOOSE_LOAN",
                        trim: true
                      }),
                      message: ಠ_ಠ.Display.doc.get("CHOOSE_LOAN"),
                      action: "Loan",
                      choices: _.map(_available, loan => ({
                        desc: ರ‿ರ.book.Title,
                        name: loan.copy
                      }))
                    })
                    .then(loan => loan ? _loan(loan.name) : false)
                    .catch(_error);
                  
                } 
              },
              
              return : {
                matches : /RETURN/i,
                fn: () => {
                  if (!ರ‿ರ.availability || !ರ‿ರ.book) return;
                  var _loaned = _.filter(ರ‿ರ.availability, available => available.available === false),
                      _process = availability => availability ? ರ‿ರ.available(availability) : false,
                      _return = copy => FN.libraries.log.returned(ರ‿ರ.library, copy)
                              .then(ಠ_ಠ.Main.busy("Returning Book", true))
                              .then(_process),
                      _error = e => e ? ಠ_ಠ.Flags.error("Return Book Error", e) : ಠ_ಠ.Flags.log("Return Book Cancelled");
                  
                  if (_loaned.length === 1) {
                    
                    /* <!-- Only one available item / copy --> */
                    ಠ_ಠ.Display.confirm({
                      id: "return_confirm",
                      title: ಠ_ಠ.Display.doc.get({
                        name: "TITLE_CONFIRM_RETURN",
                        trim: true
                      }),
                      message: ಠ_ಠ.Display.doc.get("CONFIRM_RETURN", FN.common.format.book(ರ‿ರ.book)),
                      action: "Return"
                    })
                      .then(confirmation => confirmation === true ? _return(_loaned[0].copy) : false)
                      .then(_process)
                      .catch(_error);
                    
                  } else if (_loaned.length > 1) {
                    
                    /* <!-- More than one outstanding loan --> */
                    ಠ_ಠ.Display.choose({
                      id: "return_choose",
                      title: ಠ_ಠ.Display.doc.get({
                        name: "TITLE_CHOOSE_RETURN",
                        trim: true
                      }),
                      message: ಠ_ಠ.Display.doc.get("CHOOSE_RETURN"),
                      action: "Return",
                      choices: _.map(_loaned, loan => ({
                        desc: ರ‿ರ.book.Title,
                        name: loan.copy
                      }))
                    })
                    .then(loan => loan ? _return(loan.name) : false)
                    .catch(_error);
                    
                  }
                  
                }
              }
              
            }
          },
          
          overview : {
            matches : /OVERVIEW/i,
            trigger : FN.states.library.working,
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