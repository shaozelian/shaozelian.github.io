---
layout: post
author: Shao Zelian
title: Zoom and pan SVG in HTML
excerpt: Simple pan/zoom solution for SVGs in HTML.
category: Technologies
tags: blog, markdown
---

## Mermaid tree diagram

```mermaid
%%{init: {"theme": "default",
	"logLevel": "info",
	"useMaxWidth": true
}}%%

flowchart TD
	A[Root] --> B[Child 1]
	A --> C
	B --> D
	D --> E

	click A callback "Tooltip"
	click B callback "Tooltip"
	click C callback "Tooltip"
```

## Install svg-pan-zoom plugin

- Goto https://github.com/bumbu/svg-pan-zoom
- Download "svg-pan-zoom.min.js" file.
- Include the javascript file in web page.
- Call init method.

Sample code block (mermaid chart as example).
> Tip: Mermaid.js often generates SVGs dynamically, so need to wait for them to appear. (MutationObserver) <br/>
> Tip: To change the default svg width as "100%".

~~~html
<head>
    ...
    <script src="/assets/js/svg-pan-zoom.min.js" type="text/javascript"></script>
    ...
</head>

<body>
    ...
    <script>
        /** svg-pan-zoom plugin */
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                //debugger;
                var svgElement = document.querySelector('.language-mermaid > svg');
                if (svgElement) {
                    svgElement.setAttribute("width", "100%");
                    var panZoomInstance = svgPanZoom(svgElement, {
                        zoomEnabled: true,
                        controlIconsEnabled: true,
                        fit: true,
                        center: true
                    });

                    // 设置默认缩放比例为 50%
                    panZoomInstance.zoom(0.7);
                }

            });
        });
        observer.observe(document.body, { childList: true, subtree: true });
    </script>
</body>
~~~