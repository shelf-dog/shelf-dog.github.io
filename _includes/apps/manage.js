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
  
  var _search = (terms, element) => {
    ಠ_ಠ.Flags.log("SEARCHING:", terms);
    ಠ_ಠ.Flags.log("FROM:", element);
  };
  
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
    FN.libraries.loans(ರ‿ರ.library)
      .then(loans => (ಠ_ಠ.Flags.log("LOANS:", loans), ಠ_ಠ.Display.template.show({
        id: 1,
        template: "loans",
        title: "Loans",
        background: "success",
        icon: "local_library",
        loans: loans && loans.length ? _.map(loans, loan => {
          var book = _book(loan.id);
          return {
            command: `/app/library/${window.location.search}#library.${ರ‿ರ.index}.${loan.id}`,
            item: loan.id,
            description: book ? `<strong>${book.Title}</strong>${book.Authors && book.Authors.length ? `<br/>${_.isString(book.Authors) ? book.Authors : book.Authors.join(" | ")}` : ""}` : "",
            who: loan.user,
            when: loan.date ? ಠ_ಠ.Dates.parse(loan.date) : ""
          };
        }) : null,
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
        values : [
          {
            name: "Outstanding",
            count: statistics.outstanding,
            size: "h4",
            background: "danger"
          },{
            name: "Returned",
            count: statistics.returned,
            background: "success"
          },{
            name: "Loaned",
            count: statistics.loaned,
            background: "light"
          },{
            name: "Avg. Loan Length",
            count: statistics.durations,
          },
        ].concat(_.map(statistics.weeks, (count, week) => ({
          name: `Week: ${week}`,
          count: count
        }))),
        target: $(".details .detail[data-index=2]"),
        replace: true
      })));
    
  };
  
  var _library = index => (index === null || index === undefined ? 
      FN.libraries.first(library => library && library.meta && library.meta.claims && library.meta.claims.manage)
        .then(library => _.tap(library, library => ರ‿ರ.index = library.code)) : 
      FN.libraries.one(ರ‿ರ.index = index))
        .then(library => ರ‿ರ.library = library)
        .then(library => FN.libraries.db(library)
          .then(result => (ಠ_ಠ.Flags.log("LIBRARY:", library), FN.catalog.load(result.data)))
          .then(db => ರ‿ರ.db = db)
          .then(() => library.meta.claims && library.meta.claims.manage ? _show(ರ‿ರ.index, library) : _redirect(index)))
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
              max: 2
            },
            tidy : true,
            fn : command => command && _.isArray(command) && command.length == 2 ? _library(command[0], command[1]) : _library(command),
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
                  if (book) ಠ_ಠ.Display.confirm({
                      id: "return_confirm",
                      title: ಠ_ಠ.Display.doc.get({
                        name: "TITLE_CONFIRM_RETURN",
                        trim: true
                      }),
                      message: ಠ_ಠ.Display.doc.get("CONFIRM_RETURN", FN.common.format.book(book)),
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