---
layout: page
permalink: / 
modules:
  - generic/controller
helpers: []
scripts: []
css:
  primary:
    - custom/variables
    - custom/fonts
    - custom/home
simple: true
navless: true
---
<div class="t">
  <div class="c">
    <div class="i" onclick="event.preventDefault(); window.logo_clicked === true ? window.location.href = `${window.location.href}${window.location.href.endsWith('/') ? '' : '/'}app/` : (window.logo_clicked = true, window.setTimeout(() => window.logo_clicked = false, 4000));">{% include images/logo.svg %}</div>
    <h1 class="font-sensitive brand">Coming Soon ...</h1>
  </div>
</div>