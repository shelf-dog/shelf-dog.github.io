{% for item in site.tests %}
{% assign module = item.module | downcase | replace: " ", "_" %}
<div class="highlight_all highlight_{{ module }} pb-2 m-1{% if item.requires and item.requires.size >= 1 %} d-none{% endif %}{% if item.requires contains 'client' %} show-client-configured{% endif %}" markdown="1">

#### {% if item.display %}{{ item.display }}{% else %}{{ item.title }}{% endif %}
{:.font-larger-120 .bg-dark .text-white .py-1 .px-2 .rounded-lg .font-weight-light .titles .my-1}

{% if item.content %}{{ item.content }}{% endif %}

{% if item.tests %}<div markdown="0">{% assign id = module | append: '__all' %}{% assign hash = 'run.' | append: item.module | append: '.__all' | append: '.' | append: id %}
<div class="btn-group mr-1 mr-md-2 mr-lg-3 mt-2">
  {% include plumbing/command.html quiet=true class="btn btn-lg btn-dark test-all waves-effect" name='All' command='' id=id spinner=true hash=hash placement="bottom" %}
  <button type="button" class="btn btn-dark dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <span class="sr-only">Toggle Dropdown</span>
  </button>
  <div class="dropdown-menu">
    <a class="dropdown-item" href="#{{hash}}">Once</a>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item" href="#{{hash}}.2">Twice</a>
    <a class="dropdown-item" href="#{{hash}}.5">5 times</a>
    <a class="dropdown-item" href="#{{hash}}.10">10 times</a>
    <a class="dropdown-item" href="#{{hash}}.100">100 times</a>
  </div>
</div>
{% for test in item.tests %}{% assign id = module | append: '__' | append: forloop.index %}{% assign hash = 'run.' | append: item.module | append: '.' | append: test.function | append: '.' | append: id %}{% if test.expected == true or test.expected == false or test.expected.size > 0 %}{% assign hash = hash | append: '.' | append: test.expected %}{% endif %}{% include plumbing/command.html class="btn btn-lg btn-action mr-1 mr-md-2 mr-lg-3 mt-2 waves-effect" command=test spinner=true id=id hash=hash placement="bottom" %}{% endfor %}</div>{% endif %}
</div>
{% unless forloop.last %}<hr class="border-highlight">{% endunless %}
{% endfor %}