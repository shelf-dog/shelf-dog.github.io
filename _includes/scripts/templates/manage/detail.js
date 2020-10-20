!function(){var n=Handlebars.template;(Handlebars.templates=Handlebars.templates||{}).detail=n({1:function(n,l,e,a,t){var r=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<div class="card-header d-flex align-items-center">\n    <span>'+n.escapeExpression(r(e,"either").call(null!=l?l:n.nullContext||{},null!=l?r(l,"name"):l,"Loading …",{name:"either",hash:{},data:t,loc:{start:{line:5,column:10},end:{line:5,column:37}}}))+'</span>\n    <div class="spinner-border ml-auto text-highlight o-25" role="status" aria-hidden="true"><span class="sr-only">Loading …</span></div>\n  </div>'},3:function(n,l,e,a,t){var r,o=null!=l?l:n.nullContext||{},i=n.escapeExpression,c=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<div class="card-header d-flex align-items-center justify-content-between bg-'+i(c(e,"either").call(o,null!=l?c(l,"background"):l,"success",{name:"either",hash:{},data:t,loc:{start:{line:11,column:79},end:{line:11,column:110}}}))+' text-body"><span class="font-weight-bold"'+(null!=(r=c(e,"if").call(o,null!=l?c(l,"admin"):l,{name:"if",hash:{},fn:n.program(4,t,0),inverse:n.noop,data:t,loc:{start:{line:11,column:152},end:{line:11,column:270}}}))?r:"")+">"+i(c(e,"either").call(o,null!=l?c(l,"title"):l,"Details",{name:"either",hash:{},data:t,loc:{start:{line:11,column:271},end:{line:11,column:297}}}))+'</span><span class="material-icons">'+i(c(e,"either").call(o,null!=l?c(l,"icon"):l,"check_circle",{name:"either",hash:{},data:t,loc:{start:{line:11,column:333},end:{line:11,column:363}}}))+'</span></div>\n\n  <div class="card-body">\n    '+(null!=(r=c(e,"if").call(o,null!=l?c(l,"name"):l,{name:"if",hash:{},fn:n.program(6,t,0),inverse:n.noop,data:t,loc:{start:{line:14,column:4},end:{line:14,column:64}}}))?r:"")+"\n    "+(null!=(r=c(e,"if").call(o,null!=l?c(l,"description"):l,{name:"if",hash:{},fn:n.program(8,t,0),inverse:n.noop,data:t,loc:{start:{line:15,column:4},end:{line:15,column:75}}}))?r:"")+"\n    "+(null!=(r=c(e,"if").call(o,c(e,"any").call(o,null!=l?c(l,"name"):l,null!=l?c(l,"description"):l,{name:"any",hash:{},data:t,loc:{start:{line:16,column:10},end:{line:16,column:32}}}),{name:"if",hash:{},fn:n.program(10,t,0),inverse:n.noop,data:t,loc:{start:{line:16,column:4},end:{line:16,column:75}}}))?r:"")+'\n    <div class="d-flex justify-content-between align-items-center flex-wrap">  \n      '+(null!=(r=c(e,"present").call(o,null!=l?c(l,"values"):l,{name:"present",hash:{},fn:n.program(12,t,0),inverse:n.noop,data:t,loc:{start:{line:18,column:6},end:{line:25,column:23}}}))?r:"")+"\n    </div>\n  </div>"+(null!=(r=c(e,"present").call(o,null!=l?c(l,"commands"):l,{name:"present",hash:{},fn:n.program(18,t,0),inverse:n.noop,data:t,loc:{start:{line:29,column:2},end:{line:31,column:22}}}))?r:"")},4:function(n,l,e,a,t){return' data-toggle="tooltip" data-html="true" title="You are an <strong>admin</strong> for this library"'},6:function(n,l,e,a,t){var r=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<h2 class="card-title mt-0">'+n.escapeExpression(n.lambda(null!=l?r(l,"name"):l,l))+"</h2>"},8:function(n,l,e,a,t){var r=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<p class="card-text mx-0">'+n.escapeExpression(n.lambda(null!=l?r(l,"description"):l,l))+"</p>"},10:function(n,l,e,a,t){return'<hr class="border-secondary my-2">'},12:function(n,l,e,a,t){var r,o=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<ul class="list-group list-group-flush w-100 o-75">\n        '+(null!=(r=o(e,"each").call(null!=l?l:n.nullContext||{},null!=l?o(l,"values"):l,{name:"each",hash:{},fn:n.program(13,t,0),inverse:n.noop,data:t,loc:{start:{line:19,column:8},end:{line:24,column:22}}}))?r:"")+"\n      </ul>"},13:function(n,l,e,a,t){var r,o=null!=l?l:n.nullContext||{},i=n.escapeExpression,c=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<li class="list-group-item list-group-item-dark d-flex justify-content-between align-items-center">\n          '+(null!=(r=c(e,"if").call(o,null!=l?c(l,"route"):l,{name:"if",hash:{},fn:n.program(14,t,0),inverse:n.program(16,t,0),data:t,loc:{start:{line:20,column:10},end:{line:20,column:125}}}))?r:"")+"\n          <"+i(c(e,"either").call(o,null!=l?c(l,"size"):l,"h5",{name:"either",hash:{},data:t,loc:{start:{line:21,column:11},end:{line:21,column:31}}}))+' class="m-0">\n            <span class="badge badge-'+i(c(e,"either").call(o,null!=l?c(l,"background"):l,"dark",{name:"either",hash:{},data:t,loc:{start:{line:22,column:37},end:{line:22,column:65}}}))+' badge-pill font-weight-light">'+i(c(e,"localeString").call(o,null!=l?c(l,"count"):l,{name:"localeString",hash:{},data:t,loc:{start:{line:22,column:96},end:{line:22,column:118}}}))+"</span>\n          </"+i(c(e,"either").call(o,null!=l?c(l,"size"):l,"h5",{name:"either",hash:{},data:t,loc:{start:{line:23,column:12},end:{line:23,column:32}}}))+">\n        </li>"},14:function(n,l,e,a,t){var r=n.lambda,o=n.escapeExpression,i=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<a class="text-reset" data-route="'+o(r(null!=l?i(l,"route"):l,l))+'" href="#">'+o(r(null!=l?i(l,"name"):l,l))+"</a>"},16:function(n,l,e,a,t){var r=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return"<span>"+n.escapeExpression(n.lambda(null!=l?r(l,"name"):l,l))+"</span>"},18:function(n,l,e,a,t){var r,o=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<div class="card-footer text-muted d-flex justify-content-between">\n    '+(null!=(r=o(e,"each").call(null!=l?l:n.nullContext||{},null!=l?o(l,"commands"):l,{name:"each",hash:{},fn:n.program(19,t,0),inverse:n.noop,data:t,loc:{start:{line:30,column:4},end:{line:30,column:275}}}))?r:"")+"\n  </div>"},19:function(n,l,e,a,t){var r,o=n.lambda,i=n.escapeExpression,c=null!=l?l:n.nullContext||{},s=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<a href="#'+i(o(null!=l?s(l,"command"):l,l))+'" class="btn btn-action mr-1 mt-1'+(null!=(r=s(e,"is").call(c,t&&s(t,"index"),"gt",0,{name:"is",hash:{},fn:n.program(20,t,0),inverse:n.noop,data:t,loc:{start:{line:30,column:76},end:{line:30,column:109}}}))?r:"")+'">'+(null!=(r=s(e,"if").call(c,null!=l?s(l,"icon"):l,{name:"if",hash:{},fn:n.program(22,t,0),inverse:n.noop,data:t,loc:{start:{line:30,column:111},end:{line:30,column:254}}}))?r:"")+i(o(null!=l?s(l,"name"):l,l))+"</a>"},20:function(n,l,e,a,t){return" pl-2"},22:function(n,l,e,a,t){var r,o=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<span class="material-icons mr-1"'+(null!=(r=o(e,"if").call(null!=l?l:n.nullContext||{},null!=l?o(l,"desc"):l,{name:"if",hash:{},fn:n.program(23,t,0),inverse:n.noop,data:t,loc:{start:{line:30,column:156},end:{line:30,column:231}}}))?r:"")+">"+n.escapeExpression(n.lambda(null!=l?o(l,"icon"):l,l))+"</span>"},23:function(n,l,e,a,t){var r=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return' data-toggle="tooltip" data-html="true" title="'+n.escapeExpression(n.lambda(null!=l?r(l,"desc"):l,l))+'"'},25:function(n,l,e,a,t){return'<div class="corner-ribbon top-right bg-light text-body shadow-deep d-flex align-items-center justify-content-center"><span class="material-icons md-18 mr-1">security</span>Admin</div>'},compiler:[8,">= 4.3.0"],main:function(n,l,e,a,t){var r,o=null!=l?l:n.nullContext||{},i=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<div data-index="'+n.escapeExpression(n.lambda(null!=l?i(l,"id"):l,l))+'" class="card detail bg-dark border border-background overflow-hidden library mb-2 mb-xl-3">'+(null!=(r=i(e,"if").call(o,null!=l?i(l,"loading"):l,{name:"if",hash:{},fn:n.program(1,t,0),inverse:n.program(3,t,0),data:t,loc:{start:{line:2,column:2},end:{line:32,column:11}}}))?r:"")+(null!=(r=i(e,"if").call(o,null!=l?i(l,"admin"):l,{name:"if",hash:{},fn:n.program(25,t,0),inverse:n.noop,data:t,loc:{start:{line:34,column:2},end:{line:34,column:209}}}))?r:"")+"</div>\n"},useData:!0})}();