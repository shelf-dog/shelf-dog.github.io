!function(){var n=Handlebars.template;(Handlebars.templates=Handlebars.templates||{})["confirm-loan"]=n({1:function(n,e,l,a,t){var o=n.lookupProperty||function(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]};return"."+n.escapeExpression(o(l,"encode").call(null!=e?e:n.nullContext||{},null!=e?o(e,"copy"):e,{name:"encode",hash:{},data:t,loc:{start:{line:2,column:102},end:{line:2,column:117}}}))},compiler:[8,">= 4.3.0"],main:function(n,e,l,a,t){var o,c=null!=e?e:n.nullContext||{},r=n.escapeExpression,s=n.lookupProperty||function(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]};return'<div class="d-flex align-items-center">\n  <a href="#item.loan.'+r(s(l,"encode").call(c,null!=e?s(e,"id"):e,{name:"encode",hash:{},data:t,loc:{start:{line:2,column:22},end:{line:2,column:35}}}))+"."+r(s(l,"encode").call(c,null!=e?s(e,"user"):e,{name:"encode",hash:{},data:t,loc:{start:{line:2,column:36},end:{line:2,column:51}}}))+"."+r(s(l,"encode").call(c,s(l,"md5").call(c,s(l,"concat").call(c,null!=e?s(e,"id"):e,"_",null!=e?s(e,"user"):e,{name:"concat",hash:{},data:t,loc:{start:{line:2,column:66},end:{line:2,column:86}}}),{name:"md5",hash:{},data:t,loc:{start:{line:2,column:61},end:{line:2,column:87}}}),{name:"encode",hash:{},data:t,loc:{start:{line:2,column:52},end:{line:2,column:89}}}))+(null!=(o=s(l,"if").call(c,null!=e?s(e,"copy"):e,{name:"if",hash:{},fn:n.program(1,t,0),inverse:n.noop,data:t,loc:{start:{line:2,column:89},end:{line:2,column:124}}}))?o:"")+'" role="button"\n   class="btn btn-action btn-small" style="line-height: 0.7em;">Loan</a>\n'+(null!=(o=n.invokePartial(s(a,"cancel"),e,{name:"cancel",hash:{type:"request"},data:t,indent:"  ",helpers:l,partials:a,decorators:n.decorators}))?o:"")+"</div>\n"},usePartial:!0,useData:!0})}();