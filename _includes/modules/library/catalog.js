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
        } : value;
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
    ರ‿ರ.tables = _.map(_tables.values, value => value[0]);
    factory.Flags.log("META [Tables]:", ರ‿ರ.tables);
    
    var _identifiers = _data(_run("SELECT DISTINCT type FROM identifiers ORDER BY type;", db));
    ರ‿ರ.identifiers = _.map(_identifiers.values, value => value[0]);
    factory.Flags.log("META [Identifiers]:", ರ‿ರ.identifiers);
    
    if (ರ‿ರ.tables.indexOf("_lc_genre_mapping") >= 0) {
      var _classifications = _data(_run("SELECT * FROM _lc_genre_mapping;")),
          _classification_cols = _columns(["library_code", "genre"], _classifications);
      if (_classification_cols) ರ‿ರ.classifications = _.reduce(_classifications.values, (memo, value) => {
        memo[value[_classification_cols.library_code]] = value[_classification_cols.genre];
        return memo;
      }, {});
      factory.Flags.log("META [Classifications]:", ರ‿ರ.classifications);
    }
    if (ರ‿ರ.tables.indexOf("custom_columns") >= 0) {
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
          memo.push(` or "${type.toUpperCase()}" like '%${terms}%'`);
        return memo;
      }, []).join(""),
      
    },
    
  };
  /* <!-- Builder Functions --> */
  
  /* <!-- Search Functions --> */
  var _search = {
    
    safe : value => RegExp.replaceChars(value, {
          "'": "''",
        }),
    
    select : (identifier_types, custom_names, extras) => ["SELECT id ID, title Title,",
        "(SELECT GROUP_CONCAT(name, '\n') FROM books_authors_link AS bal JOIN authors ON(author = authors.id) WHERE book = books.id) Authors,",
        ರ‿ರ.identifiers ? _builders.identifiers.select(ರ‿ರ.identifiers, identifier_types) : "",
        ರ‿ರ.custom ? _builders.custom.select(ರ‿ರ.custom, null, true, custom_names) : "",
        "(SELECT GROUP_CONCAT(name, '\n') FROM series WHERE series.id IN (SELECT series from books_series_link WHERE book = books.id)) Series,",
        `(SELECT GROUP_CONCAT(name, '\n') FROM tags WHERE tags.id IN (SELECT tag from books_tags_link WHERE book = books.id)) Tags${extras ? "," : ""}`]
    .concat(extras ? _.isString(extras) ? [extras] : extras : []).concat(["FROM books"]),
  
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
      
      var _where = _.reduce(terms, (memo, term) => {
        return term.operator ?
          _.isString(term.term) ?
            `${memo} ${term.operator} (${_search.like(term)})` :
            !(term.term.field = _valid(term.term.field)) ? memo :
              (_extras.push(term.term.field), 
                `${memo} ${term.operator} (${_search.condition(term.term.field, term.term.comparator, term.term.value, _type(term.term.field), _array(term.term.field))})`) :
          _.isString(term) ?
            `${memo} (${_search.like(term)})` :
            !(term.field = _valid(term.field)) ? memo :
            (_extras.push(term.field), `${memo} (${_search.condition(term.field, term.comparator, term.value, _type(term.field), _array(term.field))})`);
      }, "WHERE");
      factory.Flags.log("Specific SQL Conditon:", _where);
      
      var identifier_types = _.intersection(ರ‿ರ.fields.identifiers, _extras),
          custom_names = _.intersection(_.union(ರ‿ರ.fields.scalar, ರ‿ರ.fields.array), _extras);

      return _.compact(_search.select(identifier_types, custom_names).concat([_where])).join("\n");
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
      
      publishers : () => _scalar(_run("SELECT count(*) FROM publishers;")),
      
      series : () => _scalar(_run("SELECT count(*) FROM series;")),
      
      tags : () => _scalar(_run("SELECT count(*) FROM tags;")),
      
    },
    
    fields : () => ರ‿ರ.fields,
      
    search : {
      
      books : terms => {
        terms = options.functions.lexer.parse(terms);
        return _process(["Authors", "Tags"].concat(ರ‿ರ.custom ? _.reduce(ರ‿ರ.custom, (memo, value, key) => {
          if (value.public && value.multiple) memo.push(_name(key, value));
          return memo;
        }, []) : []), null, _data(_run(_.isString(terms) ? _search.generic(terms) : terms.length === 1 && _.isString(terms[0]) ? _search.generic(terms[0]) : _search.specific(terms))));
        
      },
      
    },
    
    find : {
      
      book : id => _process(["Authors", "Tags"].concat(ರ‿ರ.custom ? _.reduce(ರ‿ರ.custom, (memo, value, key) => {
        if (value.multiple) memo.push(_name(key, value));
        return memo;
      }, []) : []), ["Published", "Modified"], _data(_run(_.compact([
        "SELECT id ID, title Title, pubdate Published, path Path, has_Cover Cover, last_modified Modified,",
        "(SELECT GROUP_CONCAT(name, '\n') FROM books_authors_link AS bal JOIN authors ON(author = authors.id) WHERE book = books.id) Authors,",
        "(SELECT GROUP_CONCAT(name, '\n') FROM publishers WHERE publishers.id IN (SELECT publisher from books_publishers_link WHERE book = books.id)) Publisher,",
        ರ‿ರ.identifiers ? _builders.identifiers.select(ರ‿ರ.identifiers) : "",
        "(SELECT rating FROM ratings WHERE ratings.id IN (SELECT rating from books_ratings_link WHERE book = books.id)) Rating,",
        "(SELECT GROUP_CONCAT(name, '\n') FROM series WHERE series.id IN (SELECT series from books_series_link WHERE book = books.id)) Series,",
        "(SELECT GROUP_CONCAT(name, '\n') FROM tags WHERE tags.id IN (SELECT tag from books_tags_link WHERE book = books.id)) Tags,",
        ರ‿ರ.custom ? _builders.custom.select(ರ‿ರ.custom) : "",
        "(SELECT GROUP_CONCAT(format, '\n') FROM data WHERE data.book = books.id) Formats",
        `FROM books WHERE ID = ${id}`
      ]).join("\n")))),
      
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