Hookup = (options, factory) => {
  "use strict";

  /* <!-- MODULE: Provides an interface to provide common functionality --> */
  /* <!-- PARAMETERS: Receives the global app context --> */
  /* <!-- REQUIRES: Global Scope: JQuery, Underscore | App Scope: Display --> */

  /* <!-- Internal Constants --> */
  const FN = {};
  /* <!-- Internal Constants --> */

  /* <!-- Internal Options --> */
  /* <!-- Internal Options --> */

  /* <!-- Internal Variables --> */

  /* <!-- Internal Variables --> */

  /* <!-- Internal Functions --> */
  /* <!-- Internal Functions --> */
  
  /* <!-- Public Functions --> */
  FN.closer = element => {
      element.find("[data-action='close']").on("click.close", e => {
        e.preventDefault();
        $(e.target).parents(".card").remove();
      });
      return element;
    };

  FN.links = element => {
      var _query = "[data-action='click'][data-href]:visible";
      element.find(_query).off("dblclick.action").on("dblclick.action", e => {
        var _target = $(e.currentTarget);
        if (!_target.is("span")) {
          _target = _target.is(_query) ? _target : _target.parents(_query);
          window.location.hash = _target.data("href");
        }
      });
      return FN.closer(element);
    };

  FN.since = element => {
      var _current = factory.Dates.now();
      element.find("[data-title='loaded-time']").tooltip({
        html: true,
        trigger: "click",
        title: function() {
          _.delay(element => element.tooltip("hide"), 2000, $(this));
          return `<strong>Data Loaded: </strong>${factory.Dates.duration(factory.Dates.now() - _current).humanize()} ago`;
        }
      });
      return element;
    };
  
  FN.cover = (library, book, element, width) => {
    
    /* <!-- Start Cover Download --> */
    if (library && book && book.Cover === 1) {
      
      var _load = link => options.functions.libraries.cover(library, book.Path.text || book.Path, link),
          _show = (holder, cover, style) => factory.Display.template.show({
            template: "cover",
            target: holder,
            image: cover || "",
            style: style,
            width: width,
            replace: true
          }),
          _retry = img => {
            var _holder = factory.Display.template.show({
              template: "placeholder",
              target: $(img).parent(),
              replace: true
            });
            factory.Flags.log("COVER IMAGE FAILED TO LOAD:", img);
            _load(false)
              .catch(e => (factory.Flags.error("COVER DOWNLOAD Error:", e), "/images/logo.png"))
              .then(cover => _show(_holder, cover, `max-width: ${width || "200px"};`));
          };
      
      _load(true)
        .then(cover => _show(element.find(".img-placeholder"), cover))
        .then(value => {
          var _img = value.find("img")[0];
          return _img.complete ? _img : new Promise((resolve, reject) => {
            _img.onload = () => resolve(_img);
            _img.onerror = () => reject(_img);
          });
        })
        .then(img => !img.complete || (typeof img.naturalWidth != "undefined" && img.naturalWidth == 0) ? 
                _retry(img) : img)
        .catch(_retry);
      
    } else {
      
      element.find(".img-placeholder [role='status']").remove();
      
    }
    
  };
  /* <!-- Public Functions --> */

  /* <!-- Initial Calls --> */

  /* <!-- External Visibility --> */
  return FN;
  /* <!-- External Visibility --> */

};