  Catalog = (options, factory) => {
  "use strict";

  /* <!-- MODULE: Provides an interface to provide common functionality --> */
  /* <!-- PARAMETERS: Receives the global app context --> */
  /* <!-- REQUIRES: Global Scope: JQuery, Underscore | App Scope: Display --> */

  /* <!-- Internal Constants --> */
  const DEFAULTS = {
    sql_config: {},
    updated: "Updated"
  }, FN = {};
  /* <!-- Internal Constants --> */
  
  /* <!-- Internal Options --> */
  options = _.defaults(options ? _.clone(options) : {}, DEFAULTS);
  /* <!-- Internal Options --> */
  
  /* <!-- Internal Variables --> */
  var ರ‿ರ = {}; /* <!-- Session State --> */
  /* <!-- Internal Variables --> */
  
  /* <!-- Internal Functions --> */
  var _scalar = results => results && results.length === 1 ? results[0].values[0][0] : null;
  
  var _data = results => results && results.length === 1 ? results[0] : null;
  
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
      if (array_columns && array_columns.length > 0) _.each(_columns(array_columns, data), column => _.each(data.values, row => row[column] = row[column] ? row[column].split("\n") : row[column]));

      /* <!-- Process Dates --> */
      if (date_columns && date_columns.length > 0) _.each(_columns(date_columns, data), column => _.each(data.values, row => row[column] = row[column] ? factory.Dates.parse(row[column]) : row[column]));

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
  
  var _searcher = query => _process(["Authors", "Tags"].concat(ರ‿ರ.custom ? _.reduce(ರ‿ರ.custom, (memo, value, key) => {
      if (value.public && value.multiple) memo.push(_name(key, value));
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
            url: _match[1].replace(/\{\{value\}\}/i, value)
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
        if (!public_only || value.public || (names && names.indexOf(_name(key, value)) >= 0)) {
          if (value.table && value.link_table) {
            memo.push(`(SELECT ${value.multiple ? `GROUP_CONCAT(value, '${separator || "\n"}')` : "value"} FROM ${value.table} WHERE ${value.table}.id IN (SELECT value from ${value.link_table} WHERE book = books.id)) "${_name(key, value)}",`);
          } else if (value.table) {
            memo.push(`(SELECT value FROM ${value.table} WHERE book = books.id) "${_name(key, value)}",`);
          }
        }
        return memo;
      }, []).join("\n"),
      
      search : (properties, terms, public_only) => _.reduce(properties, (memo, value, key) => {
        if ((!public_only || value.public) && value.type == "text") memo.push(` or "${_name(key, value)}" like '%${terms}%'`);
        return memo;
      }, []).join(""),
      
    },
    
    identifiers : {
      
      select : (identifiers, types) => _.reduce(identifiers, (memo, type) => {
        if (type && (type.indexOf("isbn") >= 0 || (types && types.indexOf(type) >= 0))) 
          memo.push(`(SELECT val from identifiers WHERE identifiers.type = '${type}' and identifiers.book = books.id) ${type.toUpperCase()},`);
        return memo;
      }, []).join("\n"),
      
      search : (identifiers, terms) => _.reduce(identifiers, (memo, type) => {
        if (type && type.indexOf("isbn") >= 0) 
          memo.push(` or ID = (SELECT identifiers.book from identifiers WHERE type = '${type}' and val like '%${terms}%')`);
        return memo;
      }, []).join(""),
      
    }
    
  };
  /* <!-- Builder Functions --> */
  
  /* <!-- Group Functions --> */
  var _groups = {
    
    extend : (base,extend) => `${base}${extend ? "," : ""}`,
    
    authors : extend => _groups.extend("(SELECT GROUP_CONCAT(name, '\n') FROM books_authors_link AS bal JOIN authors ON(author = authors.id) WHERE book = books.id) Authors", extend),
    
    formats : extend => _groups.extend("(SELECT GROUP_CONCAT(format, '\n') FROM data WHERE data.book = books.id) Formats", extend),
                    
    identifiers : extend => _groups.extend("(SELECT GROUP_CONCAT(val, '\n') FROM identifiers WHERE identifiers.book = books.id) Identifiers", extend),
    
    publisher : extend => _groups.extend("(SELECT GROUP_CONCAT(name, '\n') FROM publishers WHERE publishers.id IN (SELECT publisher from books_publishers_link WHERE book = books.id)) Publisher", extend),
    
    rating : extend => _groups.extend("(SELECT rating FROM ratings WHERE ratings.id IN (SELECT rating from books_ratings_link WHERE book = books.id)) Rating", extend),
    
    series : extend => _groups.extend("(SELECT GROUP_CONCAT(name, '\n') FROM series WHERE series.id IN (SELECT series from books_series_link WHERE book = books.id)) Series", extend),
    
    tags : extend => _groups.extend("(SELECT GROUP_CONCAT(name, '\n') FROM tags WHERE tags.id IN (SELECT tag from books_tags_link WHERE book = books.id)) Tags", extend),
    
  };
  /* <!-- Group Functions --> */
  
  /* <!-- Find Functions --> */
  var _find = where => _process(["Authors", "Tags"].concat(ರ‿ರ.custom ? _.reduce(ರ‿ರ.custom, (memo, value, key) => {
        if (value.multiple) memo.push(_name(key, value));
        return memo;
      }, []) : []), ["Published", "Modified"], _data(_run(_.compact([
        "SELECT id ID, title Title, pubdate Published, path Path, has_Cover Cover, last_modified Modified,",
        _groups.authors(true),
        _groups.publisher(true),
        ರ‿ರ.identifiers ? _builders.identifiers.select(ರ‿ರ.identifiers) : "",
        _groups.rating(true),
        _groups.series(true),
        _groups.tags(true),
        ರ‿ರ.custom ? _builders.custom.select(ರ‿ರ.custom) : "",
        _groups.formats(),
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
        _groups.tags(!!extras)
      ].concat(extras ? _.isString(extras) ? [extras] : extras : []).concat(["FROM books"]),
  
    condition : (field, comparator, value, type, array) => {
      value = type == "text" ? _search.safe(value) : value;
      comparator = comparator == "!=" ? "<>" :
        comparator == "=>" ? ">=" :
        comparator == "=<" ? "<=" :
        comparator == "=" && (type == "text" || array) ? "like" :
        comparator == "==" ? "=" :
        comparator;
      return `${field.indexOf(" ") >= 0 ? `"${field}"` : field} ${comparator} ${type == "numeric" ? value : comparator == "like" ? `'%${value}%'` : `'${value}'`}`; 
    },
  
    like : terms => {
      terms = _search.safe(terms);
      return `Title like '%${terms}%' or Authors like '%${terms}%' or Tags like '%${terms}%'${ರ‿ರ.identifiers ? _builders.identifiers.search(ರ‿ರ.identifiers, terms) : ""}${ರ‿ರ.custom ? _builders.custom.search(ರ‿ರ.custom, terms, true) : ""}`;
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
          _extras = [];
      
      var _initial = "WHERE",
          _condition = (term, only) => {
            var _children = term.term ? term.term.children : term.children,
                _extra = !only && _children && _children.length > 0 ? "(" : "",
                _return = term.operator ?
                  _.isString(term.term) ?
                    `${term.operator} ${_extra}(${_search.like(term)})` :
                    !(term.term.field = _valid(term.term.field)) ? null :
                      (_extras.push(term.term.field), 
                        `${term.operator} ${_extra}(${_search.condition(term.term.field, term.term.comparator, term.term.value, _type(term.term.field), _array(term.term.field))})`) :
                  _.isString(term) ?
                    `(${_search.like(term)})` :
                    !(term.field = _valid(term.field)) ? null :
                    (_extras.push(term.field), `${_extra}(${_search.condition(term.field, term.comparator, term.value, _type(term.field), _array(term.field))})`);
            
            return _children && _children.length > 0 ?
              `${_return} ${_.reduce(_children, 
                                     (memo, child) => `${memo ? `${memo} ` : ""}${_condition(child)}`, null)}${only ? "" : ")"}` : _return;
          },
          _reducer = (memo, term, index, list) => `${memo} ${_condition(term, index === list.length)}`,
          _where = _.reduce(terms, _reducer, _initial);
      
      factory.Flags.log("Specific SQL Condition:", _where);
      
      var invalid = _where == _initial,
          identifier_types = _.intersection(ರ‿ರ.fields.identifiers, _extras),
          custom_names = _.intersection(_.union(ರ‿ರ.fields.scalar, ರ‿ರ.fields.array), _extras);

      return invalid && terms && terms.length === 1 ?
        _search.generic(terms[0].value) : 
        _.compact(_search.select(identifier_types, custom_names).concat(_where && _where != "WHERE" ? [_where] : [])).join("\n");
      
    },
    
  };
  /* <!-- Search Functions --> */
      
  /* <!-- Dated Functions --> */
  var _dated = {
    
    recent : (limit, since, queries, date_column) => _process(["Authors", "Tags"].concat(ರ‿ರ.custom ? _.reduce(ರ‿ರ.custom, (memo, value, key) => {
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
    
    custom : () => ರ‿ರ.custom,
    
    fields : () => ರ‿ರ.fields,
    
    identifiers : () => ರ‿ರ.identifiers,
      
    search : {
      
      books : terms => {
        terms = options.functions.lexer.parse(terms);
        return _searcher(_.isString(terms) ? 
          _search.generic(terms) : terms.length === 1 && _.isString(terms[0]) ? _search.generic(terms[0]) : _search.specific(terms));
      },
      
      advanced : terms => _searcher(_search.specific(terms)),
        
    },
    
    find : {
      
      book : id => _find(`WHERE ID = ${id}`),
      
      copy : (id, field) => _find(`WHERE ID IN (SELECT book from ${_custom(field).link_table} INNER JOIN ${_custom(field).table} on ${_custom(field).link_table}.id = custom_column_1.id WHERE ${_custom(field).table}.value = '${id}')`),
      
    },
    
    recent : {
      
      added : (limit, since) => _dated.recent(limit, since, _search.select(), "timestamp"),
      
      modified : (limit, since) => _dated.recent(limit, since, _search.select(), "last_modified"),
      
      all : (limit, since) => _dated.recent(limit, since, ["SELECT DISTINCT * FROM ("]
        .concat(_search.select(null, null, `last_modified AS '${options.updated}'`))
        .concat(["UNION ALL"])
        .concat(_search.select(null, null, `timestamp AS '${options.updated}'`))
        .concat([")"]), options.updated),

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
  FN.load = data => initSqlJs(options.sql_config)
    .then(sql => ರ‿ರ.db = new sql.Database(data))
    .then(_interrogate)
    .then(() => _queries);
  /* <!-- Public Functions --> */
  
  return FN;
  
};