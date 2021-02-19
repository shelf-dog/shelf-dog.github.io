---
layout: page
permalink: / 
modules:
  - generic/controller
helpers: []
scripts: []
css:
  primary:
    - custom/mixins/transforms
    - custom/variables
    - custom/fonts
    - custom/ribbons
    - custom/home
  seondary:
    - custom/common
simple: true
navless: true
---
<div class="t">
  <a class="corner-ribbon large-ribbon top-left app-ribbon sub-brand" href="/app/"><span class="font-sensitive">App</span></a>
  <a class="corner-ribbon large-ribbon top-right demo-ribbon sub-brand" href="/app/?demo"><span class="font-sensitive">Demo</span></a>
  <div class="c">
    <div class="i">
      <a href="/app/">{% include images/logo.svg %}</a>
    </div>
    <h1 class="font-sensitive brand">Shelf Dog</h1>
    <h2 class="font-sensitive"><span style="opacity: 0.6; margin-right: 6px;">Libraries, </span>Simplified.</h2>
  </div>
  <a class="corner-ribbon large-ribbon bottom-right about-ribbon sub-brand font-sensitive" href="/about/"><span class="font-sensitive">About</span></a>
</div>