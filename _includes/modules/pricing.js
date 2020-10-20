Page = function() {
	"use strict";

	/* <!-- Returns an instance of this if required --> */
	if (this && this._isF && this._isF(this.Page)) return new this.Page().initialise(this);

	/* <!-- Internal Constants --> */
  const email = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi,
        domain = /([a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
	/* <!-- Internal Constants --> */

	/* <!-- Internal Variables --> */
	var ಠ_ಠ;
	/* <!-- Internal Variables --> */

  /* <!-- Internal Functions --> */
  var _isEmail = value => value && value.match(email),
      _isDomain = value => value && value.match(domain);
  /* <!-- Internal Functions --> */
  
	/* <!-- External Visibility --> */
	return {

		initialise: function(container) {

			/* <!-- Get a reference to the Container --> */
			ಠ_ಠ = container;

			/* <!-- Set Container Reference to this --> */
			container.Page = this;

			/* <!-- Return for Chaining --> */
			return this;

		},

		start: function() {

			$("a[data-tier]").on("click.tier", e => {
				e.preventDefault();
				var _$ = $(e.target),
            _type = _$.data("tier-type");
				return ಠ_ಠ.Display.modal("subscribe", {
					title: `${_$.data("tier")} Subscription`,
					message: ಠ_ಠ.Display.doc.get("SUBSCRIBE_GENERAL", 
                     ಠ_ಠ.Display.doc.get(_type == "Personal" ? "SUBSCRIBE_PERSONAL" : "SUBSCRIBE_ORGANISATION")),
          tier: _$.data("tier"),
          client: _$.data("tier-client"),
					product: _$.data("tier-product"),
          cost: _$.data("tier-cost"),
          unit: _$.data("tier-unit"),
					data: _$.data("tier-data"),
					details: _$.data("tier-details"),
          type: _type,
          organisation: _type == "Organisation",
          email: true,
          validate: values => values && 
            _.find(values, value => value.name == "email" && _isEmail(value.value)) &&
            _.find(values, value => value.name == "name") &&
           (_type == "Personal" || _.find(values, value => value.name == "domain" && _isDomain(value.value))),
				}, dialog => {
          if (_type == "Organisation") {
            var _email = dialog.find("#email_input"),
                _domain = dialog.find("#domain_input");
            _email.on("change.email", e => {
              var _value = $(e.target).val();
              if (_value && _isEmail(_value) && !_domain.val()) _domain.val(_value.split("@")[1]);
            });
          }
        }).then(values => {
          if (values) {
            var _tier = _.find(values, value => value.name == "tier"),
                _client = _.find(values, value => value.name == "client"),
                _product = _.find(values, value => value.name == "product"),
                _email = _.find(values, value => value.name == "email"),
                _name = _.find(values, value => value.name == "name"),
                _domain = _.find(values, value => value.name == "domain"),
                _type = _.find(values, value => value.name == "type");
            if (_client && _product) ಠ_ಠ.Subscribe({}, ಠ_ಠ).subscribe(_tier.value, _client.value, _product.value,
                                        _email.value, _name.value, _domain ? _domain.value : null, _type);
          }
        });
			});

		},
		/* <!-- External Functions --> */

	};
	/* <!-- External Visibility --> */
};