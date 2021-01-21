## Libraries
{:.titles .hide-libraries-loaded .display-4 .bg-dark .mt-2 .mt-lg-3 .mx-1 .ml-md-2 .ml-lg-3 .ml-xl-4 .p-1 .px-lg-2 .rounded}

## Select a __library__{:.font-weight-normal .text-primary}
{:.titles .d-none .show-libraries-loaded .display-4 .bg-dark .mt-2 .mt-lg-3 .mx-1 .ml-md-2 .ml-lg-3 .ml-xl-4 .p-1 .px-lg-2 .rounded}

{% include page.html class="library" %}

{% capture content %}
{% include section.html content="_docs/libraries/LIBRARIES" class="m-2" %}
{% include buttons.html 
  class="mb-2 loaded-content"
  left_colour="outline-warning"
  left_border="warning"
  left_text="Close"
  left_url="/app"
  left_icon="arrow_back"
  left_desc="Close Libraries"
  left_text="Close"
%}
{% endcapture %}

{% include container.html id="details" content=content class="d-none show-libraries-loaded hide-libraries-overview" large=true loaded=true style="height: 150px"%}