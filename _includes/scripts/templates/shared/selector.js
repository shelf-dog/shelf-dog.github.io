!function(){var e=Handlebars.template;(Handlebars.templates=Handlebars.templates||{}).selector=e({1:function(e,n,l,a,t){var r=e.lambda,o=e.escapeExpression,s=e.lookupProperty||function(e,n){if(Object.prototype.hasOwnProperty.call(e,n))return e[n]};return'<option value="library.'+o(r(t&&s(t,"index"),n))+'">'+o(r(null!=n?s(n,"name"):n,n))+"</option>"},3:function(e,n,l,a,t){var r=e.lookupProperty||function(e,n){if(Object.prototype.hasOwnProperty.call(e,n))return e[n]};return'<a class="btn btn-warning" href="'+e.escapeExpression(e.lambda(null!=n?r(n,"cancel"):n,n))+'" role="button">Cancel</a>'},compiler:[8,">= 4.3.0"],main:function(e,n,l,a,t){var r,o=null!=n?n:e.nullContext||{},s=e.lambda,c=e.escapeExpression,i=e.lookupProperty||function(e,n){if(Object.prototype.hasOwnProperty.call(e,n))return e[n]};return'<div class="input-group">\n  <select class="custom-select" id="choose_Library" aria-label="Choose Library for Settings">\n    <option selected>Choose Library...</option>\n    '+(null!=(r=i(l,"each").call(o,null!=n?i(n,"libraries"):n,{name:"each",hash:{},fn:e.program(1,t,0),inverse:e.noop,data:t,loc:{start:{line:4,column:4},end:{line:4,column:84}}}))?r:"")+'\n  </select>\n  <div class="input-group-append">'+(null!=(r=i(l,"if").call(o,null!=n?i(n,"cancel"):n,{name:"if",hash:{},fn:e.program(3,t,0),inverse:e.noop,data:t,loc:{start:{line:7,column:4},end:{line:7,column:96}}}))?r:"")+'<a class="btn btn-dark disabled" href="'+c(s(null!=n?i(n,"select_url"):n,n))+'" data-href="'+c(s(null!=n?i(n,"select_url"):n,n))+'" role="button" data-role="select">'+c(s(null!=n?i(n,"select_text"):n,n))+"</a>\n  </div>\n</div>\n"},useData:!0})}();