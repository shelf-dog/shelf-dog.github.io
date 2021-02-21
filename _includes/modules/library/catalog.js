  Catalog = (options, factory) => {
  "use strict";

  /* <!-- MODULE: Provides an interface to provide common functionality --> */
  /* <!-- PARAMETERS: Receives the global app context --> */
  /* <!-- REQUIRES: Global Scope: JQuery, Underscore | App Scope: Display --> */

  /* <!-- Internal Constants --> */
  const DEFAULTS = {
    sql_config: {},
    updated: "Updated",
    arrays: ["Authors", "Tags", "Formats"],
    separators: {
      array: "\n",
      data: ":*:"
    }
  }, FN = {};
  /* <!-- Internal Constants --> */
  
  /* <!-- Internal Options --> */
  options = _.defaults(options ? _.clone(options) : {}, DEFAULTS);
  /* <!-- Internal Options --> */
  
  /* <!-- Internal Variables --> */
  var ರ‿ರ = {}; /* <!-- Session State --> */
  /* <!-- Internal Variables --> */
  
  /* <!-- Internal Functions --> */
  var _safe = value => value && value.replace ? value.replace(/'/g,"''") : value;
  
  var _scalar = results => results && results.length === 1 ? results[0].values[0][0] : null;
  
  var _data = results => results && results.length === 1 ? results[0] : null;
    
  var _list = results => results && results.length === 1 ? _.map(results[0].values, value => value[0]) : null;
  
  var _run = (query, db) => (factory.Flags.log("Running QUERY:", query), (db || ರ‿ರ.db).exec(query));
  
  var _name = (key, value) => value.name || key.toUpperCase();
  
  var _index = (name, data) => data.columns.indexOf(name) >= 0 ? data.columns.indexOf(name) : false;
  
  var _columns = (columns, data, optional) => {
    if (!data) return false;
    var _columns = _.reduce(columns, (memo, column) => {
      memo[column] = _index(column, data);
      return memo;
    }, {});
    return optional ? _.every(_columns, value => value !== false) ? _columns : null : _.omit(_columns, value => value === false);
  };
  
  var _exists = (name, tables) => (tables || ರ‿ರ.tables).indexOf(name) >= 0 ? name : false;
  
  var _process = (array_columns, date_columns, data) => {
    
    if (data) {
      
      /* <!-- Process Arrays --> */
      if (array_columns && array_columns.length > 0) _.each(_columns(array_columns, data), 
            column => _.each(data.values, row => row[column] = row[column] ? row[column].split("\n") : row[column]));

      /* <!-- Process Book Formats | Deals with Ordering Concatenations --> */
      if (ರ‿ರ.capabilities && ರ‿ರ.capabilities.online_items) {
        var _format_index = data.columns.indexOf("Formats");
        if (_format_index >= 0) {
          data.columns.splice(_format_index + 1, 0, "Format_Files", "Format_Sizes");
          _.each(data.values, row => {
            var _formats = row[_format_index];
            if (_formats && _formats.length > 0) {
              var _types = new Array(_formats.length),
                  _files = new Array(_formats.length),
                  _sizes = new Array(_formats.length);
              _.each(_formats, (format, i) => {
                var _format = format.split(options.separators.data);
                _types[i] = _format[0] || format;
                _files[i] = _format[1] || null;
                _sizes[i] = _format[2] || null;
              });
              row.splice(_format_index, 1, _types, _files, _sizes);
            } else {
              row.splice(_format_index + 1, 0, null, null);
            }
          }); 
        }
      }
      
      /* <!-- Process Dates --> */
      if (date_columns && date_columns.length > 0) _.each(_columns(date_columns, data), 
            column => _.each(data.values, row => row[column] = row[column] ? factory.Dates.parse(row[column]) : row[column]));

      /* <!-- Process Custom Columns --> */
      if (ರ‿ರ.custom) {
        
        /* <!-- Process Enums / Formats --> */
        _.each(["enums", "format"], fn => _.chain(ರ‿ರ.custom).pick(value => value[fn]).each((value, key) => {
          var column = _index(_name(key, value), data);
          if (column !== false) _.each(data.values, row => row[column] = row[column] ? 
            _.isArray(row[column]) ? _.map(row[column], value[fn]) : value[fn](row[column]) : row[column]);
        }));
        
      }
      
      /* <!-- Clear Empty Columns --> */
      var _all = _.range(data.columns.length);
       _.each(data.values, row => {
         if (_all.length === 0) return;
         _.each(row, (value, index) => {
           if (value) _all = _.reject(_all, value => value == index);
         });
       });
      if (_all.length > 0) _.each(_.sortBy(_all, value => 0 - value), index => {
        data.columns.splice(index, 1);
        _.each(data.values, row => row.splice(index, 1));
      });
      
    }
    
    return data;
  };
  
  var _searcher = query => _process(options.arrays.concat(ರ‿ರ.custom ? _.reduce(ರ‿ರ.custom, (memo, value, key) => {
      if (value.public && value.multiple && !value.hidden) memo.push(_name(key, value));
      return memo;
    }, []) : []), null, _data(_run(query)));
  
  var _parse = {
    
    enums : details => {
      var _match = details.match(/^ENUMS:?=?(.+)/i);
      if (_match && _match[1]) {
        var _enums = _.reduce(_match[1].split(";"), (memo, value) => {
          value = value.split("=");
          memo[value[0]] = value[1];
          return memo;
        }, {});
        return value => _enums[value] ? {
          value: value,
          text: _enums[value],
        } : value === undefined ? _enums : value;
      }  
    },
    
    format : details => {
      var _match = details.match(/^DISPLAY_FORMAT:?=?(.+)/i);
      if (_match && _match[1]) {
        if (/^HTTPS?:\/\/.+/i.test(_match[1])) {
          return value => ({
            text: value,
            url: _match[1].replace(/\{\{value\}\}/i, value),
            external: true
          });
        } else {
          return value => _match[1].replace(/\{\{value\}\}/i, value);
        }
      }
    },
    
  };
  
  var _interrogate = db => {
    
    var _tables = _data(_run("SELECT name, sql FROM sqlite_master WHERE type='table' ORDER BY name;", db));
    
    ರ‿ರ.tables = _tables ? _.map(_tables.values, value => value[0]) : null;
    factory.Flags.log("META [Tables]:", ರ‿ರ.tables);
    
    var _identifiers = ರ‿ರ.tables ? _data(_run("SELECT DISTINCT type FROM identifiers ORDER BY type;", db)) : null;
    ರ‿ರ.identifiers = _identifiers ? _.map(_identifiers.values, value => value[0]) : null;
    factory.Flags.log("META [Identifiers]:", ರ‿ರ.identifiers);
    
    if (ರ‿ರ.tables && ರ‿ರ.tables.indexOf("_lc_genre_mapping") >= 0) {
      var _classifications = _data(_run("SELECT * FROM _lc_genre_mapping;")),
          _classification_cols = _columns(["library_code", "genre"], _classifications);
      if (_classification_cols) ರ‿ರ.classifications = _.reduce(_classifications.values, (memo, value) => {
        memo[value[_classification_cols.library_code]] = value[_classification_cols.genre];
        return memo;
      }, {});
      factory.Flags.log("META [Classifications]:", ರ‿ರ.classifications);
    }
    if (ರ‿ರ.tables && ರ‿ರ.tables.indexOf("custom_columns") >= 0) {
      var _custom = _data(_run("SELECT * FROM custom_columns WHERE mark_for_delete = 0;")),
          _custom_cols = _columns(["id", "label", "name", "datatype", "is_multiple", "normalized", "display"], _custom);
      if (_custom_cols) {
        ರ‿ರ.custom = _.reduce(_custom.values, (memo, value) => {
          
          var _custom_column = {
            id : value[_custom_cols.id],
            name : value[_custom_cols.name],
            type : value[_custom_cols.datatype],
            multiple : value[_custom_cols.is_multiple],
            normalised : value[_custom_cols.normalized],
            display : value[_custom_cols.display] ? JSON.parse(value[_custom_cols.display]) : null,
            table : _exists(`custom_column_${value[_custom_cols.id]}`, ರ‿ರ.tables),
            link_table : _exists(`books_custom_column_${value[_custom_cols.id]}_link`, ರ‿ರ.tables),
          };
          
          if (_custom_column.display && _custom_column.display.description)
            _custom_column.description = _custom_column.display.description.split("|");
          
          if (_custom_column.description) {
            
            /* <!-- Clean Up Descriptions --> */
            _custom_column.description = _.chain(_custom_column.description).map(value => value.trim()).compact().value();
            
            /* <!-- Check for Public Flag --> */
            _custom_column.public = !!_.find(_custom_column.description, value => /PUBLIC/i.test(value));
            
            /* <!-- Check for Hidden Flag --> */
            _custom_column.hidden = !!_.find(_custom_column.description, value => /HIDDEN/i.test(value));
            
            /* <!-- Check for Display Format --> */
            _custom_column.format = _.reduce(_custom_column.description, (fn, details) => fn || _parse.format(details), null);
            
            /* <!-- Check for ENUMS --> */
            _custom_column.enums = _.reduce(_custom_column.description, (fn, details) => fn || _parse.enums(details), null);
            
          }
          
          memo[value[_custom_cols.label]] = _custom_column;
          return memo;
        }, {});
        factory.Flags.log("META [Custom Columns]:", ರ‿ರ.custom);
      } else {
        delete ರ‿ರ.custom;
      }
    }
    
    var _scalar = value => value.multiple === 0,
        _array = value => value.multiple === 1,
        _text = value => value.type == "text",
        _date = value => value.type == "date",
        _numeric = value => value.type == "float" || value.type == "int",
        _filter = fn => _.reduce(ರ‿ರ.custom || [], (memo, value, key) => {
            if (fn(value)) memo.push(value.name || key);
            return memo;
          }, []);
    ರ‿ರ.fields = {
        identifiers: ರ‿ರ.identifiers,
        custom: _filter(() => true),
        scalar: ["ID", "Title", "Rating"].concat(_filter(_scalar)),
        array: ["Authors", "Series", "Tags", "Publisher", "Formats"].concat(_filter(_array)),
        text: ["Title", "Authors", "Series", "Tags", "Publisher", "Formats"].concat(ರ‿ರ.identifiers).concat(_filter(_text)),
        date: ["Published", "Modified"].concat(_filter(_date)),
        numeric: ["ID", "Rating"].concat(_filter(_numeric))
      };
    factory.Flags.log("FIELDS:", ರ‿ರ.fields);
    
  };
  
  var _custom = name => _.find(ರ‿ರ.custom, (custom, key) => name && (name.equals(key, true) || name.equals(custom.name, true)));
  /* <!-- Internal Functions --> */
  
  /* <!-- Builder Functions --> */
  var _builders = {
    
    custom : {
      
      select : (properties, separator, public_only, names) => _.reduce(properties, (memo, value, key) => {
        if ((!public_only || value.public || (names && names.indexOf(_name(key, value)) >= 0)) && !value.hidden) {
          if (value.table && value.link_table) {
            memo.push(`(SELECT ${value.multiple ? `GROUP_CONCAT(value, '${separator || "\n"}')` : "value"} FROM ${value.table} WHERE ${value.table}.id IN (SELECT value from ${value.link_table} WHERE book = books.id)) "${_name(key, value)}",`);
          } else if (value.table) {
            memo.push(`(SELECT value FROM ${value.table} WHERE book = books.id) "${_name(key, value)}",`);
          }
        }
        return memo;
      }, []).join("\n"),
      
      search : (properties, terms, public_only) => _.reduce(properties, (memo, value, key) => {
        if ((!public_only || value.public) && !value.hidden && value.type == "text") memo.push(` or "${_name(key, value)}" like '%${terms}%'`);
        return memo;
      }, []).join(""),
      
    },
    
    identifiers : {
      
      select : (identifiers, types) => _.reduce(identifiers, (memo, type) => {
        if (type && (type.indexOf("isbn") >= 0 || (types && types.indexOf(type) >= 0))) 
          memo.push(`(SELECT val from identifiers WHERE identifiers.type = '${_safe(type)}' and identifiers.book = books.id) ${type.toUpperCase()},`);
        return memo;
      }, []).join("\n"),
      
      search : (identifiers, terms, exact) => _.reduce(identifiers, (memo, type) => {
        if (type && type.indexOf("isbn") >= 0) 
          memo.push(` or ID = (SELECT identifiers.book from identifiers WHERE type = '${_safe(type)}' and val ${exact ? `= '${_safe(terms)}'` : `like '%${terms}%'`})`);
        return memo;
      }, []).join(""),
      
    }
    
  };
  /* <!-- Builder Functions --> */
  
  /* <!-- Group Functions --> */
  var _groups = {
    
    extend : (base,extend) => `${base}${extend ? "," : ""}`,
    
    authors : extend => _groups.extend(`(SELECT GROUP_CONCAT(name, '${options.separators.array}') FROM books_authors_link AS bal JOIN authors ON(author = authors.id) WHERE book = books.id) Authors`, extend),
    
    formats : extend => _groups.extend(`(SELECT GROUP_CONCAT(format||'${options.separators.data}'||name||'.'||LOWER(format)||'${options.separators.data}'||uncompressed_size, '${options.separators.array}') FROM data WHERE data.book = books.id) Formats`, extend),
    
    identifiers : extend => _groups.extend(`(SELECT GROUP_CONCAT(val, '${options.separators.array}') FROM identifiers WHERE identifiers.book = books.id) Identifiers`, extend),
    
    publisher : extend => _groups.extend(`(SELECT GROUP_CONCAT(name, '${options.separators.array}') FROM publishers WHERE publishers.id IN (SELECT publisher from books_publishers_link WHERE book = books.id)) Publisher`, extend),
    
    rating : extend => _groups.extend("(SELECT rating FROM ratings WHERE ratings.id IN (SELECT rating from books_ratings_link WHERE book = books.id)) Rating", extend),
    
    series : extend => _groups.extend(`(SELECT GROUP_CONCAT(name, '${options.separators.array}') FROM series WHERE series.id IN (SELECT series from books_series_link WHERE book = books.id)) Series`, extend),
    
    tags : extend => _groups.extend(`(SELECT GROUP_CONCAT(name, '${options.separators.array}') FROM tags WHERE tags.id IN (SELECT tag from books_tags_link WHERE book = books.id)) Tags`, extend),
    
  };
  /* <!-- Group Functions --> */
    
  /* <!-- Group Where Functions --> */
  var _wheres = {
    
    authors : (term, comparator) => `id IN (SELECT book FROM books_authors_link JOIN authors ON(author ${comparator || "="} authors.id) WHERE authors.name = '${_safe(term)}')`,
    
    formats : (term, comparator) => `id IN (SELECT book FROM data WHERE format ${comparator || "="} '${_safe(term)}')`,
    
    publisher : (term, comparator) => `id IN (SELECT book FROM books_publishers_link JOIN publishers ON(publisher ${comparator || "="} publishers.id) WHERE publishers.name = '${_safe(term)}')`,
    
    rating : (term, comparator) => `id IN (SELECT book FROM books_ratings_link JOIN ratings ON(books_ratings_link.rating ${comparator || "="} ratings.id) WHERE ratings.rating = ${term})`,
    
    series : (term, comparator) => `id IN (SELECT book FROM books_series_link JOIN series ON(series = series.id) WHERE series.name ${comparator || "="} '${term}')`,
    
    tags : (term, comparator) => `id IN (SELECT book FROM books_tags_link JOIN tags ON(tag = tags.id) WHERE tags.name ${comparator || "="} '${term}')`,

  };
  /* <!-- Group Where Functions --> */
    
  /* <!-- Find Functions --> */
  var _find = where => _process(options.arrays.concat(ರ‿ರ.custom ? _.reduce(ರ‿ರ.custom, (memo, value, key) => {
        if (value.multiple) memo.push(_name(key, value));
        return memo;
      }, []) : []), ["Published", "Modified"], _data(_run(_.compact([
        "SELECT id ID, title Title, pubdate Published, path Path, has_Cover Cover, last_modified Modified,",
        _groups.authors(true),
        _groups.publisher(true),
        ರ‿ರ.identifiers ? _builders.identifiers.select(ರ‿ರ.identifiers) : "",
        _groups.rating(true),
        _groups.series(true),
        ರ‿ರ.capabilities && ರ‿ರ.capabilities.online_items ? _groups.formats(true) : null,
        ರ‿ರ.custom ? _builders.custom.select(ರ‿ರ.custom) : "",
        _groups.tags(),
        "FROM books",
        where
      ]).join("\n"))));
  /* <!-- Find Functions --> */
  
  /* <!-- Search Functions --> */
  var _search = {
    
    safe : value => RegExp.replaceChars(value, {
          "'": "''",
        }),
    
    select : (identifier_types, custom_names, extras) => [
        "SELECT id ID, title Title,",
        _groups.authors(true),
        ರ‿ರ.identifiers ? _builders.identifiers.select(ರ‿ರ.identifiers, identifier_types) : "",
        ರ‿ರ.custom ? _builders.custom.select(ರ‿ರ.custom, null, true, custom_names) : "",
        _groups.series(true),
        _groups.tags(extras && extras.length > 0)
      ].concat(extras ? _.isString(extras) ? [extras] : extras : []).concat(["FROM books"]),
  
    condition : (field, comparator, value, type, array) => {
      var _where = field && field.toLowerCase ? _wheres[field.toLowerCase()] : null,
          _complex = _where && comparator == "==";
      
      value = type == "text" ? _search.safe(value) : value;
      comparator = comparator == "!=" ? "<>" :
        comparator == "=>" ? ">=" :
        comparator == "=<" ? "<=" :
        comparator == "=" && (type == "text" || array) ? "like" :
        comparator == "==" ? "=" :
        comparator;

      return _complex ?
        _where(value, comparator) :
        `${field.indexOf(" ") >= 0 ? `"${field}"` : field} ${comparator} ${type == "numeric" ? value : comparator == "like" ? `'%${value}%'` : `'${value}'`}`;
      
    },
  
    like : terms => {
      var _simple = terms => `Title like '%${terms}%' or Authors like '%${terms}%' or Tags like '%${terms}%'${ರ‿ರ.identifiers ? _builders.identifiers.search(ರ‿ರ.identifiers, terms) : ""}${ರ‿ರ.custom ? _builders.custom.search(ರ‿ರ.custom, terms, true) : ""}`;
      if (terms.quoted) {
        return _simple(_search.safe(terms.terms));
      } else {
        var _terms = terms.match(/\S+/g);
        if (_terms.length === 1) {
          return _simple(_search.safe(_terms[0]));
        } else {
          terms = _search.safe(terms);
          var _titles = _.reduce(_terms, (memo, term) => `${memo}${memo.length > 0 ? " and " : ""}Title like '%${_search.safe(term)}%'`, "");
          return `(${_titles}) or Authors like '%${terms}%' or Tags like '%${terms}%'${ರ‿ರ.identifiers ? _builders.identifiers.search(ರ‿ರ.identifiers, terms) : ""}${ರ‿ರ.custom ? _builders.custom.search(ರ‿ರ.custom, terms, true) : ""}`;
        }
      }
    },
    
    generic : terms => _.compact(_search.select().concat([
        `WHERE ${_search.like(terms)}`
      ])).join("\n"),
    
    specific : terms => {
      
      var _fields = _.union(ರ‿ರ.fields.identifiers, ರ‿ರ.fields.scalar, ರ‿ರ.fields.array),
          _valid = value => _.find(_fields, field => String.equal(field, value, true)),
          _type = value => ರ‿ರ.fields.date.indexOf(value) >= 0 ? "date" :
                            ರ‿ರ.fields.numeric.indexOf(value) >= 0 ? "numeric" : "text",
          _array = value => ರ‿ರ.fields.array.indexOf(value) >= 0,
          _arrays = [],
          _extras = [];
      
      var _initial = "WHERE",
          _condition = (term, only) => {
            var _children = term.term ? term.term.children : term.children,
                _extra = !only && _children && _children.length > 0 ? "(" : "",
                
                _return = ((term, operator) => {
                  
                  if (_.isString(term)) {
                    
                    /* <!-- Simple String Term --> */
                    return `${operator ? `${operator} ` : ""}${_extra}(${_search.like(term)})`;
                    
                  } else {
                    
                    /* <!-- Complex Field / Comparator Term --> */
                    if (!(term.field = _valid(term.field))) return null;
                    
                    /* <!-- Additional Group Arrays --> */
                    if (term.comparator !== "==" && term.field && term.field.toLowerCase && _groups[term.field.toLowerCase()]) 
                      _arrays.push(term.field.toLowerCase());
                    
                    _extras.push(term.field);
                    
                    return `${operator ? `${operator} ` : ""}${_extra}(${_search.condition(term.field, term.comparator, term.value, _type(term.field), _array(term.field))})`;
                    
                  }
                  
                })(term.operator ? term.term : term, term.operator);
            
            return _children && _children.length > 0 ?
              `${_return} ${_.reduce(_children, 
                                     (memo, child) => `${memo ? `${memo} ` : ""}${_condition(child)}`, null)}${only ? "" : ")"}` : _return;
          },
          _reducer = (memo, term, index, list) => `${memo} ${_condition(term, index === list.length)}`,
          _where = _.reduce(terms, _reducer, _initial);
      
      factory.Flags.log("Specific SQL Condition:", _where);
      
      var invalid = _where == _initial,
          identifier_types = _.intersection(ರ‿ರ.fields.identifiers, _extras),
          custom_names = _.intersection(_.union(ರ‿ರ.fields.scalar, ರ‿ರ.fields.array), _extras),
          _extra_groups = _.chain(_arrays).uniq()
                            .filter(field => field == "formats" || field == "rating" || field == "publisher")
                            .map(field => _groups[field]()).value();

      return invalid && terms && terms.length === 1 ?
        _search.generic(terms[0].value) : 
        _.compact(_search.select(identifier_types, custom_names, _extra_groups).concat(_where && _where != "WHERE" ? [_where] : [])).join("\n");
      
    },
    
  };
  /* <!-- Search Functions --> */
      
  /* <!-- Dated Functions --> */
  var _dated = {
    
    recent : (limit, since, queries, date_column) => _process(options.arrays.concat(ರ‿ರ.custom ? _.reduce(ರ‿ರ.custom, (memo, value, key) => {
          if (value.public && value.multiple) memo.push(_name(key, value));
          return memo;
        }, []) : []), [date_column], _data(_run(_.compact(queries.concat([
          since ? `WHERE "${date_column}" >= ${since.format ? since.format("YYYY-MM-DD HH:mm:ss") : since}` : "",
          `ORDER BY "${date_column}" DESC`,
          `LIMIT ${limit || 10}`
        ])).join("\n")))),
    
  };
  /* <!-- Dated Functions --> */
  
  /* <!-- Query Functions --> */
  var _queries = {
    
    count : {
      
      authors : () => _scalar(_run("SELECT count(*) FROM authors;")),
      
      books : () => _scalar(_run("SELECT count(*) FROM books;")),
      
      comments : () => _scalar(_run("SELECT count(*) FROM comments;")),
      
      formats : () => _scalar(_run("SELECT count(distinct(format)) from data;")),
      
      publishers : () => _scalar(_run("SELECT count(*) FROM publishers;")),
      
      ratings : () => _scalar(_run("SELECT count(*) FROM books_ratings_link;")),
      
      series : () => _scalar(_run("SELECT count(*) FROM series;")),
      
      tags : () => _scalar(_run("SELECT count(*) FROM tags;")),
      
      custom : name => _scalar(_run(`SELECT count(distinct(value)) FROM ${_custom(name).table};`)),
      
    },
    
    list : {
      
      authors: () => _data(_run("SELECT DISTINCT id ID, name Name, (SELECT COUNT(book) FROM books_authors_link WHERE author = authors.id) Books FROM authors ORDER BY sort;")),

      books: () => _data(_run(`SELECT id ID, title Title, ${_groups.authors()} FROM books ORDER BY Title, Authors;`)),
      
      custom: (name, threshold) => {
        var custom = _custom(name);
        return custom ? 
          _data(_run(`SELECT id ID, title Title, ${_groups.authors()}, ${_builders.custom.select([custom])}(SELECT COUNT(id) FROM ${custom.link_table} WHERE book = books.id) Count FROM books WHERE Count > ${threshold || 1} ORDER BY Title, Authors;`)) : 
          null;
      },
      
      formats: () => _data(_run("SELECT DISTINCT format Format, (SELECT COUNT(book) FROM data data_1 WHERE data_1.format = data.format) Books FROM data ORDER BY format;")),
    
      publishers: () => _data(_run("SELECT DISTINCT id ID, name Name, (SELECT COUNT(book) FROM books_publishers_link WHERE publisher = publishers.id) Books FROM publishers ORDER BY sort;")),

      ratings: () => _data(_run("SELECT DISTINCT id, rating, (SELECT COUNT(books_ratings_link.book) FROM books_ratings_link WHERE rating = ratings.id) Books FROM ratings ORDER BY rating")),
      
      series: () => _data(_run("SELECT DISTINCT id ID, name Name, (SELECT COUNT(book) FROM books_series_link WHERE series = series.id) Books FROM series ORDER BY sort;")),

      tags: () => _data(_run("SELECT DISTINCT id ID, name Name, (SELECT COUNT(book) FROM books_tags_link WHERE tag = tags.id) Books FROM tags ORDER BY name;")),
      
    },
    
    custom : () => ರ‿ರ.custom,
    
    fields : () => ರ‿ರ.fields,
    
    identifiers : () => ರ‿ರ.identifiers,
    
    tags : () => {
      /* <!-- If Database not yet loaded, return empty array --> */
      if (!ರ‿ರ.tables) return [];
      var _return;
      try {
        _return = _list(_run("SELECT DISTINCT name Name FROM tags ORDER BY name;"));   
      } catch (e) {
        _return = [];
      }
      return _return;
    },
      
    search : {
      
      books : terms => {
        terms = options.functions.lexer.parse(terms);
        return _searcher(_.isString(terms) || terms.quoted ? 
          _search.generic(terms) : 
          terms.length === 1 && (_.isString(terms[0]) || terms[0].quoted) ? _search.generic(terms[0]) : _search.specific(terms));
      },
      
      advanced : terms => _searcher(_search.specific(terms)),
        
    },
    
    find : {
      
      books : ids => _find(`WHERE ${_.map(ids, id => `ID = ${id}`).join(" OR ")}`),
      
      book : id => _queries.find.books([id]),
      
      copies : (ids, field) => _find(`WHERE ID IN (SELECT book from ${_custom(field).link_table} INNER JOIN ${_custom(field).table} on ${_custom(field).link_table}.value = custom_column_1.id WHERE ${_.map(ids, id =>`${_custom(field).table}.value = '${_safe(id)}'`).join(" OR ")})`),
      
      copy : (id, field) => _queries.find.copies([id], field),
      
      isbn : isbn => _find(`WHERE ${_.chain(ರ‿ರ.identifiers).filter(identifier => identifier && identifier.indexOf("isbn") >= 0).map(identifier => `ID IN (SELECT identifiers.book from identifiers WHERE type = '${_safe(identifier)}' and val = '${_safe(isbn)}')`).value().join(" or ")}`),
      
      identifier : (identifier, type) => _find(`WHERE ID IN (SELECT identifiers.book from identifiers WHERE type = '${_safe(type)}' and val = '${_safe(identifier)}')`),
      
    },
    
    recent : {
      
      added : (limit, since) => _dated.recent(limit, since, _search.select(), "timestamp"),
      
      modified : (limit, since) => _dated.recent(limit, since, _search.select(), "last_modified"),
      
      all : (limit, since) => _dated.recent(limit, since, ["SELECT DISTINCT ID, Title, Authors, Series, Tags, max(Updated) Updated FROM ("]
        .concat(_search.select(null, null, `last_modified AS '${options.updated}'`))
        .concat(["UNION ALL"])
        .concat(_search.select(null, null, `timestamp AS '${options.updated}'`))
        .concat([")", "WHERE Tags IS NULL OR Tags <> 'UNKNOWN_BOOK'", "GROUP BY ID"]), options.updated),

    },
    
  };
  /* <!-- Query Functions --> */
  
  /* <!-- Initial Functions --> */
  var _files = () => {
    var files = Array.from(document.querySelectorAll("[data-filename]")),
        names = files.map(element => `${element.dataset.filename}`),
        contents = files.map(file => file.textContent);
    options.sql_config.locateFile = file => contents[names.indexOf(file)];
  };
  _files();
  /* <!-- Initial Functions --> */
  
  /* <!-- Public Functions --> */
  FN.load = (data, capabilities) => (ರ‿ರ.capabilities = capabilities, initSqlJs(options.sql_config)
    .then(sql => ರ‿ರ.db = new sql.Database(data))
    .then(_interrogate)
    .then(() => _queries));
  /* <!-- Public Functions --> */
  
  return FN;
  
};