!function(){var n=Handlebars.template;(Handlebars.templates=Handlebars.templates||{}).library=n({1:function(n,l,e,t,a){var o,r=null!=l?l:n.nullContext||{},i=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return null!=(o=i(e,"unless").call(r,i(e,"is").call(r,null!=l?i(l,"state"):l,"READY",{name:"is",hash:{},data:a,loc:{start:{line:1,column:135},end:{line:1,column:153}}}),{name:"unless",hash:{},fn:n.program(2,a,0),inverse:n.noop,data:a,loc:{start:{line:1,column:125},end:{line:1,column:171}}}))?o:""},2:function(n,l,e,t,a){return" o-75"},4:function(n,l,e,t,a){var o,r=null!=l?l:n.nullContext||{},i=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<div class="card-header d-flex align-items-center justify-content-between'+(null!=(o=i(e,"is").call(r,null!=l?i(l,"state"):l,"OFFLINE",{name:"is",hash:{},fn:n.program(5,a,0),inverse:n.noop,data:a,loc:{start:{line:2,column:96},end:{line:2,column:136}}}))?o:"")+(null!=(o=i(e,"is").call(r,null!=l?i(l,"state"):l,"NOT_AVAILABLE",{name:"is",hash:{},fn:n.program(7,a,0),inverse:n.noop,data:a,loc:{start:{line:2,column:136},end:{line:2,column:183}}}))?o:"")+(null!=(o=i(e,"is").call(r,null!=l?i(l,"state"):l,"READY",{name:"is",hash:{},fn:n.program(9,a,0),inverse:n.noop,data:a,loc:{start:{line:2,column:183},end:{line:2,column:222}}}))?o:"")+' text-body border border-background">'+(null!=(o=i(e,"is").call(r,null!=l?i(l,"state"):l,"OFFLINE",{name:"is",hash:{},fn:n.program(11,a,0),inverse:n.noop,data:a,loc:{start:{line:2,column:259},end:{line:2,column:382}}}))?o:"")+(null!=(o=i(e,"is").call(r,null!=l?i(l,"state"):l,"NOT_AVAILABLE",{name:"is",hash:{},fn:n.program(13,a,0),inverse:n.noop,data:a,loc:{start:{line:2,column:382},end:{line:2,column:496}}}))?o:"")+(null!=(o=i(e,"is").call(r,null!=l?i(l,"state"):l,"READY",{name:"is",hash:{},fn:n.program(15,a,0),inverse:n.noop,data:a,loc:{start:{line:2,column:496},end:{line:2,column:734}}}))?o:"")+"</div>"},5:function(n,l,e,t,a){return" bg-danger"},7:function(n,l,e,t,a){return" bg-warning"},9:function(n,l,e,t,a){return" bg-success"},11:function(n,l,e,t,a){return'<span>Currently Offline</span><span class="material-icons">sentiment_very_dissatisfied</span>'},13:function(n,l,e,t,a){return'<span>Not Yet Available</span><span class="material-icons">construction</span>'},15:function(n,l,e,t,a){var o,r=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<span class="font-weight-bold"'+(null!=(o=r(e,"if").call(null!=l?l:n.nullContext||{},null!=l?r(l,"admin"):l,{name:"if",hash:{},fn:n.program(16,a,0),inverse:n.noop,data:a,loc:{start:{line:2,column:547},end:{line:2,column:665}}}))?o:"")+'>Online</span><span class="material-icons">check_circle</span>'},16:function(n,l,e,t,a){return' data-toggle="tooltip" data-html="true" title="You are an <strong>admin</strong> for this library"'},18:function(n,l,e,t,a){var o,r=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return(null!=(o=r(e,"if").call(null!=l?l:n.nullContext||{},null!=l?r(l,"name"):l,{name:"if",hash:{},fn:n.program(19,a,0),inverse:n.noop,data:a,loc:{start:{line:5,column:4},end:{line:5,column:64}}}))?o:"")+'\n    <div class="d-flex justify-content-center my-3 my-xl-4 o-25">\n      <div class="spinner-grow text-highlight" style="width: 4rem; height: 4rem" role="status">\n        <span class="sr-only">Loading...</span>\n      </div>\n    </div>'},19:function(n,l,e,t,a){var o=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<h4 class="card-title mt-0">'+n.escapeExpression(n.lambda(null!=l?o(l,"name"):l,l))+"</h4>"},21:function(n,l,e,t,a){var o,r=null!=l?l:n.nullContext||{},i=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return(null!=(o=i(e,"if").call(r,null!=l?i(l,"name"):l,{name:"if",hash:{},fn:n.program(22,a,0),inverse:n.noop,data:a,loc:{start:{line:12,column:4},end:{line:12,column:79}}}))?o:"")+"\n    "+(null!=(o=i(e,"exists").call(r,null!=l?i(l,"meta"):l,{name:"exists",hash:{},fn:n.program(24,a,0),inverse:n.noop,data:a,loc:{start:{line:13,column:4},end:{line:13,column:112}}}))?o:"")+'\n    <hr class="border-secondary my-2">\n    <div class="d-flex justify-content-between align-items-center flex-wrap">\n      <a href="library/#library.'+n.escapeExpression(n.lambda(null!=l?i(l,"id"):l,l))+'" data-decorate class="btn btn-action mr-1 mt-1 mb-xl-2 waves-effect'+(null!=(o=i(e,"unless").call(r,i(e,"is").call(r,null!=l?i(l,"state"):l,"READY",{name:"is",hash:{},data:a,loc:{start:{line:16,column:116},end:{line:16,column:134}}}),{name:"unless",hash:{},fn:n.program(27,a,0),inverse:n.noop,data:a,loc:{start:{line:16,column:106},end:{line:16,column:156}}}))?o:"")+'">Explore</a>'+(null!=(o=i(e,"is").call(r,null!=l?i(l,"state"):l,"OFFLINE",{name:"is",hash:{},fn:n.program(29,a,0),inverse:n.noop,data:a,loc:{start:{line:17,column:6},end:{line:17,column:308}}}))?o:"")+(null!=(o=i(e,"exists").call(r,null!=l?i(l,"meta"):l,{name:"exists",hash:{},fn:n.program(31,a,0),inverse:n.noop,data:a,loc:{start:{line:18,column:6},end:{line:21,column:26}}}))?o:"")+"\n    </div>"},22:function(n,l,e,t,a){var o=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<h2 class="card-title mt-0 text-highlight">'+n.escapeExpression(n.lambda(null!=l?o(l,"name"):l,l))+"</h2>"},24:function(n,l,e,t,a){var o,r=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return null!=(o=r(e,"if").call(null!=l?l:n.nullContext||{},null!=(o=null!=l?r(l,"meta"):l)?r(o,"description"):o,{name:"if",hash:{},fn:n.program(25,a,0),inverse:n.noop,data:a,loc:{start:{line:13,column:20},end:{line:13,column:101}}}))?o:""},25:function(n,l,e,t,a){var o,r=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<p class="card-text mx-0">'+n.escapeExpression(n.lambda(null!=(o=null!=l?r(l,"meta"):l)?r(o,"description"):o,l))+"</p>"},27:function(n,l,e,t,a){return" disabled"},29:function(n,l,e,t,a){var o=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<a href="#refresh.'+n.escapeExpression(n.lambda(null!=l?o(l,"id"):l,l))+'" class="d-flex flex-column flex-lg-row btn btn-dark mr-1 mt-1 mb-xl-2 pl-2 waves-effect"><span class="material-icons mr-1" data-toggle="tooltip" data-html="true" title="Refresh this Library to check if it is now online">refresh</span>Refresh</a>'},31:function(n,l,e,t,a){var o,r=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return null!=(o=r(e,"if").call(null!=l?l:n.nullContext||{},null!=(o=null!=l?r(l,"meta"):l)?r(o,"claims"):o,{name:"if",hash:{},fn:n.program(32,a,0),inverse:n.noop,data:a,loc:{start:{line:18,column:22},end:{line:21,column:15}}}))?o:""},32:function(n,l,e,t,a){var o,r=null!=l?l:n.nullContext||{},i=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return(null!=(o=i(e,"if").call(r,null!=(o=null!=(o=null!=l?i(l,"meta"):l)?i(o,"claims"):o)?i(o,"manage"):o,{name:"if",hash:{},fn:n.program(33,a,0),inverse:n.noop,data:a,loc:{start:{line:19,column:6},end:{line:19,column:396}}}))?o:"")+(null!=(o=i(e,"if").call(r,null!=(o=null!=(o=null!=l?i(l,"meta"):l)?i(o,"claims"):o)?i(o,"admin"):o,{name:"if",hash:{},fn:n.program(35,a,0),inverse:n.noop,data:a,loc:{start:{line:20,column:6},end:{line:20,column:419}}}))?o:"")},33:function(n,l,e,t,a){var o,r=null!=l?l:n.nullContext||{},i=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<a href="manage/#library.'+n.escapeExpression(n.lambda(null!=l?i(l,"id"):l,l))+'" data-decorate class="d-flex flex-column flex-lg-row btn btn-outline-primary border border-primary mr-1 mt-1 mb-xl-2 pl-2 waves-effect'+(null!=(o=i(e,"unless").call(r,i(e,"is").call(r,null!=l?i(l,"state"):l,"READY",{name:"is",hash:{},data:a,loc:{start:{line:19,column:209},end:{line:19,column:227}}}),{name:"unless",hash:{},fn:n.program(27,a,0),inverse:n.noop,data:a,loc:{start:{line:19,column:199},end:{line:19,column:249}}}))?o:"")+'"><span class="material-icons mr-1" data-toggle="tooltip" data-html="true" title="Manage Library (handle loans etc.)">book</span>Manage</a>'},35:function(n,l,e,t,a){var o,r=null!=l?l:n.nullContext||{},i=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<a href="settings/#library.'+n.escapeExpression(n.lambda(null!=l?i(l,"id"):l,l))+'" data-decorate class="d-flex flex-column flex-lg-row btn btn-outline-light border border-secondary mt-1 mb-xl-2 pl-2 waves-effect'+(null!=(o=i(e,"unless").call(r,i(e,"is").call(r,null!=l?i(l,"state"):l,"READY",{name:"is",hash:{},data:a,loc:{start:{line:20,column:205},end:{line:20,column:223}}}),{name:"unless",hash:{},fn:n.program(27,a,0),inverse:n.noop,data:a,loc:{start:{line:20,column:195},end:{line:20,column:245}}}))?o:"")+'"><span class="material-icons mr-1" data-toggle="tooltip" data-html="true" title="Configure Library (select database file, managers etc.)">settings</span>Settings</a>'},37:function(n,l,e,t,a){var o,r=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return null!=(o=r(e,"if").call(null!=l?l:n.nullContext||{},null!=(o=null!=l?r(l,"meta"):l)?r(o,"capabilities"):o,{name:"if",hash:{},fn:n.program(38,a,0),inverse:n.noop,data:a,loc:{start:{line:26,column:23},end:{line:37,column:13}}}))?o:""},38:function(n,l,e,t,a){var o,r=null!=l?l:n.nullContext||{},i=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<div class="library_capabilities text-light">'+(null!=(o=i(e,"if").call(r,null!=(o=null!=(o=null!=l?i(l,"meta"):l)?i(o,"capabilities"):o)?i(o,"loan"):o,{name:"if",hash:{},fn:n.program(39,a,0),inverse:n.noop,data:a,loc:{start:{line:28,column:8},end:{line:28,column:338}}}))?o:"")+(null!=(o=i(e,"if").call(r,null!=(o=null!=(o=null!=l?i(l,"meta"):l)?i(o,"capabilities"):o)?i(o,"loan_requests"):o,{name:"if",hash:{},fn:n.program(43,a,0),inverse:n.noop,data:a,loc:{start:{line:29,column:8},end:{line:29,column:247}}}))?o:"")+(null!=(o=i(e,"if").call(r,null!=(o=null!=(o=null!=l?i(l,"meta"):l)?i(o,"capabilities"):o)?i(o,"online_items"):o,{name:"if",hash:{},fn:n.program(45,a,0),inverse:n.noop,data:a,loc:{start:{line:30,column:8},end:{line:30,column:221}}}))?o:"")+'</div>\n      <div class="library_contents">'+(null!=(o=i(e,"if").call(r,null!=(o=null!=l?i(l,"meta"):l)?i(o,"contents"):o,{name:"if",hash:{},fn:n.program(47,a,0),inverse:n.noop,data:a,loc:{start:{line:33,column:8},end:{line:35,column:210}}}))?o:"")+"</div>"},39:function(n,l,e,t,a){var o,r=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<span class="material-icons mr-1" data-toggle="tooltip" data-html="true" title="You can <strong>borrow</strong> from this library'+(null!=(o=r(e,"if").call(null!=l?l:n.nullContext||{},null!=(o=null!=(o=null!=l?r(l,"meta"):l)?r(o,"capabilities"):o)?r(o,"loan_length"):o,{name:"if",hash:{},fn:n.program(40,a,0),inverse:n.noop,data:a,loc:{start:{line:28,column:169},end:{line:28,column:307}}}))?o:"")+'">local_library</span>'},40:function(n,l,e,t,a){var o,r=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return" for "+n.escapeExpression(n.lambda(null!=(o=null!=(o=null!=l?r(l,"meta"):l)?r(o,"capabilities"):o)?r(o,"loan_length"):o,l))+" day"+(null!=(o=r(e,"is").call(null!=l?l:n.nullContext||{},null!=(o=null!=(o=null!=l?r(l,"meta"):l)?r(o,"capabilities"):o)?r(o,"loan_length"):o,"gt",1,{name:"is",hash:{},fn:n.program(41,a,0),inverse:n.noop,data:a,loc:{start:{line:28,column:248},end:{line:28,column:300}}}))?o:"")},41:function(n,l,e,t,a){return"s"},43:function(n,l,e,t,a){return'<span class="material-icons mr-1 text-secondary bg-dark rounded p-1" data-toggle="tooltip" data-html="true" title="You can <strong>request</strong> from this library">shopping_basket</span>'},45:function(n,l,e,t,a){return'<span class="material-icons mr-1 text-success" data-toggle="tooltip" data-html="true" title="You can <strong>read online</strong> with this library">language</span>'},47:function(n,l,e,t,a){var o,r=null!=l?l:n.nullContext||{},i=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return(null!=(o=i(e,"if").call(r,null!=(o=null!=(o=null!=(o=null!=l?i(l,"meta"):l)?i(o,"contents"):o)?i(o,"books"):o)?i(o,"audio"):o,{name:"if",hash:{},fn:n.program(48,a,0),inverse:n.noop,data:a,loc:{start:{line:33,column:31},end:{line:33,column:216}}}))?o:"")+(null!=(o=i(e,"if").call(r,null!=(o=null!=(o=null!=(o=null!=l?i(l,"meta"):l)?i(o,"contents"):o)?i(o,"books"):o)?i(o,"electronic"):o,{name:"if",hash:{},fn:n.program(50,a,0),inverse:n.noop,data:a,loc:{start:{line:34,column:8},end:{line:34,column:214}}}))?o:"")+(null!=(o=i(e,"if").call(r,null!=(o=null!=(o=null!=(o=null!=l?i(l,"meta"):l)?i(o,"contents"):o)?i(o,"books"):o)?i(o,"physical"):o,{name:"if",hash:{},fn:n.program(52,a,0),inverse:n.noop,data:a,loc:{start:{line:35,column:8},end:{line:35,column:201}}}))?o:"")},48:function(n,l,e,t,a){return'<span class="material-icons ml-1" data-toggle="tooltip" data-html="true" title="Library contains <strong>Audio</strong> Books">hearing</span>'},50:function(n,l,e,t,a){return'<span class="material-icons ml-1" data-toggle="tooltip" data-html="true" title="Library contains <strong>Electronic</strong> Books">chrome_reader_mode</span>'},52:function(n,l,e,t,a){return'<span class="material-icons ml-1" data-toggle="tooltip" data-html="true" title="Library contains <strong>Physical</strong> Books">menu_book</span>'},54:function(n,l,e,t,a){return'<div class="corner-ribbon top-right bg-light text-body shadow-deep d-flex align-items-center justify-content-center"><span class="material-icons md-18 mr-1">security</span>Admin</div>'},compiler:[8,">= 4.3.0"],main:function(n,l,e,t,a){var o,r=null!=l?l:n.nullContext||{},i=n.lookupProperty||function(n,l){if(Object.prototype.hasOwnProperty.call(n,l))return n[l]};return'<div data-index="'+n.escapeExpression(n.lambda(null!=l?i(l,"id"):l,l))+'" class="card bg-dark border border-background overflow-hidden library mb-2 mb-xl-3'+(null!=(o=i(e,"unless").call(r,null!=l?i(l,"loading"):l,{name:"unless",hash:{},fn:n.program(1,a,0),inverse:n.noop,data:a,loc:{start:{line:1,column:106},end:{line:1,column:182}}}))?o:"")+'">'+(null!=(o=i(e,"unless").call(r,null!=l?i(l,"loading"):l,{name:"unless",hash:{},fn:n.program(4,a,0),inverse:n.noop,data:a,loc:{start:{line:2,column:2},end:{line:2,column:753}}}))?o:"")+'<div class="card-body">'+(null!=(o=i(e,"if").call(r,null!=l?i(l,"loading"):l,{name:"if",hash:{},fn:n.program(18,a,0),inverse:n.program(21,a,0),data:a,loc:{start:{line:4,column:4},end:{line:23,column:13}}}))?o:"")+'</div>\n  <div class="card-footer text-muted d-flex justify-content-between">'+(null!=(o=i(e,"present").call(r,null!=l?i(l,"meta"):l,{name:"present",hash:{},fn:n.program(37,a,0),inverse:n.noop,data:a,loc:{start:{line:26,column:4},end:{line:37,column:27}}}))?o:"")+"</div>"+(null!=(o=i(e,"if").call(r,null!=l?i(l,"admin"):l,{name:"if",hash:{},fn:n.program(54,a,0),inverse:n.noop,data:a,loc:{start:{line:39,column:2},end:{line:39,column:209}}}))?o:"")+"</div>\n"},useData:!0})}();