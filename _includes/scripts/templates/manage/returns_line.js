!function(){var n=Handlebars.template;(Handlebars.templates=Handlebars.templates||{}).returns_line=n({1:function(n,l,t,e,a){return"10"},3:function(n,l,t,e,a){return"5"},5:function(n,l,t,e,a){var r,o=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return null!=(r=n.lambda(null!=l?o(l,"book"):l,l))?r:""},7:function(n,l,t,e,a){return'<input type="text" class="form-control form-control-sm" style="min-width: 150px;" placeholder="What" aria-label="What">'},9:function(n,l,t,e,a){return" o-75"},11:function(n,l,t,e,a){var r=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return n.escapeExpression(r(t,"localeDate").call(null!=l?l:n.nullContext||{},null!=l?r(l,"returned"):l,{name:"localeDate",hash:{},data:a,loc:{start:{line:6,column:22},end:{line:6,column:45}}}))},13:function(n,l,t,e,a){return'<div class="d-flex align-items-center"><button data-action="return" class="btn btn-action btn-small my-0 mr-2" tabindex="-1" aria-disabled="true" style="line-height: 0.7em;" disabled>Return</button><span class="busy-holder mx-auto"></span></div>'},compiler:[8,">= 4.3.0"],main:function(n,l,t,e,a){var r,o=null!=l?l:n.nullContext||{},i=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<tr class="results-row">\n  <td class="align-middle" style="padding-top: '+(null!=(r=i(t,"if").call(o,null!=l?i(l,"book"):l,{name:"if",hash:{},fn:n.program(1,a,0),inverse:n.program(3,a,0),data:a,loc:{start:{line:2,column:47},end:{line:2,column:77}}}))?r:"")+"px; padding-bottom: "+(null!=(r=i(t,"if").call(o,null!=l?i(l,"book"):l,{name:"if",hash:{},fn:n.program(1,a,0),inverse:n.program(3,a,0),data:a,loc:{start:{line:2,column:97},end:{line:2,column:127}}}))?r:"")+'px;">'+(null!=(r=i(t,"if").call(o,null!=l?i(l,"book"):l,{name:"if",hash:{},fn:n.program(5,a,0),inverse:n.program(7,a,0),data:a,loc:{start:{line:3,column:4},end:{line:3,column:166}}}))?r:"")+'</td>\n  <td class="align-middle'+(null!=(r=i(t,"if").call(o,null!=l?i(l,"returned"):l,{name:"if",hash:{},fn:n.program(9,a,0),inverse:n.noop,data:a,loc:{start:{line:5,column:25},end:{line:5,column:53}}}))?r:"")+'" style="padding-top: 5px; padding-bottom: 5px;">'+(null!=(r=i(t,"if").call(o,null!=l?i(l,"returned"):l,{name:"if",hash:{},fn:n.program(11,a,0),inverse:n.program(13,a,0),data:a,loc:{start:{line:6,column:4},end:{line:6,column:309}}}))?r:"")+"</td>\n</tr>\n"},useData:!0})}();