!function(){var e=Handlebars.template;(Handlebars.templates=Handlebars.templates||{})["change-request"]=e({compiler:[8,">= 4.3.0"],main:function(e,a,n,l,t){var c,o=null!=a?a:e.nullContext||{},r=e.escapeExpression,s=e.lookupProperty||function(e,a){if(Object.prototype.hasOwnProperty.call(e,a))return e[a]};return'<div class="d-flex align-items-center">\n  <input type="text" class="form-control form-control-sm" style="min-width: 100px;" placeholder="Alternative" aria-label="Alternative">\n  <a data-command="item.change.'+r(s(n,"encode").call(o,null!=a?s(a,"id"):a,{name:"encode",hash:{},data:t,loc:{start:{line:3,column:31},end:{line:3,column:44}}}))+"."+r(s(n,"encode").call(o,null!=a?s(a,"user"):a,{name:"encode",hash:{},data:t,loc:{start:{line:3,column:45},end:{line:3,column:60}}}))+"."+r(s(n,"encode").call(o,s(n,"md5").call(o,s(n,"concat").call(o,null!=a?s(a,"id"):a,"_",null!=a?s(a,"user"):a,{name:"concat",hash:{},data:t,loc:{start:{line:3,column:75},end:{line:3,column:95}}}),{name:"md5",hash:{},data:t,loc:{start:{line:3,column:70},end:{line:3,column:96}}}),{name:"encode",hash:{},data:t,loc:{start:{line:3,column:61},end:{line:3,column:98}}}))+'" href="#" role="button"\n     class="btn btn-action btn-small my-0 ml-1 data-loan disabled" tabindex="-1" aria-disabled="true" style="line-height: 0.7em;">Loan</a>\n'+(null!=(c=e.invokePartial(s(l,"cancel"),a,{name:"cancel",hash:{type:"request"},data:t,indent:"  ",helpers:n,partials:l,decorators:e.decorators}))?c:"")+"</div>\n"},usePartial:!0,useData:!0})}();