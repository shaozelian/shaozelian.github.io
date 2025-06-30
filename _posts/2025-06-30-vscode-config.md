---
layout: post
author: Shao Zelian
title: VSCode编辑器配置
category: Technologies
tags: VSCode
excerpt: VSCode是编程常用的IDE工具，这篇文章是使用VSCode的经验总结。
---

## 常用的插件安装

<div class="special__table"></div>

| 插件名称            | 用途说明                                                   |
| ------------------- | ---------------------------------------------------------- |
| Github Copilot      | AI Pair Programming                                        |
| Markdown All in One | 适合用Markdown文章编写，可以提供Markdown Formatter等功能。 |
| Rainbow CSV         | 用不同颜色显示不同的Column，以方便识别不同列值。           |

## 推荐字体Maple Mono设置

推荐一款中英文等宽字体Maple Mono，类似Jetbrains Mono字体（注：不支持中文字体）。Maple Mono是一款开源等宽字体，专注于优化编程体验。

完美支持中英文2:1等宽对齐，特别适合中国程序员。特别适合Markdown文章中英文混编，可以做到完美对齐。

下载并安装字体文件（Windows）
1. 下载字体[Github: maple-font](https://github.com/subframe7536/maple-font)。有多种字体文件下载，以Windows为例，我下载的是NF-CN Normal-ligature Unhinted版本。
2. 解压下载的zip包，可以看到多个*.TTF字体文件。
3. 选中所有*.TTF文件，右键选择菜单“安装(Install)”，字体文件会被安装到C:\windows\fonts目录。
4. 打开系统字体文件目录，可以找到"Maple..."字体的名称，比如我安装后的字体文件名字为“Maple Mono Normal NF CN”。

配置VSCode
1. 打开VSCode -> "Settings" -> "Text Editor" -> "Font"
2. 找到"Font Family"配置，在已有字体名称前增加“Maple Mono Normal NF CN”（必须与系统字体文件名称一致）。<br/>
   例如：'Maple Mono Normal NF CN', Consolas, 'Courier New', monospace
3. 通过编辑settings.json文件，设置“Font Ligatures”为"true"，该设置会实现特殊字符连接的效果，比如-> ==等。
4. 设置完毕后，重启VSCode。
