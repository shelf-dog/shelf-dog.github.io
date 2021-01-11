Create = (options, factory) => {
  "use strict";

  /* <!-- MODULE: Provides an interface to provide common functionality --> */
  /* <!-- PARAMETERS: Receives the global app context --> */
  /* <!-- REQUIRES: Global Scope: JQuery, Underscore | App Scope: Display --> */

  /* <!-- Internal Constants --> */
  const DEFAULTS = {
    property : {
      name: "SHELF-DOG",
      value: "ENDPOINT"
    },
    subscription : {
      name: "SUBSCRIPTION",
    },
    version : {
      name: "VERSION",
    },
    script_id : {
      name: "SCRIPT_ID",
    },
    regex : {
      array: {
        open: /\[\s*{/gi,
        close: /}\s*\]/gi
      }
    },
    script : "log.json",
  }, FN = {};
  /* <!-- Internal Constants --> */

  const SCHEMAS = [{
    key: "ENDPOINT_SCHEMA_VERSION",
    value: 1,
    keys: {
      type : "TYPE",
    },
    values: {
      current_loans : "CURRENT_LOANS",
      users : "USERS",
      requests : "REQUESTS"
    }
  }];

  /* <!-- Internal Options --> */
  options = _.defaults(options ? _.clone(options) : {}, DEFAULTS);
  /* <!-- Internal Options --> */

  /* <!-- Internal Variables --> */
  var ರ‿ರ = {}, /* <!-- Session State --> */
      _colours = factory.Google_Sheets_Format({}, factory),
      _format = factory.Google_Sheets_Format({}, factory);
  /* <!-- Internal Variables --> */
  
  /* <!-- Internal Functions --> */
  FN.helpers = sheetId => ({
    grid: factory.Google_Sheets_Grid({
      sheet: sheetId
    }),
    meta: factory.Google_Sheets_Metadata({
      sheet: sheetId,
      visibility: "PROJECT"
    }, factory),
    format: _format,
    properties: factory.Google_Sheets_Properties({
      sheet: sheetId
    }),
    notation: factory.Google_Sheets_Notation(),
    sorts: factory.Google_Sheets_Sorts()
  });
  /* <!-- Internal Functions --> */
  
  /* <!-- Metadata Functions --> */
  FN.metadata = {

    value: (key, value) => ({
      key: key,
      value: value,
    }),

    columns: (helpers, column, key, value) => ({
      "createDeveloperMetadata": helpers.meta.columns(column, column + 1).tag(FN.metadata.value(key, value))
    }),

    rows: (helpers, row, key, value) => ({
      "createDeveloperMetadata": helpers.meta.rows(row, row + 1).tag(FN.metadata.value(key, value))
    }),

    sheet: (helpers, key, value) => ({
      "createDeveloperMetadata": helpers.meta.sheet().tag(FN.metadata.value(key, value))
    }),
    
  };
  /* <!-- Metadata Functions --> */
  
  /* <!-- Sheet Functions --> */
  FN.sheet = {

    create: (name, tab, colour) => {
      var _schema = _.last(SCHEMAS);
      return factory.Google.sheets.create(name, tab, colour, [_.pick(_schema, "key", "value")], "Poppins")
          .then(sheet => ({
            schema: _schema,
            sheet: sheet,
            helpers: FN.helpers(sheet.sheets[0].properties.sheetId),
          }));
    },

    add: (id, tab, sheet, colour) => factory.Google.sheets.tab(id, sheet, tab, colour).then(sheet => ({
      sheet: sheet,
      helpers: FN.helpers(sheet.sheetId),
    })),

    update: (value, grid, values, input) => factory.Google.sheets.update(value.sheet.spreadsheetId, grid, values, input)
      .then(response => {
        factory.Flags.log(`Updating Values for Sheet: ${value.sheet.spreadsheetId}`, response);
        value.response = response;
        return value;
      }),

    batch: (value, values, reply) => values && values.length > 0 ? factory.Google.sheets.batch(value.sheet.spreadsheetId, values, reply, reply)
      .then(response => {
        factory.Flags.log(`Batch Update for Sheet: ${value.sheet.spreadsheetId}`, response);
        value.response = response;
        return value;
      }) : Promise.resolve(value),

    values: (value, range, all) => factory.Google.sheets.get(value.sheet.spreadsheetId, all, range)
      .then(response => {
        factory.Flags.log(`Values for Sheet: ${value.sheet.spreadsheetId}`, response);
        value.response = response;
        return value;
      })
  };
  /* <!-- Sheet Functions --> */
  
  /* <!-- Main Script Functions --> */
  FN.main = {
    
    version : files => {
      var _versions = _.find(files, file => file.name == "Versions"),
          _version;
      if (_versions) {
        var _open = options.regex.array.open.exec(_versions.source),
            _close = options.regex.array.close.exec(_versions.source);
        if (_open && _close) {
          var _array = _versions.source.substring(_open.index, _close.index + _close[0].length);
          if (_array) {
            _array = JSON.parse(_array.trim());
            _version = _.isArray(_array) ? _array[0] : null;
            if (_version && _.isObject(_version)) _version = _.values(_version)[0];
          }
        }
      }
      factory.Flags.log("LATEST VERSION:", _version);
      return (ರ‿ರ.latest = _version);
    },
    
    code : () => window.fetch ? window.fetch(`/client/${options.script}?d=${Date.now()}`, {cache: "no-store"})
      .then(response => response.status == 200 ? response.json() : false) : Promise.resolve(false),
    
    key : (files, key) => {
      var _crypto = _.find(files, file => file.name == "Crypto");
      if (_crypto && _crypto.source)
        _crypto.source = _crypto.source.replace(/\{\{\{\s?KEY\s?\}\}\}/gi, _.compact(key.trim().split(/\n|\r|\f/gm)).join("\\\n"));
      return files;
    },
    
    prepare : key => FN.main.code()
      .then(code => {
        if (!ರ‿ರ.latest) FN.main.version(code.files);
        var _code = FN.main.key(code.files, key);
        return _.map(_code, file => _.omit(file, "id"));
      })
      .catch(e => factory.Flags.error("Fetch Error", e ? e : "No Inner Error"), false),
  
  };
  /* <!-- Main Script Functions --> */
  /* <!-- Internal Functions --> */

  /* <!-- Public Functions --> */    
  FN.app = (script, version, id) => factory.Google.scripts.versions(script).create(version || 1,
                                  `Deployment Version${ರ‿ರ.latest ? ` [Version: ${ರ‿ರ.latest.version}]` : ""}`)
    .then(script => id && version && version > 1 ? factory.Google.scripts.deployments(script).update(id, version) :
          factory.Google.scripts.deployments(script).create(version || 1))
    .then(script => script.entryPoints[0].webApp.url);

  FN.log = (name, subscription, code) => {
    return FN.sheet.create(name, "CURRENT LOANS", _colours.colour("MAGENTA"))
      .then(value => _.tap(value, value => factory.Google.files.update(
          value.sheet.spreadsheetId, _.extend(
            factory.Google.files.tag(options.property.name, options.property.value),
            factory.Google.files.tags([
              [options.subscription.name, subscription],
              [options.version.name, ರ‿ರ.latest.version],
            ], true)
          ))))
    
      /* <!-- Add Sheet Metadata --> */
      .then(value => FN.sheet.batch(value, [FN.metadata.sheet(value.helpers, value.schema.keys.type, value.schema.values.current_loans)])
            
      /* <!-- Add Statistics Sheet --> */
      .then(value => Promise.each([
        Promise.resolve(value),
        FN.sheet.add(value.sheet.spreadsheetId, "STATISTICS", null, _colours.colour("LIME")),
        FN.sheet.add(value.sheet.spreadsheetId, "USERS", null, _colours.colour("BLACK")),
        FN.sheet.add(value.sheet.spreadsheetId, "REQUESTS", null, _colours.colour("YELLOW")),
      ]))
            
      /* <!-- Populate and Format Sheets --> */
      .then(values => Promise.all([

        Promise.resolve(values[0].sheet.spreadsheetId),
      
        /* <!-- Format First Tab (CURRENT LOANS) --> */
        FN.sheet.update(values[0], values[0].helpers.notation.grid(0, 1, 0, 8, true, "CURRENT LOANS"), [
          ["DATE", "ID", "ISBN","COPY", "USER", "RETURNED", "AUTH_USER", "LOAN", "DETAILS"]
        ], "USER_ENTERED")
        .then(() => FN.sheet.batch(values[0], [

          /* <!-- Set Default Format --> */
           values[0].helpers.format.cells(values[0].helpers.grid.rows(0, 26).range(), [
            values[0].helpers.format.align.vertical("MIDDLE"),
          ]),
                                   
          /* <!-- Set Top Row as a Header --> */
          values[0].helpers.format.cells(values[0].helpers.grid.rows(0, 1).range(), [
            values[0].helpers.format.background("black"),
            values[0].helpers.format.align.horizontal("CENTER"),
            values[0].helpers.format.text("white", 12, true)
          ]),

          /* <!-- Freeze Heading Rows (1) --> */
          values[0].helpers.properties.update([
            values[0].helpers.properties.grid.frozen.rows(1),
          ]),

          /* <!-- Resize the Columns --> */
          values[0].helpers.format.dimension(values[0].helpers.grid.columns(0, 1).dimension(200)),
          values[0].helpers.format.dimension(values[0].helpers.grid.columns(1, 2).dimension(80)),
          values[0].helpers.format.dimension(values[0].helpers.grid.columns(2, 3).dimension(120)),
          values[0].helpers.format.dimension(values[0].helpers.grid.columns(3, 4).dimension(80)),
          values[0].helpers.format.dimension(values[0].helpers.grid.columns(4, 5).dimension(240)),
          values[0].helpers.format.dimension(values[0].helpers.grid.columns(5, 6).dimension(200)),
          values[0].helpers.format.dimension(values[0].helpers.grid.columns(6, 7).dimension(240)),
          values[0].helpers.format.dimension(values[0].helpers.grid.columns(7, 8).dimension(80)),
          values[0].helpers.format.dimension(values[0].helpers.grid.columns(8, 9).dimension(200)),

          /* <!-- Conditional Formats --> */
          
          /* <!-- Returned Loans - whole row lighter font colour --> */
          values[0].helpers.format.conditional(values[0].helpers.grid.range(1, 1000, 0, 9))
            .boolean("CUSTOM_FORMULA", values[0].helpers.format.value("=LEN($F2)>0"), values[0].helpers.format.text("mediumdarkgrey")),
          
           /* <!-- Outstanding Loans - user name in bold --> */
          values[0].helpers.format.conditional(values[0].helpers.grid.range(1, 1000, 4, 5))
            .boolean("CUSTOM_FORMULA", values[0].helpers.format.value("=LEN($F2)=0"), values[0].helpers.format.text(null, null, true))
          
        ]))
        .then(() => factory.Flags.log("SHEET 1 | CURRENT LOANS:", values[0])),

        /* <!-- Create & Format Second Tab (STATISTICS) --> */
        FN.sheet.update(values[1], values[1].helpers.notation.grid(0, 8, 0, 10, true, "STATISTICS"), [
            ["Statistics", code, null, null, null, null, null, null, null],
            ["Outstanding Loans:", "=IFERROR(QUERY('CURRENT LOANS'!A2:F, \"select count(A) where D is not null and F is null label count(A) ''\",0),)", null, null, null, null, null, null, null],
            ["Longest Outstanding Loan:", "=IFERROR(DATEDIF(INDEX(SPLIT(QUERY('CURRENT LOANS'!A2:F, \"select A where D is not null and F is null order by A limit 1\",0),\"T\"),1,1),NOW(),\"D\"),)", "=IF(LEN(B3)>0, IF(B3>1,\"day/s\",\"day\"),)", null, null, null, null, null, null],
            ["Most Popular Item:", "=IFERROR(TRANSPOSE(QUERY('CURRENT LOANS'!A2:F, \"select B, count(A) where B is not null and D is not null group by B order by count(A) desc limit 1 label count(A) ''\",0)),)", null, null, null, null, null, null, null],
            ["Loan Count:", null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null],
            ["Outstanding Loans", null, null, null, "Completed Loans", null, null, null, "Completed Loans"],
            ["=QUERY('CURRENT LOANS'!A2:F, \"select E, count(A) where D is not null and F is null group by E order by count(A) desc label E 'Users', count(A) 'Loans'\",0)", null, null, null, "=QUERY('CURRENT LOANS'!A2:F, \"select E, count(A) where D is not null and F is not null group by E order by count(A) desc label E 'Users', count(A) 'Loans'\",0)", null, null, null, "=QUERY('CURRENT LOANS'!A2:F, \"select D, count(A) where E is not null and F is not null group by D order by count(A) desc label D 'Items', count(A) 'Loans'\",0)"],
          ], "USER_ENTERED")
          .then(() => FN.sheet.batch(values[1], [

            /* <!-- Set Default Format --> */
            values[1].helpers.format.cells(values[1].helpers.grid.rows(0, 26).range(), [
              values[1].helpers.format.align.vertical("MIDDLE"),
            ]),
            
            /* <!-- Set Header Row Backgrounds and Formats --> */
            values[1].helpers.format.cells(values[1].helpers.grid.rows(0, 1).range(), [
              values[1].helpers.format.background("black"),
            ]),
            values[1].helpers.format.cells(values[1].helpers.grid.range(0, 1, 0, 1), [
              values[1].helpers.format.text("yellow", 18, true)
            ]),
            values[1].helpers.format.cells(values[1].helpers.grid.range(0, 1, 1, 2), [
              values[1].helpers.format.text("verydarkgrey", 10, true)
            ]),
            values[1].helpers.format.cells(values[1].helpers.grid.range(0, 1, 2, 3), [
              values[1].helpers.format.text("white", 8)
            ]),
            
            values[1].helpers.format.cells(values[1].helpers.grid.rows(5, 7).range(), [
              values[1].helpers.format.background("black"),
              values[1].helpers.format.align.horizontal("CENTER"),
              values[1].helpers.format.text("white", 12, true)
            ]),
            
            values[1].helpers.format.cells(values[1].helpers.grid.rows(7, 8).range(), [
              values[1].helpers.format.background("verylightgrey"),
              values[1].helpers.format.text(null, 12, true)
            ]),
            
            values[1].helpers.format.cells(values[1].helpers.grid.range(1, 5, 0, 1), [
              values[1].helpers.format.background("verylightgrey"),
              values[1].helpers.format.text(null, 12, true)
            ]),

            values[1].helpers.format.cells(values[1].helpers.grid.range(2, 6, 1, 2), [
              values[1].helpers.format.text(null, 12)
            ]),
            
            values[1].helpers.format.cells(values[1].helpers.grid.range(2, 6, 3, 4), [
              values[1].helpers.format.text(null, 8)
            ]),
            
             values[1].helpers.format.cells(values[1].helpers.grid.range(3, 4, 1, 2), [
              values[1].helpers.format.text("midgrey")
            ]),
            
            values[1].helpers.format.cells(values[1].helpers.grid.range(7, 8, 1, 2), [
              values[1].helpers.format.align.horizontal("RIGHT"),
            ]),
            
            values[1].helpers.format.cells(values[1].helpers.grid.range(7, 8, 5, 6), [
              values[1].helpers.format.align.horizontal("RIGHT"),
            ]),
            
            values[1].helpers.format.cells(values[1].helpers.grid.range(7, 8, 9, 10), [
              values[1].helpers.format.align.horizontal("RIGHT"),
            ]),
            
            /* <!-- Freeze Top Rows --> */
            values[1].helpers.properties.update([
              values[1].helpers.properties.grid.frozen.rows(7),
            ]),
            
            /* <!-- Resize the Columns --> */
            values[1].helpers.format.dimension(values[1].helpers.grid.columns(0, 1).dimension(240)),
            values[1].helpers.format.dimension(values[1].helpers.grid.columns(1, 2).dimension(80)),
            values[1].helpers.format.dimension(values[1].helpers.grid.columns(2, 4).dimension(50)),
            values[1].helpers.format.dimension(values[1].helpers.grid.columns(4, 5).dimension(240)),
            values[1].helpers.format.dimension(values[1].helpers.grid.columns(5, 6).dimension(80)),
            values[1].helpers.format.dimension(values[1].helpers.grid.columns(6, 8).dimension(40)),
            values[1].helpers.format.dimension(values[1].helpers.grid.columns(8, 10).dimension(80)),
            values[1].helpers.format.dimension(values[1].helpers.grid.columns(10, 11).dimension(40)),
            
            /* <!-- Merge Tabular Headers --> */
            value.helpers.format.merge(values[1].helpers.grid.range(6, 7, 0, 2)),
            value.helpers.format.merge(values[1].helpers.grid.range(6, 7, 4, 6)),
            value.helpers.format.merge(values[1].helpers.grid.range(6, 7, 8, 10)),
            
            /* <!-- Set Tabular Borders --> */
            value.helpers.format.update(values[1].helpers.grid.columns(3, 4).range())
                .borders(null, null, values[1].helpers.format.border("DASHED", "black")),
            value.helpers.format.update(values[1].helpers.grid.columns(7, 8).range())
                .borders(null, null, values[1].helpers.format.border("DASHED", "black")),
            value.helpers.format.update(values[1].helpers.grid.columns(11, 12).range())
                .borders(null, null, values[1].helpers.format.border("DASHED", "black")),
            
            /* <!-- Set Named Range --> */
            {
              "addNamedRange": {
                "namedRange": {
                  "name": "CODE",
                  "range": values[1].helpers.grid.range(0, 1, 1, 2)
                }
              }
            },
            
            /* <!-- Protected Cell --> */
            {
              "addProtectedRange": {
                "protectedRange": {
                  "range": values[1].helpers.grid.range(0, 1, 1, 2),
                  "warningOnly": true,
                } 
              }
            }
            
          ])
          .then(() => factory.Flags.log("SHEET 2 | STATISTICS:", values[1]))),
      
        /* <!-- Format Third Tab (USERS) --> */
        FN.sheet.update(values[2], values[2].helpers.notation.grid(0, 1, 0, 4, true, "USERS"), [
          ["ID", "FULL_NAME", "DISPLAY_NAME","CUSTOM_SEARCHES", "NOTIFICATIONS_TO"]
        ], "USER_ENTERED")
        .then(() => FN.sheet.batch(values[2], [

          /* <!-- Set Default Format --> */
           values[2].helpers.format.cells(values[2].helpers.grid.rows(0, 26).range(), [
            values[2].helpers.format.align.vertical("MIDDLE"),
          ]),

          /* <!-- Set Top Row as a Header --> */
          values[2].helpers.format.cells(values[2].helpers.grid.rows(0, 1).range(), [
            values[2].helpers.format.background("black"),
            values[2].helpers.format.align.horizontal("CENTER"),
            values[2].helpers.format.text("white", 12, true)
          ]),

          /* <!-- Freeze Heading Rows/Columns (1) --> */
          values[2].helpers.properties.update([
            values[2].helpers.properties.grid.frozen.rows(1),
            values[2].helpers.properties.grid.frozen.columns(1),
          ]),

          /* <!-- Resize the Columns --> */
          values[2].helpers.format.dimension(values[2].helpers.grid.columns(0, 1).dimension(300)),
          values[2].helpers.format.dimension(values[2].helpers.grid.columns(1, 3).dimension(200)),
          values[2].helpers.format.dimension(values[2].helpers.grid.columns(3, 4).dimension(500)),
          values[2].helpers.format.dimension(values[2].helpers.grid.columns(4, 5).dimension(300)),

          /* <!-- Add Metadata Key to Sheet (Schema only on value 0) --> */
          FN.metadata.sheet(values[2].helpers, values[0].schema.keys.type, values[0].schema.values.users),

        ]))
        .then(() => factory.Flags.log("SHEET 3 | USERS:", values[2])),
      
        /* <!-- Format Fourth Tab (REQUESTS) --> */
        FN.sheet.update(values[3], values[3].helpers.notation.grid(0, 1, 0, 4, true, "REQUESTS"), [
          ["DATE", "ID", "ISBN", "USER","DETAILS"]
        ], "USER_ENTERED")
        .then(() => FN.sheet.batch(values[3], [

          /* <!-- Set Default Format --> */
           values[3].helpers.format.cells(values[3].helpers.grid.rows(0, 26).range(), [
            values[3].helpers.format.align.vertical("MIDDLE"),
          ]),

          /* <!-- Set Top Row as a Header --> */
          values[3].helpers.format.cells(values[3].helpers.grid.rows(0, 1).range(), [
            values[3].helpers.format.background("black"),
            values[3].helpers.format.align.horizontal("CENTER"),
            values[3].helpers.format.text("white", 12, true)
          ]),

          /* <!-- Freeze Heading Rows (1) --> */
          values[3].helpers.properties.update([
            values[3].helpers.properties.grid.frozen.rows(1),
          ]),

          /* <!-- Resize the Columns --> */
          values[3].helpers.format.dimension(values[3].helpers.grid.columns(0, 1).dimension(200)),
          values[3].helpers.format.dimension(values[3].helpers.grid.columns(1, 2).dimension(100)),
          values[3].helpers.format.dimension(values[3].helpers.grid.columns(2, 3).dimension(120)),
          values[3].helpers.format.dimension(values[3].helpers.grid.columns(3, 4).dimension(200)),
          values[3].helpers.format.dimension(values[3].helpers.grid.columns(4, 5).dimension(500)),

          /* <!-- Add Metadata Key to Sheet (Schema only on value 0) --> */
          FN.metadata.sheet(values[3].helpers, values[0].schema.keys.type, values[0].schema.values.requests),

        ]))
        .then(() => factory.Flags.log("SHEET 4 | REQUESTS:", values[3])),

      ]))
            
      .then(values => values[0]));
  };

  FN.script = (script, key) => FN.main.prepare(key).then(code => factory.Google.scripts.content(script).update(code));

  FN.query = () => `${options.property.name}=${options.property.value}`;
    
  FN.filter = id => file => file.appProperties && file.appProperties[options.subscription.name] == id;
  
  FN.script_id = {
    
    get : file => file.appProperties && file.appProperties[options.script_id.name],
    
    set : id => factory.Google.files.tag(options.script_id.name, id, true),
    
  },
  
  FN.version = {
   
    get : file => file.appProperties && file.appProperties[options.version.name],
    
    set : () => factory.Google.files.tag(options.version.name, ರ‿ರ.latest.version, true),
    
  },
  
  FN.latest = () => ರ‿ರ.latest ? Promise.resolve(ರ‿ರ.latest) : FN.main.code().then(code => FN.main.version(code.files));
  /* <!-- Public Functions --> */

  return FN;

};