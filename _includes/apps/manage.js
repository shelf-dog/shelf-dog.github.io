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

  /* <!-- Overview Functions --> */
  
  /* <!-- Overview Functions --> */
  var _overview = {
    
    contents : () => ({
      title : "Contents",
      icon : "arrow_circle_up",
      background : "highlight",
      admin : ರ‿ರ.library.admin,
      values: _.filter(_.map(["Authors", "Books", "Comments", "Formats", "Publishers", "Ratings", "Series", "Tags"], property => ({
        name: property,
        count: ರ‿ರ.db.count[property.toLowerCase()](),
        route: `show.${property.toLowerCase()}`,
        background: property == "Books" ? "primary" : null,
        size: property == "Books" ? "h4" : null,
      })).concat(ರ‿ರ.library.meta.capabilities.loan_field ? [{
        name: "Physical Copies",
        count: ರ‿ರ.db.count.custom(ರ‿ರ.library.meta.capabilities.loan_field),
        route: "show.copies",
        background: "success",
        size: "h4"
      }] : []), count => count.count > 0)
    }),
    
    loans : () => ({
      name: "Loading Loans …",
      loading: true
    }),
    
    statistics : () => ({
      name: "Loading Stats …",
      loading: true
    }),
    
  };
  
	/* <!-- Internal Functions --> */
  var _holder = () => $(".manage");
  
  var _book = id => {
    var book = ರ‿ರ.library.meta.capabilities.loan_field ? 
        ರ‿ರ.db.find.copy(id, ರ‿ರ.library.meta.capabilities.loan_field) : ರ‿ರ.db.find.book(id);
    return book ? _.object(book.columns, book.values[0]) : book;
  };
  
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
  
  var _loan = loan => {
    var book = _book(loan.copy || loan.id),
        loaned = loan.date ? ಠ_ಠ.Dates.parse(loan.date) : "",
        returned = loan.returned && _.isString(loan.returned) ? ಠ_ಠ.Dates.parse(loan.returned) : loan.returned,
        duration = loaned && _.isObject(loaned) ?
                    returned && _.isObject(returned) ? 
                      ಠ_ಠ.Dates.duration(returned - loaned) : 
                      ಠ_ಠ.Dates.duration(ಠ_ಠ.Dates.now() - loaned) : null;
    return {
      command: loan.copy || loan.id ? `/app/library/${window.location.search}#library.${ಱ.index}.${loan.id ? loan.id : `search.${loan.copy}`}` : "",
      item: loan.copy || loan.id,
      description: book ? `<strong>${book.Title}</strong>${book.Authors && book.Authors.length ? `<br/>${_.isString(book.Authors) ? book.Authors : book.Authors.join(" | ")}` : ""}` : "",
      who: loan.user,
      when: loaned,
      returned : returned,
      last : loan.last,
      duration : returned ? duration : null,
      overdue : duration && !returned && ರ‿ರ.library.meta.capabilities.loan_length && 
        duration.as("days") > ರ‿ರ.library.meta.capabilities.loan_length ? 
          `<strong class='text-warning'>Overdue by:</strong> ${duration.subtract({days: ರ‿ರ.library.meta.capabilities.loan_length}).humanize()}` : null
    };
  };
  
  var _log = details => loans => {
    if (!loans || loans.length === 0) return;
    ಠ_ಠ.Flags.log(`LOANS for [${details}]:`, loans);
    ಠ_ಠ.Display.template.show({
      template: "log",
      target: _holder(),
      clear: true,
      loans: _.map(loans, _loan),
      query: window.location.search,
      index: ಱ.index,
    });
    ಠ_ಠ.Display.state().enter(FN.states.manage.log);
  };
  
  var _search = terms => {
    ಠ_ಠ.Flags.log("SEARCHING:", terms);
    if (terms) FN.libraries.loans[/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi.test(terms) ? "user" : "copy"](ರ‿ರ.library, terms)
      .then(_log(terms))
      .catch(e => ಠ_ಠ.Flags.error("Fetching Loans Error", e))
      .then(ಠ_ಠ.Main.busy("Fetching Loans", true));
  };
  
  var _overdue = () => FN.libraries.loans.overdue(ರ‿ರ.library)
        .then(_log("Overdue"))
        .catch(e => ಠ_ಠ.Flags.error("Fetching Overdue Loans Error", e))
        .then(ಠ_ಠ.Main.busy("Fetching Overdue Loans", true));

  var _redirect = index => window.location.href = ಠ_ಠ.Flags.full(`/app/library/${window.location.search}#library.${index}`);
  
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
  
  var _show = (index, library) => {
    ಠ_ಠ.Display.state().enter([FN.states.library.loaded, FN.states.manage.loaded]);
    $("#manage-library .library-name").text(library.name);

    _hookup(ಠ_ಠ.Display.template.show({
        template: "overview",
        target: _holder(),
        clear: true,
        query: window.location.search,
        index: index,
        description: ಠ_ಠ.Display.doc.get("DETAILS"),
        details: [
          _overview.contents(),
          _overview.loans(),
          _overview.statistics()
        ]
      })).find("form[data-role='search'] button[type='submit']")
        .off("click.search").on("click.search", _searcher);

    $("header.navbar form[data-role='search'] button[type='submit']")
      .off("click.search").on("click.search", _searcher);

    $("input[role='search']:visible").focus();
    
    /* <!-- Load and Display Current Loans --> */
    FN.libraries.loans.outstanding(ರ‿ರ.library)
      .then(loans => (ಠ_ಠ.Flags.log("OUTSTANDING LOANS:", loans), ಠ_ಠ.Display.template.show({
        id: 1,
        template: "outstanding",
        title: "Loans",
        background: "success",
        icon: "local_library",
        loans: loans && loans.length ? _.map(loans, _loan) : null,
        target: $(".details .detail[data-index=1]"),
        replace: true
      })));
    
    /* <!-- Load and Display Statistics --> */
    FN.libraries.statistics(ರ‿ರ.library)
      .then(statistics => (ಠ_ಠ.Flags.log("STATISTICS:", statistics), ಠ_ಠ.Display.template.show({
        id: 2,
        template: "statistics",
        title: "Statistics",
        background: "light",
        icon: "insights",
        values : (statistics.overdue ? [{
            name: "Overdue",
            count: statistics.overdue,
            route: "overdue",
            size: "h4",
            background: "danger"
          }] : []).concat([
            {
              name: "Outstanding",
              count: statistics.outstanding,
              size: "h4",
              background: "warning"
            }, {
              name: "Returned",
              count: statistics.returned,
              route: "items.loan",
              background: "success"
            }, {
              name: "Loaned",
              count: statistics.loaned,
              route: "items.return",
              background: "light"
            }, {
              name: "Avg. Loan Length",
              count: statistics.durations ? ಠ_ಠ.Dates.duration(statistics.durations * 60 * 60 * 1000).humanize() : statistics.durations,
            },
          ])
          .concat(_.chain(statistics.weeks).map((count, week) => ({
            prefix: "Loans",
            name: `Week: ${week}`,
            week: week,
            class: "small py-1",
            size: "h6",
            colour: "info",
            background: "info",
            count: count
          })).sortBy("week").reverse().value()),
        target: $(".details .detail[data-index=2]"),
        replace: true
      })));
    ರ‿ರ.refresh = () => _show(index, library);
  };
  
  var _library = index => (index === null || index === undefined ? 
      FN.libraries.first(library => library && library.meta && library.meta.claims && library.meta.claims.manage)
        .then(library => _.tap(library, library => ಱ.index = library.code)) : 
      FN.libraries.one(ಱ.index = index))
        .then(library => ರ‿ರ.library = library)
        .then(library => FN.libraries.db(library)
          .then(result => (ಠ_ಠ.Flags.log("LIBRARY:", library), FN.catalog.load(result.data)))
          .then(db => ರ‿ರ.db = db)
          .then(() => library.meta.claims && library.meta.claims.manage ? _show(ಱ.index, library) : _redirect(index)))
      .then(ಠ_ಠ.Main.busy("Opening Library", true));
	/* <!-- Internal Functions --> */
  
  /* <!-- Setup Functions --> */
  FN.setup = {

    /* <!-- Setup required for everything, almost NOTHING is loaded at this point (e.g. ಠ_ಠ.Flags) --> */
    now: () => {

      /* <!-- Set Up / Create the States Module --> */
      FN.states = ಠ_ಠ.States();
      
      FN.backgrounds = ಠ_ಠ.Backgrounds();
      
      FN.events = ಠ_ಠ.Events();

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
      _.each(["Common", "Cache", "Client", "Libraries", "Catalog"], module => FN[module.toLowerCase()] = ಠ_ಠ[module](_options, ಠ_ಠ));

      /* <!-- Get Window Title --> */
      ಱ.title = window.document.title;
      
    },

    /* <!-- App is ready for action - e.g. is authenticated but no initial routing done! --> */
    session: () => null,

    /* <!-- App is authenticated and routed! --> */
    routed: () => {
      
      /* <!-- Set the Initial State --> */
      ಠ_ಠ.Display.state().change(FN.states.views, FN.states.manage.in);
      
      /* <!-- Bind Escape --> */
      if (window.Mousetrap) {
        window.Mousetrap.unbind("esc");
        window.Mousetrap.bind("esc", () => $(".collapse.show").removeClass("show"));
      }
      
      /* <!-- Default Route used in case we arrived here directly (instead of from another page) --> */
      if (ಠ_ಠ.Flags.cleared() && !ಠ_ಠ.Display.state().in(FN.states.manage.working)) window.location.hash = `#${DEFAULT_ROUTE}`;
        
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
        name: "Manage",
        state: ರ‿ರ,
        states: FN.states.all,
        start: FN.setup.routed,
        center : true,
        instructions: [{
          match: [
            /SEARCH/i
          ],
          show: "MANAGE_SEARCH_INSTRUCTIONS",
          title: "Searching a Library ..."
        }],
        routes: {
          
          library : {
            matches : /LIBRARY/i,
            trigger : FN.states.manage.working,
            length : {
              min: 0,
              max: 4
            },
            tidy : true,
            fn : command => (command && _.isArray(command) && command.length >= 1 ? 
              _library(command[0]) : _library(command || ಱ.index))
                .then(() => command && command.length >= 2 ? this.route(command.slice(command.length - 2)) : 
                      $("header.navbar form[data-role='search'] input[role='search']").val("")),
          },
          
          list : {
            
            matches : /SHOW/i, 
            state : FN.states.manage.loaded,
            tidy: true,
            
            routes : {
              
              authors : {
                matches : /AUTHORS/i,
                fn : () => ಠ_ಠ.Flags.log("SHOW AUTHORS")
              },
              
              books : {
                matches : /BOOKS/i,
                fn : () => ಠ_ಠ.Flags.log("SHOW BOOKS")
              },
              
              comments : {
                matches : /COMMENTS/i,
                fn : () => ಠ_ಠ.Flags.log("SHOW COMMENTS")
              },
              
              publishers : {
                matches : /PUBLISHERS/i,
                fn : () => ಠ_ಠ.Flags.log("SHOW PUBLISHERS")
              },
              
              series : {
                matches : /SERIES/i,
                fn : () => ಠ_ಠ.Flags.log("SHOW SERIES")
              },
              
              tag : {
                matches : /TAGS/i,
                fn : () => ಠ_ಠ.Flags.log("SHOW TAGS")
              },
              
            }
          },
          
          items : {
            
            matches : /ITEMS/i, 
            state : FN.states.manage.loaded,
            tidy: true,
            
            routes : {
              
              return : {
                matches : /RETURN/i,
                length : 0,
                fn : () => ಠ_ಠ.Display.text({
                        id: "returns_create",
                        target: $("body"),
                        title: ಠ_ಠ.Display.doc.get({
                          name: "TITLE_CONFIRM_RETURNS",
                          trim: true
                        }),
                        rows: 8,
                        control_class: "o-80",
                        message: ಠ_ಠ.Display.doc.get("CONFIRM_RETURNS"),
                        action: "Return",
                        actions: [
                          
                        ]
                      })
                      .then(copies => {
                        if (!copies) return;
                        copies = _.isArray(copies) ? copies : copies.split("\n");
                        ಠ_ಠ.Flags.log("RETURNING BOOKS", copies);
                        var _count = 0,
                            _returns = _.chain(copies).filter(copy => copy && copy.trim())
                              .map(copy => FN.libraries.log.returned(ರ‿ರ.library, copy.trim())
                                .then(availability => {
                                  ಠ_ಠ.Main.event(FN.events.returns.progress, 
                                                 ಠ_ಠ.Main.message(_count+=1, "book", "books", "returned"));
                                  return availability;
                                })).value();
                        return Promise.each(_returns)
                          .catch(e => ಠ_ಠ.Flags.error("Return Book/s Error", e))
                          .then(ಠ_ಠ.Main.busy(true, true, FN.events.returns.progress, 
                                                `Processing ${_returns.length} Return${_returns.length > 1 ? "s" : ""}`))
                          .then(availability => {
                            ಠ_ಠ.Flags.log("RETURNED BOOKS:", availability);
                            ಠ_ಠ.Display.inform({
                              id: "show_Returns",
                              title: "Returned Items",
                              target: $("body"),
                              content: ಠ_ಠ.Display.doc.get({
                                name: "RETURNS",
                                data: {
                                  total: _count,
                                  returned: _.filter(availability, value => !!value).length,
                                  invalid: _.filter(availability, value => value === undefined).length,
                                }
                              })
                            }).then(ರ‿ರ.refresh);
                          });
                      })
                      .catch(e => e ? ಠ_ಠ.Flags.error("Return Book/s Error", e) : ಠ_ಠ.Flags.log("Loan Book/s Cancelled"))
              },
              
              loan : {
                matches : /LOAN/i,
                length : 0,
                fn : () => ಠ_ಠ.Flags.log("LOAN ITEMS")
              }
              
            }
            
          },
          
          item : {
            
            matches : /ITEM/i, 
            state : FN.states.manage.loaded,
            tidy: true,
            
            routes : {
              
              return : {
                matches : /RETURN/i,
                length : 1,
                fn : id => {
                  var book = _book(id);
                  ಠ_ಠ.Display.confirm({
                      id: "return_confirm",
                      target: $("body"),
                      title: ಠ_ಠ.Display.doc.get({
                        name: "TITLE_CONFIRM_RETURN",
                        trim: true
                      }),
                      message: ಠ_ಠ.Display.doc.get("CONFIRM_RETURN", book ? FN.common.format.book(book) : "UNKNOWN BOOK"),
                      action: "Return"
                    })
                    .then(confirmation => {
                      if (confirmation === true) {
                        var _element = $(`[data-item='${id}']`).empty();
                        FN.libraries.log.returned(ರ‿ರ.library, id)
                          .then(ಠ_ಠ.Main.busy_element(_element))
                          .then(availability => availability && availability.length === 1 && availability[0].available === true ? true : false)
                          .then(result => ಠ_ಠ.Display.template.show({
                            template: result === true ? "returned" : "return",
                            target: _element,
                            clear: true,
                            item: id
                          }));
                      }     
                    })
                    .catch(e => e ? ಠ_ಠ.Flags.error("Return Book Error", e) : ಠ_ಠ.Flags.log("Return Book Cancelled"));
                }
                
              },
              
            }
            
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
                    
          overdue : {
            
            matches : /OVERDUE/i, 
            state : FN.states.manage.loaded,
            tidy : true,
            fn : _overdue
            
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