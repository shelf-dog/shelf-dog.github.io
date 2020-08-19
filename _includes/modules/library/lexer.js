Lexer = (options, factory) => {
  "use strict";

  /* <!-- MODULE: Provides an interface to provide common event functionality --> */

  /* <!-- Internal Constants --> */
  const REGEXES = {
    
    /* <!-- Matches Content between Quote Marks (Single or Double) --> */
    quoted: /["|'](.+)["|']/g,
    
    /* <!-- Matches Part A, operator, Part B --> */
    operator: /(.+)\s+(and|or|not)\s+(.+)/i,
    
    /* <!-- Matches LHS, comparator, RHS --> */
    comparator: /(.+)\b\s*(!=|<>|>=|<=|=<|=>|==|=|>|<)\s*\b(.+)/,
    
  };
  /* <!-- Internal Constants --> */

  /* <!-- Internal Functions --> */
  var _comparators = terms => _.map(terms, term => {
    
    var _term = REGEXES.comparator.exec(term.term || term);
    if (_term && _term.length === 4) {
      var _parsed = {
        field: _term[1],
        comparator: _term[2],
        value: _term[3]
      };
      factory.Flags.log("Comparator Parsed Term:", _parsed);
      term.term ? term.term = _parsed : term = _parsed;
    }
    
    return term;
    
  });
  
  var _operators = terms => {
    
    var _terms = [],
        _operator;

    while (terms && (_operator = REGEXES.operator.exec(terms)) && _operator.length === 4) {

      if (REGEXES.comparator.test(_operator[1]) || REGEXES.comparator.test(_operator[3])) {

        _terms.push({
          operator: _operator[2].toLowerCase(),
          term: _operator[3],
        });
        terms = _operator[1];

      } else {

        _terms.push(_operator[0]);
        terms = null;

      }

    }

    if (terms) _terms.push(terms);

    return _comparators(_terms.reverse());

  };
  
  var _parse = terms => {
    
    var _quoted = REGEXES.quoted.exec(terms);
    if (_quoted && _quoted.length === 2) {
      
      /* <!-- This is a quoted search term, so we shouldn't attempt to parse it --> */
      factory.Flags.log("Quoted Search Terms:", _quoted[1]);
      return _quoted[1];
      
    } else {
      
      var _operated = _operators(terms);
      factory.Flags.log("Operator Parsed Terms:", _operated);
      return _operated;
      
    }
    
  };
  /* <!-- Internal Functions --> */
  
  /* <!-- External Visibility --> */
  return {
    
    parse: terms => _parse(terms),
    
  };
  /* <!-- External Visibility --> */

};