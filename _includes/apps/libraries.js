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
    ರ‿ರ = {},
    /* <!-- Session State --> */
    ಱ = {}; /* <!-- Persistant State --> */
  /* <!-- Internal Variables --> */

  /* <!-- Internal Functions --> */
  var _overview = index => ($(".loaded-content").addClass("blurred"), FN.libraries.one(index)
    .then(library => FN.libraries.db(ರ‿ರ.library = library))
    .then(result => FN.catalog.load(result.data))
    .then(db => {
      ಠ_ಠ.Display.state().enter(FN.states.libraries.overview);
      var _replace = $("#overview");
      ಠ_ಠ.Display.template.show({
        template: "overview",
        target: _replace.length > 0 ? _replace : ಠ_ಠ.container,
        name: ರ‿ರ.library.name,
        description: ರ‿ರ.library.meta.description,
        query: window.location.search,
        count: db.count.books(),
        tags: db.count.tags(),
        index: index,
        replace: _replace.length > 0,
        append: _replace.length === 0
      });
      $(".loaded-content.blurred").removeClass("blurred");
    })
    .then(ಠ_ಠ.Main.busy("Opening Library", false, null, null, "enclosed", $("#details:visible, #overview:visible"))));

  var _all = () => FN.libraries.all()
    .then(libraries => _.filter(libraries, library => library && library.state == "READY"))
    .then(libraries => {

      var _selector = ಠ_ಠ.Display.template.show({
        template: "selector",
        libraries: libraries,
        container: true,
        cancel: "/app",
        query: window.location.search,
        select_text: "Explore",
        select_url: `/app/library/${window.location.search}#google,library`,
        target: $(".library"),
        clear: true
      });
      
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

          _overview(_value.split(".")[1]);

        } else {

          _button.attr("href", _button.data("href"));

        }
      });

    })
    .catch(e => ಠ_ಠ.Flags.error("Loading Libraries", e))
    .then(ಠ_ಠ.Main.busy("Loading Libraries", true));

  var _close = () => {
    if (ಠ_ಠ.Display.state().in(FN.states.libraries.overview)) {
      $("#overview").remove();
      ಠ_ಠ.Display.state().exit(FN.states.libraries.overview);
      $("#choose_Library").val($("#choose_Library option:first").val());
    }
  };
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
      _.each(["Cache", "Client", "Demo", "Libraries", "Catalog", "Lexer"], module => FN[module.toLowerCase()] = ಠ_ಠ[module](_options, ಠ_ಠ));

      /* <!-- Get Window Title --> */
      ಱ.title = window.document.title;

    },

    /* <!-- App is ready for action - e.g. is authenticated but no initial routing done! --> */
    session: () => null,

    /* <!-- App is authenticated and routed! --> */
    routed: () => {

      /* <!-- Set the Initial State --> */
      ಠ_ಠ.Display.state().change(FN.states.views, FN.states.libraries.in);

      /* <!-- Bind Escape --> */
      if (window.Mousetrap) {
        window.Mousetrap.unbind("esc");
        window.Mousetrap.bind("esc", () => $(".collapse.show").removeClass("show"));
      }

      /* <!-- Load the Libraries --> */
      _all().then(() => ಠ_ಠ.Display.state().enter(FN.states.libraries.loaded));

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
        name: "Libraries",
        state: ರ‿ರ,
        states: FN.states.all,
        start: FN.setup.routed,
        routes: {
          all: {
            matches: /ALL/i,
            length: 0,
            fn: _all,
          },
          close: {
            matches: /CLOSE/i,
            length: 0,
            fn: _close,
          },
          refresh: {
            matches: /REFRESH/i,
            state: FN.states.libraries.loaded,
            length: 0,
            fn: () => _all().then(_close)
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