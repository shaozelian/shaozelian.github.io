---
layout: post
author: Shao Zelian
title: Create infinite scroll animation
category: Technologies
tags: Web-Development
excerpt: Create infinite scroll animation
---

<style>
    .carousel-container {
        width: 100%;
        overflow: hidden;
        background: rgba(255, 202, 255);
        padding: 20px 0;
        margin-top: 150px;
    }

    .carousel-container .carousel-track {
        display: flex;
        width: max-content;
        /* Double the width for infinite scroll */
        animation: scroll 10s linear infinite;
    }

    .carousel-container .carousel-track .card {
        display: flex;
        flex: 0 0 auto;
        width: 200px;
        height: 300px;
        background: rgb(60, 1, 60);
        justify-content:  center;
        align-items: center;
        color: white;
        font-weight: bold;
        border-radius: 20px;
        margin: 0 10px;
    }

    @keyframes scroll {
        0% {
            transform: translateX(0);
        }

        100% {
            transform: translateX(-50%);
        }
    }

    .carousel-container:hover .carousel-track {
        animation-play-state: paused;
    }
</style>

<div class="carousel-container">
    <div class="carousel-track">
        <div class="card">Item 1</div>
        <div class="card">Item 2</div>
        <div class="card">Item 3</div>
        <div class="card">Item 4</div>
        <!--duplicate items-->
        <div class="card">Item 1</div>
        <div class="card">Item 2</div>
        <div class="card">Item 3</div>
        <div class="card">Item 4</div>
    </div>
</div>
