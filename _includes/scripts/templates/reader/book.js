!function(){var n=Handlebars.template;(Handlebars.templates=Handlebars.templates||{}).book=n({compiler:[8,">= 4.3.0"],main:function(n,e,a,s,t){return'<div id="main" class="d-flex flex-column h-100">\n  <div id="titlebar" class="d-flex w-100 align-items-center justify-content-between py-1 px-2 mb-2 mb-xl-4">\n    <div class="d-flex flex-row justify-content-between align-items-center">\n      <a class="d-flex text-decoration-none ml-1" href="#font.size">\n        <span class="material-icons">format_size</span>\n      </a>\n      <a class="d-flex text-decoration-none" href="#font.change">\n        <span class="material-icons">text_format</span>\n      </a>\n      <a class="d-flex text-decoration-none ml-1" href="#enable">\n        <span class="material-icons o-50">link_off</span>\n      </a>\n    </div>\n    <div id="metainfo">\n      <span id="book-title"></span>\n      <span class="d-none d-lg-inline">\n        <span id="title-seperator">|</span>\n        <span id="chapter-title"></span>\n      </span>\n    </div>\n    <div class="d-flex flex-row justify-content-between align-items-center">\n      <a class="d-flex text-decoration-none" href="#expand">\n        <span class="material-icons hide-fullscreen-content">fullscreen</span>\n        <span class="material-icons d-none show-fullscreen-content">fullscreen_exit</span>\n      </a>\n      <a class="d-flex text-decoration-none" href="#theme.change">\n        <span class="material-icons">dark_mode</span>\n      </a>\n      <a class="d-flex text-decoration-none mx-1" href="#navigate">\n        <span class="material-icons">toc</span>\n      </a>\n    </div>\n  </div>\n  <a id="prev" href="#" data-action="previous" class="arrow text-decoration-none">‹</a>\n  <div id="viewer" class="position-relative w-100 h-100" style="pointer-events: none;">\n    <div id="divider" class="d-none position-absolute"></div>\n  </div>\n  <a id="next" href="#" data-action="next" class="arrow text-decoration-none">›</a>\n</div>\n'},useData:!0})}();