App = function() {
  "use strict";

  /* <!-- DEPENDS on JQUERY to work, but not to initialise --> */

  /* <!-- Returns an instance of this if required --> */
  if (this && this._isF && this._isF(this.App)) return new this.App().initialise(this);

  /* <!-- Internal Constants --> */
  const FN = {},
    DEFAULT_ROUTE = "library";

  const KEY_ENTER = 13,
    KEY_ESC = 27;

  const COLOUR_REMOVE = "#d7262675",
    COLOUR_CHANGE = "#b8952dad",
    COLOUR_RETURN = "#1d551da8",
    COLOUR_RENEW = "#1d551da8",
    COLOUR_QUERY = "#1d551da8",
    COLOUR_DISPUTE = "#1d551da8",
    COLOUR_FAILURE = "#6e0a0a8f",
    COLOUR_FAILURE_INPUT_BACK = "#f5141494",
    COLOUR_FAILURE_INPUT_FORE = "#ffffff",
    COLOUR_SUCCESS = "#0a430d8f";

  const DELAYS = {
    ui : 50,
    message : 5000
  };
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


  /* <!-- Get Functions --> */
  FN.get = {

    requests: filtered => FN.libraries.requests.all(ರ‿ರ.library)
      .then(requests => _.tap(requests, requests => _.each(requests, request => {
        request.decorate = true;
        request.command = `/app/library/#library.${ಱ.index}.${request.id}`;
        request.when = request.date ? ಠ_ಠ.Dates.parse(request.date) : "";
      })))
      .then(requests => FN.libraries.users(ರ‿ರ.library)
        .then(users => _.each(users, user => {
          _.chain(requests)
            .filter(request => request.user == user.id)
            .each(request => {
              request.user = {
                id: request.user,
                name: user.name
              };
            });
        }))
        .then(() => {
          if (filtered) {

            /* <!-- Get Length --> */
            var _ln = (value, property) => value ? value[property] ? value.length || 1 : 1 : 0;

            /* <!-- Filter Requests --> */
            requests = _.chain(requests)

              /* <!-- Order by earliest requests first --> */
              .sortBy("when")

              /* <!-- Group by requested item --> */
              .groupBy("id")
              .reduce((memo, values, key) => {

                var _count = ರ‿ರ.library.meta.capabilities.loan_field ?
                  _ln(FN.books.get(key, true), ರ‿ರ.library.meta.capabilities.loan_field) : 1;

                values = _.filter(values, value => value.user && memo.users.indexOf(value.user.id || value.user) < 0);
                _.times(_count, index => {
                  if (values && values.length > index) {
                    memo.requests.push(values[index]);
                    memo.users.push(values[index].user.id || values[index].user);
                  }
                });

                return memo;
              }, {
                users: [],
                requests: []
              })
              .value()
              .requests;

          }
          return requests;
        }))
      .catch(e => (ಠ_ಠ.Flags.error("Fetching Requests Error", e), false))
      .then(requests => {
        var _title = filtered ? "Filtered Requests" : "Requests";
        if (requests === false) {
          return FN.show.error(_title, "ERROR_REQUESTS");
        } else {
          ಠ_ಠ.Flags.log("Requests:", requests);
          return _.extend({
            title: _title,
            icon: "shopping_basket",
            background: "secondary",
            movable: true,
          }, requests && requests.length > 0 ? {
            template: "requests",
            resizable: true,
            count: requests.length,
            requests: requests
          } : {
            template: "empty",
            message: "No Requests Found"
          });
        }
      }),

    statistics: force => FN.libraries.statistics(ರ‿ರ.library, force)
      .catch(e => (ಠ_ಠ.Flags.error("Fetching Requests Error", e), false))
      .then(statistics => {
        if (statistics === false) {
          return FN.show.error("Statistics", "ERROR_STATISTICS");
        } else {
          ಠ_ಠ.Flags.log("STATISTICS:", statistics);
          return {
            template: "statistics",
            title: "Statistics",
            movable: true,
            background: "info",
            icon: "insights",
            refresh: "show.statistics",
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
                background: "highlight"
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
              .concat(statistics.queried ? [{
                name: "Queried",
                count: statistics.queried,
                route: "show.loans.queried",
                size: "h4",
                background: "warning"
              }] : [])
              .concat(statistics.disputed ? [{
                name: "Disputed",
                count: statistics.disputed,
                route: "show.loans.disputed",
                size: "h4",
                background: "danger"
              }] : [])
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
          };
        }
      }),

  };
  /* <!-- Get Functions --> */


  /* <!-- Show Functions --> */
  FN.show = {

    error: (title, message) => ({
            template: "empty",
            title: title,
            background: "danger",
            icon: "error_outline",
            movable: true,
            message: ಠ_ಠ.Display.doc.get(message)
          }),
            
    details: (id, value, template, movable, resizable, fixed) => {
      var _existing = $(`.details .detail[data-index=${id}]`);
      value.id = id;
      if (template) value.template = template;
      if (movable) value.movable = movable;
      if (resizable) value.resizable = resizable;
      if (fixed) value.static = fixed;
      value.target = _existing.length > 0 ? _existing : $(".details");
      value.replace = _existing.length > 0;
      return FN.hookup.closer(fixed ? 
        ಠ_ಠ.Display.template.show(value) : FN.hookup.since(ಠ_ಠ.Display.template.show(value)));
    },

    loading: (id, value, replace) => (ಠ_ಠ.Display.template.show(_.extend(value, {
      id: id,
      template: "detail",
      target: replace ? $(`#details .detail[data-index=${id}]`) : $("#details"),
      replace: replace
    })), id),

    overview: {

      contents: name => ({
        title: name || "Contents",
        icon: "library_books",
        background: "highlight-lighter",
        admin: ರ‿ರ.library.admin,
        static: true,
        movable: true,
        values: _.filter(_.map(["Authors", "Books", "Comments", "Formats", "Publishers", "Ratings", "Series", "Tags"], property => ({
          name: property,
          count: ರ‿ರ.db.count[property.toLowerCase()](),
          route: property != "Comments" ? `list.${property.toLowerCase()}` : null,
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

      generic: title => FN.show.overview.loading(title),

      loading: type => ({
        name: `Loading ${type} …`,
        loading: true
      }),

      loans: () => FN.show.overview.loading("Loans"),

      requests: filtered => FN.show.overview.loading(filtered ? "Filtered Requests" : "Requests"),

      statistics: () => FN.show.overview.loading("Stats"),

    },

    statistics: refresh => Promise.all([FN.show.loading(refresh || uuid.v4(), 
          FN.show.overview.statistics(), !!refresh), FN.get.statistics(!!refresh)])
      .then(results => FN.show.details(results[0], results[1])),

  };
  /* <!-- Show Functions --> */


  /* <!-- List Functions --> */
  FN.list = {

    rows: (data, title) => (ಠ_ಠ.Flags.log("LIST DATA:", data), _.extend({
      title: title,
      icon: "list",
      background: "dark",
      movable: true,
    }, data && data.values && data.values.length > 0 ? {
      template: "list",
      resizable: true,
      columns: data.columns,
      rows: data.values,
      count: data.values.length,
    } : {
      template: "empty",
      message: "No Items Found"
    })),

    generic: (title, data, search, property, suffix) => {
      var _loading = FN.show.loading(uuid.v4(), FN.show.overview.generic(title));
      return FN.common.delay(DELAYS.ui).then(() => {
        var _results = FN.list.rows(_.tap(data(), data => {
          if (data && data.values && property) _.each(data.values, row => {
            if (row && row.length > search && row[search]) row[search] = {
              text: row[search],
              decorate: true,
              action: `/app/library/#library.${ಱ.index}.search.${property}==${ಠ_ಠ.url.encode(encodeURIComponent(row[search]))}${suffix ? suffix : ""}`
            };
          });
        }), title);
        FN.show.details(_loading, _results);
      });
    },
    
    book: fn => () => {
      var _return = fn();
      if (_return && _return.values) _.each(_return.values, row => row[1] = {
        route :  `search.${ರ‿ರ.library.meta.capabilities.loan_field ? "id==" : ""}${ಠ_ಠ.url.encode(encodeURIComponent(row[0]))}`,
        text: row[1]
      });
      return _return;
    },

    authors: () => (ಠ_ಠ.Flags.log("LISTING ALL AUTHORS"),
      FN.list.generic("Authors", ರ‿ರ.db.list.authors, 1, "authors")),

    books: () => (ಠ_ಠ.Flags.log("LISTING ALL BOOKS"),
      FN.list.generic("Books", FN.list.book(ರ‿ರ.db.list.books), 0, "id")),

    copies: () => ರ‿ರ.library.meta.capabilities.loan_field ? (ಠ_ಠ.Flags.log("LISTING ALL COPIES"),
      FN.list.generic("Copies", FN.list.book(() => ರ‿ರ.db.list.custom(ರ‿ರ.library.meta.capabilities.loan_field)), 0, "id")) :
      null,

    formats: () => (ಠ_ಠ.Flags.log("LISTING ALL FORMATS"),
      FN.list.generic("Formats", ರ‿ರ.db.list.formats, 0, "formats")),

    publishers: () => (ಠ_ಠ.Flags.log("LISTING ALL PUBLISHERS"),
      FN.list.generic("Publishers", ರ‿ರ.db.list.publishers, 1, "publisher")),

    ratings: () => (ಠ_ಠ.Flags.log("LISTING ALL RATINGS"),
      FN.list.generic("Ratings", ರ‿ರ.db.list.ratings, 1, "rating")),

    series: () => (ಠ_ಠ.Flags.log("LISTING ALL SERIES"),
      FN.list.generic("Series", ರ‿ರ.db.list.series, 1, "series")),

    tags: () => (ಠ_ಠ.Flags.log("LISTING ALL TAGS"), FN.list.generic("Tags", ರ‿ರ.db.list.tags, 1, "tags")),

  };
  /* <!-- List Functions --> */


  /* <!-- Loans Functions --> */
  FN.loans = {

    augment: loans => FN.libraries.users(ರ‿ರ.library)
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

    process: books => loan => {
      var id = loan.copy || loan.id,
          book = books ? _.find(books, book => ರ‿ರ.library.meta.capabilities.loan_field ? 
                                book[ರ‿ರ.library.meta.capabilities.loan_field].indexOf(id) >= 0 : book.ID == id) : 
                                FN.books.get(id);
      return _.extend(FN.common.process.loan(ರ‿ರ.library)(loan), {
        decorate: true,
        command: loan.copy || loan.id ? `/app/library/#library.${ಱ.index}.${loan.id ? loan.id : `search.${loan.copy}`}` : "",
        item: loan.copy || loan.id,
        description: book ? `<strong>${book.Title}</strong>${book.Authors && book.Authors.length ? `<br/>${_.isString(book.Authors) ? book.Authors : book.Authors.join(" | ")}` : ""}` : "",  
      });
    },

    show: (id, details, background, icon, returned) => loans => {
      if (loans && loans.length > 0) {
        return FN.loans.augment(FN.show.details(id, {
          title: details,
          background: background,
          icon: icon,
          movable: true,
          resizable: true,
          returned: returned,
          count: loans.length,
          loans: _.tap(
            _.map(loans, FN.loans.process(FN.books.get(_.map(loans, loan => loan.copy || loan.id)))), 
            loans => ಠ_ಠ.Flags.log(`PROCESSED LOANS for [${details}]:`, loans)
          )
        }, "all"));
      } else if (loans === false) {
        return FN.show.details(id, FN.show.error(details, "ERROR_LOANS"));
      } else {
        return FN.show.details(id, {
          title: details,
          background: background,
          icon: icon,
          movable: true,
          message: "No Loans Found"
        }, "empty");
      }
    },

    generic: (fn, title, background, icon, returned) => fn(ರ‿ರ.library)
      .catch(e => (ಠ_ಠ.Flags.error("Fetching Loans Error", e), false))
      .then(FN.loans.show(FN.show.loading(uuid.v4(), FN.show.overview.loans()), title, background, icon, returned)),

    all: () => FN.loans.generic(FN.libraries.loans.all, "All Loans", "light", null, true),

    overdue: () => FN.loans.generic(FN.libraries.loans.overdue, "Overdue Loans", "danger", "check_circle_outline"),

    outstanding: () => FN.loans.generic(FN.libraries.loans.outstanding, "Outstanding Loans", "highlight", "check_circle_outline"),

    returned: () => FN.loans.generic(FN.libraries.loans.returned, "Returned Loans", null, null, true),
    
    queried: () => FN.loans.generic(FN.libraries.loans.queried, "Queried Loans", "warning", "thumb_down_off_alt"),
    
    disputed: () => FN.loans.generic(FN.libraries.loans.disputed, "Disputed Loans", "danger", "thumb_down_off_alt"),

  };
  /* <!-- Loans Functions --> */


  /* <!-- Search Functions --> */
  FN.search = {

    handle: e => {
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

    run: terms => {
      
      if (!terms) return;
      terms = FN.lexer.parse(terms);
      ಠ_ಠ.Flags.log("SEARCHING:", terms);
      if (!terms || terms.length != 1) return;
      
      /* <!-- Get the Book --> */
      var _override = false,
        _type = FN.common.check.user(terms) ? "user" : "copy",
        _isbn = _.isString(terms[0]) ? FN.common.check.isbn(terms) : false,
        _book = _type == "copy" ? _.isString(terms[0]) ? FN.books.get(terms[0]) : FN.books.get(terms[0].value, true) : null;
      
      /* <!-- Maybe we have a book id, not a copy id - if so, we want loans for all the copies! --> */
      if (_type == "copy" && _.isString(terms[0]) && !_book) {
        _book = FN.books.get(terms[0], true);
        if (_book) _override = true;
      }
      
      var _loans = (_override || _isbn || _.isObject(terms[0])) && _book ? 
          ರ‿ರ.library.meta.capabilities.loan_field ? (_type = "copies", _book[ರ‿ರ.library.meta.capabilities.loan_field]) : _book.ID : terms;
      
      return FN.libraries.loans[_type](ರ‿ರ.library, _loans)
        .then(loans => loans && loans.length > 1 ? _.chain(loans).sortBy("date").reverse().value() : loans)
        .catch(e => (ಠ_ಠ.Flags.error("Searching Loans Error", e), false))
        .then(FN.loans.show(FN.show.loading(uuid.v4(), FN.show.overview.loans()),
          `Loans for ${_type == "user" ? terms : _book ? _type == "copy" && ರ‿ರ.library.meta.capabilities.loan_field ? `${_book.Title} | ${terms}`: _book.Title : terms}`, "light", null, true));
    },

  };
  /* <!-- Search Functions --> */


  /* <!-- Items (Batch) Functions --> */
  FN.items = {

    return: () => Promise.resolve(FN.show.loading(uuid.v4(), FN.show.overview.generic("Loans for Return")))
      .then(loading => FN.common.delay(DELAYS.ui).then(() => FN.show.details(loading, {
          title: "Returns",
          template: "returns",
          icon: "playlist_add_check",
          background: "primary",
        }, null, true, true, true))
        .then(display => {

          var fn = {

            handle: (disable, enable, busy) => copy => {
              ಠ_ಠ.Flags.log("RETURNING ITEM", copy);
              disable(true);

              /* <!-- Add Returning Row --> */
              if (busy.parents("tr").is(":last-of-type")) fn.hookup(ಠ_ಠ.Display.template.show({
                template: "returns_line",
                target: busy.parents("tbody")
              }));

              FN.libraries.log.returned(ರ‿ರ.library, copy.trim())
                .then(ಠ_ಠ.Main.busy(false, false, null, null, "small", busy.empty()))
                .then(availability => {

                  if (availability === undefined) {

                    /* <!-- Invalid Item --> */
                    busy.text("Invalid | No Loan Found").parents("tr").css("background-color", COLOUR_FAILURE)
                      .find("input").css("background-color", COLOUR_FAILURE_INPUT_BACK).css("color", COLOUR_FAILURE_INPUT_FORE);
                    _.delay(() => busy.text("").parents("tr").css("background-color", "")
                      .find("input").css("background-color", "").css("color", ""), DELAYS.message);
                    enable(true);

                  } else {

                    var item = FN.books.get(availability[0].copy);
                    ಠ_ಠ.Flags.log("RETURNED ITEM", item);
                    ಠ_ಠ.Flags.log("ITEM AVAILABILITY", availability);

                    if (availability[0].available === true) {

                      /* <!-- Returned, now available --> */
                      if (item) {
                        ಠ_ಠ.Display.template.show({
                          template: "returns_line",
                          book: ಠ_ಠ.Display.doc.get({
                            name: "BOOK",
                            data: {
                              title: item.Title,
                              copy: availability[0].copy,
                            },
                            trim: true
                          }),
                          returned: ಠ_ಠ.Dates.now().toDate(),
                          target: busy.parents("tr"),
                          replace: true
                        });
                      } else {
                        busy.text("Returned | No Book Found").parent("tr").css("background-color", COLOUR_SUCCESS);
                        _.delay(() => busy.parents("tr").remove(), DELAYS.message);
                      }

                    } else {

                      /* <!-- Not available | Perhaps duplicate loan? --> */
                      busy.text("Unavailable | Duplicate Loan?").parent().css("background-color", COLOUR_SUCCESS);
                      _.delay(() => busy.text("").parent().css("background-color", ""), DELAYS.message);
                      enable(true);

                    }

                  }
                });
            },

            hookup: row => {

              var _input = row.find("input"),
                _return = row.find("button[data-action='return']"),
                _disable = all => {
                  _return.attr("disabled", true).attr("tabindex", "-1").attr("aria-disabled", true);
                  if (all) _input.attr("readonly", true);
                },
                _enable = all => {
                  _return.attr("disabled", false).attr("tabindex", "").attr("aria-disabled", false);
                  if (all) _input.attr("readonly", false);
                };

              _input.on("keyup", e => {
                if (e.keyCode == KEY_ENTER) {
                  e.preventDefault();
                  e.stopPropagation();
                  if (_input.val()) _return[0].click();
                } else if (e.keyCode == KEY_ESC) {
                  _input.val("");
                  _disable();
                } else {
                  _input.val() ? _enable() : _disable();
                }
              });

              var _handler = fn.handle(_disable, _enable, row.find(".busy-holder"));
              _return.on("click.add", () => _handler(_input.val()));

              _input.focus();

            }

          };

          fn.hookup(display.find("tr"));

        })
      ),

    return_batch: () => ಠ_ಠ.Display.text({
        id: "returns_create",
        target: $("body"),
        title: ಠ_ಠ.Display.doc.get("TITLE_CONFIRM_RETURNS", null, true),
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

    loan: () => Promise.resolve(FN.show.loading(uuid.v4(), FN.show.overview.generic("Loans for Entry")))
      .then(loading => FN.common.delay(DELAYS.ui).then(() => FN.show.details(loading, {
          title: "Enter Loans",
          template: "new_loans",
          icon: "playlist_add",
          background: "primary",
          movable: true,
          resizable: true,
        }, null, true, true, true))
        .then(display => {

          var fn = {

            handle: (disable, enable, busy) => (copy, user) => {

              ಠ_ಠ.Flags.log("LOANING ITEM", copy);
              disable(true);

              /* <!-- Add Returning Row --> */
              if (busy.parents("tr").is(":last-of-type")) fn.hookup(ಠ_ಠ.Display.template.show({
                template: "new_loan_line",
                target: busy.parents("tbody")
              }));

              var item = FN.books.get(copy),
                failure = message => {
                  busy.html(message).parents("tr").css("background-color", COLOUR_FAILURE)
                    .find("input").css("background-color", COLOUR_FAILURE_INPUT_BACK).css("color", COLOUR_FAILURE_INPUT_FORE);
                  _.delay(() => busy.html("").parents("tr").css("background-color", "")
                    .find("input").css("background-color", "").css("color", ""), DELAYS.message);
                  enable(true);
                };

              if (item) {

                var _action = copy => FN.libraries.log.loan(ರ‿ರ.library, user, item.ID, item.ISBN,
                    ರ‿ರ.library.meta.capabilities.loan_field ? copy : item.ID, FN.common.format.details(item))
                  .then(ಠ_ಠ.Main.busy(false, false, null, null, "small", busy.empty()))

                  .then(availability => {

                    if (availability && availability[0] && availability[0].available === false) {

                      /* <!-- Loaned --> */
                      ಠ_ಠ.Display.template.show({
                        template: "new_loan_line",
                        book: ಠ_ಠ.Display.doc.get({
                          name: "BOOK",
                          data: {
                            title: item.Title,
                            copy: availability[0].copy,
                          },
                          trim: true
                        }),
                        user: user,
                        loaned: ಠ_ಠ.Dates.now().toDate(),
                        target: busy.parents("tr"),
                        replace: true
                      });

                    } else {

                      /* <!-- Invalid / Error --> */
                      failure(ಠ_ಠ.Display.doc.get("LOAN_FAILED", null, true));

                    }

                  })

                  .catch(() => failure(failure(ಠ_ಠ.Display.doc.get("GENERIC_ERROR", null, true)))),

                  _isCopied = ರ‿ರ.library.meta.capabilities.loan_field &&
                    item[ರ‿ರ.library.meta.capabilities.loan_field],
                    
                  _isCopy = _isCopied && _.find(item[ರ‿ರ.library.meta.capabilities.loan_field], value => value == copy);

                if (FN.common.check.excluded(item, ರ‿ರ.library)) {
                  
                  /* <!-- Excluded From Loaning --> */
                  failure(ಠ_ಠ.Display.doc.get("BOOK_EXCLUDED", null, true));
                  
                } else {
                  
                  /* <!-- First: Get Availability --> */
                  FN.libraries.available(ರ‿ರ.library, _isCopy ? copy : 
                                         _isCopied ? item[ರ‿ರ.library.meta.capabilities.loan_field] : item.ID)

                    .then(ಠ_ಠ.Main.busy(false, false, null, null, "small", busy.empty()))

                    /* <!-- Then, Filter for Available Copies --> */
                    .then(availability => _.tap(_.filter(availability, available => available.available === true),
                      available => ಠ_ಠ.Flags.log("Item Availability:", available)))

                    /* <!-- Make a Decision based on availability --> */
                    .then(available => {

                      if (available.length === 0) {

                        /* <!-- No Availability --> */
                        failure(ಠ_ಠ.Display.doc.get("BOOK_ALREADY_LOANED", null, true));

                      } else if (available.length === 1 && (!_isCopy || (available[0].copy == copy))) {

                        /* <!-- Copy or Book is Available --> */
                        _action(copy);

                      } else {

                        /* <!-- Multiple Copies (if copy not specified) or alternative Copy Available, Needs Choice --> */
                        var _choose = ಠ_ಠ.Display.template.show({
                            template: "choose-copy",
                            simple: true,
                            copies: _.map(available, "copy"),
                            target: busy.parents("td").find("button[data-action='loan']"),
                            replace: true
                          }),
                          _loan = _choose.find("button[data-action='loan']"),
                          _input = _choose.find("select"),
                          _disable = () => _loan.attr("disabled", true).attr("tabindex", "-1").attr("aria-disabled", true),
                          _enable = () => _loan.attr("disabled", false).attr("tabindex", "").attr("aria-disabled", false);

                        _input.on("change", () => {
                          var _val = _input.val();
                          !_val || _val == "Select …" ? _disable() : _enable();
                        });

                        _loan.on("click.loan", () => {
                          _loan.attr("disabled", true).attr("tabindex", "-1").attr("aria-disabled", true);
                          _action(_input.val());
                        });

                        _input.focus();

                      }

                    })

                    .catch(() => failure(failure(ಠ_ಠ.Display.doc.get("GENERIC_ERROR", null, true))));
                  
                }
          
                


              } else {

                /* <!-- Invalid Item | No Book Found --> */
                failure(ಠ_ಠ.Display.doc.get("BOOK_INVALID", null, true));

              }

            },

            hookup: row => {

              var _what = row.find("input[data-type='what']"),
                _who = row.find("input[data-type='who']"),
                _loan = row.find("button[data-action='loan']"),
                _disable = all => {
                  _loan.attr("disabled", true).attr("tabindex", "-1").attr("aria-disabled", true);
                  if (all) {
                    _who.attr("readonly", true);
                    _what.attr("readonly", true);
                  }
                },
                _enable = all => {
                  _loan.attr("disabled", false).attr("tabindex", "").attr("aria-disabled", false);
                  if (all) {
                    _who.attr("readonly", false);
                    _what.attr("readonly", false);
                  }
                };

              row.find("input[data-type]").on("keyup", e => {
                if (e.keyCode == KEY_ENTER) {
                  e.preventDefault();
                  e.stopPropagation();
                  if (_what.val() && _who.val()) {
                    _loan[0].click();
                  } else {
                    ($(e.target).data("type") == "what" ? _who : _what).focus();
                  }
                } else if (e.keyCode == KEY_ESC) {
                  $(e.target).val("");
                  _disable();
                } else {
                  _what.val() && _who.val() ? _enable() : _disable();
                }
              });

              var _handler = fn.handle(_disable, _enable, row.find(".busy-holder"));
              _loan.on("click.loan", () => _handler(_what.val(), _who.val()));

              _what.focus();
            }

          };

          fn.hookup(display.find("tr"));

        })
      ),

    loan_batch: () => ಠ_ಠ.Display.modal("loan", {
        id: "loans_create",
        target: $("body"),
        title: ಠ_ಠ.Display.doc.get("TITLE_CREATE_LOANS", null, true),
        instructions: ಠ_ಠ.Display.doc.get("CONFIRM_LOANS", null, true),
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
          _excluded = [],
          _loan = loan => {
            var item = FN.books.get(loan.Item),
              action = (id, isbn, copy, item) => FN.libraries.log.loan(ರ‿ರ.library, loan.Who, id, isbn, copy,
                FN.common.format.details(item))
              .then(availability => {
                ಠ_ಠ.Main.event(FN.events.loans.progress,
                  ಠ_ಠ.Main.message(_count += 1, "book", "books", "loaned"));
                return availability;
              });
            ಠ_ಠ.Flags.log(`ITEM (${loan.Item}):`, item);
            return item ?
              FN.common.check.excluded(item, ರ‿ರ.library) ? 
              (_excluded.push(loan), Promise.resolve(false)) :
              action(item.ID, item.ISBN, ರ‿ರ.library.meta.capabilities.loan_field ? loan.Item : item.ID, item) :
              (_unknown.push(loan), Promise.resolve(false));
          },
          _loans = _.map(_entries, _loan);

        return Promise.each(_loans)
          .catch(e => ಠ_ಠ.Flags.error("Loan Book/s Error", e))
          .then(ಠ_ಠ.Main.busy(true, true, FN.events.loans.progress, `Processing ${_total} Loan${_total > 1 ? "s" : ""}`))
          .then(availability => {
            ಠ_ಠ.Flags.log("LOANED BOOKS:", availability);
            if (_unknown && _unknown.length > 0) ಠ_ಠ.Flags.log("UNKNOWN BOOKS:", _unknown);
            if (_excluded && _excluded.length > 0) ಠ_ಠ.Flags.log("EXCLUDED BOOKS:", _excluded);
            ಠ_ಠ.Display.inform({
              id: "show_Loans",
              title: "Loaned Items",
              target: $("body"),
              content: ಠ_ಠ.Display.doc.get({
                name: "LOANS",
                data: {
                  total: _total,
                  loaned: _.filter(availability, value => value && value.available === false).length,
                  unknown: _.filter(availability, value => value === false).length,
                  invalid: _.filter(availability, value => value === undefined).length,
                  denied: _.filter(availability, value => value && value.processed === false && 
                                    value.type == "POLICY-DENIED").length,
                }
              })
            }).then(ರ‿ರ.refresh);
          });

      }),

  };
  /* <!-- Items (Batch) Functions --> */


  /* <!-- Confirmation Functions --> */
  FN.confirm = {
    
    row : (entity, type, colour, template, confirmed) => (id, user, confirmation) => {
      
      var _target = FN.item.row(id, user, entity, type);

      if (confirmation && confirmation == SparkMD5.hash(`${id}_${user}`)) {
        
        FN.item.restore(id, user, entity, type);
        return confirmed ? confirmed(_target, id, user) : null;
        
      } else {
        
        _target.css("background-color", colour);
        _target.find(".data-commands").addClass("d-none");
        _.isFunction(template) ? template(_target, id, user) :
          ಠ_ಠ.Display.template.show(_.extendOwn({
            user: user,
            id: id,
            target: _target.find(".data-confirm").removeClass("d-none"),
            clear: true
          }, _.isString(template) ? {
            template: template,
          } : template));
        
      }
    }
  };
  /* <!-- Confirmation Functions --> */
  
  
  /* <!-- Item (Singular) Functions --> */
  FN.item = {

    row: (id, user, type, state) => $(`[data-type='${type}'][data-id='${id}'][data-user='${user}']${state ? `[data-state='${state}']` : ""}`),

    restore: (id, user, type, state) => {
      var _target = FN.item.row(id, user, type, state);
      _target.css("background-color", "");
      _target.find(".data-confirm").addClass("d-none").empty();
      _target.find(".data-commands").removeClass("d-none");
    },

    notify: (id, user, type, message, colour) => {
      var _target = FN.item.row(id, user, "request");
      _target.css("background-color", colour);
      _target.find(".data-confirm").addClass("d-none").empty();
      _target.find(".data-commands").addClass("d-none");
      _target.find(".data-result").removeClass("d-none").html(message);
      _.delay(() => {
        _target.css("background-color", "");
        _target.find(".data-result").addClass("d-none").empty();
        _target.find(".data-commands").removeClass("d-none");
      }, DELAYS.message);
    },

    success: (id, user, type, message) => FN.item.notify(id, user, type, message, COLOUR_SUCCESS),

    failure: (id, user, type, message) => FN.item.notify(id, user, type, message, COLOUR_FAILURE),
    
    update: target => {
      var _element = target.find(".data-commands").empty().addClass("py-0");
      return {
        element: _element,
        restore: (id, user, templates) => {
          _element.removeClass("py-0");
          _.each(templates, (template, i) => {
            ಠ_ಠ.Display.template.show({
              template: template,
              target: _element,
              user: user,
              clear: i === 0,
              prepend: i > 0,
              item: id
            });
          });
        }
      };
    },
    
    status: (fn, id, user, target, templates) => {
      var _holder = FN.item.update(target);
      return fn(ರ‿ರ.library, id)
        .then(ಠ_ಠ.Main.busy_element(_holder.element))
        .then(() => _holder.restore(id, user, templates))
        .catch(e => ಠ_ಠ.Flags.error("Loan Status Change Error", e));
    },

    remove: (FN.confirm.row)("request", null, COLOUR_REMOVE, "remove-request", 
      (target, id, user) => FN.libraries.log.concluded(ರ‿ರ.library, user, id)
        .then(ಠ_ಠ.Main.busy("Removing Request", true))
        .then(result => {
          if (!result) return;
          ಠ_ಠ.Flags.log("Removal Result", result);
          target.remove();
        })
        .catch(e => ಠ_ಠ.Flags.error("Removing Request Error", e))),
    
    change: (id, user, confirmation, change) => FN.confirm.row("request", null, COLOUR_CHANGE, target => {
      
      var _change = ಠ_ಠ.Display.template.show({
          template: "change-request",
          user: user,
          id: id,
          target: target.find(".data-confirm").removeClass("d-none"),
          clear: true
        }),
        _loan = _change.find("a.data-loan"),
        _cancel = _change.find("a.data-cancel"),
        _input = _change.find("input");

        _input.on("keyup", e => {
          if (e.keyCode == KEY_ENTER) {
            e.preventDefault();
            e.stopPropagation();
            _input.val() ? _loan[0].click() : _cancel[0].click();
          } else if (e.keyCode == KEY_ESC) {
            _cancel[0].click();
          } else {
            var _val = _input.val();
            if (_val) {
              _loan.removeClass("disabled").attr("tabindex", "").attr("aria-disabled", false)
                .attr("href", `#${_loan.data("command")}.${ಠ_ಠ.url.encode(encodeURIComponent(_val))}`);
            } else {
              _loan.addClass("disabled").attr("tabindex", "-1").attr("aria-disabled", true).attr("href", "#");
            }
          }
        });
        _input.focus();
      
    }, () => Promise.resolve(FN.item.restore(id, user))
          .then(() => FN.item.loan(change, user, SparkMD5.hash(`${change}_${user}`), null, id))
    )(id, user, confirmation),

    return: (id, user, confirmation, inverse, since, until) => FN.confirm.row("loan", "outstanding", COLOUR_RETURN, {
        template: "confirm-return",
        unreturn: inverse,
        since: since,
        until: until
      }, target => {
        var _element = target.find(".data-commands").empty().addClass("py-0"),
          _since = ಠ_ಠ.Dates.now().toDate();
        return (inverse ?
            FN.libraries.log.unreturned(ರ‿ರ.library, id, user, since, until) :
            FN.libraries.log.returned(ರ‿ರ.library, id))
          .then(ಠ_ಠ.Main.busy_element(_element))
          .then(availability => availability && availability.length === 1 && availability[0].available === true ? true : false)
          .then(result => inverse ? !result : result)
          .then(result => {
            var _until = ಠ_ಠ.Dates.now().toDate();
            if (result === true) inverse ?
              target.find(".returned-date").empty() : target.find(".returned-date").text(_until.toLocaleString());
            _element.removeClass("py-0");
            ಠ_ಠ.Display.template.show({
              template: result === (inverse ? false : true) ? "returned" : "return",
              unreturn: true,
              target: _element,
              since: _since.toISOString(),
              until: _until.toISOString(),
              user: user,
              clear: true,
              item: id
            });
            if (inverse && result) _.each(["query", "renew"], template => {
                ಠ_ಠ.Display.template.show({
                  template: template,
                  target: _element,
                  user: user,
                  prepend: true,
                  item: id
                });
              });
          })
          .catch(e => ಠ_ಠ.Flags.error("Return Book Error", e));
      })(id, user, confirmation),

    unreturn: (id, user, since, until, confirmation) => FN.item.return(id, user, confirmation, true, since, until),

    loan: (id, user, confirmation, copy, target) => {

      var book = FN.books.get(id, true);
      if (!book && ರ‿ರ.library.meta.capabilities.loan_field) book = FN.books.get(id);
      
      if (book) {
        if (FN.common.check.excluded(book, ರ‿ರ.library)) {
          /* <!-- Excluded From Loaning --> */
          FN.item.failure(target || id, user, "request", ಠ_ಠ.Display.doc.get("NOT_LOANABLE", book.Title, true));
          return (ಠ_ಠ.Flags.log(`Book Excluded from Loaning: ID=${id}`, book), null);
        } else {
          ಠ_ಠ.Flags.log(`Found Book for ID=${id}`, book);
        }
      } else {
        return (ಠ_ಠ.Flags.log(`Unable to Find Book for ID=${id}`), null);
      }
      
      if (!copy && ರ‿ರ.library.meta.capabilities.loan_field && 
          book[ರ‿ರ.library.meta.capabilities.loan_field].indexOf(id) >= 0) copy = id;
      
      var _target = FN.item.row(target || id, user, "request");

      /* <!-- First: Get Availability --> */
      return (copy ? Promise.resolve(copy) :
          FN.libraries.available(ರ‿ರ.library, book[ರ‿ರ.library.meta.capabilities.loan_field || "ID"])

          /* <!-- Then, Filter for Available Copies --> */
          .then(availability => _.tap(_.filter(availability, available => available.available === true),
            available => ಠ_ಠ.Flags.log("Item Availability:", available)))

          .then(ಠ_ಠ.Main.busy("Getting Availability", true))

          .then(available => {

            if (available.length === 0) {

              /* <!-- No Availability --> */
              FN.item.failure(target || id, user, "request", ಠ_ಠ.Display.doc.get("NO_AVAILABLE_COPIES", book.Title, true));

            } else if (available.length === 1) {

              if (confirmation && confirmation == SparkMD5.hash(`${id}_${user}`)) {

                /* <!-- Single Copy Availability and Confirmation --> */
                return available[0].copy;

              } else {

                /* <!-- Single Copy Availability, Needs Confirmation --> */
                _target.find(".data-commands").addClass("d-none");
                ಠ_ಠ.Display.template.show({
                  template: "confirm-loan",
                  user: user,
                  id: id,
                  copy: available[0].copy,
                  target: _target.find(".data-confirm").removeClass("d-none"),
                  clear: true
                });

              }

            } else {

              /* <!-- Multiple Copy Availability, Needs Choice --> */
              _target.find(".data-commands").addClass("d-none");
              var _choose = ಠ_ಠ.Display.template.show({
                  template: "choose-copy",
                  user: user,
                  id: id,
                  copies: _.map(available, "copy"),
                  target: _target.find(".data-confirm").removeClass("d-none"),
                  clear: true
                }),
                _loan = _choose.find("a.data-loan"),
                _input = _choose.find("select");

              _input.on("change", () => {
                var _val = _input.val();
                if (_val == "Select …") {
                  _loan.addClass("disabled").attr("tabindex", "-1").attr("aria-disabled", true).attr("href", "#");
                } else if (_val) {
                  _loan.removeClass("disabled").attr("tabindex", "").attr("aria-disabled", false)
                    .attr("href", `#${_loan.data("command")}.${ಠ_ಠ.url.encode(encodeURIComponent(_val))}`);
                }
              });
              _input.focus();

            }

            return null;

          }))

        .then(copy => {

          if (!copy) return;
          ಠ_ಠ.Flags.log(`Loaning Item ${id} to user ${user}${copy != id ? ` | Copy ${copy}` : ""}`);
          return (target && target != id ? 
            FN.libraries.log.concluded(ರ‿ರ.library, user, target, copy, id, book.ISBN, FN.common.format.details(book)) : 
            FN.libraries.log.concluded(ರ‿ರ.library, user, id, copy))
          .then(ಠ_ಠ.Main.busy("Loaning Book", true));

        })

        .then(result => {
          if (!result) return;
          ಠ_ಠ.Flags.log("Loan Result", result);
          _target.remove();
        })

        .catch(e => e ? ಠ_ಠ.Flags.error("Loan Book Error", e) : ಠ_ಠ.Flags.log("Loan Book Cancelled"));

    },

    renew: (FN.confirm.row)("loan", "outstanding", COLOUR_RENEW, "confirm-renew", (target, id, user) => {
      
      var _holder = FN.item.update(target);
      return FN.libraries.log.returned(ರ‿ರ.library, id)
        .then(availability => {
          if (availability && availability.length === 1 && availability[0].available === true) {
            var item = FN.books.get(availability[0].copy);
            return FN.libraries.log.loan(ರ‿ರ.library, user, id, item.ISBN, availability[0].copy, 
                                         FN.common.format.details(item));  
          } else {
            return availability;
          }
        })
        .then(ಠ_ಠ.Main.busy_element(_holder.element))
        .then(availability => availability && availability.length === 1 && availability[0].available === false ? true : false)
        .then(result => {
          if (result) {

            var _loaned = ಠ_ಠ.Dates.now(),
                _due = ರ‿ರ.library.meta.capabilities.loan_length ? _loaned.add(ರ‿ರ.library.meta.capabilities.loan_length, "days") : null;

            /* <!-- Show and Highlight new Loan Date --> */
            var _when = ಠ_ಠ.Display.template.show({
              template: "loans_when",
              target: target.find(".data-when").parent("td"),
              show_full: true,
              when: _loaned,
              due: _due,
              when_class: "font-weight-bold text-highlight",
              replace: true,
            });

            /* <!-- Remove Highlight --> */
            FN.common.delay(DELAYS.message).then(() => _when.children(".data-when").removeClass("font-weight-bold text-highlight"));

          }
          _holder.restore(id, user, ["return", "query", "renew"]);
        })
        .catch(e => ಠ_ಠ.Flags.error("Renew Book Error", e));
      
    }),
    
    query: (FN.confirm.row)("loan", "outstanding", COLOUR_QUERY, "confirm-query", 
      (target, id, user) => FN.item.status(FN.libraries.log.queried, id, user, target, ["return", "disputed"])),
    
    dispute: (FN.confirm.row)("loan", "outstanding", COLOUR_DISPUTE, "confirm-dispute",
      (target, id, user) => FN.item.status(FN.libraries.log.disputed, id, user, target, ["return"])),
    
  };
  /* <!-- Item (Singular) Functions --> */


  /* <!-- Library Functions --> */
  FN.library = {

    open: index => (index === null || index === undefined ?
        FN.libraries.first(library => library && library.meta && library.meta.claims && library.meta.claims.manage)
        .then(library => _.tap(library, library => ಱ.index = library.code)) :
        FN.libraries.one(ಱ.index = index))
    
      /* <!-- Process Links and Set Current Library --> */
      .then(library => ($("[data-append='library'][href]").each(
        (i, el) => el.href = !el.href || el.href.indexOf("#") >= 0 ? el.href : `${el.href}#library.${library.code}`
       ), ರ‿ರ.library = library))
    
      .then(library => FN.libraries.db(library)
        .then(result => (ಠ_ಠ.Flags.log("LIBRARY:", library), result && result.data ? FN.catalog.load(result.data, ರ‿ರ.library.meta.capabilities) : null))
        .then(db => ರ‿ರ.db = db)
        .then(db => db ? library.meta.claims && library.meta.claims.manage ? FN.library.show(ಱ.index, library) : FN.library.redirect(index) : null))
      .then(ಠ_ಠ.Main.busy("Opening Library", true)),

    redirect: index => window.location.href = ಠ_ಠ.Flags.decorate(ಠ_ಠ.Flags.full(`/app/library/#library.${index}`)),

    show: (index, library) => {
      ಠ_ಠ.Display.state().enter([FN.states.library.loaded, FN.states.manage.loaded]);

      FN.hookup.links(ಠ_ಠ.Display.template.show({
          template: "overview",
          target: FN.holder(),
          clear: true,
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
      ಠ_ಠ.Display.state().exit([
        FN.states.library.manageable, FN.states.library.loanable, FN.states.library.requestable, FN.states.library.readonly,
        FN.states.libraries.single, FN.states.libraries.multiple, FN.states.libraries.selecting,
      ]);
      ಠ_ಠ.Display.state().set(FN.states.library.manageable, ರ‿ರ.library.meta.claims && ರ‿ರ.library.meta.claims.manage);
      ಠ_ಠ.Display.state().set(FN.states.library.loanable, ರ‿ರ.library.meta.capabilities && ರ‿ರ.library.meta.capabilities.loan);
      ಠ_ಠ.Display.state().set(FN.states.library.requestable,
        ರ‿ರ.library.meta.capabilities && ರ‿ರ.library.meta.capabilities.loan && ರ‿ರ.library.meta.capabilities.loan_requests);
      ಠ_ಠ.Display.state().set(FN.states.library.readonly, ರ‿ರ.library.meta.readonly);
      
      ರ‿ರ.refresh = () => FN.library.show(index, library);
      
      /* <!-- Prepare Selector (if multiple libraries) --> */
      FN.select.all($(".libraries-selection"), true, false, "Select", "swap.cancel", "library", ರ‿ರ.library.code);
      
    },

  };
  /* <!-- Library Functions --> */


  /* <!-- Setup Functions --> */
  FN.setup = {

    modules: ["Common", "Cache", "Client", "Libraries", "Select", "Catalog", "Lexer", "PWA", "Books", "Hookup"],
    
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
      ಠ_ಠ.Display.state().change(FN.states.views, ಱ.demo ? [FN.states.demo, FN.states.manage.in] : FN.states.manage.in);

      /* <!-- Bind Escape --> */
      if (window.Mousetrap) {
        window.Mousetrap.unbind("esc");
        window.Mousetrap.bind("esc", () => $(".collapse.show").removeClass("show"));
      }

      /* <!-- Default Route used in case we arrived here directly (instead of from another page) --> */
      if (ಠ_ಠ.Flags.cleared() && !ಠ_ಠ.Flags.initial() && !ಠ_ಠ.Display.state().in(FN.states.manage.working)) 
        window.location.hash = `#${DEFAULT_ROUTE}`;
      
    },

  };
  /* <!-- Setup Functions --> */


  /* <!-- Route Handlers --> */
  FN.routes = router => ({

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
        .then(() => command && command.length > 2 ? router.route(command.slice(command.length - 2)) :
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

        copies: {
          matches: /COPIES/i,
          fn: FN.list.copies
        },

        formats: {
          matches: /FORMATS/i,
          fn: FN.list.formats
        },

        publishers: {
          matches: /PUBLISHERS/i,
          fn: FN.list.publishers
        },

        ratings: {
          matches: /RATINGS/i,
          fn: FN.list.ratings
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
            
            queried: {
              matches: /QUERIED/i,
              fn: FN.loans.queried
            },
            
            disputed: {
              matches: /DISPUTED/i,
              fn: FN.loans.disputed
            },

          }

        },

        statistics: {
          matches: /STATISTICS/i,
          length: 0,
          state: FN.states.manage.loaded,
          fn: FN.show.statistics,
          
          routes: {
            
            refresh: {
              matches: /REFRESH/i,
              length: 1,
              fn: FN.show.statistics
            },

          }
          
        },

        requests: {
          matches: /REQUESTS/i,
          length: {
            min: 0,
            max: 1,
          },
          fn: filtered => Promise.all([
              FN.show.loading(uuid.v4(), FN.show.overview.requests(!!filtered)),
              FN.get.requests(!!filtered)
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

          routes: {

            batch: {
              matches: /BATCH/i,
              length: 0,
              fn: FN.items.return_batch
            },

            interactive: {
              matches: /INTERACTIVE/i,
              length: 0,
              fn: FN.items.return
            },

          }

        },

        loan: {
          matches: /LOAN/i,
          routes: {

            batch: {
              matches: /BATCH/i,
              length: 0,
              fn: FN.items.loan_batch
            },

            interactive: {
              matches: /INTERACTIVE/i,
              length: 0,
              fn: FN.items.loan
            },

          }
        },

      }

    },

    item: {

      matches: /ITEM/i,
      state: [FN.states.manage.loaded, FN.states.library.loanable],
      all: true,
      spread: true,
      tidy: true,

      routes: {

        cancel: {
          matches: /CANCEL/i,
          length: {
            min: 2,
            max: 3
          },
          fn: FN.item.restore
        },

        remove: {
          matches: /REMOVE/i,
          length: {
            min: 2,
            max: 3
          },
          fn: FN.item.remove
        },

        change: {
          matches: /CHANGE/i,
          length: {
            min: 2,
            max: 4
          },
          fn: FN.item.change
        },

        loan: {
          matches: /LOAN/i,
          length: {
            min: 2,
            max: 4
          },
          fn: FN.item.loan
        },

        unreturn: {
          matches: /UNRETURN/i,
          length: {
            min: 4,
            max: 5
          },
          fn: FN.item.unreturn
        },

        return: {
          matches: /RETURN/i,
          length: {
            min: 2,
            max: 3
          },
          fn: FN.item.return
        },
        
        renew: {
          matches: /RENEW/i,
          length: {
            min: 2,
            max: 3
          },
          fn: FN.item.renew
        },

        query: {
          matches: /QUERY/i,
          length: {
            min: 2,
            max: 3
          },
          fn: FN.item.query
        },
        
        dispute: {
          matches: /DISPUTE/i,
          length: {
            min: 2,
            max: 3
          },
          fn: FN.item.dispute
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
      state: [FN.states.library.loaded, FN.states.library.loanable],
      all: true,
      trigger: FN.states.library.working,
      length: 1,
      tidy: true,
      fn: command => {
        var _terms = decodeURIComponent(ಱ.url.decode(command));
        $("header.navbar form[data-role='search'] input[role='search']").val(_terms);
        FN.search.run(_terms, FN.holder());
      },
    },
    
    swap: {
      matches: /SWAP/i,
      state: [FN.states.library.loaded, FN.states.libraries.multiple],
      all: true,
      tidy: true,
      
      routes: {

        cancel: {
          matches: /CANCEL/i,
          length: 0,
          fn: () => ಠ_ಠ.Display.state().exit(FN.states.libraries.selecting)
        },
        
        show: {
          matches: /SHOW/i,
          length: 0,
          fn: () => (ಠ_ಠ.Display.state().enter(FN.states.libraries.selecting), $(".swap-selector:visible").focus()),
        },
        
      },
      
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
        routes: FN.routes(this),
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
    clean: () => _.each(FN.setup.modules, module => FN[module.toLowerCase()] && FN[module.toLowerCase()].clean ?
                        FN[module.toLowerCase()].clean() : false),

  };
  /* <!-- External Visibility --> */

};