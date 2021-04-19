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
    if (header) {
       _element.find(".back-button").attr("href", "#overview").find(".label").text("Back");
    }
    if (!FN.common.capabilities.touch) 
      $(`${header ? "header.navbar " : ""}form[data-role='search'] input[role='search']:visible`).focus();
  };
  
  var _display = (element, results, terms) => {
    var _results_element = element.find("#search-results").removeClass("d-none"),
        _header_element = element.find(".header").empty();
    _results_element = _results_element.find(".results");
    element.find("#library-details")[results ? "addClass" : "removeClass"]("d-none");
    results && _.isArray(results.values) && results.values.length > 0 ?
        _header_element.removeClass("d-none").append(ಠ_ಠ.Display.template.get({
          template: "results_header",
          count: results.values.length,
          terms: terms
        }, true)) : _header_element.addClass("d-none");
    return _results_element;
  };
  
  var _download = (library, id, format, path, name, size) => ({
    desc: `Read this Book${size ? ` (<strong>${ಠ_ಠ.handlebars.bytes(size, 2)}</strong>)` : ""}!`,
    text: format,
    icon: "help_outline",
    decorate: true,
    url: `/app/reader/#google,library.${library}.${id}.${format}.${FN.encode(path)}.${FN.encode(name)}.${size}`,
  });
  
  var _formats = (library, book) => book.Formats = book.Formats && book.Format_Files ? 
                              _.isArray(book.Formats) ? _.map(book.Formats, 
                                (format, i) => _download(library, book.ID, format, book.Path, book.Format_Files[i], book.Format_Sizes[i])) :
                                _download(library, book.ID, book.Formats, book.Path.text || book.Path, book.Format_Files, book.Format_Sizes) :
                              book.Formats;
  
  var _paths = (library, book) => book.Path = ರ‿ರ.library.meta.claims.admin ? {
    action: `folder.${FN.encode(book.Path)}`,
    text: book.Path,
  } : book.Path;
  
  var _reader = (library, book) => _.tap(book, book => _.each([_formats, _paths], fn => fn(library, book)));
                              
  var _book = id => Promise.resolve(ರ‿ರ.db.find.book(id))
    .then(book => book ? _.tap(_.object(book.columns, book.values[0]), book => ಠ_ಠ.Flags.log("BOOK:", book)) : book)
    .then(book => {
      if (!book) return book;
      
      /* <!-- Removes the reference array for copies and removes duplicates --> */
      book.$copies = book[ರ‿ರ.library.meta.capabilities.loan_field || "ID"];
      book.$copies = _.isArray(book.$copies) ? _.uniq(book.$copies.slice()) : book.$copies;
      
      if (ರ‿ರ.library.meta.capabilities.online_items)  book = _reader(ರ‿ರ.library.code, book);
      if (ರ‿ರ.library.meta.capabilities.loan && ರ‿ರ.library.meta.claims && ರ‿ರ.library.meta.claims.manage) {
        var _map = copy => ({
          text: copy,
          url: ಠ_ಠ.Flags.decorate(`/app/manage/?demo#library.${ರ‿ರ.library.code}.search.${copy}`),
        });
        if (ರ‿ರ.library.meta.capabilities.loan_field) {
          book[ರ‿ರ.library.meta.capabilities.loan_field] = _.map(book[ರ‿ರ.library.meta.capabilities.loan_field], _map);
        } else {
          book.ID = _map(book.ID);
        }
      }
      return book;
    })
    .then(book => (FN.common.capabilities.touch ? null : $("header.navbar form[data-role='search'] input[role='search']").focus(), book))
    .then(book => book ? Promise.resolve(ಠ_ಠ.Display.template.show({
                  template: "item",
                  target: _display(_holder(), book),
                  data: book,
                  clear: true
                }))
          .then(element => {
            
            /* <!-- Get Copies (if present | e.g. is a physical book) --> */
            var _copies = book.$copies,
                _hasCopy = _copies && (!_.isArray(_copies) || _copies.length > 0),
                _isExcluded = ರ‿ರ.library.meta.capabilities.loan_exclusions && 
                  ರ‿ರ.library.meta.capabilities.loan_exclusions.length > 0 && _.find(book.Tags,
                    tag => _.find(ರ‿ರ.library.meta.capabilities.loan_exclusions.split(","), excluded => String.equal(excluded, tag, true)));
      
            if (!_hasCopy) ಠ_ಠ.Flags.log("Book has NO physical copies:", book);
      
            /* <!-- Set Item Selected State and Requestable (if allowed) --> */
            ಠ_ಠ.Display.state().enter(FN.states.library.item);
            ಠ_ಠ.Display.state().set(FN.states.library.requestable, 
              ರ‿ರ.library.meta.capabilities && ರ‿ರ.library.meta.capabilities.loan && 
                                    ರ‿ರ.library.meta.capabilities.loan_requests && _hasCopy && !_isExcluded);
      
            FN.hookup.cover(ರ‿ರ.library, book, element);
      
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
                _.each(availability, copy => {
                  var _copy = _row.find($(`.badge:contains('${copy.copy}')`));
                  _copy.append(ಠ_ಠ.Display.template.get(_.extend({template: "availability"}, copy), true)); 
                });
              } else if (availability.length === 1) {
                element.find("tr[data-field='ID']")
                  .find($(`td div:contains('${availability[0].copy}')`))
                  .append(ಠ_ಠ.Display.template.get(_.extend({template: "availability"}, availability[0]), true));
              }
            };
      
            /* <!-- Check Availability --> */
            if (ರ‿ರ.library.meta.capabilities && ರ‿ರ.library.meta.capabilities.loan && _hasCopy && !_isExcluded) 
              FN.libraries.available(ರ‿ರ.library, _copies)
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
  
  var _search = {
    
    empty : target => ಠ_ಠ.Display.template.show({
        template: "empty",
        target: target,
        clear: true
      }),
    
    /* <!-- Consider Removing non-Public (e.g. Filter) Fields here --> */
    process : results => results,
    
    results: (target, results) => {
      var _filters = ರ‿ರ.db.filter(),
          _hasFilter = _.keys(_filters).length > 0;
      
      var _return = ಠ_ಠ.Display.template.show(_.extend({
        template: "results",
        filter: _hasFilter ? ಠ_ಠ.Display.template.get({
          template: "filters",
          filters: _filters,
        }) : null,
        target: target,
        clear: true
      }, _search.process(results)));
      
      if (_hasFilter) (ಠ_ಠ.Flags.log("Filters:", _filters), _.each(_filters, (filter, key) => {
        if (filter.range) {
          
          var _filter = _return[0].querySelector(`#filter_${key}`),
              _input = _filter.querySelector(".custom-slider"),
              _index = results.columns ? results.columns.indexOf(filter.name) : null,
              _reset = _filter.querySelector("[data-action='reset']"),
              _values = _return.find(".values");
          
          if (_index >= 0) {
            
            var _all = _.chain(results.values).pluck(_index).compact().value(),
                _lower = _.min(_all),
                _upper = _.max(_all),
                _min = Math.min(0, _lower),
                _max = Math.ceil(Math.round(_upper / 10)) * 10,
                _step = _max / 100;
            
            ಠ_ಠ.Flags.log(`Range Filter for ${filter.name}`, {
              count: _all.length,
              lower: _lower,
              upper: _upper,
              min: _min,
              max: _max,
              step: _step
            });
            
            noUiSlider.create(_input, {
              start: [_lower, _upper],
              tooltips: [true, true],
              connect: true,
              range: {
                  "min": _min,
                  "max": _max
              },
              step: _step,
            });
            
            var _called = [],
                _update = _.debounce(values => ಠ_ಠ.Display.template.show({
                  template: "values",
                  target: _values,
                  values: _.filter(_search.process(results).values, v => v[_index] >= values[0] && v[_index] <= values[1]),
                  clear: true
                }), 100);
            
            $(_reset).on("click.reset", () => {
              _called = [];
              _input.noUiSlider.reset();
              ಠ_ಠ.Display.template.show({
                template: "values",
                target: _values,
                values: _search.process(results).values,
                clear: true
              });
            });
            
            _input.noUiSlider.on(`update.${key}`, 
              (values, handle) => _called[handle] ? _update(values) : (_called[handle] = true));
            
          } else {
            _filter.classList.add("d-none");
          }
        }
      }));
      
      return _return;
    },
    
    action: (results, element, terms) => {
      var _results_element = _display(element, results, terms);
      ಠ_ಠ.Flags.log("RESULTS:", results);

      /* <!-- Clear any selected Book states --> */
      _clear();

      results ? results.values.length === 1 ? _book(results.values[0][0]) : 
        _hookup(_search.results(_results_element, results)) : _search.empty(_results_element);
      _reset(true);
    },
        
    advanced: () => {
      var _customs = ರ‿ರ.db.custom() || {};
      return ಠ_ಠ.Display.modal("search", {
        id: "advanced_search",
        target: $("body"),
        title: "Advanced Search",
        instructions: ಠ_ಠ.Display.doc.get("ADVANCED_SEARCH", null, true),
        identifiers: ರ‿ರ.db.identifiers(),
        custom: _.chain(_customs).map((field, key) => {
            var _field = {
              key: key,
            };
            if (field.enums) _field.values = field.enums();
            return _.extend(_field, field);
          })
          .filter(field => field.type == "text" || field.type == "int" || field.type == "float")
          .sortBy("name")
          .value(),
        validate: values => _.some(values, 
            value => value.Value || (_.isArray(value.Values) && value.Values.length > 0) || 
                        (value.Values && (
                          (value.Values.Value !== undefined && value.Values.Value !== null) || 
                          (value.Values.Value_1 !== undefined && value.Values.Value_1 !== null) ||
                          (value.Values.Value_2 !== undefined && value.Values.Value_2 !== null)
                        ))),
        action: "Search",
        enter: true
      }, dialog => {
        ಠ_ಠ.Flags.log("DIALOG:", dialog);
        _.each(dialog.find("[data-qualifier]"), element => {
          var _element = $(element),
              _qualifier = _element.data("qualifier");
          _element.parents(".input-group").find(`[data-${_qualifier}]`).on("click.qualifier", e => {
            var _clicked = $(e.currentTarget),
                _data = _clicked.data(_qualifier);
            _element.text(_data === "*" ? "Type" : _data === "==" ? "Equals" : 
                            ರ‿ರ.db.identifiers()[_data] ? ರ‿ರ.db.identifiers()[_data].toUpperCase() : _data)
              .parents(".input-group").find("input").focus();
          });
        });
      })
      .then(values => {        
        ಠ_ಠ.Flags.log("ADVANCED SEARCH:", values);
        var _values = _.reduce(values, (memo, value, key) => {
          var _custom = _customs[key],
              _return = {
                comparator: "="
              },
              _process = (value, comparator, target) => {
                if (comparator && comparator != "Equals" && comparator != "=") 
                  (target || _return).comparator = comparator;
                (target || _return).value = value;
              };
          if (_custom) {
            _return.field = _custom.name;
            if (value.Values) {
              if (_.isArray(value.Values) && value.Values.length > 0) {
                _return.value = value.Values[0];
                if (value.Values.length > 1) _return.children = _.map(value.Values.slice(1), child => ({
                    operator: "or",
                    term: {
                      comparator: "=",
                      field: _custom.name,
                      value: child,
                    },
                  }));
              } else if (value.Values.Comparator_1 && value.Values.Comparator_2 && 
                         (value.Values.Value_1 !== undefined || value.Values.Value_2 !== undefined)) {
                if (value.Values.Value_1 === undefined) {
                  _process(value.Values.Value_2, value.Values.Comparator_2);
                } else {
                  _process(value.Values.Value_1, value.Values.Comparator_1);
                  if (value.Values.Value_2 !== undefined) {
                    var _and = {
                      operator: "and",
                      term: {
                        comparator: "=",
                        field: _custom.name,
                      }
                    };
                    _process(value.Values.Value_2, value.Values.Comparator_2, _and.term);
                    _return.children = [_and]; 
                  }
                }
              } else {
                _process(value.Values.Value, value.Values.Comparator);
              }
            } else {
              _return.value = value.Value;
            }
          } else if (key == "Identifier") {
            _return.field = value.Values.Type;
            _return.value = value.Values.Value;
            if (_return.field == "Type") _return = false;
          } else {
            _return.field = key;
            _return.value = value.Value;
          }
          if (_return.value === undefined || _return.value === null) _return = false;
          if (_return) {
            if (memo.length > 0) _return = {
              operator: "and",
              term: _return,
            };
            memo.push(_return);
          }
          return memo;
        }, []);
        ಠ_ಠ.Flags.log("SEARCH PROPERTIES:", _values);
        if (_values && _values.length > 0) _search.action(ರ‿ರ.db.search.advanced(_values), _holder());
      })
      .catch(e => e ? ಠ_ಠ.Flags.error("Advanced Search Error", e) : ಠ_ಠ.Flags.log("Advanced Search Cancelled"));
    },
    
    basic: terms => {
      terms = decodeURIComponent(ಱ.url.decode(terms));
      $("header.navbar form[data-role='search'] input[role='search']").val(terms);
      ಠ_ಠ.Flags.log("BASIC SEARCH:", terms);
      _search.action(terms ? ರ‿ರ.db.search.books(terms == "*" ? "" : terms) : null, _holder(), terms && terms != "*" ? terms : null);
    },
    
    searcher: e => {
      /* <!-- Stop any default form actions (e.g. Post) --> */
      e.preventDefault();
      e.stopPropagation();

      /* <!-- Get the search terms from the triggering element (search up the tree) --> */
      var _input = $(e.currentTarget).parents("form[data-role='search']").find("input[role='search']"),
          _terms = _input.val();

      /* <!-- Not routed, so manually tidy up! --> */
      ಠ_ಠ.Display.tidy();

      /* <!-- Perform the search and push into the history state (to allow for blended back/forward navigation) --> */
      _search.basic(_terms, _holder());
      window.history.pushState(null, null, `#search.${ಱ.url.encode(encodeURIComponent(_terms))}`);
    },
    
  };
  
  var _overview = (element, index) => Promise.resolve(ಠ_ಠ.Display.template.show({
                template: "details",
                target: element,
                details: ಠ_ಠ.Display.doc.get({
                            name: "LIBRARY",
                            data: {
                              name: ರ‿ರ.library.meta && ರ‿ರ.library.meta.details && ರ‿ರ.library.meta.details.display ?
                                ರ‿ರ.library.meta.details.display : ಠ_ಠ.me.display_name(),
                            }
                          }),
                searches: ರ‿ರ.library.meta && ರ‿ರ.library.meta.details ? ರ‿ರ.library.meta.details.search : null,
                clear: true,
                index: index,
                results: _.tap(ರ‿ರ.db.recent.all(!ರ‿ರ.library.meta || ರ‿ರ.library.meta.recent === undefined ? 
                                                 5 : ರ‿ರ.library.meta.recent),
                                recent => ಠ_ಠ.Flags.log("RECENT:", recent)),
              }))
    .then(element => _hookup(element).find("form[data-role='search'] button[type='submit']")
                .off("click.search").on("click.search", _search.searcher))
    .then(() => {
      /* <!-- Set Manageable and Loanable States --> */
      ಠ_ಠ.Display.state().exit([
        FN.states.library.manageable, FN.states.library.loanable, FN.states.library.requestable,
        FN.states.libraries.single, FN.states.libraries.multiple, FN.states.libraries.selecting,
        FN.states.libraries.readonly
      ]);
      ಠ_ಠ.Display.state().set(FN.states.library.manageable, ರ‿ರ.library.meta.claims && ರ‿ರ.library.meta.claims.manage);
      ಠ_ಠ.Display.state().set(FN.states.library.loanable, ರ‿ರ.library.meta.capabilities && ರ‿ರ.library.meta.capabilities.loan);
      ಠ_ಠ.Display.state().set(FN.states.library.readonly, ರ‿ರ.library.meta.readonly);
    })
    .then(_clear);
  
  var _library = (index, book) => (index === null || index === undefined ? 
      FN.libraries.first().then(library => _.tap(library, library => ರ‿ರ.index = library.code)) : FN.libraries.one(ರ‿ರ.index = index))
  
          /* <!-- Process Links and Set Current Library --> */
          .then(library => ($("[data-append='library'][href]").each(
            (i, el) => el.href = !el.href || el.href.indexOf("#") >= 0 ? el.href : `${el.href}#library.${library.code}`
           ), ರ‿ರ.library = library))
  
          .then(library => FN.libraries.db(library))
                
          .then(result => (ಠ_ಠ.Flags.log("LIBRARY:", ರ‿ರ.library), 
                 result && result.data ? FN.catalog.load(result.data, ರ‿ರ.library.meta.capabilities) : null))

          .then(db => ರ‿ರ.db = db)

          .then(db => {

            if (!db) return (ಠ_ಠ.Display.state().enter(FN.states.library.none), null);
            ಠ_ಠ.Display.state().change(FN.states.library.specific, FN.states.library.loaded);
            $("#explore-library .library-name").text(ರ‿ರ.library.name);

            _overview(_holder(), ರ‿ರ.index).then(() => book !== undefined && book !== null ? _book(book) : null);

            $("header.navbar form[data-role='search'] button[type='submit']")
              .off("click.search").on("click.search", _search.searcher);

            $("input[role='search']:visible").focus();

            ರ‿ರ.refresh = () => _library(index, book);

            /* <!-- Prepare Selector (if multiple libraries) --> */
            FN.select.all($(".libraries-selection"), true, false, "Select", "swap.cancel", "library");

          })
  
          .then(ಠ_ಠ.Main.busy("Opening Library", true));
	/* <!-- Internal Functions --> */
  
  /* <!-- Setup Functions --> */
  FN.setup = {

    modules: ["Common", "Cache", "Client", "Demo", "Libraries", "Select", "Catalog", "Lexer", "PWA", "Hookup"],
    
    /* <!-- Setup required for everything, almost NOTHING is loaded at this point (e.g. ಠ_ಠ.Flags) --> */
    now: () => {

      /* <!-- Set Up / Create the States Module --> */
      FN.states = ಠ_ಠ.States();
      
      FN.backgrounds = ಠ_ಠ.Backgrounds();
      
      FN.encode = ಠ_ಠ.Strings().base64.encode;
      
      FN.decode = ಠ_ಠ.Strings().base64.decode;

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
      ಠ_ಠ.Display.state().change(FN.states.views, ಱ.demo ? [FN.states.demo, FN.states.library.in] : FN.states.library.in);
      
      /* <!-- Bind Escape --> */
      if (window.Mousetrap) {
        window.Mousetrap.unbind("esc");
        window.Mousetrap.bind("esc", () => $(".collapse.show").removeClass("show"));
      }
      
      /* <!-- Default Route used in case we arrived here directly (instead of from another page) --> */
      if (ಠ_ಠ.Flags.cleared() && !ಠ_ಠ.Flags.initial() && !ಠ_ಠ.Display.state().in(FN.states.library.working))
        window.location.hash = `#${DEFAULT_ROUTE}`;
      
    },

  };
  /* <!-- Setup Functions --> */

  
  /* <!-- Route Handlers --> */
  FN.routes = () => ({
          
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
      length : {
        min: 0,
        max: 1
      },
      tidy : true,
      fn : command => command ? _search.basic(command) : _search.advanced(),
    },

    library : {
      matches : /LIBRARY/i,
      trigger : FN.states.library.working,
      length : {
        min: 0,
        max: 3
      },
      tidy : true,
      fn : command => command && _.isArray(command) ? 
          command.length == 2 ? _library(command[0], command[1]) : 
            command.length == 3 ? _library(command[0]).then(() => command[1] && command[1].toLowerCase() == "search" ?
                                                            _search.basic(command[2], _holder()) : null) : 
          _library(command) : _library(command),
    },

    folder : {
      matches : /FOLDER/i,
      state : FN.states.library.loaded,
      trigger : FN.states.library.working,
      length : 1,
      tidy : true,
      fn : command => FN.libraries.folder(ರ‿ರ.library, FN.decode(command)).then(value => Object.assign(document.createElement("a"), 
                                                                   {target: "_blank", href: value}).click())
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
                  target: $("body"),
                  title: ಠ_ಠ.Display.doc.get({
                    name: "TITLE_CONFIRM_LOAN",
                    trim: true
                  }),
                  message: ಠ_ಠ.Display.doc.get("CONFIRM_LOAN", FN.common.format.book(ರ‿ರ.book, copy)),
                  action: "Loan",
                  simple: true
                })
                .then(user => FN.libraries.log.loan(ರ‿ರ.library, FN.common.process.user(user), ರ‿ರ.book.ID, ರ‿ರ.book.ISBN, copy,
                      FN.common.format.details(ರ‿ರ.book))
                      .then(ಠ_ಠ.Main.busy("Loaning Book", true))
                      .then(_process))
                .catch(_error);

              _available.length === 1 ? _loan(_available[0].copy) : ಠ_ಠ.Display.choose({
                id: "loan_choose",
                target: $("body"),
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
                target: $("body"),
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
                target: $("body"),
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
        },

        request : {
          matches : /REQUEST/i,
          length : {
            min: 0,
            max: 1
          },
          fn: command => {
            var _result = FN.common.result($("[data-action='request']"));
            return FN.libraries.request(ರ‿ರ.library, ರ‿ರ.book.ID.text || ರ‿ರ.book.ID, ರ‿ರ.book.ISBN, 
                                              FN.common.format.details(ರ‿ರ.book), command || ರ‿ರ.library.meta.user)
              .then(ಠ_ಠ.Main.busy("Requesting Book", true))
              .then(value => value ? ಠ_ಠ.Display.tooltips(_result(value.requested, 
                      value.type == "NEW" ? "Created new request" : 
                      value.type == "DENIED" ? "You can't request this because you have overdue loans!" : 
                      "You have already requested this item!").tooltip("dispose")) : _result())
              .then(() => FN.libraries.requests.mine(ರ‿ರ.library, true))
              .catch(e => (e ? ಠ_ಠ.Flags.error("Request Book Error", e) : ಠ_ಠ.Flags.log("Request Book Cancelled"), _result()));
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

    refresh: {
      matches: /REFRESH/i,
      state: FN.states.library.loaded,
      length: 0,
      tidy: true,
      fn: () => ರ‿ರ.refresh()
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
        }, {
          match: [
            /RECENT/i
          ],
          show: "RECENT_ADDITIONS",
          title: "Recent Additions to the Library ..."
        }],
        
        routes : FN.routes(this),
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