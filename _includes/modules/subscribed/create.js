Create = (options, factory) => {
  "use strict";

  /* <!-- MODULE: Provides an interface to provide common functionality --> */
  /* <!-- PARAMETERS: Receives the global app context --> */
  /* <!-- REQUIRES: Global Scope: JQuery, Underscore | App Scope: Display --> */

  /* <!-- Internal Constants --> */
  const DEFAULTS = {
    property : {
      name: "SCANTLY",
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
  }];

  /* <!-- Internal Options --> */
  options = _.defaults(options ? _.clone(options) : {}, DEFAULTS);
  /* <!-- Internal Options --> */

  /* <!-- Internal Variables --> */
  var ರ‿ರ = {}; /* <!-- Session State --> */
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
    format: factory.Google_Sheets_Format({
      sheet: sheetId
    }, factory),
    properties: factory.Google_Sheets_Properties({
      sheet: sheetId
    }),
    notation: factory.Google_Sheets_Notation(),
    sorts: factory.Google_Sheets_Sorts()
  });

  /* <!-- Sheet Functions --> */
  FN.sheet = {

    create: (name, tab, colour) => factory.Google.sheets.create(name, tab, colour, [_.pick(_.last(SCHEMAS), "key", "value")])
      .then(sheet => ({
        sheet: sheet,
        helpers: FN.helpers(sheet.sheets[0].properties.sheetId),
      })),

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

  FN.log = (name, subscription) => {
    var _colours = factory.Google_Sheets_Format({}, factory);
    return FN.sheet.create(name, "USERS", _colours.colour("MAGENTA"))
      .then(value => _.tap(value, value => factory.Google.files.update(
          value.sheet.spreadsheetId, _.extend(
            factory.Google.files.tag(options.property.name, options.property.value),
            factory.Google.files.tags([
              [options.subscription.name, subscription],
              [options.version.name, ರ‿ರ.latest.version],
            ], true)
          ))))
      .then(value => Promise.each([
        Promise.resolve(value),
        FN.sheet.add(value.sheet.spreadsheetId, "NAMES", null, _colours.colour("LIME")),
        FN.sheet.add(value.sheet.spreadsheetId, "LOG", null, _colours.colour("BLACK")),
      ]))
      .then(values => Promise.all([

        Promise.resolve(values[0].sheet.spreadsheetId),
      
        /* <!-- Format First Tab (USERS) --> */
        FN.sheet.update(values[0], values[0].helpers.notation.grid(0, 3, 0, 10, true, "USERS"), [
          ["=\"ONSITE ⬇ \"&COUNTIF(A3:A, \"<>\")", null, null, null, null, null, null, "ACTIONS ➡", null, null],
          ["SIGN-IN", null, "USER", "NAME", "CURRENTLY", "LAST LOCATION", null, "SCAN", "SIGN-IN", "SIGN-OUT"],
          [
            "=IFNA(QUERY(UNIQUE(D3:E), \"select Col1 where Col1 is not null and Col2='\"&A2&\"'\",0),)", null,
            "=IFNA(QUERY(UNIQUE(LOG!D2:D), \"select Col1 where Col1 is not null order by Col1\", 0),)",
            "=IF(LEN(C3)>0,IFNA(VLOOKUP(C3,NAMES!A:B,2,FALSE),C3),)",
            "=IF(LEN($C3)>0,IFNA(QUERY({TRANSPOSE(H$2:$2),TRANSPOSE(H3:3)}, \"select Col1 order by Col2 desc limit 1\", 0),),)",
            "=IF(LEN($C3)>0,IFNA(QUERY(LOG!$A:$D, \"select B where D='\"&$C3&\"' order by A desc limit 1\", 0),),)", null,
            "=IF(AND(LEN($C3)>0,LEN(H$2)>0),IFNA(TEXT(QUERY(LOG!$A:$D, \"select A where D='\"&$C3&\"' and C='\"&H$2&\"' order by A desc limit 1\", 0), \"yy-MM-dd HH:mm:ss\"),),)",
            "=IF(AND(LEN($C3)>0,LEN(I$2)>0),IFNA(TEXT(QUERY(LOG!$A:$D, \"select A where D='\"&$C3&\"' and C='\"&I$2&\"' order by A desc limit 1\", 0), \"yy-MM-dd HH:mm:ss\"),),)",
            "=IF(AND(LEN($C3)>0,LEN(J$2)>0),IFNA(TEXT(QUERY(LOG!$A:$D, \"select A where D='\"&$C3&\"' and C='\"&J$2&\"' order by A desc limit 1\", 0), \"yy-MM-dd HH:mm:ss\"),),)"
          ]
        ], "USER_ENTERED")
        .then(() => FN.sheet.batch(values[0], [

          /* <!-- Set Second Column to Black --> */
          values[0].helpers.format.cells(values[0].helpers.grid.columns(1, 2).range(), [
            values[0].helpers.format.background("black"),
          ]),

          /* <!-- Set Seventh Column to Black --> */
          values[0].helpers.format.cells(values[0].helpers.grid.columns(6, 7).range(), [
            values[0].helpers.format.background("black"),
          ]),

          /* <!-- Freeze Heading Rows --> */
          values[0].helpers.properties.update([
            values[0].helpers.properties.grid.frozen.rows(2),
          ]),

          /* <!-- Resize the Columns --> */
          values[0].helpers.format.dimension(values[0].helpers.grid.columns(0, 1).dimension(200)),
          values[0].helpers.format.dimension(values[0].helpers.grid.columns(1, 2).dimension(10)),
          values[0].helpers.format.dimension(values[0].helpers.grid.columns(6, 7).dimension(10)),
          values[0].helpers.format.dimension(values[0].helpers.grid.columns(2, 6).dimension(190)),
          values[0].helpers.format.dimension(values[0].helpers.grid.columns(7, 10).dimension(120)),

          /* <!-- Set Top 2 Rows as Headers --> */
          values[0].helpers.format.cells(values[0].helpers.grid.rows(0, 1).range(), [
            values[0].helpers.format.background("black"),
            values[0].helpers.format.align.horizontal("CENTER"),
            values[0].helpers.format.align.vertical("MIDDLE"),
            values[0].helpers.format.text("white", 12, true)
          ]),

          /* <!-- Set Top 2 Rows as Headers --> */
          values[0].helpers.format.cells(values[0].helpers.grid.rows(1, 2).range(), [
            values[0].helpers.format.background("black"),
            values[0].helpers.format.align.horizontal("CENTER"),
            values[0].helpers.format.align.vertical("MIDDLE"),
            values[0].helpers.format.text("white", 11, true)
          ]),
          
          /* <!-- AutoFill Formulas --> */
          values[0].helpers.format.autofill(values[0].helpers.grid.range(2, 1000, 3, 6)),
          values[0].helpers.format.autofill(values[0].helpers.grid.range(2, 1000, 7, 10)),

          /* <!-- Conditional Formats --> */
          values[0].helpers.format.conditional(values[0].helpers.grid.range(2, 1000, 0, 1))
            .boolean("NOT_BLANK", null, values[0].helpers.format.background("yellow")),
          values[0].helpers.format.conditional(values[0].helpers.grid.range(2, 1000, 4, 5))
            .boolean("TEXT_EQ", values[0].helpers.format.value("SIGN-IN"), values[0].helpers.format.background("yellow"))
          
        ]))
        .then(() => factory.Flags.log("SHEET 1 | USERS:", values[0])),

        /* <!-- Create & Format Second Tab (NAMES) --> */
        FN.sheet.update(values[1], values[1].helpers.notation.grid(0, 1, 0, 2, true, "NAMES"), [
            ["USER ⬇", "NAME ⬇"]
          ], "USER_ENTERED")
          .then(() => FN.sheet.batch(values[1], [

            /* <!-- Set Top Row as Headers --> */
            values[1].helpers.format.cells(values[1].helpers.grid.rows(0, 1).range(), [
              values[1].helpers.format.background("black"),
              values[1].helpers.format.align.horizontal("CENTER"),
              values[1].helpers.format.align.vertical("MIDDLE"),
              values[1].helpers.format.text("white", 11, true)
            ]),

            /* <!-- Freeze Heading Rows --> */
            values[1].helpers.properties.update([
              values[1].helpers.properties.grid.frozen.rows(1),
            ]),
            
            /* <!-- Resize the Columns --> */
            values[1].helpers.format.dimension(values[1].helpers.grid.columns(0, 2).dimension(200)),
            
            /* <!-- Delete Extra Columns --> */
            values[1].helpers.format.delete(values[1].helpers.grid.columns(2, 26).dimension()),

          ])
          .then(() => factory.Flags.log("SHEET 2 | NAMES:", values[1]))),

        /* <!-- Create & Format Third Tab (LOG) --> */
        FN.sheet.update(values[2], values[2].helpers.notation.grid(0, 1, 0, 4, true, "LOG"), [
            ["TIME ⬇", "LOCATION ⬇", "ACTION ⬇", "USER ⬇"]
          ], "USER_ENTERED")
          .then(() => FN.sheet.batch(values[2], [

            /* <!-- Set Top Row as Headers --> */
            values[2].helpers.format.cells(values[2].helpers.grid.rows(0, 1).range(), [
              values[2].helpers.format.background("black"),
              values[2].helpers.format.align.horizontal("CENTER"),
              values[2].helpers.format.align.vertical("MIDDLE"),
              values[2].helpers.format.text("white", 11, true)
            ]),

            /* <!-- Freeze Heading Rows --> */
            values[2].helpers.properties.update([
              values[2].helpers.properties.grid.frozen.rows(1),
            ]),

            /* <!-- Resize the Columns --> */
            values[2].helpers.format.dimension(values[2].helpers.grid.columns(0, 4).dimension(200)),
            
            /* <!-- Delete Extra Columns --> */
            values[2].helpers.format.delete(values[2].helpers.grid.columns(4, 26).dimension()),
            
          ])
          .then(() => factory.Flags.log("SHEET 3 | LOG:", values[2]))),

      ]).then(values => values[0]));
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