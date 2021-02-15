EPUB = (options, factory) => {
  "use strict";

  /* <!-- MODULE: Provides an interface to provide common functionality --> */
  /* <!-- PARAMETERS: Receives the global app context --> */
  /* <!-- REQUIRES: Global Scope: JQuery, Underscore | App Scope: Display --> */
  
  /* <!-- Internal Constants --> */
  const DEFAULTS = {
      ignoreClass: "annotator-hl",
      width: "100%",
      height: "100%"
    }, 
    FN = {},
    THEMES = {
      light: {"body": {"background-color": "#ffffff", "color": "#333333"}},
      sepia: {"body": {"background-color": "#f4ecd8", "color": "#333333"}},
      dark: {"body": {"background-color": "#333333", "color": "#dcdcdc"}}
    },
    FONTS = [
      "Georgia",
      "Arial",
      "Verdana",
      "Helvetica",
      "Tahoma",
      "Trebuchet MS",
      "Times New Roman",
      "Garamond",
      "Courier New",
      "Optima"
    ],
    SIZES = [
      "0.6",
      "0.8",
      "0.9",
      "1",
      "1.1",
      "1.2",
      "1.5",
    ];
  /* <!-- Internal Constants --> */

  /* <!-- Internal Options --> */
  options = _.defaults(options ? _.clone(options) : {}, DEFAULTS);
  /* <!-- Internal Options --> */
  
  
  /* <!-- Internal Variables --> */
  var ರ‿ರ = { /* <!-- Session State --> */
    current : {
      theme : "light",
      size : "1",
      font : "Georgia"
    }
  };
  /* <!-- Internal Variables --> */
  
  
  /* <!-- Event Handlers --> */
  var _freeze = fn => () => {
    var _element = ರ‿ರ.element.parentElement;
    _element.style["max-height"] = _element.style["min-height"] = window.getComputedStyle(_element).height;
    var _return = fn();
    return (_return.then ? _return : Promise.resolve(_return))
      .then(value => {
        window.setTimeout(() => _element.style["max-height"] = _element.style["min-height"] = "", 500);
        return value;
      });
  };
  
  var _next = () => ರ‿ರ.reader.package.metadata.direction === "rtl" ? ರ‿ರ.rendition.prev() : ರ‿ರ.rendition.next();
  
  var _prev = () => ರ‿ರ.reader.package.metadata.direction === "rtl" ? ರ‿ರ.rendition.next() : ರ‿ರ.rendition.prev();
  
  var _toggleDivider = show => document.getElementById("divider").classList.toggle("d-none", !show);
  /* <!-- Event Handlers --> */
  
  
  /* <!-- Internal Functions --> */
  var _update = {
    
    theme : theme => {

      var _theme = THEMES[theme];

      if (_theme) {
        ರ‿ರ.element.style["background-color"] = _theme.body["background-color"];
        ರ‿ರ.rendition.themes.select(theme);
        ರ‿ರ.rendition.themes.override("color", _theme.body.color, true);
        ರ‿ರ.rendition.themes.override("background-color", _theme.body["background-color"], true);
      }

    },
    
    font : font => {
      ರ‿ರ.rendition.themes.override("font-family", font, true);
    },
    
    size : size => {
      ರ‿ರ.rendition.themes.override("font-size", `${size}em`, true);
    },
    
    line_height : size => {
      ರ‿ರ.rendition.themes.override("line-height", `${size}em`, true);
    }
    
  };
  
  var _clear = location => {
    var _clear = annotations => (_.map(annotations, value => ರ‿ರ.rendition.annotations.remove(value.cfiRange, value.type)), annotations);
    if (location) {
      ರ‿ರ.annotations = _.difference(ರ‿ರ.annotations, _clear(_.filter(ರ‿ರ.annotations || [], 
                                                     annotation => String.equal(annotation.cfiRange, location, true))));
    } else {
      _clear(ರ‿ರ.annotations || []);
      ರ‿ರ.annotations = []; 
    }
  };
  
  var _reset = () => {
    ರ‿ರ.element = document.getElementById("viewer");
    delete ರ‿ರ.rendition;
    delete ರ‿ರ.navigation;
    return Promise.resolve(ರ‿ರ.reader = window.ePub());
  };
  
  
  var _render = value => reader => {
    
    reader.open(value);
    
    factory.Flags.log("READER:", reader);

    ರ‿ರ.rendition = reader.renderTo(ರ‿ರ.element, options);
    
    ರ‿ರ.navigation = reader.navigation;
    
    ರ‿ರ.rendition.on("layout", props => _toggleDivider(props.spread === true));

    ರ‿ರ.rendition.on("relocated", location => {
      if (!location) return;
      factory.Flags.log("LOCATION:", location);
      if ((ರ‿ರ.start && ರ‿ರ.start.href != location.start.href) || (ರ‿ರ.end && ರ‿ರ.end.href != location.end.href)) _clear();
      ರ‿ರ.start = location.start;
      ರ‿ರ.end = location.end;
      document.getElementById("prev").classList.toggle("invisible", !!location.atStart);
      document.getElementById("next").classList.toggle("invisible", !!location.atEnd);
    });
    
    ರ‿ರ.rendition.themes.default({
        "body": {
          "padding-top": "10px !important",
          "padding-bottom": "10px !important",
          "font-size": "1em"
        },
        "a": {
          "pointer-events": "auto !important",
        },
        "a:link": {"color": "rgb(109, 109, 212)"},
        "a:visited": {"color": "rgb(156, 156, 208)"},
        ".block-rw": {"font-family": "inherit", "line-height": "inherit", "color": "inherit"},
        ".galley-rw": {"font-family": "inherit", "line-height": "inherit", "color": "inherit"}
      });
    
    _.each(THEMES, key => ರ‿ರ.rendition.themes.register(key, THEMES[key]));
    
    return reader.ready.then(() => reader);
    
  };
  
  var _ready = reader => {
    var _current = reader.key(),
        _metadata = reader.package.metadata,
        _cfi = reader.navigation.toc[0].href;
    
    factory.Flags.log("CURRENT:", _current);
    factory.Flags.log("METADATA:", _metadata);
    factory.Flags.log("CONTENTS:", reader.navigation.toc);
    
    document.getElementById("book-title").innerHTML = _metadata.title;
    document.getElementById("title-seperator").classList.toggle("d-none", !_metadata.title || !_metadata.creator);
    document.getElementById("chapter-title").innerHTML = _metadata.creator;
    
    document.title = `${_metadata.title} | ${_metadata.creator}`;
    
    return ರ‿ರ.rendition.display(_cfi);
  };
  
  var _cycle = (value, values) => values[values.indexOf(value) >= values.length - 1 ? 0 : values.indexOf(value) + 1];
  /* <!-- Internal Functions --> */
  

  /* <!-- External Functions --> */
  FN.load = value => _reset().then(_render(value)).then(_ready).then(() => FN);
  
  FN.next = _freeze(_next);
  
  FN.previous = _freeze(_prev);
  
  FN.theme = theme => theme ? 
    _update.theme(ರ‿ರ.current.theme = theme) : _update.theme(ರ‿ರ.current.theme = _cycle(ರ‿ರ.current.theme, _.keys(THEMES)));

  FN.font = font => font ? 
    _update.font(ರ‿ರ.current.font = font) : _update.font(ರ‿ರ.current.font = _cycle(ರ‿ರ.current.font, FONTS));
  
  FN.size = size => size ? 
    _update.size(ರ‿ರ.current.size = size) : _update.size(ರ‿ರ.current.size = _cycle(ರ‿ರ.current.size, SIZES));
  
  FN.contents = () => {
    var _reducer = (memo, item) => {
      if (item.label && item.href) {
        var _item = {
          id : item.href,
          text : item.label.trim()
        };
        if (item.subitems && item.subitems.length > 0) _item.children = _.reduce(item.subitems, _reducer, []);
        memo.push(_item);
      }
      return memo;
    };  
    return _.reduce(ರ‿ರ.reader.navigation.toc, _reducer, []);
  };
  
  FN.search = terms => (ರ‿ರ.annotations = ರ‿ರ.annotations || [], _.map(ರ‿ರ.reader.section(ರ‿ರ.start ? ರ‿ರ.start.cfi : null).find(terms),
    result => {
      if (!_.find(ರ‿ರ.annotations, annotation => String.equal(annotation.cfiRange, result.cfi, true)))
        ರ‿ರ.annotations.push(ರ‿ರ.rendition.annotations.highlight(result.cfi));
      return {
        id : result.cfi,
        text : result.excerpt,
      };
    }));
  
  FN.clear = location => {
    var _clear = annotations => (_.map(annotations, value => ರ‿ರ.rendition.annotations.remove(value.cfiRange, value.type)), annotations);
    if (location) {
      ರ‿ರ.annotations = _.difference(ರ‿ರ.annotations, _clear(_.filter(ರ‿ರ.annotations || [], 
                                                     annotation => String.equal(annotation.cfiRange, location, true))));
    } else {
      _clear(ರ‿ರ.annotations || []);
      ರ‿ರ.annotations = []; 
    }
  };
  
  FN.navigate = destination => ರ‿ರ.rendition.display(destination ? destination : ರ‿ರ.reader.navigation.toc[0].href);
  
  FN.state = () => ರ‿ರ;
  /* <!-- External Functions --> */
  
    
  /* <!-- Public Functions --> */
  return FN;
  /* <!-- Public Functions --> */
  
};