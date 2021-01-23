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
    ರ‿ರ = {},
    /* <!-- Session State --> */
    ಱ = {}; /* <!-- Persistant State --> */
  /* <!-- Internal Variables --> */

  
  /* <!-- General Functions --> */
  FN.holder = () => $(".manage");
  /* <!-- General Functions --> */
  
  
  /* <!-- Hookup Functions --> */
  FN.hookup = {

    closer : element => {
      element.find("[data-action='close']").on("click.close", e => {
        e.preventDefault();
        $(e.target).parents(".card").remove();
      });
      return element;
    },
    
    links : element => {
      var _query = "[data-action='click'][data-href]:visible";
      element.find(_query).off("dblclick.action").on("dblclick.action", e => {
        var _target = $(e.currentTarget);
        if (!_target.is("span")) {
          _target = _target.is(_query) ? _target : _target.parents(_query);
          window.location.hash = _target.data("href");
        }
      });
      return FN.hookup.closer(element);
    },
    
    since : element => {
      var _current = ಠ_ಠ.Dates.now();
      element.find("[data-title='loaded-time']").tooltip({
        html: true,
        trigger: "click",
        title: function() {
          _.delay(element => element.tooltip("hide"), 2000, $(this));
          return `<strong>Data Loaded: </strong>${ಠ_ಠ.Dates.duration(ಠ_ಠ.Dates.now() - _current).humanize()} ago`;
        }
      });
      return element;
    },
  
  };
  /* <!-- Hookup Functions --> */

  
  /* <!-- Book Functions --> */
  FN.book = {
    
    get : (id, force) => {
      var book = ರ‿ರ.library.meta.capabilities.loan_field && !force ?
        ರ‿ರ.db.find.copy(id, ರ‿ರ.library.meta.capabilities.loan_field) : /\d+/.test(id) ? ರ‿ರ.db.find.book(id) : null;
      return book ? _.object(book.columns, book.values[0]) : book;
    },
    
  };
  /* <!-- Book Functions --> */
      
      
  /* <!-- List Functions --> */
  FN.list = {
    
    authors: () => ಠ_ಠ.Flags.log("LIST ALL AUTHORS"),

    books: () => ಠ_ಠ.Flags.log("LIST ALL BOOKS"),

    comments: () => ಠ_ಠ.Flags.log("LIST ALL COMMENTS"),

    copies: () => ಠ_ಠ.Flags.log("LIST ALL COPIES"),
    
    publishers: () => ಠ_ಠ.Flags.log("LIST ALL PUBLISHERS"),

    series: () => ಠ_ಠ.Flags.log("LIST ALL SERIES"),

    tags: () => ಠ_ಠ.Flags.log("LIST ALL TAGS"),
    
  };
  /* <!-- List Functions --> */
  
  
  /* <!-- Get Functions --> */
  FN.get = {
    
    requests : () => FN.libraries.requests.all(ರ‿ರ.library)
                .then(requests => FN.libraries.users(ರ‿ರ.library)
                  .then(users => _.each(users, user => {
                    _.chain(requests)
                      .filter(request => request.user == user.id)
                      .each(request => {
                        request.user = {
                          id: request.user,
                          name: user.name
                        };
                        request.command = `/app/library/${window.location.search}#library.${ಱ.index}.${request.id}`;
                        request.when = request.date ? ಠ_ಠ.Dates.parse(request.date) : "";
                      });
                  })).then(() => requests))
                .then(requests => (ಠ_ಠ.Flags.log("Requests:", requests), requests && requests.length > 0 ?
                        {
                          template: "requests",
                          title: "Requests",
                          icon: "shopping_basket",
                          background: "secondary",
                          movable: true,
                          resizable: true,
                          count: requests.length,
                          requests: requests
                        } : {
                          template: "empty",
                          title: "Requests",
                          icon: "shopping_basket",
                          background: "secondary",
                          movable: true,
                          message: "No Requests Found"
                        })),
    
    statistics : () => FN.libraries.statistics(ರ‿ರ.library)
      .then(statistics => (ಠ_ಠ.Flags.log("STATISTICS:", statistics), {
        template: "statistics",
        title: "Statistics",
        movable: true,
        background: "light",
        icon: "insights",
        values: (statistics.overdue ? [{
            name: "Overdue",
            count: statistics.overdue,
            route: "show.loans.overdue",
            size: "h4",
            background: "danger"
          }] : []).concat(statistics.requests ? [{
            name: "Requests",
            count: statistics.requests,
            route: "show.requests",
            size: "h4",
            background: "secondary"
          }] : []).concat([{
            name: "Outstanding",
            count: statistics.outstanding,
            route: "show.loans.outstanding",
            size: "h4",
            background: "warning"
          }, {
            name: "Returned",
            count: statistics.returned,
            route: "show.loans.returned",
            background: "success"
          }, {
            name: "Loaned",
            count: statistics.loaned,
            route: "show.loans.all",
            background: "light"
          }, {
            name: "Avg. Loan Length",
            count: statistics.durations ? ಠ_ಠ.Dates.duration(statistics.durations * 60 * 60 * 1000).humanize() : statistics.durations,
          }, ])
          .concat(_.chain(statistics.weeks).map((count, week) => ({
            prefix: "Loans",
            name: `Week: ${week}`,
            week: week,
            class: "small py-1",
            size: "h6",
            colour: "info",
            background: "info",
            count: count
          })).sortBy("week").reverse().value())
    })),
    
  };
  /* <!-- Get Functions --> */
  
  
  /* <!-- Show Functions --> */
  FN.show = {
  
    details : (id, value, template, movable, resizable) => {
      var _existing = $(`.details .detail[data-index=${id}]`);
      value.id = id;
      if (template) value.template = template;
      if (movable) value.movable = movable;
      if (resizable) value.resizable = resizable;
      value.target = _existing.length > 0 ? _existing : $(".details");
      value.replace = _existing.length > 0;
      return FN.hookup.closer(FN.hookup.since(ಠ_ಠ.Display.template.show(value)));
    },

    loading : (id, value) => (ಠ_ಠ.Display.template.show(_.extend(value, {
      id: id,
      template: "detail",
      target: $("#details"),
    })), id),
  
    overview : {

      contents: name => ({
        title: name || "Contents",
        icon: "library_books",
        background: "highlight",
        admin: ರ‿ರ.library.admin,
        static: true,
        movable: true,
        values: _.filter(_.map(["Authors", "Books", "Comments", "Formats", "Publishers", "Ratings", "Series", "Tags"], property => ({
          name: property,
          count: ರ‿ರ.db.count[property.toLowerCase()](),
          route: `list.${property.toLowerCase()}`,
          background: property == "Books" ? "primary" : null,
          size: property == "Books" ? "h4" : null,
        })).concat(ರ‿ರ.library.meta.capabilities.loan_field ? [{
          name: "Physical Copies",
          count: ರ‿ರ.db.count.custom(ರ‿ರ.library.meta.capabilities.loan_field),
          route: "list.copies",
          background: "success",
          size: "h4"
        }] : []), count => count.count > 0)
      }),
      
      loading: type => ({
        name: `Loading ${type} …`,
        loading: true
      }),

      loans: () => FN.show.overview.loading("Loans"),
      
      requests: () => FN.show.overview.loading("Requests"),
      
      statistics: () => FN.show.overview.loading("Stats"),

    },
 
    statistics : () => Promise.all([FN.show.loading(uuid.v4(), FN.show.overview.statistics()), FN.get.statistics()])
                            .then(results => FN.show.details(results[0], results[1])),
    
  };
  /* <!-- Show Functions --> */
  
  
  /* <!-- Loans Functions --> */
  FN.loans = {

    augment : loans => FN.libraries.users(ರ‿ರ.library)
      .then(users => _.each(users, user => {
        var _rows = loans.find(`[data-who='${user.id}']`);
        if (_rows.length > 0) {
          var _message = `${_rows.length} loan${_rows.length > 1 ? "s" : ""}`;
          _.each(_rows, row => ಠ_ಠ.Display.template.show({
            template: "user",
            name: user.name,
            message: _message,
            target: row,
            prepend: true
          }));
        }
      })),
    
    process : loan => {
      
      var book = FN.book.get(loan.copy || loan.id),
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
        returned: returned,
        last: loan.last,
        duration: returned ? duration : null,
        overdue: duration && !returned && ರ‿ರ.library.meta.capabilities.loan_length &&
          duration.as("days") > ರ‿ರ.library.meta.capabilities.loan_length ?
          `<strong class='text-warning'>Overdue by:</strong> ${duration.subtract({days: ರ‿ರ.library.meta.capabilities.loan_length}).humanize()}` : null
      };
      
    },
    
    show : (id, details, background, icon) => loans => loans && loans.length > 0 ?
      FN.loans.augment(FN.show.details(id, {
        title: details,
        background: background,
        icon: icon,
        movable: true,
        resizable: true,
        count: loans.length,
        loans: _.map(_.tap(loans, loans => ಠ_ಠ.Flags.log(`LOANS for [${details}]:`, loans)), FN.loans.process)
      }, "all")) : FN.show.details(id, {
        title: details,
        background: background,
        icon: icon,
        movable: true,
        message: "No Loans Found"
      }, "empty"),

    generic : (fn, title, background, icon) => fn(ರ‿ರ.library)
      .then(FN.loans.show(FN.show.loading(uuid.v4(), FN.show.overview.loans()), title, background, icon))
      .catch(e => ಠ_ಠ.Flags.error("Fetching Loans Error", e)),
    
    all : () => FN.loans.generic(FN.libraries.loans.all, "All Loans", "light"),
    
    overdue : () => FN.loans.generic(FN.libraries.loans.overdue, "Overdue Loans", "danger", "check_circle_outline"),
    
    outstanding : () => FN.loans.generic(FN.libraries.loans.outstanding, "Outstanding Loans", "warning", "check_circle_outline"),
    
    returned : () => FN.loans.generic(FN.libraries.loans.returned, "Returned Loans"),

  };
  /* <!-- Loans Functions --> */
  
  
  /* <!-- Search Functions --> */
  FN.search = {
    
    handle : e => {
      /* <!-- Stop any default form actions (e.g. Post) --> */
      e.preventDefault();
      e.stopPropagation();

      /* <!-- Get the search terms from the triggering element (search up the tree) --> */
      var _input = $(e.currentTarget).parents("form[data-role='search']").find("input[role='search']"),
        _terms = _input.val();

      /* <!-- Not routed, so manually tidy up! --> */
      ಠ_ಠ.Display.tidy();

      /* <!-- Perform the search and push into the history state (to allow for blended back/forward navigation) --> */
      FN.search.run(_terms, FN.holder());
      window.history.pushState(null, null, `#search.${ಠ_ಠ.url.encode(encodeURIComponent(_terms))}`);
    },

    run : terms => {
      if (!terms) return;
      ಠ_ಠ.Flags.log("SEARCHING:", terms);
      var _type = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi.test(terms) ? "user" : "copy";
      return FN.libraries.loans[_type](ರ‿ರ.library, terms)
        .then(FN.loans.show(FN.show.loading(uuid.v4(), FN.show.overview.loans()), `Loans for ${_type == "user" ? terms : FN.book.get(terms).Title || terms}`, "info"))
        .catch(e => ಠ_ಠ.Flags.error("Searching Loans Error", e));
    },

  };
  /* <!-- Search Functions --> */
  
  
  /* <!-- Items (Batch) Functions --> */
  FN.items = {
    
    return: () => ಠ_ಠ.Display.text({
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
                    actions: []
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
                            ಠ_ಠ.Main.message(_count += 1, "book", "books", "returned"));
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
                  .catch(e => e ? ಠ_ಠ.Flags.error("Return Book/s Error", e) : ಠ_ಠ.Flags.log("Return Book/s Cancelled")),
    
    loan: () => ಠ_ಠ.Display.modal("loan", {
                    id: "loans_create",
                    target: $("body"),
                    title: ಠ_ಠ.Display.doc.get({
                      name: "TITLE_CREATE_LOANS",
                      trim: true
                    }),
                    instructions: ಠ_ಠ.Display.doc.get("CREATE_LOANS_INSTRUCTIONS", null, true),
                    validate: values => values.Loans && values.Loans.Values &&
                      ((_.isArray(values.Loans.Values.Entries) && values.Loans.Values.Entries.length > 0) ||
                        (values.Loans.Values.Entries && values.Loans.Values.Entries.Item)),
                    enter: true,
                  }, dialog => {
                    ಠ_ಠ.Flags.log("DIALOG:", dialog);

                    var _action = () => {
                      var _source = dialog.find("[data-type='source']"),
                        _loan = ಠ_ಠ.Data({}, ಠ_ಠ).dehydrate(_source);
                      if (!_loan.Item || !_loan.Item.Value) {
                        _source.find("[data-output-field='Item']").focus();
                      } else if (!_loan.Who || !_loan.Who.Value) {
                        _source.find("[data-output-field='Who']").focus();
                      } else {
                        ಠ_ಠ.Display.template.show({
                          template: "entry",
                          target: dialog.find("[data-type='output']"),
                          item: _loan.Item.Value,
                          who: FN.common.process.user(_loan.Who.Value),
                          prepend: true,
                        }).find("[data-action='remove']").on("click.remove", e => (
                          e.preventDefault(), $(e.currentTarget).parents(".entry").remove()));
                        _source.find("[data-output-field='Item']").val("");
                        _source.find("[data-output-field='Who']").val("");
                        _source.find("[data-output-field]").first().focus();
                      }
                    };

                    dialog.find("[data-click='add']").on("click.add", _action);
                    _.each(dialog.find("[data-enter]"), element => {
                      var _element = $(element);
                      _element.on("keypress.enter", e => {
                        if (e.keyCode == 13) {
                          e.preventDefault();
                          e.stopPropagation();
                          _action();
                        }
                      });
                    });

                  })
                  .then(values => {
                    if (!values) return;
                    ಠ_ಠ.Flags.log("LOANS:", values);
                    var _entries = _.isArray(values.Loans.Values.Entries) ?
                      values.Loans.Values.Entries : [values.Loans.Values.Entries],
                      _total = _entries.length,
                      _count = 0,
                      _unknown = [],
                      _loan = loan => {
                        var item = FN.book.get(loan.Item),
                          action = (id, isbn, copy, item) => FN.libraries.log.loan(ರ‿ರ.library, loan.Who, id, isbn, copy,
                            FN.common.format.details(item))
                          .then(availability => {
                            ಠ_ಠ.Main.event(FN.events.loans.progress,
                              ಠ_ಠ.Main.message(_count += 1, "book", "books", "loaned"));
                            return availability;
                          });
                        ಠ_ಠ.Flags.log(`ITEM (${loan.Item}):`, item);
                        return item ?
                          action(item.ID, item.ISBN, ರ‿ರ.library.meta.capabilities.loan_field ? loan.Item : item.ID, item) :
                          (_unknown.push(loan), Promise.resolve(false));
                      },
                      _loans = _.map(_entries, _loan);

                    return Promise.each(_loans)
                      .catch(e => ಠ_ಠ.Flags.error("Loan Book/s Error", e))
                      .then(ಠ_ಠ.Main.busy(true, true, FN.events.loans.progress, `Processing ${_total} Loan{_total > 1 ? "s" : ""}`))
                      .then(availability => {
                        ಠ_ಠ.Flags.log("LOANED BOOKS:", availability);
                        if (_unknown && _unknown.length > 0) ಠ_ಠ.Flags.log("UNKNOWN BOOKS:", _unknown);
                        ಠ_ಠ.Display.inform({
                          id: "show_Loans",
                          title: "Loaned Items",
                          target: $("body"),
                          content: ಠ_ಠ.Display.doc.get({
                            name: "LOANS",
                            data: {
                              total: _total,
                              loaned: _.filter(availability, value => !!value).length,
                              unknown: _.filter(availability, value => value === false).length,
                              invalid: _.filter(availability, value => value === undefined).length,
                            }
                          })
                        }).then(ರ‿ರ.refresh);
                      });

                  }),
                    
  };
  /* <!-- Items (Batch) Functions --> */
  
  
  /* <!-- Item (Singular) Functions --> */
  FN.item = {
    
    return : command => {
      var book = FN.book.get(command);
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
            var _element = $(`[data-item='${command}']`).empty();
            FN.libraries.log.returned(ರ‿ರ.library, command)
              .then(ಠ_ಠ.Main.busy_element(_element))
              .then(availability => availability && availability.length === 1 && availability[0].available === true ? true : false)
              .then(result => ಠ_ಠ.Display.template.show({
                template: result === true ? "returned" : "return",
                target: _element,
                clear: true,
                item: command
              }));
          }
        })
        .catch(e => e ? ಠ_ಠ.Flags.error("Return Book Error", e) : ಠ_ಠ.Flags.log("Return Book Cancelled"));
    },
    
    loan : commands => {

      var _id = commands[0],
        _user = decodeURIComponent(commands[1]);

      ಠ_ಠ.Flags.log(`Loaning Item ${_id} to user ${_user}`);

      var _book = FN.book.get(_id, true);

      /* <!-- Get Availability --> */
      return _book ? FN.libraries.available(ರ‿ರ.library, _book[ರ‿ರ.library.meta.capabilities.loan_field || "ID"])

        /* <!-- Get Available Copies --> */
        .then(availability => _.tap(_.filter(availability, available => available.available === true),
          available => ಠ_ಠ.Flags.log("Item Availability:", available)))

        .then(ಠ_ಠ.Main.busy("Getting Availability", true))

        .then(available => {

          var _choose = () => ಠ_ಠ.Display.choose({
            id: "loan_choose",
            target: $("body"),
            title: ಠ_ಠ.Display.doc.get({
              name: "TITLE_CHOOSE_LOAN",
              trim: true
            }),
            message: ಠ_ಠ.Display.doc.get("CHOOSE_LOAN"),
            action: "Loan",
            choices: _.map(available, loan => ({
              desc: ರ‿ರ.book.Title,
              name: loan.copy
            }))
          });

          return available.length === 1 ?
            available[0].copy :
            available.length > 1 ? _choose().then(loan => loan ? loan.name : false) : false;

        })

        .then(copy => copy ? FN.libraries.log.concluded(ರ‿ರ.library, _user, _id, copy)
          .then(ಠ_ಠ.Main.busy("Loaning Book", true)) : null)

        .then(result => {
          if (!result) return;
          ಠ_ಠ.Flags.log("Loan Result", result);
          $(`[data-type='request'][data-id='${_id}'][data-user='${_user}']`).remove();
        })

        .catch(e => e ? ಠ_ಠ.Flags.error("Loan Book Error", e) : ಠ_ಠ.Flags.log("Loan Book Cancelled")) : null;

    },
    
  };
  /* <!-- Item (Singular) Functions --> */
  
  
  /* <!-- Library Functions --> */
  FN.library = {
  
    open : index => (index === null || index === undefined ?
      FN.libraries.first(library => library && library.meta && library.meta.claims && library.meta.claims.manage)
      .then(library => _.tap(library, library => ಱ.index = library.code)) :
      FN.libraries.one(ಱ.index = index))
    .then(library => ರ‿ರ.library = library)
    .then(library => FN.libraries.db(library)
      .then(result => (ಠ_ಠ.Flags.log("LIBRARY:", library), FN.catalog.load(result.data, ರ‿ರ.library.meta.capabilities)))
      .then(db => ರ‿ರ.db = db)
      .then(() => library.meta.claims && library.meta.claims.manage ? FN.library.show(ಱ.index, library) : FN.library.redirect(index)))
    .then(ಠ_ಠ.Main.busy("Opening Library", true)),
    
    redirect : index => window.location.href = ಠ_ಠ.Flags.full(`/app/library/${window.location.search}#library.${index}`),
    
    show : (index, library) => {
      ಠ_ಠ.Display.state().enter([FN.states.library.loaded, FN.states.manage.loaded]);

      FN.hookup.links(ಠ_ಠ.Display.template.show({
          template: "overview",
          target: FN.holder(),
          clear: true,
          query: window.location.search,
          index: index,
          description: ಠ_ಠ.Display.doc.get("DETAILS", null, true),
          details: [
            FN.show.overview.contents(library.name)
          ]
        })).find("form[data-role='search'] button[type='submit']")
        .off("click.search").on("click.search", FN.search.handle);

      $("header.navbar form[data-role='search'] button[type='submit']")
        .off("click.search").on("click.search", FN.search.handle);

      $("input[role='search']:visible").focus();

      if (library.meta.capabilities && library.meta.capabilities.loan) {
      
        /* <!-- Load and Display Statistics --> */
        FN.show.statistics();

        /* <!-- Load and Display Current Loans --> */
        FN.loans.outstanding();
        
      }
      
      /* <!-- Set Manageable and Loanable States --> */
      ಠ_ಠ.Display.state().exit([FN.states.library.manageable, FN.states.library.loanable, FN.states.library.requestable]);
      ಠ_ಠ.Display.state().set(FN.states.library.manageable, ರ‿ರ.library.meta.claims && ರ‿ರ.library.meta.claims.manage);
      ಠ_ಠ.Display.state().set(FN.states.library.loanable, ರ‿ರ.library.meta.capabilities && ರ‿ರ.library.meta.capabilities.loan);
      ಠ_ಠ.Display.state().set(FN.states.library.requestable,
        ರ‿ರ.library.meta.capabilities && ರ‿ರ.library.meta.capabilities.loan && ರ‿ರ.library.meta.capabilities.loan_requests);

      ರ‿ರ.refresh = () => FN.library.show(index, library);
    },
    
  };
  /* <!-- Library Functions --> */

  
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
        center: true,
        instructions: [{
          match: [
            /SEARCH/i
          ],
          show: "MANAGE_SEARCH_INSTRUCTIONS",
          title: "Searching a Library ..."
        }],
        routes: {

          library: {
            matches: /LIBRARY/i,
            trigger: FN.states.manage.working,
            length: {
              min: 0,
              max: 4
            },
            tidy: true,
            fn: command => (command && _.isArray(command) && command.length >= 1 ?
                FN.library.open(command[0]) : FN.library.open(command || ಱ.index))
              .then(() => command && command.length >= 2 ? this.route(command.slice(command.length - 2)) :
                $("header.navbar form[data-role='search'] input[role='search']").val("")),
          },

          list: {

            matches: /LIST/i,
            state: FN.states.manage.loaded,
            tidy: true,

            routes: {

              authors: {
                matches: /AUTHORS/i,
                fn: FN.list.authors
              },

              books: {
                matches: /BOOKS/i,
                fn: FN.list.books
              },

              comments: {
                matches: /COMMENTS/i,
                fn: FN.list.comments
              },
              
              copies: {
                matches: /COPIES/i,
                fn: FN.list.copies
              },

              publishers: {
                matches: /PUBLISHERS/i,
                fn: FN.list.publishers
              },

              series: {
                matches: /SERIES/i,
                fn: FN.list.series
              },

              tags: {
                matches: /TAGS/i,
                fn: FN.list.tags
              },

            }
            
          },
              
          show: {
            
            matches: /SHOW/i,
            state: FN.states.manage.loaded,
            tidy: true,
            
            routes: {
              
              contents: {
                matches: /CONTENTS/i,
                fn: () => FN.show.details(uuid.v4(), FN.show.overview.contents(ರ‿ರ.library.name), "detail")
              },
              
              loans: {

                matches: /LOANS/i,

                routes: {

                  all: {
                    matches: /ALL/i,
                    length: 0,
                    fn: FN.loans.all
                  },

                  returned: {
                    matches: /RETURNED/i,
                    length: 0,
                    fn: FN.loans.returned
                  },

                  outstanding: {
                    matches: /OUTSTANDING/i,
                    length: 0,
                    fn: FN.loans.outstanding
                  },

                  overdue: {
                    matches: /OVERDUE/i,
                    fn: FN.loans.overdue
                  },

                }

              },
              
              statistics: {
                matches: /STATISTICS/i,
                state: FN.states.manage.loaded,
                fn: FN.show.statistics
              },
              
              requests: {
                matches: /REQUESTS/i,
                length: 0,
                fn: () => Promise.all([
                    FN.show.loading(uuid.v4(), FN.show.overview.requests()),
                    FN.get.requests()
                  ])
                  .then(results => FN.show.details(results[0], results[1]))
                  .catch(e => ಠ_ಠ.Flags.error("Book Requests Error", e)),
              },

            }
            
          },
          
          items: {

            matches: /ITEMS/i,
            state: FN.states.manage.loaded,
            tidy: true,

            routes: {

              return: {
                matches: /RETURN/i,
                length: 0,
                fn: FN.items.return
              },

              loan: {
                matches: /LOAN/i,
                length: 0,
                fn: FN.items.loan,
              },

            }

          },

          item: {

            matches: /ITEM/i,
            state: FN.states.manage.loaded,
            tidy: true,

            routes: {

              loan: {
                matches: /LOAN/i,
                length: 2,
                state: FN.states.library.loanable,
                fn: FN.item.loan
              },

              return: {
                matches: /RETURN/i,
                length: 1,
                fn: FN.item.return

              },

            }

          },

          move: {
            matches: /MOVE/i,
            state: FN.states.manage.loaded,
            
            routes: {

              left: {
                matches: /LEFT/i,
                length: 1,
                fn: id => {
                  var _target = $(`.details div.card[data-index='${id}']`),
                      _prev = _target.prev();
                  _target.detach().insertBefore(_prev);
                }
              },

              right: {
                matches: /RIGHT/i,
                length: 1,
                fn: id => {
                  var _target = $(`.details div.card[data-index='${id}']`),
                      _next = _target.next();
                  _target.detach().insertAfter(_next);
                }
              },

            }
            
          },
          
          resize: {
            matches: /RESIZE/i,
            state: FN.states.manage.loaded,
            
            routes: {

              expand: {
                matches: /EXPAND/i,
                length: 1,
                fn: id => {
                  var _target = $(`.details div.card[data-index='${id}']`),
                      _parent = _target.parent(),
                      _position = _target.index();
                  _target.addClass("expanded").data("position", _position).detach().prependTo(_parent);
                }
              },

              contract: {
                matches: /CONTRACT/i,
                length: 1,
                fn: id => {
                  var _target = $(`.details div.card[data-index='${id}']`),
                      _position = _target.data("position");
                  _position ?
                    _target.removeClass("expanded").detach().insertAfter($(`.details div.card:nth-child(${_position})`)) :
                    _target.removeClass("expanded");
                }
              },

            }
            
          },
          
          refresh: {
            matches: /REFRESH/i,
            state: FN.states.library.loaded,
            length: 0,
            tidy: true,
            fn: () => ರ‿ರ.refresh()
          },
          
          search: {
            matches: /SEARCH/i,
            state: FN.states.library.loaded,
            trigger: FN.states.library.working,
            length: 1,
            tidy: true,
            fn: command => {
              var _terms = decodeURIComponent(ಱ.url.decode(command));
              $("header.navbar form[data-role='search'] input[role='search']").val(_terms);
              FN.search.run(_terms, FN.holder());
            },
          },

        },
        route: () => false,
        /* <!-- PARAMETERS: handled, command --> */
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