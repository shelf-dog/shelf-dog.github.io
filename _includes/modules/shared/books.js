Books = options => {
  "use strict";

  /* <!-- MODULE: Provides an interface to provide common functionality --> */
  /* <!-- PARAMETERS: Receives the global app context --> */
  /* <!-- REQUIRES: Global Scope: JQuery, Underscore | App Scope: Display --> */
  /* <!-- TODO: Deal with 'large' objects, e.g. PDFs | Perhaps a Max size for Uint8Array (e.g. data object or data.data object) --> */

  /* <!-- Internal Constants --> */
  const DEFAULTS = {
    chunk: 50,
  }, FN = {};
  /* <!-- Internal Constants --> */

  /* <!-- Internal Options --> */
  options = _.defaults(options ? _.clone(options) : {}, DEFAULTS);
  /* <!-- Internal Options --> */
  
  /* <!-- Internal Variables --> */
  /* <!-- Internal Variables --> */
  
  /* <!-- Internal Functions --> */
  var _single = (id, force_by_id) => options.functions.common.process.book(
      options.functions.common.check.isbn(id) ?
        options.state.session.db.find.isbn(id) :
        options.state.session.library.meta.capabilities.loan_field && !force_by_id ?
          options.state.session.db.find.copy(id, options.state.session.library.meta.capabilities.loan_field) : 
          options.functions.common.check.id(id) ? options.state.session.db.find.book(id) : null);
  
  var _multiple = (ids, force_by_id) => options.functions.common.process.books(
      options.state.session.library.meta.capabilities.loan_field && !force_by_id ?
        options.state.session.db.find.copies(ids, options.state.session.library.meta.capabilities.loan_field) : 
        options.state.session.db.find.books(ids));
  
  var _chunk = (ids, force_by_id) => _.chain(ids).chunk(options.chunk)
    .reduce((memo, ids) => memo.concat(_multiple(ids, force_by_id)), []).value();
  /* <!-- Internal Functions --> */
  
  /* <!-- Public Functions --> */
  FN.get = (id, force_by_id) => (_.isArray(id) ? id.length > options.chunk ? _chunk : _multiple : _single)(id, force_by_id);
  /* <!-- Public Functions --> */
  
  return FN;
  
};