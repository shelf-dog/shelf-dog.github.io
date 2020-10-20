!function(){var n=Handlebars.template;(Handlebars.templates=Handlebars.templates||{}).loans=n({1:function(n,l,e,t,a){return' data-toggle="tooltip" data-html="true" title="You are an <strong>admin</strong> for this library"'},3:function(n,l,e,t,a){var o=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<h2 class="card-title mt-0">'+n.escapeExpression(n.lambda(null!=l?o(l,"name"):l,l))+"</h2>"},5:function(n,l,e,t,a){var o=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<p class="card-text mx-0">'+n.escapeExpression(n.lambda(null!=l?o(l,"description"):l,l))+"</p>"},7:function(n,l,e,t,a){return'<hr class="border-secondary my-2">'},9:function(n,l,e,t,a){var o,r=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<table class="table table-dark table-hover">\n      <thead class="bg-dark">\n        <tr>\n          <th scope="col" class="border-0">Item</th>\n          <th scope="col" class="border-0">Who</th>\n          <th scope="col" class="border-0">When</th>\n          <th scope="col" class="border-0"></th>\n        </tr>\n      </thead>\n      <tbody>\n        '+(null!=(o=r(e,"each").call(null!=l?l:n.nullContext||{},null!=l?r(l,"loans"):l,{name:"each",hash:{},fn:n.program(10,a,0),inverse:n.noop,data:a,loc:{start:{line:20,column:8},end:{line:27,column:22}}}))?o:"")+"\n      </tbody>\n    </table>"},10:function(n,l,e,t,a){var o,r=n.lambda,c=n.escapeExpression,i=null!=l?l:n.nullContext||{},s=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<tr>\n          <th scope="row"><a href="'+c(r(null!=l?s(l,"command"):l,l))+'" class="text-decoration-none link-action"'+(null!=(o=s(e,"if").call(i,null!=l?s(l,"description"):l,{name:"if",hash:{},fn:n.program(11,a,0),inverse:n.noop,data:a,loc:{start:{line:21,column:88},end:{line:21,column:179}}}))?o:"")+">"+c(r(null!=l?s(l,"item"):l,l))+"</a></th>\n          <td>"+c(r(null!=l?s(l,"who"):l,l))+'</td>\n          <td data-toggle="tooltip" data-html="true" title="<strong>Loaned</strong><br />'+c(s(e,"localeDate").call(i,null!=l?s(l,"when"):l,{name:"localeDate",hash:{},data:a,loc:{start:{line:23,column:89},end:{line:23,column:108}}}))+'">'+c(s(e,"fromNow").call(i,null!=l?s(l,"when"):l,{name:"fromNow",hash:{},data:a,loc:{start:{line:23,column:110},end:{line:23,column:126}}}))+'</td>\n          <td class="d-flex align-items-center" data-item="'+c(r(null!=l?s(l,"item"):l,l))+'">\n'+(null!=(o=n.invokePartial(s(t,"return"),l,{name:"return",data:a,indent:"            ",helpers:e,partials:t,decorators:n.decorators}))?o:"")+"          </td>\n        </tr>"},11:function(n,l,e,t,a){var o,r=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return' data-toggle="tooltip" data-html="true" title="'+(null!=(o=n.lambda(null!=l?r(l,"description"):l,l))?o:"")+'"'},13:function(n,l,e,t,a){var o,r=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<div class="card-footer text-muted d-flex justify-content-between">\n    '+(null!=(o=r(e,"each").call(null!=l?l:n.nullContext||{},null!=l?r(l,"commands"):l,{name:"each",hash:{},fn:n.program(14,a,0),inverse:n.noop,data:a,loc:{start:{line:35,column:4},end:{line:35,column:275}}}))?o:"")+"\n  </div>"},14:function(n,l,e,t,a){var o,r=n.lambda,c=n.escapeExpression,i=null!=l?l:n.nullContext||{},s=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<a href="#'+c(r(null!=l?s(l,"command"):l,l))+'" class="btn btn-action mr-1 mt-1'+(null!=(o=s(e,"is").call(i,a&&s(a,"index"),"gt",0,{name:"is",hash:{},fn:n.program(15,a,0),inverse:n.noop,data:a,loc:{start:{line:35,column:76},end:{line:35,column:109}}}))?o:"")+'">'+(null!=(o=s(e,"if").call(i,null!=l?s(l,"icon"):l,{name:"if",hash:{},fn:n.program(17,a,0),inverse:n.noop,data:a,loc:{start:{line:35,column:111},end:{line:35,column:254}}}))?o:"")+c(r(null!=l?s(l,"name"):l,l))+"</a>"},15:function(n,l,e,t,a){return" pl-2"},17:function(n,l,e,t,a){var o,r=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<span class="material-icons mr-1"'+(null!=(o=r(e,"if").call(null!=l?l:n.nullContext||{},null!=l?r(l,"desc"):l,{name:"if",hash:{},fn:n.program(18,a,0),inverse:n.noop,data:a,loc:{start:{line:35,column:156},end:{line:35,column:231}}}))?o:"")+">"+n.escapeExpression(n.lambda(null!=l?r(l,"icon"):l,l))+"</span>"},18:function(n,l,e,t,a){var o=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return' data-toggle="tooltip" data-html="true" title="'+n.escapeExpression(n.lambda(null!=l?o(l,"desc"):l,l))+'"'},compiler:[8,">= 4.3.0"],main:function(n,l,e,t,a){var o,r=n.escapeExpression,c=null!=l?l:n.nullContext||{},i=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<div data-index="'+r(n.lambda(null!=l?i(l,"id"):l,l))+'" class="card bg-dark border border-background overflow-hidden library mb-2 mb-xl-3 pb-2" style="max-height: 500px;">\n  \n  <div class="card-header d-flex align-items-center justify-content-between bg-'+r(i(e,"either").call(c,null!=l?i(l,"background"):l,"success",{name:"either",hash:{},data:a,loc:{start:{line:3,column:79},end:{line:3,column:110}}}))+' text-body mb-2"><span class="font-weight-bold"'+(null!=(o=i(e,"if").call(c,null!=l?i(l,"admin"):l,{name:"if",hash:{},fn:n.program(1,a,0),inverse:n.noop,data:a,loc:{start:{line:3,column:157},end:{line:3,column:275}}}))?o:"")+">"+r(i(e,"either").call(c,null!=l?i(l,"title"):l,"Details",{name:"either",hash:{},data:a,loc:{start:{line:3,column:276},end:{line:3,column:302}}}))+'</span><span class="material-icons">'+r(i(e,"either").call(c,null!=l?i(l,"icon"):l,"check_circle",{name:"either",hash:{},data:a,loc:{start:{line:3,column:338},end:{line:3,column:368}}}))+'</span></div>\n\n  <div class="card-body py-0 px-1 px-xl-2 overflow-auto">\n    '+(null!=(o=i(e,"if").call(c,null!=l?i(l,"name"):l,{name:"if",hash:{},fn:n.program(3,a,0),inverse:n.noop,data:a,loc:{start:{line:6,column:4},end:{line:6,column:64}}}))?o:"")+"\n    "+(null!=(o=i(e,"if").call(c,null!=l?i(l,"description"):l,{name:"if",hash:{},fn:n.program(5,a,0),inverse:n.noop,data:a,loc:{start:{line:7,column:4},end:{line:7,column:75}}}))?o:"")+"\n    "+(null!=(o=i(e,"if").call(c,i(e,"any").call(c,null!=l?i(l,"name"):l,null!=l?i(l,"description"):l,{name:"any",hash:{},data:a,loc:{start:{line:8,column:10},end:{line:8,column:32}}}),{name:"if",hash:{},fn:n.program(7,a,0),inverse:n.noop,data:a,loc:{start:{line:8,column:4},end:{line:8,column:75}}}))?o:"")+"\n    \n    "+(null!=(o=i(e,"present").call(c,null!=l?i(l,"loans"):l,{name:"present",hash:{},fn:n.program(9,a,0),inverse:n.noop,data:a,loc:{start:{line:10,column:4},end:{line:29,column:24}}}))?o:"")+"\n    </div>\n    \n  </div>"+(null!=(o=i(e,"present").call(c,null!=l?i(l,"commands"):l,{name:"present",hash:{},fn:n.program(13,a,0),inverse:n.noop,data:a,loc:{start:{line:34,column:2},end:{line:36,column:22}}}))?o:"")+"</div>\n"},usePartial:!0,useData:!0})}();