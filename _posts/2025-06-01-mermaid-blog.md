---
layout: post
author: Shao Zelian
title: Enable Mermaid for Github Pages
excerpt: Mermaid is a powerful tool for drawing diagram in Markdown pages. This article describes how to enable Mermaid for Github Pages.
category: Technologies
tags: blog, markdown
---

Mermaid is a powerful tool for drawing diagram in Markdown pages. The following steps are used to enable mermaid in Github Pages. 

**Ref.**
> [Mermaid Get Started](https://mermaid.js.org/intro/getting-started.html)<br/>
> [cdnjs](https://cdnjs.com/libraries/mermaid)

## Steps

- Find the latest mermaid javascript (cdnjs as example):<br/> _https://cdnjs.cloudflare.com/ajax/libs/mermaid/11.5.0/mermaid.min.js_
- Include the following scripts in html page or layout page. <br/>

~~~html
<!DOCTYPE html>
<html lang="{{ site.lang | default: "en-US" }}">
<head>
	...
	<script src="https://cdnjs.cloudflare.com/ajax/libs/mermaid/11.5.0/mermaid.min.js" type="text/javascript"></script>
	...
</head>
<body>
    ...
    <script>
        var config = {
            startOnLoad: true,
            theme: 'forest',
            flowchart: {
                useMaxWidth: false,
                htmlLabels: true
            }
        };
        mermaid.initialize(config);
        window.mermaid.init(undefined, document.querySelectorAll('.language-mermaid'));
    </script>
</body>
</html>
~~~

## Test by adding mermaid code block

~~~html
```mermaid
%%{init: {"flowchart": {"htmlLabels": false}} }%%
flowchart LR
    markdown["`This **is** _Markdown_`"]
    newLines["`Line1
    Line 2
    Line 3`"]
    markdown --> newLines
```
~~~

<img src="/assets/images/blog/2025-06-01-mermaid-blog-01.png" style="width: 200px; border: 1px dashed grey;"/>

## Optional: tips of changing chart style

By default, the chart is rendered based on the site css styles. Sometimes, the style doesn't satisfy requirements. One problem I encountered is, my site background is black and the lines between shapes are also with black color. This made the lines invisible.

To fix this problem, I use css selector to find the rendered objects <pre>. The mermaid markdown code is rendered as the following. 
~~~html
<pre><code class="language-mermaid" data-processed="true">
    <svg ...>...</svg></code></pre>
~~~

Select <pre> using (has) combinator and class "language-mermaid" which is rendered by mermaid. Then change css style. Here's the css I'm using. 
~~~html
<style>
/* mermaid */
pre:has(code.language-mermaid) {
    background-color:wheat !important;
}
</style>
~~~

