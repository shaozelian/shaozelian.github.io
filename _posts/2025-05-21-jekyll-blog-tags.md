---
layout: post
author: Shao Zelian
title: Jekyll 4 - How to enable tags / categories for blog page.
category: Technologies
tags: jekyll
excerpt: Tag an categorize posts are supported.
---

## Add Tag(s) or Category(ies) in article pages

<img src="/assets/images/blog/2025-05-21-jekyll-blog-tags-01.png" style="max-width:600px" alt='page tags'/><br/>

Notes: If page belongs to more tags or categories, use "tags: a, b, c" or "categories: a, b, c".

## Create a new page for grouping by Tag or Cetegory.

Taking Category as example, create a page called "/blog/categories.html". Put the following code and test if it works.

~~~html
{% raw %}
---
layout: default
title: Categories
---

<div class="blog__container">
    {% for category in site.categories %}
    {% capture category_name %}{{ category | first }}{% endcapture %}
    <h3 class="category-head">{{ category_name }}</h3>
    <a name="{{ category_name | slugize }}"></a>
    {% for post in site.categories[category_name] %}
    <h4 style="margin: 2px;"><a href="{{ post.url }}">{{ post.title }}</a><span>&nbsp;|&nbsp;{{ post.date | date_to_string }}</span></h4>
    {% endfor %}
    <p></p>
    {% endfor %}
</div>

{% endraw %}
~~~

## /blog/categories.html

<img src="/assets/images/blog/2025-05-21-jekyll-blog-tags-02.png" style="max-width:600px" alt='result'/><br/>