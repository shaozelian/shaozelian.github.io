---
layout: post
author: Shao Zelian
title: CSS enlarge and minimize content
category: Technologies
tags: D3
excerpt: To make a div content popup window with enlarging and mimizing functions.
---

<style>
    .overlay {
        display: none;
        /* Hidden by default */
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        /* Semi-transparent background */
        z-index: 1;
        /* Sit on top */
    }

    .tree-container {
        display: block;
        width: 100%;
        /* Center the popup */
        background-color: rgba(255, 255, 255, 0.451);
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        z-index: 2;
        /* Sit on top of the overlay */
    }

    .tree-container .toolbar {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 10px;
    }

    .tree-container .toolbar button {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 1.2em;
        margin-left: 10px;
    }
</style>

## Demo
This is the the demo.

<div class="overlay" id="overlay"></div>
<div class="tree-container" id="tree-container">
    <div class="toolbar">
        <button onclick="enlarge()" id="enlarge-button" style="display: block;">
            <i class="fa-solid fa-up-right-and-down-left-from-center"></i>
        </button>
        <button onclick="minimize()" id="minimize-button" style="display: none;">
            <i class="fa-solid fa-minimize"></i>
        </button>
    </div>
    <h2>This is the Title</h2>
    <p>This is a centered popup window!</p>
    <p>This is a centered popup window!</p>
    <p>This is a centered popup window!</p>
    <p>This is a centered popup window!</p>
    <p>This is a centered popup window!</p>
    <p>This is a centered popup window!</p>
    <p>This is a centered popup window!</p>
    <p>This is a centered popup window!</p>
    <p>This is a centered popup window!</p>
</div>

<script>
    const overlay = document.getElementById('overlay');
    const container = document.getElementById('tree-container');
    const enlargeButton = document.getElementById('enlarge-button');
    const minimizeButton = document.getElementById('minimize-button');
    let originalPosition = {
        top: container.top,
        left: container.left
    };

    function enlarge() {
        overlay.style.display = 'block';
        container.style.position = 'fixed';
        container.style.top = '50%';
        container.style.left = '50%';
        container.style.transform = 'translate(-50%, -50%)';
        enlargeButton.style.display = "none";
        minimizeButton.style.display = "block";
    }

    function minimize() {
        overlay.style.display = 'none';
        container.style.position = 'static';
        container.style.top = `${originalPosition.top}px`;
        container.style.transform = "none";
        enlargeButton.style.display = "block";
        minimizeButton.style.display = "none";
    } 
</script>
<br/>
## Code
Full code below.

### HTML Elements

These are HTML elements.

```html
<div class="overlay" id="overlay"></div>
<div class="tree-container" id="tree-container">
    <div class="toolbar">
        <button onclick="enlarge()" id="enlarge-button" style="display: block;">
            <i class="fa-solid fa-up-right-and-down-left-from-center"></i>
        </button>
        <button onclick="minimize()" id="minimize-button" style="display: none;">
            <i class="fa-solid fa-minimize"></i>
        </button>
    </div>
    <h2>This is the Title</h2>
    <p>This is a centered popup window!</p>
    <p>This is a centered popup window!</p>
    <p>This is a centered popup window!</p>
    <p>This is a centered popup window!</p>
    <p>This is a centered popup window!</p>
    <p>This is a centered popup window!</p>
    <p>This is a centered popup window!</p>
    <p>This is a centered popup window!</p>
    <p>This is a centered popup window!</p>
</div>
```

### Style
Default styles

```html
<style>
    .overlay {
        display: none;
        /* Hidden by default */
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
        /* Semi-transparent background */
        z-index: 1;
        /* Sit on top */
    }

    .tree-container {
        display: block;
        width: 100%;
        /* Center the popup */
        background-color: rgba(255, 255, 255, 0.451);
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        z-index: 2;
        /* Sit on top of the overlay */
    }

    .tree-container .toolbar {
        display: flex;
        justify-content: flex-end;
        margin-bottom: 10px;
    }

    .tree-container .toolbar button {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 1.2em;
        margin-left: 10px;
    }
</style>
```

### Javascript
Javascript code as below.
```html
<script>
    const overlay = document.getElementById('overlay');
    const container = document.getElementById('tree-container');
    const enlargeButton = document.getElementById('enlarge-button');
    const minimizeButton = document.getElementById('minimize-button');
    let originalPosition = {
        top: container.top,
        left: container.left
    };

    function enlarge() {
        overlay.style.display = 'block';
        container.style.position = 'fixed';
        container.style.top = '50%';
        container.style.left = '50%';
        container.style.transform = 'translate(-50%, -50%)';
        enlargeButton.style.display = "none";
        minimizeButton.style.display = "block";
    }

    function minimize() {
        overlay.style.display = 'none';
        container.style.position = 'static';
        container.style.top = `${originalPosition.top}px`;
        container.style.transform = "none";
        enlargeButton.style.display = "block";
        minimizeButton.style.display = "none";
    } 
</script>
```