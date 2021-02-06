Select = (options, factory) => {
  "use strict";

  /* <!-- MODULE: Provides an interface to provide common functionality --> */
  /* <!-- PARAMETERS: Receives the global app context --> */
  /* <!-- REQUIRES: Global Scope: JQuery, Underscore | App Scope: Display --> */
  /* <!-- TODO: Deal with 'large' objects, e.g. PDFs | Perhaps a Max size for Uint8Array (e.g. data object or data.data object) --> */

  /* <!-- Internal Constants --> */
  const DEFAULTS = {
    select: "Select",
    command: "/app/library/#google,library",
    cancel: null,
  }, FN = {};
  /* <!-- Internal Constants --> */

  /* <!-- Internal Options --> */
  options = _.defaults(options ? _.clone(options) : {}, DEFAULTS);
  /* <!-- Internal Options --> */
  
  /* <!-- Internal Variables --> */
  /* <!-- Internal Variables --> */
  
  /* <!-- Internal Functions --> */
  
  /* <!-- Internal Functions --> */
  
  /* <!-- Public Functions --> */
  FN.all = (target, manage, select, cancel, command) => options.functions.libraries.all()
  
    .then(libraries => _.filter(libraries, 
      library => library && library.state == "READY" && 
                  (!manage || (library.meta && library.meta.claims && library.meta.claims.manage))
    ))
  
    .then(libraries => (
      factory.Display.state().set(options.functions.states.libraries.multiple, (libraries && libraries.length > 1)),
      factory.Display.state().set(options.functions.states.libraries.single, (!libraries || libraries.length <= 1)),
      libraries)
    )
  
    .then(libraries => {

      if (!libraries || libraries.count === 0) return;
    
      var _selector = factory.Display.template.show({
        template: "selector",
        libraries: libraries,
        container: false,
        cancel: cancel ? cancel.indexOf("/") >= 0 ? cancel : `#google,#${cancel}` : options.cancel,
        text: select || options.select,
        url: command ? command.indexOf("/") >= 0 ? command : `#google,#${command}` : options.command,
        external: !command,
        target: target,
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

        } else {

          _button.attr("href", _button.data("href"));

        }
      });

    })
    .catch(e => factory.Flags.error("Loading Libraries", e));
  /* <!-- Public Functions --> */
  
  return FN;
  
};