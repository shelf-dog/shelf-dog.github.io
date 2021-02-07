PWA = (options, factory) => {
  "use strict";

  /* <!-- MODULE: Provides an interface to provide common functionality --> */
  /* <!-- PARAMETERS: Receives the global app context --> */
  /* <!-- REQUIRES: Global Scope: JQuery, Underscore | App Scope: Display --> */
  /* <!-- TODO: Deal with 'large' objects, e.g. PDFs | Perhaps a Max size for Uint8Array (e.g. data object or data.data object) --> */

  /* <!-- Internal Constants --> */
  const DEFAULTS = {
    delay: 30 * 1000
  }, FN = {};
  /* <!-- Internal Constants --> */

  /* <!-- Internal Options --> */
  options = _.defaults(options ? _.clone(options) : {}, DEFAULTS);
  /* <!-- Internal Options --> */
  
  /* <!-- Internal Variables --> */
  /* <!-- Internal Variables --> */
  
  /* <!-- Internal Functions --> */
  var _standalone = () => (navigator.standalone || (window.matchMedia("(display-mode: standalone)").matches)) &&
      screenfull.isEnabled && !screenfull.isFullscreen;
  
  var _available = available => factory.Display.state().set(options.functions.states.fullscreen.available, available);
  
  var _enter = () => factory.Display.state().enter(options.functions.states.fullscreen.enabled);
  
  var _exit = () => factory.Display.state().enter(options.functions.states.fullscreen.enabled);
    
  var _setup = () => {
    
    /* <!-- Handle Full Screen Clicks --> */
    $("header [data-fullscreen] a")
      .off("click.fullscreen")
      .on("click.fullscreen", e => {
        e.preventDefault();
        e.stopPropagation();
        screenfull.request().then(_enter).catch(_exit);
      });
    
    /* <!-- Watch for External Changes --> */
    screenfull.on("change", () => {
      factory.Display.state().set(options.functions.states.fullscreen.enabled, screenfull.isFullscreen);
      if (screenfull.isFullscreen) _available(false);
    });
    
    /* <!-- Show Available for a period of time --> */
    _available(true);
    options.functions.common.delay(options.delay).then(_available);
    
  };
  /* <!-- Internal Functions --> */
  
  /* <!-- Public Functions --> */
  
  /* <!-- Public Functions --> */
  
  /* <!-- Initial Functions --> */
  _standalone() || factory.Flags.development() ? _setup() : null;
  /* <!-- Initial Functions --> */
  
  return FN;
  
};