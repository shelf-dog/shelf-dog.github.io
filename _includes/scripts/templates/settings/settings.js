!function(){var n=Handlebars.template;(Handlebars.templates=Handlebars.templates||{}).settings=n({1:function(n,t,e,l,a){var o=n.lookupProperty||function(n,t){if(Object.prototype.hasOwnProperty.call(n,t))return n[t]};return n.escapeExpression(n.lambda(null!=t?o(t,"description"):t,t))},3:function(n,t,e,l,a){return" checked"},5:function(n,t,e,l,a){var o=n.lookupProperty||function(n,t){if(Object.prototype.hasOwnProperty.call(n,t))return n[t]};return' value="'+n.escapeExpression(n.lambda(null!=t?o(t,"database"):t,t))+'"'},7:function(n,t,e,l,a){return" disabled"},9:function(n,t,e,l,a){var o=n.lookupProperty||function(n,t){if(Object.prototype.hasOwnProperty.call(n,t))return n[t]};return"https://drive.google.com/file/d/"+n.escapeExpression(n.lambda(null!=t?o(t,"database"):t,t))+"/view"},11:function(n,t,e,l,a){return"#"},13:function(n,t,e,l,a){var o=n.lookupProperty||function(n,t){if(Object.prototype.hasOwnProperty.call(n,t))return n[t]};return' value="'+n.escapeExpression(n.lambda(null!=t?o(t,"folder"):t,t))+'"'},15:function(n,t,e,l,a){var o=n.lookupProperty||function(n,t){if(Object.prototype.hasOwnProperty.call(n,t))return n[t]};return"https://drive.google.com/drive/folders/"+n.escapeExpression(n.lambda(null!=t?o(t,"folder"):t,t))},17:function(n,t,e,l,a){var o=n.lookupProperty||function(n,t){if(Object.prototype.hasOwnProperty.call(n,t))return n[t]};return n.escapeExpression(n.lambda(null!=t?o(t,"managers"):t,t))},compiler:[8,">= 4.3.0"],main:function(n,t,e,l,a){var o,s=null!=t?t:n.nullContext||{},r=n.lookupProperty||function(n,t){if(Object.prototype.hasOwnProperty.call(n,t))return n[t]};return'<form class="bg-dark p-2 p-xl-3 mb-2 rounded-lg">\n  \n  \x3c!-- LIBRARY DESCRIPTION --\x3e\n  <div class="form-group" data-output-field="description">\n    <label for="settings_description">Description</label>\n    <textarea class="form-control" id="settings_description" rows="3" data-output-name="Value" data-output-always="true">'+(null!=(o=r(e,"if").call(s,null!=t?r(t,"description"):t,{name:"if",hash:{},fn:n.program(1,a,0),inverse:n.noop,data:a,loc:{start:{line:6,column:121},end:{line:6,column:164}}}))?o:"")+'</textarea>\n    <small id="settings_description_HELP" class="form-text text-muted">Description for this library.</small>\n  </div>\n  \n  <div class="border border-secondary rounded px-1 pt-1 px-xl-2 pt-xl-2 my-2">\n    \n    \x3c!-- CAPABILITIES --\x3e\n    <h5 class="mt-0 mb-2 pb-1 border-bottom border-dark">Capabilities</h5>\n    \n    \x3c!-- LOANS AVAILABLE --\x3e\n    <div class="form-group form-check pl-2" data-output-field="capabilities_loan">\n      <div class="custom-control custom-checkbox mr-sm-2">\n          <input type="checkbox" class="custom-control-input" id="settings_capabilities_loan" data-output-name="Value" data-output-always="true"'+(null!=(o=r(e,"if").call(s,null!=t?r(t,"capabilities_loan"):t,{name:"if",hash:{},fn:n.program(3,a,0),inverse:n.noop,data:a,loc:{start:{line:18,column:144},end:{line:18,column:184}}}))?o:"")+'>\n          <label class="custom-control-label" for="settings_capabilities_loan">Loans?</label>\n      </div>\n      <small id="settings_contents_books_audio_HELP" class="form-text text-muted">Further details.</small>\n    </div>\n    \n  </div>\n  \n  <div class="border border-secondary rounded px-1 pt-1 px-xl-2 pt-xl-2 my-2">\n    \n    \x3c!-- CONTENTS --\x3e\n    <h5 class="mt-0 mb-2 pb-1 border-bottom border-dark">Contents</h5>\n    \n    \x3c!-- AUDIO BOOKS --\x3e\n    <div class="form-group form-check pl-2" data-output-field="contents_books_audio">\n      <div class="custom-control custom-checkbox mr-sm-2">\n          <input type="checkbox" class="custom-control-input" id="settings_contents_books_audio" data-output-name="Value" data-output-always="true"'+(null!=(o=r(e,"if").call(s,null!=t?r(t,"contents_books_audio"):t,{name:"if",hash:{},fn:n.program(3,a,0),inverse:n.noop,data:a,loc:{start:{line:34,column:147},end:{line:34,column:190}}}))?o:"")+'>\n          <label class="custom-control-label" for="settings_contents_books_audio">Audio Books?</label>\n      </div>\n      <small id="settings_contents_books_audio_HELP" class="form-text text-muted">Further details.</small>\n    </div>\n\n    \x3c!-- ELECTRONIC BOOKS --\x3e\n    <div class="form-group form-check pl-2" data-output-field="contents_books_electronic">\n      <div class="custom-control custom-checkbox mr-sm-2">\n          <input type="checkbox" class="custom-control-input" id="settings_contents_books_electronic" data-output-name="Value" data-output-always="true"'+(null!=(o=r(e,"if").call(s,null!=t?r(t,"contents_books_electronic"):t,{name:"if",hash:{},fn:n.program(3,a,0),inverse:n.noop,data:a,loc:{start:{line:43,column:152},end:{line:43,column:200}}}))?o:"")+'>\n          <label class="custom-control-label" for="settings_contents_books_electronic">Electronic Books?</label>\n      </div>\n      <small id="settings_contents_books_electronic_HELP" class="form-text text-muted">Further details.</small>\n    </div>\n\n    \x3c!-- PHYSICAL BOOKS --\x3e\n    <div class="form-group form-check pl-2" data-output-field="contents_books_physical">\n      <div class="custom-control custom-checkbox mr-sm-2">\n          <input type="checkbox" class="custom-control-input" id="settings_contents_books_physical" data-output-name="Value" data-output-always="true"'+(null!=(o=r(e,"if").call(s,null!=t?r(t,"contents_books_physical"):t,{name:"if",hash:{},fn:n.program(3,a,0),inverse:n.noop,data:a,loc:{start:{line:52,column:150},end:{line:52,column:196}}}))?o:"")+'>\n          <label class="custom-control-label" for="settings_contents_books_physical">Physical Books?</label>\n      </div>\n      <small id="settings_contents_books_physical_HELP" class="form-text text-muted">Further details.</small>\n    </div>\n  \n  </div>\n  \n  \x3c!-- LIBRARY DATABASE FILE --\x3e\n  <div class="form-group" data-output-field="database">\n    <label for="settings_database">Database</label>\n    <div class="input-group">\n      <input type="text" class="form-control" id="settings_database" data-type="file" aria-describedby="settings_database_HELP" data-output-name="Value" data-output-always="true"'+(null!=(o=r(e,"if").call(s,null!=t?r(t,"database"):t,{name:"if",hash:{},fn:n.program(5,a,0),inverse:n.noop,data:a,loc:{start:{line:64,column:178},end:{line:64,column:224}}}))?o:"")+'>\n      <div class="input-group-append d-none d-md-flex">\n        <a class="btn btn-outline-light'+(null!=(o=r(e,"unless").call(s,null!=t?r(t,"database"):t,{name:"unless",hash:{},fn:n.program(7,a,0),inverse:n.noop,data:a,loc:{start:{line:66,column:39},end:{line:66,column:79}}}))?o:"")+'" data-action="view" target="_blank" href="'+(null!=(o=r(e,"if").call(s,null!=t?r(t,"database"):t,{name:"if",hash:{},fn:n.program(9,a,0),inverse:n.program(11,a,0),data:a,loc:{start:{line:66,column:122},end:{line:66,column:203}}}))?o:"")+'" role="button">View</a>\n        <a class="btn btn-outline-secondary" href="#google,select.database" role="button">Select</a>\n      </div>\n    </div>\n    <div class="d-flex">\n      <div role="group" class="btn-group float-right my-1 d-inline-flex ml-auto d-md-none">\n        <a class="btn btn-outline-light'+(null!=(o=r(e,"unless").call(s,null!=t?r(t,"database"):t,{name:"unless",hash:{},fn:n.program(7,a,0),inverse:n.noop,data:a,loc:{start:{line:72,column:39},end:{line:72,column:79}}}))?o:"")+'" data-action="view" target="_blank" href="'+(null!=(o=r(e,"if").call(s,null!=t?r(t,"database"):t,{name:"if",hash:{},fn:n.program(9,a,0),inverse:n.program(11,a,0),data:a,loc:{start:{line:72,column:122},end:{line:72,column:203}}}))?o:"")+'" role="button">View</a>\n        <a class="btn btn-outline-secondary" href="#google,select.database" role="button">Select</a>\n  \t  </div>\n    </div>\n    <small id="settings_database_HELP" class="form-text text-muted">Database File.</small>\n  </div>\n  \n  \x3c!-- LIBRARY FOLDER --\x3e\n  <div class="form-group" data-output-field="folder">\n    <label for="settings_folder">Folder</label>\n    <div class="input-group">\n      <input type="text" class="form-control" id="settings_folder" data-type="folder" aria-describedby="settings_folder_HELP" data-output-name="Value" data-output-always="true"'+(null!=(o=r(e,"if").call(s,null!=t?r(t,"folder"):t,{name:"if",hash:{},fn:n.program(13,a,0),inverse:n.noop,data:a,loc:{start:{line:83,column:176},end:{line:83,column:218}}}))?o:"")+'>\n      <div class="input-group-append d-none d-md-flex">\n        <a class="btn btn-outline-light'+(null!=(o=r(e,"unless").call(s,null!=t?r(t,"folder"):t,{name:"unless",hash:{},fn:n.program(7,a,0),inverse:n.noop,data:a,loc:{start:{line:85,column:39},end:{line:85,column:77}}}))?o:"")+'" data-action="view" target="_blank" href="'+(null!=(o=r(e,"if").call(s,null!=t?r(t,"folder"):t,{name:"if",hash:{},fn:n.program(15,a,0),inverse:n.program(11,a,0),data:a,loc:{start:{line:85,column:120},end:{line:85,column:199}}}))?o:"")+'" role="button">View</a>\n        <a class="btn btn-outline-secondary" href="#google,select.folder" role="button">Select</a>\n      </div>\n    </div>\n    <div class="d-flex">\n      <div role="group" class="btn-group float-right my-1 d-inline-flex ml-auto d-md-none">\n        <a class="btn btn-outline-light'+(null!=(o=r(e,"unless").call(s,null!=t?r(t,"folder"):t,{name:"unless",hash:{},fn:n.program(7,a,0),inverse:n.noop,data:a,loc:{start:{line:91,column:39},end:{line:91,column:77}}}))?o:"")+'" data-action="view" target="_blank" href="'+(null!=(o=r(e,"if").call(s,null!=t?r(t,"folder"):t,{name:"if",hash:{},fn:n.program(15,a,0),inverse:n.program(11,a,0),data:a,loc:{start:{line:91,column:120},end:{line:91,column:199}}}))?o:"")+'" role="button">View</a>\n        <a class="btn btn-outline-secondary" href="#google,select.folder" role="button">Select</a>\n  \t  </div>\n    </div>\n    <small id="settings_folder_HELP" class="form-text text-muted">Library Folder.</small>\n  </div>\n  \n  \x3c!-- MANAGERS --\x3e\n  <div class="form-group" data-output-field="managers">\n    <label for="settings_managers">Managers</label>\n    <textarea class="form-control" id="settings_managers" rows="4" data-output-name="Value" data-output-always="true">'+(null!=(o=r(e,"if").call(s,null!=t?r(t,"managers"):t,{name:"if",hash:{},fn:n.program(17,a,0),inverse:n.noop,data:a,loc:{start:{line:101,column:118},end:{line:101,column:155}}}))?o:"")+'</textarea>\n    <small id="settings_managers_HELP" class="form-text text-muted">Managers for this library.</small>\n  </div>\n  \n  \x3c!-- SAVE BUTTON --\x3e\n  <button type="submit" class="btn btn-lg btn-primary waves-effect">\n    <i class="material-icons md-24 ml-2 float-right result result-success font-weight-bold d-none">check</i>\n    <i class="material-icons md-24 ml-2 float-right result result-failure d-none">error</i>\n    <span class="text">Save</span>\n  </button>\n  \n  \x3c!-- CANCEL BUTTON --\x3e\n  <a class="btn btn-outline-warning ml-2 waves-effect" href="#all" role="button">Cancel</a>\n  \n</form>\n'},useData:!0})}();