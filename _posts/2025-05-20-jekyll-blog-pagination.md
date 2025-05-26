---
layout: post
author: Zelian Shao
title: Jekyll 3 - How to enable pagination of blog page?
category: Technologies
tags: jekyll
---

Pagination is common practice if there are more posts in your blog. Jekyll also supports this feature by "jekyll-paginate" plugin. <br/>

<i>Notes: Pagination only works with HTML files. </i>

<b>Steps:</b><br/>
1. Install "jekyll-paginate" plugin.
2. Enable pagination in _config.yml.
3. Update blog HTML page to render the pagination.

## 1. Install "jekyll-paginate" plugin.
- Update "Gemfile" to include the plugin.
	<div class="language-ruby highlighter-rouge">
		<div class="highlight">
			<pre class="highlight"><code><span class="c1"># Gemfile file</span><br/>gem "jekyll-paginate"</code></pre>
		</div>
	</div>
- Open a new command window.
- Navigate to project root folder.
- Run "bundle install" command.

## 2. Enable pagination in _config.yml.
- Add additional configuration in "_config.yml" file.
	<div class="language-ruby highlighter-rouge">
		<div class="highlight">
			<pre class="highlight"><code><span class="c1"># _config.yml file</span><br/>paginate: 5<br/>paginate_path: "/blog/page:num/"</code></pre>
		</div>
	</div>

## 3. Update blog HTML page to render the pagination.
For example, if you have "blog.html" to list all posts. <br/>
<div class="language-plaintext highlighter-rouge">
    <div class="highlight">
        <pre class="highlight"><code>{% raw %}
{% if paginator.total_pages &gt; 1 %}
&lt;div class="pagination"&gt;
	{% if paginator.previous_page %}
		&lt;a href="{{ paginator.previous_page_path | relative_url }}"&gt;&laquo; Prev&lt;/a&gt;
	{% else %}
		&lt;span&gt;&laquo; Prev&lt;/span&gt;
	{% endif %}&lt;br/&gt;
	{% for page in (1..paginator.total_pages) %}
		{% if page == paginator.page %}
			&lt;em&gt;{{ page }}&lt;/em&gt;
		{% elsif page == 1 %}
			&lt;a href="{{ site.paginate_path | relative_url | replace: 'page:num/', '' }}"&gt;{{ page }}&lt;/a&gt;
		{% else %}
			&lt;a href="{{ site.paginate_path | relative_url | replace: ':num', page }}"&gt;{{ page }}&lt;/a&gt;
		{% endif %}
	{% endfor %}
	{% if paginator.next_page %}
		&lt;a href="{{ paginator.next_page_path | relative_url }}"&gt;Next &raquo;&lt;/a&gt;
	{% else %}
		&lt;span&gt;Next &raquo;&lt;/span&gt;
	{% endif %}
&lt;/div&gt;
{% endif %}
{% endraw %}</code></pre>
	</div>
</div>

- Open a new command window.
- Navigate to project root folder.
- Run "jekyll serve" command to start the website.

