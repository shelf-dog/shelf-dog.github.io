!function(){var n=Handlebars.template;(Handlebars.templates=Handlebars.templates||{}).results=n({1:function(n,e,l,t,a){return'<th scope="col">'+n.escapeExpression(n.lambda(e,e))+"</th>"},3:function(n,e,l,t,a){var r;return"<tr>\n      "+(null!=(r=(n.lookupProperty||function(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]})(l,"each").call(null!=e?e:n.nullContext||{},e,{name:"each",hash:{},fn:n.program(4,a,0),inverse:n.noop,data:a,loc:{start:{line:9,column:6},end:{line:9,column:391}}}))?r:"")+"\n    </tr>"},4:function(n,e,l,t,a){var r,o=n.lookupProperty||function(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]};return null!=(r=o(l,"is").call(null!=e?e:n.nullContext||{},a&&o(a,"index"),0,{name:"is",hash:{},fn:n.program(5,a,0),inverse:n.program(7,a,0),data:a,loc:{start:{line:9,column:20},end:{line:9,column:382}}}))?r:""},5:function(n,e,l,t,a){var r=n.lambda,o=n.escapeExpression;return'<th scope="row"><a href="#book.'+o(r(e,e))+'" class="text-decoration-none text-white">'+o(r(e,e))+"</a></th>"},7:function(n,e,l,t,a){var r;return"<td>"+(null!=(r=(n.lookupProperty||function(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]})(l,"present").call(null!=e?e:n.nullContext||{},e,{name:"present",hash:{},fn:n.program(8,a,0),inverse:n.noop,data:a,loc:{start:{line:9,column:146},end:{line:9,column:370}}}))?r:"")+"</td>"},8:function(n,e,l,t,a){var r,o=null!=e?e:n.nullContext||{},c=n.lookupProperty||function(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]};return null!=(r=c(l,"if").call(o,c(l,"isArray").call(o,e,{name:"isArray",hash:{},data:a,loc:{start:{line:9,column:169},end:{line:9,column:183}}}),{name:"if",hash:{},fn:n.program(9,a,0),inverse:n.program(12,a,0),data:a,loc:{start:{line:9,column:163},end:{line:9,column:358}}}))?r:""},9:function(n,e,l,t,a){var r;return'<div class="d-flex flex-row flex-wrap">'+(null!=(r=(n.lookupProperty||function(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]})(l,"each").call(null!=e?e:n.nullContext||{},e,{name:"each",hash:{},fn:n.program(10,a,0),inverse:n.noop,data:a,loc:{start:{line:9,column:224},end:{line:9,column:329}}}))?r:"")+"</div>"},10:function(n,e,l,t,a){var r=n.escapeExpression;return'<a href="#search.'+r((n.lookupProperty||function(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]})(l,"encode").call(null!=e?e:n.nullContext||{},e,{name:"encode",hash:{},data:a,loc:{start:{line:9,column:255},end:{line:9,column:270}}}))+'" class="badge badge-light mb-1 mr-1">'+r(n.lambda(e,e))+"</a>"},12:function(n,e,l,t,a){return n.escapeExpression(n.lambda(e,e))},compiler:[8,">= 4.3.0"],main:function(n,e,l,t,a){var r,o=null!=e?e:n.nullContext||{},c=n.lookupProperty||function(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]};return'<table class="table text-light table-responsive">\n  <thead>\n    <tr>\n      '+(null!=(r=c(l,"each").call(o,null!=e?c(e,"columns"):e,{name:"each",hash:{},fn:n.program(1,a,0),inverse:n.noop,data:a,loc:{start:{line:4,column:6},end:{line:4,column:61}}}))?r:"")+"\n    </tr>\n  </thead>\n  <tbody>\n    "+(null!=(r=c(l,"each").call(o,null!=e?c(e,"values"):e,{name:"each",hash:{},fn:n.program(3,a,0),inverse:n.noop,data:a,loc:{start:{line:8,column:4},end:{line:10,column:18}}}))?r:"")+"\n  </tbody>\n</table>\n"},useData:!0})}();