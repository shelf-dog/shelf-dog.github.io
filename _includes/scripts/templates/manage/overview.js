!function(){var n=Handlebars.template;(Handlebars.templates=Handlebars.templates||{}).overview=n({1:function(n,e,l,a,r){var t,o=n.lookupProperty||function(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]};return null!=(t=n.invokePartial(o(a,"details"),e,{name:"details",data:r,helpers:l,partials:a,decorators:n.decorators}))?t:""},3:function(n,e,l,a,r){var t,o=n.lookupProperty||function(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]};return null!=(t=n.lambda(null!=e?o(e,"description"):e,e))?t:""},5:function(n,e,l,a,r){var t=n.lookupProperty||function(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]};return"#library."+n.escapeExpression(n.lambda(null!=e?t(e,"index"):e,e))},compiler:[8,">= 4.3.0"],main:function(n,e,l,a,r){var t,o=null!=e?e:n.nullContext||{},i=n.lookupProperty||function(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]};return"\n\x3c!-- DETAILS --\x3e\n"+(null!=(t=i(l,"present").call(o,null!=e?i(e,"details"):e,{name:"present",hash:{},fn:n.program(1,r,0),inverse:n.noop,data:r,loc:{start:{line:3,column:0},end:{line:3,column:45}}}))?t:"")+'\n\n<div id="library-details" class="bg-dark main p-2 p-xl-3 mb-2 rounded-lg">\n  \n  \x3c!-- MANAGEMENT DESCRIPTION --\x3e\n  '+(null!=(t=i(l,"if").call(o,null!=e?i(e,"description"):e,{name:"if",hash:{},fn:n.program(3,r,0),inverse:n.noop,data:r,loc:{start:{line:8,column:2},end:{line:8,column:45}}}))?t:"")+'\n\n  <div class="d-flex justify-content-between px-2 pt-1 pt-xl-2 loaded-content">\n    \n    \x3c!-- LEFT BUTTON --\x3e\n    <a class="d-flex flex-column flex-lg-row pl-2 btn btn-outline-warning border border-warning waves-effect back-button" \n       href="/app/library/'+n.escapeExpression(n.lambda(null!=e?i(e,"query"):e,e))+(null!=(t=i(l,"present").call(o,null!=e?i(e,"index"):e,{name:"present",hash:{},fn:n.program(5,r,0),inverse:n.noop,data:r,loc:{start:{line:14,column:35},end:{line:14,column:83}}}))?t:"")+'">\n      <span class="material-icons mr-1" data-toggle="tooltip" data-html="true" title="Close Search / Library">arrow_back</span>\n      <span>Close</span>\n    </a>\n    \n  </div>\n  \n</div>\n'},usePartial:!0,useData:!0})}();