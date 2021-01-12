!function(){var n=Handlebars.template;(Handlebars.templates=Handlebars.templates||{}).detail=n({1:function(n,e,l,a,t){var r,o=null!=e?e:n.nullContext||{},i=n.lookupProperty||function(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]};return(null!=(r=i(l,"if").call(o,null!=e?i(e,"name"):e,{name:"if",hash:{},fn:n.program(2,t,0),inverse:n.noop,data:t,loc:{start:{line:2,column:0},end:{line:2,column:60}}}))?r:"")+"\n"+(null!=(r=i(l,"if").call(o,null!=e?i(e,"description"):e,{name:"if",hash:{},fn:n.program(4,t,0),inverse:n.noop,data:t,loc:{start:{line:3,column:0},end:{line:3,column:71}}}))?r:"")+"\n"+(null!=(r=i(l,"if").call(o,i(l,"any").call(o,null!=e?i(e,"name"):e,null!=e?i(e,"description"):e,{name:"any",hash:{},data:t,loc:{start:{line:4,column:6},end:{line:4,column:28}}}),{name:"if",hash:{},fn:n.program(6,t,0),inverse:n.noop,data:t,loc:{start:{line:4,column:0},end:{line:4,column:71}}}))?r:"")+'\n<div class="d-flex justify-content-between align-items-center flex-wrap h-100">  \n  '+(null!=(r=i(l,"present").call(o,null!=e?i(e,"values"):e,{name:"present",hash:{},fn:n.program(8,t,0),inverse:n.noop,data:t,loc:{start:{line:6,column:2},end:{line:13,column:19}}}))?r:"")+"\n</div>\n"},2:function(n,e,l,a,t){var r=n.lookupProperty||function(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]};return'<h2 class="card-title mt-0">'+n.escapeExpression(n.lambda(null!=e?r(e,"name"):e,e))+"</h2>"},4:function(n,e,l,a,t){var r=n.lookupProperty||function(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]};return'<p class="card-text mx-0">'+n.escapeExpression(n.lambda(null!=e?r(e,"description"):e,e))+"</p>"},6:function(n,e,l,a,t){return'<hr class="border-secondary my-2">'},8:function(n,e,l,a,t){var r,o=n.lookupProperty||function(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]};return'<ul class="list-group list-group-flush w-100 o-75">\n    '+(null!=(r=o(l,"each").call(null!=e?e:n.nullContext||{},null!=e?o(e,"values"):e,{name:"each",hash:{},fn:n.program(9,t,0),inverse:n.noop,data:t,loc:{start:{line:7,column:4},end:{line:12,column:18}}}))?r:"")+"\n  </ul>"},9:function(n,e,l,a,t){var r,o=null!=e?e:n.nullContext||{},i=n.escapeExpression,c=n.lookupProperty||function(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]};return'<li class="list-group-item list-group-item-dark d-flex justify-content-between align-items-center">\n      '+(null!=(r=c(l,"if").call(o,null!=e?c(e,"prefix"):e,{name:"if",hash:{},fn:n.program(10,t,0),inverse:n.noop,data:t,loc:{start:{line:8,column:6},end:{line:8,column:69}}}))?r:"")+(null!=(r=c(l,"if").call(o,null!=e?c(e,"route"):e,{name:"if",hash:{},fn:n.program(12,t,0),inverse:n.program(14,t,0),data:t,loc:{start:{line:8,column:69},end:{line:8,column:184}}}))?r:"")+"\n      <"+i(c(l,"either").call(o,null!=e?c(e,"size"):e,"h5",{name:"either",hash:{},data:t,loc:{start:{line:9,column:7},end:{line:9,column:27}}}))+' class="m-0">\n        <span class="badge badge-'+i(c(l,"either").call(o,null!=e?c(e,"background"):e,"dark",{name:"either",hash:{},data:t,loc:{start:{line:10,column:33},end:{line:10,column:61}}}))+' badge-pill font-weight-light">'+i(c(l,"localeString").call(o,null!=e?c(e,"count"):e,{name:"localeString",hash:{},data:t,loc:{start:{line:10,column:92},end:{line:10,column:114}}}))+"</span>\n      </"+i(c(l,"either").call(o,null!=e?c(e,"size"):e,"h5",{name:"either",hash:{},data:t,loc:{start:{line:11,column:8},end:{line:11,column:28}}}))+">\n    </li>"},10:function(n,e,l,a,t){var r=n.lookupProperty||function(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]};return'<span class="text-white">'+n.escapeExpression(n.lambda(null!=e?r(e,"prefix"):e,e))+"</span>"},12:function(n,e,l,a,t){var r=n.lambda,o=n.escapeExpression,i=n.lookupProperty||function(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]};return'<a class="text-reset" data-route="'+o(r(null!=e?i(e,"route"):e,e))+'" href="#">'+o(r(null!=e?i(e,"name"):e,e))+"</a>"},14:function(n,e,l,a,t){var r=n.lookupProperty||function(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]};return"<span>"+n.escapeExpression(n.lambda(null!=e?r(e,"name"):e,e))+"</span>"},compiler:[8,">= 4.3.0"],main:function(n,e,l,a,t){var r,o=n.lookupProperty||function(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]};return null!=(r=n.invokePartial(o(a,"card"),e,{name:"card",hash:{"max-width":"340","min-width":"300","max-height":"400"},fn:n.program(1,t,0),inverse:n.noop,data:t,helpers:l,partials:a,decorators:n.decorators}))?r:""},usePartial:!0,useData:!0})}();