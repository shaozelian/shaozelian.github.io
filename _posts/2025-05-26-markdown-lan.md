---
layout: post
author: Shao Zelian
title: Markdown语法参考手册
excerpt: Markdown 语法参考手册
category: Technologies
tags: blog, markdown
---

[Markdown 教程](https://markdown.com.cn/basic-syntax/)

[最全面的 Markdown 语法参考手册](https://blog.axiaoxin.com/post/markdown-guide/)

## 如何修改Markdown Table的样式

Makedown table可以使用以下代码生成。在浏览器render为<table>的时候，没有增加特别的控制代码，比如id或class属性，这对修改table样式增加了困难，如果不做特殊处理的时候，表格只能使用全网站默认的样式呈现。
~~~markdown
| 表头 1 | 表头 2 |
| ------ | ------ |
| 内容 1 | 内容 2 |

/* html table */
<table>
	...
</table>
~~~

**解决方案**

在表格前面增加一个<div>对象，并指定特别的class，比如"class='special__table'"，以便后续通过css选择器找到该对象以及相对位置的对象。

这里会使用"Next sibling combinator (+)"选择器找到这个<div>对象的邻居<table>对象，再通过css控制<table>的显示样式。

~~~markdown
/* Add the div element with special class */
<div class="special__table"></div>

| 表头 1 | 表头 2 |
| ------ | ------ |
| 内容 1 | 内容 2 |


/* find the table object through (+) combinators in css */
<style>
div.special__table + table {
    border-collapse: collapse;    
}

div.special__table + table th{
    ... 
}

div.special__table + table tr{
    ...    
}
div.special__table + table td{
    border: 0.5px dashed #808080;
    padding: 10px;
    vertical-align: top;
    font-size: 0.9rem;  
}
</style>

/* html code rendered */
<div class="special__table"></div>
<table>
	...
</table>
~~~