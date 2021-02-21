---
layout: page
permalink: /tutorials
name: tutorials
title: Tutorials
---
{% include section.html content="_content/TUTORIALS" %}

* * *
{:.border-highlight}

{% for tutorial in site.tutorials %}
{% capture TITLE %}{{ tutorial.title | markdownify | replace: '<p>', '' | replace: '</p>', '' | strip }}{% endcapture %}
{% capture LEAD %}{% if tutorial.lead %}{{ tutorial.lead | markdownify | strip}}{% endif %}{% endcapture %}
{% include section.html title=TITLE title_colour="faded" markdown=LEAD %}
###### [{% if tutorial.link_title %}{{ tutorial.link_title }}{% else %}Read more ...{% endif %}]({{ tutorial.url }})
{:.text-right}
{% unless forloop.last == true %}
* * *
{:.border-highlight .o-25}
{% endunless %}
{% endfor %}