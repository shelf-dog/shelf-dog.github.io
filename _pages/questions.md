---
layout: page
permalink: /questions
name: questions
title: FAQ
---
{% include section.html content="_content/QUESTIONS" %}

* * *
{:.border-highlight}

{% for question in site.questions %}
{% capture TITLE %}{{ question.question | markdownify | replace: '<p>', '' | replace: '</p>', '' | strip }}{% endcapture %}
{% include section.html title=TITLE markdown=question.content %}
{% unless forloop.last == true %}
* * *
{:.border-highlight .o-25}
{% endunless %}
{% endfor %}