!function(){var n=Handlebars.template;(Handlebars.templates=Handlebars.templates||{})["confirm-renew"]=n({compiler:[8,">= 4.3.0"],main:function(n,e,l,a,t){var c,o=null!=e?e:n.nullContext||{},r=n.escapeExpression,s=n.lookupProperty||function(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]};return'<div class="d-flex align-items-center">\n  <a href="#item.renew.'+r(s(l,"encode").call(o,null!=e?s(e,"id"):e,{name:"encode",hash:{},data:t,loc:{start:{line:2,column:23},end:{line:2,column:36}}}))+"."+r(s(l,"encode").call(o,null!=e?s(e,"user"):e,{name:"encode",hash:{},data:t,loc:{start:{line:2,column:37},end:{line:2,column:52}}}))+"."+r(s(l,"encode").call(o,s(l,"md5").call(o,s(l,"concat").call(o,null!=e?s(e,"id"):e,"_",null!=e?s(e,"user"):e,{name:"concat",hash:{},data:t,loc:{start:{line:2,column:67},end:{line:2,column:87}}}),{name:"md5",hash:{},data:t,loc:{start:{line:2,column:62},end:{line:2,column:88}}}),{name:"encode",hash:{},data:t,loc:{start:{line:2,column:53},end:{line:2,column:90}}}))+'" role="button"\n   class="btn btn-action btn-small text-nowrap" style="line-height: 0.7em;">Renew</a>\n'+(null!=(c=n.invokePartial(s(a,"cancel"),e,{name:"cancel",hash:{state:"outstanding",type:"loan"},data:t,indent:"  ",helpers:l,partials:a,decorators:n.decorators}))?c:"")+"</div>\n"},usePartial:!0,useData:!0})}();