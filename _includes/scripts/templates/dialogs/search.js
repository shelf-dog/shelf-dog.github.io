!function(){var n=Handlebars.template;(Handlebars.templates=Handlebars.templates||{}).search=n({1:function(n,l,e,a,o,t,r){var i,u=null!=l?l:n.nullContext||{},s=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<form class="needs-validation mt-3" novalidate>\n          \n  <div class="row">\n    \n    <div class="container col-xl-6 px-4 px-md-3">\n      <div class="form-group row">\n        <label for="'+(null!=(i=s(e,"if").call(u,null!=l?s(l,"id"):l,{name:"if",hash:{},fn:n.program(2,o,0,t,r),inverse:n.noop,data:o,loc:{start:{line:8,column:20},end:{line:8,column:44}}}))?i:"")+'title" class="col-sm-2 col-form-label col-form-label-lg text-white">Title</label>\n        <div class="col-sm-10">\n          <input id="'+(null!=(i=s(e,"if").call(u,null!=l?s(l,"id"):l,{name:"if",hash:{},fn:n.program(2,o,0,t,r),inverse:n.noop,data:o,loc:{start:{line:10,column:21},end:{line:10,column:45}}}))?i:"")+'title" data-output-field="Title" type="text"\n                 class="form-control form-control-lg"\n                 tabindex="1" '+(null!=(i=s(e,"if").call(u,null!=l?s(l,"state"):l,{name:"if",hash:{},fn:n.program(4,o,0,t,r),inverse:n.noop,data:o,loc:{start:{line:12,column:30},end:{line:12,column:108}}}))?i:"")+'/>\n        </div>\n      </div>\n    </div>\n\n    <div class="container col-xl-6 px-4 px-md-3">\n      <div class="form-group row">\n        <label for="'+(null!=(i=s(e,"if").call(u,null!=l?s(l,"id"):l,{name:"if",hash:{},fn:n.program(2,o,0,t,r),inverse:n.noop,data:o,loc:{start:{line:19,column:20},end:{line:19,column:44}}}))?i:"")+'author" class="col-sm-2 col-form-label col-form-label-lg text-white">Author</label>\n        <div class="col-sm-10">\n          <input id="'+(null!=(i=s(e,"if").call(u,null!=l?s(l,"id"):l,{name:"if",hash:{},fn:n.program(2,o,0,t,r),inverse:n.noop,data:o,loc:{start:{line:21,column:21},end:{line:21,column:45}}}))?i:"")+'author" name="Authors" type="text" class="form-control form-control-lg"\n                 tabindex="2" '+(null!=(i=s(e,"if").call(u,null!=l?s(l,"state"):l,{name:"if",hash:{},fn:n.program(7,o,0,t,r),inverse:n.noop,data:o,loc:{start:{line:22,column:30},end:{line:22,column:110}}}))?i:"")+'/>\n        </div>\n      </div>\n    </div>\n\n  </div>\n\n  <div class="row">\n\n    <div class="container col-xl-6 px-4 px-md-3">\n      <div class="form-group row">\n        <label for="'+(null!=(i=s(e,"if").call(u,null!=l?s(l,"id"):l,{name:"if",hash:{},fn:n.program(2,o,0,t,r),inverse:n.noop,data:o,loc:{start:{line:33,column:20},end:{line:33,column:44}}}))?i:"")+'identifier" class="col-sm-2 col-form-label text-white">Identifier</label>\n        <div class="col-sm-10" data-output-field="Identifier">\n          '+(null!=(i=s(e,"present").call(u,null!=l?s(l,"identifiers"):l,{name:"present",hash:{},fn:n.program(10,o,0,t,r),inverse:n.noop,data:o,loc:{start:{line:35,column:10},end:{line:44,column:30}}}))?i:"")+'\n            <input id="'+(null!=(i=s(e,"if").call(u,null!=l?s(l,"id"):l,{name:"if",hash:{},fn:n.program(2,o,0,t,r),inverse:n.noop,data:o,loc:{start:{line:45,column:23},end:{line:45,column:47}}}))?i:"")+'identifier" data-output-name="Value" type="text" class="form-control"\n                   tabindex="3"'+(null!=(i=s(e,"if").call(u,null!=l?s(l,"state"):l,{name:"if",hash:{},fn:n.program(13,o,0,t,r),inverse:n.noop,data:o,loc:{start:{line:46,column:31},end:{line:46,column:119}}}))?i:"")+"/>\n          "+(null!=(i=s(e,"present").call(u,null!=l?s(l,"identifiers"):l,{name:"present",hash:{},fn:n.program(16,o,0,t,r),inverse:n.noop,data:o,loc:{start:{line:47,column:10},end:{line:47,column:52}}}))?i:"")+'\n        </div>\n      </div>\n    </div>\n    \n    <div class="container col-xl-6 px-4 px-md-3">\n      <div class="form-group row">\n        <label for="'+(null!=(i=s(e,"if").call(u,null!=l?s(l,"id"):l,{name:"if",hash:{},fn:n.program(2,o,0,t,r),inverse:n.noop,data:o,loc:{start:{line:54,column:20},end:{line:54,column:44}}}))?i:"")+'tag" class="col-sm-2 col-form-label text-white">Tag</label>\n        <div class="col-sm-10">\n          <input id="'+(null!=(i=s(e,"if").call(u,null!=l?s(l,"id"):l,{name:"if",hash:{},fn:n.program(2,o,0,t,r),inverse:n.noop,data:o,loc:{start:{line:56,column:21},end:{line:56,column:45}}}))?i:"")+'tag" name="Tags" type="text" class="form-control" tabindex="4"\n                 '+(null!=(i=s(e,"if").call(u,null!=l?s(l,"state"):l,{name:"if",hash:{},fn:n.program(18,o,0,t,r),inverse:n.noop,data:o,loc:{start:{line:57,column:17},end:{line:57,column:91}}}))?i:"")+'/>\n        </div>\n      </div>\n    </div>\n\n  </div>\n\n  <div class="row">\n\n    <div class="container col-xl-6 px-4 px-md-3">\n      <div class="form-group row">\n        <label for="'+(null!=(i=s(e,"if").call(u,null!=l?s(l,"id"):l,{name:"if",hash:{},fn:n.program(2,o,0,t,r),inverse:n.noop,data:o,loc:{start:{line:68,column:20},end:{line:68,column:44}}}))?i:"")+'series" class="col-sm-2 col-form-label text-white">Series</label>\n        <div class="col-sm-10">\n          <input id="'+(null!=(i=s(e,"if").call(u,null!=l?s(l,"id"):l,{name:"if",hash:{},fn:n.program(2,o,0,t,r),inverse:n.noop,data:o,loc:{start:{line:70,column:21},end:{line:70,column:45}}}))?i:"")+'series" data-output-field="Series" type="text" class="form-control" tabindex="5"\n                 '+(null!=(i=s(e,"if").call(u,null!=l?s(l,"state"):l,{name:"if",hash:{},fn:n.program(13,o,0,t,r),inverse:n.noop,data:o,loc:{start:{line:71,column:17},end:{line:71,column:105}}}))?i:"")+'/>\n        </div>\n      </div>\n    </div>\n\n    <div class="container col-xl-6 px-4 px-md-3">\n      <div class="form-group row">\n        <label for="'+(null!=(i=s(e,"if").call(u,null!=l?s(l,"id"):l,{name:"if",hash:{},fn:n.program(2,o,0,t,r),inverse:n.noop,data:o,loc:{start:{line:78,column:20},end:{line:78,column:44}}}))?i:"")+'publisher" class="col-sm-2 col-form-label text-white">Publisher</label>\n        <div class="col-sm-10">\n          <input id="'+(null!=(i=s(e,"if").call(u,null!=l?s(l,"id"):l,{name:"if",hash:{},fn:n.program(2,o,0,t,r),inverse:n.noop,data:o,loc:{start:{line:80,column:21},end:{line:80,column:45}}}))?i:"")+'publisher" name="Publisher" type="text" class="form-control" tabindex="6"\n                 '+(null!=(i=s(e,"if").call(u,null!=l?s(l,"state"):l,{name:"if",hash:{},fn:n.program(21,o,0,t,r),inverse:n.noop,data:o,loc:{start:{line:81,column:17},end:{line:81,column:103}}}))?i:"")+"/>\n        </div>\n      </div>\n    </div>\n\n  </div>\n  \n  "+(null!=(i=s(e,"present").call(u,null!=l?s(l,"custom"):l,{name:"present",hash:{},fn:n.program(24,o,0,t,r),inverse:n.noop,data:o,loc:{start:{line:88,column:2},end:{line:122,column:20}}}))?i:"")+"\n  \n</form>\n"},2:function(n,l,e,a,o){var t=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return n.escapeExpression(n.lambda(null!=l?t(l,"id"):l,l))+"_"},4:function(n,l,e,a,o){var t,r=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return null!=(t=r(e,"exists").call(null!=l?l:n.nullContext||{},null!=(t=null!=l?r(l,"state"):l)?r(t,"title"):t,{name:"exists",hash:{},fn:n.program(5,o,0),inverse:n.noop,data:o,loc:{start:{line:12,column:43},end:{line:12,column:101}}}))?t:""},5:function(n,l,e,a,o){var t,r=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return' value="'+n.escapeExpression(n.lambda(null!=(t=null!=l?r(l,"state"):l)?r(t,"title"):t,l))+'"'},7:function(n,l,e,a,o){var t,r=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return null!=(t=r(e,"exists").call(null!=l?l:n.nullContext||{},null!=(t=null!=l?r(l,"state"):l)?r(t,"author"):t,{name:"exists",hash:{},fn:n.program(8,o,0),inverse:n.noop,data:o,loc:{start:{line:22,column:43},end:{line:22,column:103}}}))?t:""},8:function(n,l,e,a,o){var t,r=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return' value="'+n.escapeExpression(n.lambda(null!=(t=null!=l?r(l,"state"):l)?r(t,"author"):t,l))+'"'},10:function(n,l,e,a,o){var t,r=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<div class="input-group">\n            <div class="input-group-prepend">\n              <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown"\n                data-output-name="Type" data-qualifier="identifier" aria-haspopup="true" aria-expanded="false">Type</button>\n              <div class="dropdown-menu">\n                <a class="dropdown-item" href="#" data-identifier="*">Any</a>\n                <div role="separator" class="dropdown-divider"></div>\n                '+(null!=(t=r(e,"each").call(null!=l?l:n.nullContext||{},null!=l?r(l,"identifiers"):l,{name:"each",hash:{},fn:n.program(11,o,0),inverse:n.noop,data:o,loc:{start:{line:42,column:16},end:{line:42,column:129}}}))?t:"")+"\n              </div>\n            </div>"},11:function(n,l,e,a,o){var t=n.escapeExpression,r=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<a class="dropdown-item" href="#" data-identifier="'+t(n.lambda(o&&r(o,"key"),l))+'">'+t(r(e,"uppercase").call(null!=l?l:n.nullContext||{},l,{name:"uppercase",hash:{},data:o,loc:{start:{line:42,column:98},end:{line:42,column:116}}}))+"</a>"},13:function(n,l,e,a,o){var t,r=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return null!=(t=r(e,"exists").call(null!=l?l:n.nullContext||{},null!=(t=null!=l?r(l,"state"):l)?r(t,"identifier"):t,{name:"exists",hash:{},fn:n.program(14,o,0),inverse:n.noop,data:o,loc:{start:{line:46,column:44},end:{line:46,column:112}}}))?t:""},14:function(n,l,e,a,o){var t,r=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return' value="'+n.escapeExpression(n.lambda(null!=(t=null!=l?r(l,"state"):l)?r(t,"identifier"):t,l))+'"'},16:function(n,l,e,a,o){return"</div>"},18:function(n,l,e,a,o){var t,r=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return null!=(t=r(e,"exists").call(null!=l?l:n.nullContext||{},null!=(t=null!=l?r(l,"state"):l)?r(t,"tag"):t,{name:"exists",hash:{},fn:n.program(19,o,0),inverse:n.noop,data:o,loc:{start:{line:57,column:30},end:{line:57,column:84}}}))?t:""},19:function(n,l,e,a,o){var t,r=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return' value="'+n.escapeExpression(n.lambda(null!=(t=null!=l?r(l,"state"):l)?r(t,"tag"):t,l))+'"'},21:function(n,l,e,a,o){var t,r=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return null!=(t=r(e,"exists").call(null!=l?l:n.nullContext||{},null!=(t=null!=l?r(l,"state"):l)?r(t,"publisher"):t,{name:"exists",hash:{},fn:n.program(22,o,0),inverse:n.noop,data:o,loc:{start:{line:81,column:30},end:{line:81,column:96}}}))?t:""},22:function(n,l,e,a,o){var t,r=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return' value="'+n.escapeExpression(n.lambda(null!=(t=null!=l?r(l,"state"):l)?r(t,"publisher"):t,l))+'"'},24:function(n,l,e,a,o,t,r){var i,u=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<div class="row"> \n  \n   '+(null!=(i=u(e,"each").call(null!=l?l:n.nullContext||{},null!=l?u(l,"custom"):l,{name:"each",hash:{},fn:n.program(25,o,0,t,r),inverse:n.noop,data:o,loc:{start:{line:90,column:3},end:{line:120,column:19}}}))?i:"")+"\n  \n  </div>"},25:function(n,l,e,a,o,t,r){var i,u=null!=l?l:n.nullContext||{},s=n.lambda,c=n.escapeExpression,p=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<div class="container col-xl-6 px-4 px-md-3">\n      <div class="form-group row d-flex align-items-center">\n        <label for="'+(null!=(i=p(e,"if").call(u,null!=r[1]?p(r[1],"id"):r[1],{name:"if",hash:{},fn:n.program(26,o,0,t,r),inverse:n.noop,data:o,loc:{start:{line:92,column:20},end:{line:92,column:50}}}))?i:"")+"custom_"+c(s(null!=l?p(l,"key"):l,l))+'" class="col-sm-5 col-form-label col-form-label-sm text-white">'+c(s(null!=l?p(l,"name"):l,l))+'</label>\n        <div class="col-sm-7 pl-2">'+(null!=(i=p(e,"present").call(u,null!=l?p(l,"values"):l,{name:"present",hash:{},fn:n.program(28,o,0,t,r),inverse:n.program(31,o,0,t,r),data:o,loc:{start:{line:94,column:10},end:{line:117,column:24}}}))?i:"")+"</div>\n      </div>\n    </div>"},26:function(n,l,e,a,o,t,r){var i=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return n.escapeExpression(n.lambda(null!=r[1]?i(r[1],"id"):r[1],l))+"_"},28:function(n,l,e,a,o,t,r){var i,u=null!=l?l:n.nullContext||{},s=n.lambda,c=n.escapeExpression,p=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<select id="'+(null!=(i=p(e,"if").call(u,null!=r[1]?p(r[1],"id"):r[1],{name:"if",hash:{},fn:n.program(26,o,0,t,r),inverse:n.noop,data:o,loc:{start:{line:95,column:22},end:{line:95,column:52}}}))?i:"")+"custom_"+c(s(null!=l?p(l,"key"):l,l))+'" class="custom-select" name="'+c(s(null!=l?p(l,"key"):l,l))+'"\n                  tabindex="'+c(p(e,"inc").call(u,o&&p(o,"index"),{name:"inc",hash:{inc:7},data:o,loc:{start:{line:96,column:28},end:{line:96,column:48}}}))+'" multiple>\n            '+(null!=(i=p(e,"each").call(u,null!=l?p(l,"values"):l,{name:"each",hash:{},fn:n.program(29,o,0,t,r),inverse:n.noop,data:o,loc:{start:{line:97,column:12},end:{line:97,column:79}}}))?i:"")+"\n          </select>"},29:function(n,l,e,a,o){var t=n.lambda,r=n.escapeExpression,i=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<option value="'+r(t(o&&i(o,"key"),l))+'">'+r(t(l,l))+"</option>"},31:function(n,l,e,a,o,t,r){var i,u=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return null!=(i=u(e,"is").call(null!=l?l:n.nullContext||{},null!=l?u(l,"type"):l,"text",{name:"is",hash:{},fn:n.program(32,o,0,t,r),inverse:n.program(36,o,0,t,r),data:o,loc:{start:{line:100,column:10},end:{line:116,column:19}}}))?i:""},32:function(n,l,e,a,o,t,r){var i,u=null!=l?l:n.nullContext||{},s=n.lambda,c=n.escapeExpression,p=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<input id="'+(null!=(i=p(e,"if").call(u,null!=r[1]?p(r[1],"id"):r[1],{name:"if",hash:{},fn:n.program(26,o,0,t,r),inverse:n.noop,data:o,loc:{start:{line:101,column:21},end:{line:101,column:51}}}))?i:"")+"custom_"+c(s(null!=l?p(l,"key"):l,l))+'" name="'+c(s(null!=l?p(l,"key"):l,l))+'" type="text"\n                 class="form-control form-control-sm" tabindex="'+c(p(e,"inc").call(u,o&&p(o,"index"),{name:"inc",hash:{inc:7},data:o,loc:{start:{line:102,column:64},end:{line:102,column:84}}}))+'"\n                 '+(null!=(i=p(e,"if").call(u,null!=r[1]?p(r[1],"state"):r[1],{name:"if",hash:{},fn:n.program(33,o,0,t,r),inverse:n.noop,data:o,loc:{start:{line:103,column:17},end:{line:103,column:118}}}))?i:"")+"/>"},33:function(n,l,e,a,o,t,r){var i,u=null!=l?l:n.nullContext||{},s=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return null!=(i=s(e,"exists").call(u,s(e,"resolve").call(u,null!=r[1]?s(r[1],"state"):r[1],null!=l?s(l,"key"):l,{name:"resolve",hash:{},data:o,loc:{start:{line:103,column:43},end:{line:103,column:65}}}),{name:"exists",hash:{},fn:n.program(34,o,0,t,r),inverse:n.noop,data:o,loc:{start:{line:103,column:33},end:{line:103,column:111}}}))?i:""},34:function(n,l,e,a,o,t,r){var i=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return' value="'+n.escapeExpression(i(e,"resolve").call(null!=l?l:n.nullContext||{},null!=r[1]?i(r[1],"state"):r[1],null!=l?i(l,"key"):l,{name:"resolve",hash:{},data:o,loc:{start:{line:103,column:75},end:{line:103,column:99}}}))+'"'},36:function(n,l,e,a,o,t,r){var i,u=null!=l?l:n.nullContext||{},s=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<div data-output-field="'+n.escapeExpression(n.lambda(null!=l?s(l,"key"):l,l))+'"'+(null!=(i=s(e,"if").call(u,null!=l?s(l,"range"):l,{name:"if",hash:{},fn:n.program(37,o,0,t,r),inverse:n.noop,data:o,loc:{start:{line:105,column:42},end:{line:105,column:120}}}))?i:"")+">"+(null!=(i=s(e,"if").call(u,null!=l?s(l,"range"):l,{name:"if",hash:{},fn:n.program(39,o,0,t,r),inverse:n.program(41,o,0,t,r),data:o,loc:{start:{line:106,column:12},end:{line:114,column:21}}}))?i:"")+"</div>"},37:function(n,l,e,a,o){return' class="d-flex flex-column flex-lg-row align-items-center"'},39:function(n,l,e,a,o,t,r){var i,u=null!=l?l:n.nullContext||{},s=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return(null!=(i=n.invokePartial(s(a,"search_number"),l,{name:"search_number",hash:{suffix:"1","output-name":"Value_1","comparator-name":"Comparator_1",state:s(e,"resolve").call(u,null!=r[1]?s(r[1],"state"):r[1],null!=l?s(l,"key"):l,{name:"resolve",hash:{},data:o,loc:{start:{line:107,column:49},end:{line:107,column:71}}}),parent:null!=r[1]?s(r[1],"id"):r[1]},data:o,indent:"            ",helpers:e,partials:a,decorators:n.decorators}))?i:"")+'            <span class="material-icons d-none d-lg-block mx-1 mx-lg-2 text-highlight-dark">compare_arrows</span>\n'+(null!=(i=n.invokePartial(s(a,"search_number"),l,{name:"search_number",hash:{suffix:"2","output-name":"Value_2","comparator-name":"Comparator_2",state:s(e,"resolve").call(u,null!=r[1]?s(r[1],"state"):r[1],null!=l?s(l,"key"):l,{name:"resolve",hash:{},data:o,loc:{start:{line:110,column:70},end:{line:110,column:92}}}),parent:null!=r[1]?s(r[1],"id"):r[1],class:"mt-1 mt-lg-0"},data:o,indent:"            ",helpers:e,partials:a,decorators:n.decorators}))?i:"")},41:function(n,l,e,a,o,t,r){var i,u=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return null!=(i=n.invokePartial(u(a,"search_number"),l,{name:"search_number",hash:{state:u(e,"resolve").call(null!=l?l:n.nullContext||{},null!=r[1]?u(r[1],"state"):r[1],null!=l?u(l,"key"):l,{name:"resolve",hash:{},data:o,loc:{start:{line:113,column:49},end:{line:113,column:71}}}),parent:null!=r[1]?u(r[1],"id"):r[1]},data:o,indent:"            ",helpers:e,partials:a,decorators:n.decorators}))?i:""},compiler:[8,">= 4.3.0"],main:function(n,l,e,a,o,t,r){var i,u=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return null!=(i=n.invokePartial(u(a,"dialog"),l,{name:"dialog",hash:{class:"modal-xl"},fn:n.program(1,o,0,t,r),inverse:n.noop,data:o,helpers:e,partials:a,decorators:n.decorators}))?i:""},usePartial:!0,useData:!0,useDepths:!0})}();