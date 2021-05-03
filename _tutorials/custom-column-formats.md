---
layout: page
title: Custom Columns
lead: Configuring how Calibre __custom columns__{:.text-white .font-weight-normal} are displayed in the web app
permalink: /tutorials/custom-column-formats
---

## Introduction
{:.font-larger-120 .bg-dark .text-white .mt-1 .py-1 .px-2 .rounded-lg .font-weight-light .titles}

Calibre libraries support additional __custom columns__{:.text-white .font-weight-normal} that you can use to store extra metadata about the items in your library collection. You can find out more about how to manage these within Calibre by reading their [blog](https://blog.calibre-ebook.com/calibre-custom-columns/){:.text-highlight-mid .link-jump target="_blank" rel="noopener"} or finding out how to use their [templating language](https://manual.calibre-ebook.com/template_lang.html){:.text-highlight-mid .link-jump target="_blank" rel="noopener"} to create columns which aggregate other pieces of metadata.
{:.mb-3}

### Options
{:.font-larger-120 .bg-dark .text-white .mt-1 .py-1 .px-2 .rounded-lg .font-weight-light .titles}

Our web app supports some additional configuration options related to these columns, to control how they are presenting to your users. These options are placed into the __description__{:.text-white .font-weight-normal} field of the custom column, and can be in addition to your existing description information if required!

By default, __all custom columns__{:.text-white .font-weight-normal} that contain data will be shown to the user when viewing the details of an item.
{:.mb-3}

### Configuration
{:.font-larger-120 .bg-dark .text-white .mt-1 .py-1 .px-2 .rounded-lg .font-weight-light .titles}

__PUBLIC__{:.text-black .bg-highlight .px-1 .mr-1 .rounded} by including this in the description, the web app will include this column in the table of search results shown to the user when exploring a library. This is great for ensuring that useful information (such as physical self location) is easily available.
{:.alert .bg-dark .mx-0 .font-larger-110 .mb-3}

__HIDDEN__{:.text-black .bg-highlight .px-1 .mr-1 .rounded} by including this in the description, the web app will not show the custom column value to the library user. This should be considered as as __convenience__{:.text-white .font-weight-normal} feature, __not than a security one__{:.text-white .font-weight-normal}, so please __don't store sensitive data__{:.text-white .font-weight-normal} in custom columns!
{:.alert .bg-dark .mx-0 .font-larger-110 .mb-3}

__DISPLAY_FORMAT__{:.text-black .bg-highlight .px-1 .mr-1 .rounded} is used to control how the custom column is presented in the web-app. You can use this to create custom links (e.g. if you want to link to an external web site or system). Typical uses for this might be to link to comprehension quizzes or external ebook sites. The __magic value__ {% raw  %}{{value}}{% endraw %} is used as a placeholder for this field. So, if you were storing the [Project Gutenberg](https://www.gutenberg.org/){:.text-highlight-mid .link-jump target="_blank" rel="noopener"} ID for books in a custom column, you could use this format in the description to provide a link to the relevant page for each book: {% raw  %}`DISPLAY_FORMAT=https://www.gutenberg.org/ebooks/{{value}}`{:.text-white}{% endraw %}
{:.alert .bg-dark .mx-0 .font-larger-110 .mb-3}

__ENUMS__{:.text-black .bg-highlight .px-1 .mr-1 .rounded} are used to substitute reader-friendly values in the place of short codes in a custom column. For example, you might use codes like: LY, MY & UY to designate the suitable age/reading level of a book. These might not mean much to the users of your library, so you can specify an enumeration to expand these into more descriptive statements, such as: {% raw  %}`ENUMS:LY=Lower Years (Age 5-8);MY=Middle Years (Age 9-13);MY+=Middle Years Plus (Age 12+);UY=Upper Years (Age 14+)`{:.text-white}{% endraw %}
{:.alert .bg-dark .mx-0 .font-larger-110 .mb-3}

__RANGE__{:.text-black .bg-highlight .px-1 .mr-1 .rounded} is used to describe custom columns that should be treated as a range for searching. This is particularly useful for data like reading ages, numerical books levels, language complexity or page counts.
{:.alert .bg-dark .mx-0 .font-larger-110 .mb-3}

__FILTER__{:.text-black .bg-highlight .px-1 .mr-1 .rounded} is used to indicate that a custom column should be available as a filter for search results. Typical uses are reading or lanugage complexity levels, allowing filtering to be done on particular search terms (e.g. show me all books about a particular topic, but then allow me to refine the list by reading level).
{:.alert .bg-dark .mx-0 .font-larger-110 .mb-3}

It is, of course, possible to __combine__{:.text-white .font-weight-normal} these description flags by using a delineator such as {% raw  %}`|`{:.text-white}{% endraw %} between them, so you might end up with a description flag that reads: {% raw  %}`PUBLIC|ENUMS:LY=Lower Years (Age 5-8);MY=Middle Years (Age 9-13);MY+=Middle Years Plus (Age 12+);UY=Upper Years (Age 14+)`{:.text-white}{% endraw %}