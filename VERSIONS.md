{::options parse_block_html="true" /}
{% for version in site.data.versions.site limit:5 %}
+ **{{ version[0] }}**{% if version[1].type contains "security" %}<span class="badge badge-danger ml-2">Security Fix</span>{% endif %}{% if version[1].type contains "major" %}<span class="badge badge-dark ml-2">Major Release</span>{% endif %}{% if version[1].type contains "beta" %}<span title="Beta Release" class="badge badge-warning ml-2">BETA</span>{% endif %}{% if version[1].type contains "production" %}<span title="Production Release" class="badge badge-success ml-2">PRODUCTION</span>{% endif %}{% if version == include.versions.first %}<span class="badge badge-secondary ml-2">Latest</span>{% endif %}
  - <p class="m-0">__{{ version[1].name }}__</p>{% if version[1].desc %}
  - <p class="m-0">{% capture desc %}_{{ version[1].desc }}_{% endcapture %}{{ desc | markdownify | replace: '<p>', '' | replace: '</p>', '' | strip }}</p>{% endif %}
  {% if version[1].changes %}{% for change in version[1].changes %}
    * <p class="m-0{% if forloop.last %} pb-2{% endif %}">{% capture details %}{% if change.details %}{{ change.details }}{% else %}{{ change }}{% endif %}{% if change.url %} (See [here]({{ change.url }}){:target="_blank"} for details){% endif %}{% endcapture %}{{ details | markdownify | replace: '<p>', '' | replace: '</p>', '' | strip }}</p>
  {% endfor %}{% endif %}
{% endfor %}