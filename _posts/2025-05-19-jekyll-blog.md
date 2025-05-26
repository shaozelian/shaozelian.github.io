---
layout: post
author: Shao Zelian
title: Jekyll 2 - Walk through build blog site.
excerpt: Blog is an informational website consisting of articles (also known as posts). Jekyll is a very simple template for blog site but popular and easy to use.
category: Technologies
tags: blog, jekyll
---

Prerequisite: This post assumes you have already a website built using Jekyll template. <br/>

## **Page structure** 
<span class="highlight">highlighted</span> are used specifically for posts.)<br/>

> Root Folder <br/>
> > assets <br/>
> > > css <br/>
> > > <span class="highlight"><ins>**images**</ins></span> <br/>
> > > js <br/>

> > <span class="highlight"><ins>**blog**</ins></span> <br/>
> > ><span class="highlight"><ins>**index.html**</ins></span> <br/>

> > _data <br/>
> > _includes <br/>
> > _layouts <br/>
> > <span class="highlight"><ins>**_posts**</ins></span> <br/>
> > _sass <br/>

> > index.html <br/>
> > about.md <br/>

## Posts list page - "blog/index.html"

~~~html
---
layout: default
title: BLOG
---            
{% raw %}
<h1>Latest Posts</h1>
<ul class="blog__container">
{% for post in site.posts %}
    <li>
        <h3><a href="{{ post.url }}">{{ post.title }}</a><span>&nbsp;|&nbsp;{{ post.date | date_to_string }}</span></h3>
        <span>{{ post.excerpt }}</span>
    </li>
{% endfor %}
</ul>
{% endraw %}
~~~

## Create post layout page "_layouts/post.html"

The layout file will be use for all posts.
~~~html
---
layout: default
---
{% raw %}
<h1>{{ page.title }}</h1>
<p class="post__author__date">{{ page.author }}, {{ page.date | date_to_string }}</p>

{{ content }}
{% endraw %}
~~~

## Create .md files in folder "_posts"

File name follows the pattern "2025-01-1-filename.md".

~~~html
---
layout: post
author: my name
title: this is my first post.
excerpt: My first post summary. 
---
# Welcome to my blog.

***Helo world=***, this is my first blog post.
~~~


## Final result

1. Build and run Jekyll: "jekyll serve";
2. Go to "http://localhost:4000/blog";
3. Posts are listed in the page;
4. Click the link to one post to open the post page.