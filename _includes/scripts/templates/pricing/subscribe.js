!function(){var n=Handlebars.template;(Handlebars.templates=Handlebars.templates||{}).subscribe=n({1:function(n,e,l,a,t){var o=n.lookupProperty||function(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]};return'id="'+n.escapeExpression(n.lambda(null!=e?o(e,"id"):e,e))+'" '},3:function(n,e,l,a,t){var o,r=n.lookupProperty||function(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]};return'<span class="text-muted"> (£'+n.escapeExpression(n.lambda(null!=e?r(e,"cost"):e,e))+(null!=(o=r(l,"if").call(null!=e?e:n.nullContext||{},null!=e?r(e,"unit"):e,{name:"if",hash:{},fn:n.program(4,t,0),inverse:n.noop,data:t,loc:{start:{line:5,column:115},end:{line:5,column:145}}}))?o:"")+")</span>"},4:function(n,e,l,a,t){var o=n.lookupProperty||function(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]};return" / "+n.escapeExpression(n.lambda(null!=e?o(e,"unit"):e,e))},6:function(n,e,l,a,t){var o,r=n.lookupProperty||function(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]};return null!=(o=n.lambda(null!=e?r(e,"message"):e,e))?o:""},8:function(n,e,l,a,t){return'<div class="form-group">\n            <label class="font-weight-bold d-flex align-items-center" for="email">\n              <span>Your Email Address</span>\n              <span class="badge badge-danger ml-2">REQUIRED</span>\n            </label>\n            <input id="email_input" type="email" name="email" class="form-control form-control-lg" maxlength="200" aria-describedby="email_help" placeholder="e.g. me@example.com" required>\n          <small id="email_help" class="form-text text-muted">Your email address will be used to set the initial manager of your account (you can add further management users later). This should match your G-Suite / Google Login.</small>\n          </div>'},10:function(n,e,l,a,t){var o,r=n.lookupProperty||function(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]};return'<div class="form-group">\n            <label class="font-weight-bold d-flex align-items-center" for="domain">\n              <span>'+n.escapeExpression(n.lambda(null!=e?r(e,"data"):e,e))+'</span>\n              <span class="badge badge-danger ml-2">REQUIRED</span>\n            </label>\n            <input id="domain_input" type="text" name="domain" class="form-control form-control-lg" maxlength="200" aria-describedby="domain_help" placeholder="e.g. example.com" required>\n            '+(null!=(o=r(l,"if").call(null!=e?e:n.nullContext||{},null!=e?r(e,"details"):e,{name:"if",hash:{},fn:n.program(11,t,0),inverse:n.noop,data:t,loc:{start:{line:41,column:12},end:{line:41,column:106}}}))?o:"")+"\n          </div>"},11:function(n,e,l,a,t){var o=n.lookupProperty||function(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]};return'<small id="domain_help" class="form-text text-muted">'+n.escapeExpression(n.lambda(null!=e?o(e,"details"):e,e))+"</small>"},compiler:[8,">= 4.3.0"],main:function(n,e,l,a,t){var o,r=null!=e?e:n.nullContext||{},i=n.lambda,s=n.escapeExpression,d=n.lookupProperty||function(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]};return"<div "+(null!=(o=d(l,"if").call(r,null!=e?d(e,"id"):e,{name:"if",hash:{},fn:n.program(1,t,0),inverse:n.noop,data:t,loc:{start:{line:1,column:5},end:{line:1,column:34}}}))?o:"")+'class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-hidden="true" aria-labelledby="modal_text_title">\n  <div class="modal-dialog modal-lg" role="document">\n    <div class="modal-content text-body">\n      <div class="modal-header">\n        <h3 class="modal-title m-0" id="modal_text_title">'+s(i(null!=e?d(e,"title"):e,e))+(null!=(o=d(l,"if").call(r,null!=e?d(e,"cost"):e,{name:"if",hash:{},fn:n.program(3,t,0),inverse:n.noop,data:t,loc:{start:{line:5,column:67},end:{line:5,column:160}}}))?o:"")+'</h3>\n        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n          <span aria-hidden="true">&times;</span>\n        </button>\n      </div>\n      <div class="modal-body">\n        '+(null!=(o=d(l,"if").call(r,null!=e?d(e,"message"):e,{name:"if",hash:{},fn:n.program(6,t,0),inverse:n.noop,data:t,loc:{start:{line:11,column:8},end:{line:11,column:43}}}))?o:"")+'\n        <form class="subscribe mt-3">\n          <input type="hidden" name="type" value="'+s(i(null!=e?d(e,"type"):e,e))+'">\n          <input type="hidden" name="tier" value="'+s(i(null!=e?d(e,"tier"):e,e))+'">\n          <input type="hidden" name="client" value="'+s(i(null!=e?d(e,"client"):e,e))+'">\n          <input type="hidden" name="product" value="'+s(i(null!=e?d(e,"product"):e,e))+'">\n          <input type="hidden" name="cost" value="'+s(i(null!=e?d(e,"cost"):e,e))+'">\n          <input type="hidden" name="unit" value="'+s(i(null!=e?d(e,"unit"):e,e))+'">\n          '+(null!=(o=d(l,"if").call(r,null!=e?d(e,"email"):e,{name:"if",hash:{},fn:n.program(8,t,0),inverse:n.noop,data:t,loc:{start:{line:19,column:10},end:{line:26,column:23}}}))?o:"")+'\n          <div class="form-group">\n            <label class="font-weight-bold d-flex align-items-center" for="name">\n              <span>Library Name</span>\n              <span class="badge badge-danger ml-2">REQUIRED</span>\n            </label>\n            <input id="name_input" type="text" name="name" class="form-control form-control-lg" maxlength="200" aria-describedby="name_help" placeholder="e.g. My Library, Example School Library" required>\n          <small id="name_help" class="form-text text-muted">This is the name of your library, and will be displayed in the app (to you and/or your users), so should be something descriptive!</small>\n          </div>'+(null!=(o=d(l,"if").call(r,null!=e?d(e,"organisation"):e,{name:"if",hash:{},fn:n.program(10,t,0),inverse:n.noop,data:t,loc:{start:{line:35,column:10},end:{line:42,column:25}}}))?o:"")+'</form>\n      </div>\n      <div class="modal-footer">\n\t\t\t\t<button type="button" class="btn btn-outline-secondary btn-flat" data-dismiss="modal">Close</button>\n        <button type="button" class="btn btn-primary" data-dismiss="modal">Subscribe</button>\n      </div>\n    </div>\n  </div>\n</div>\n'},useData:!0})}();