!function(){var n=Handlebars.template;(Handlebars.templates=Handlebars.templates||{}).loans=n({1:function(n,l,e,a,o){return'<th scope="col" class="border-0">Returned</th>'},3:function(n,l,e,a,o){return'<th scope="col" class="border-0">Logged By</th>'},5:function(n,l,e,a,o,t,r){var s,c=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return null!=(s=n.invokePartial(c(a,"loans_loan"),l,{name:"loans_loan",hash:{show_returned:null!=r[1]?c(r[1],"returned"):r[1],show_full:null!=r[1]?c(r[1],"full"):r[1]},data:o,helpers:e,partials:a,decorators:n.decorators}))?s:""},compiler:[8,">= 4.3.0"],main:function(n,l,e,a,o,t,r){var s,c=null!=l?l:n.nullContext||{},u=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<table class="table table-dark table-hover">\n  <thead class="bg-dark">\n    <tr>\n      <th scope="col" class="border-0">Item</th>\n      <th scope="col" class="border-0">Who</th>\n      <th scope="col" class="border-0">Loaned</th>\n      '+(null!=(s=u(e,"if").call(c,null!=l?u(l,"returned"):l,{name:"if",hash:{},fn:n.program(1,o,0,t,r),inverse:n.noop,data:o,loc:{start:{line:7,column:6},end:{line:7,column:75}}}))?s:"")+"\n      "+(null!=(s=u(e,"if").call(c,null!=l?u(l,"full"):l,{name:"if",hash:{},fn:n.program(3,o,0,t,r),inverse:n.noop,data:o,loc:{start:{line:8,column:6},end:{line:8,column:72}}}))?s:"")+'\n      <th scope="col" class="border-0"></th>\n    </tr>\n  </thead>\n  <tbody>\n    '+(null!=(s=u(e,"each").call(c,null!=l?u(l,"loans"):l,{name:"each",hash:{},fn:n.program(5,o,0,t,r),inverse:n.noop,data:o,loc:{start:{line:13,column:4},end:{line:13,column:88}}}))?s:"")+"\n  </tbody>\n</table>\n"},usePartial:!0,useData:!0,useDepths:!0})}();