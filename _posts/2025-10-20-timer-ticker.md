---
layout: post
author: Shao Zelian
title: Timer ticker with HTML and javascript
category: Technologies
tags: Web-Development
excerpt: Timer ticker with HTML and javascript
---

<style>
  .timer-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: #353536ff;
    color: rgba(244, 244, 238, 1);
    font-family: monospace;
    font-size: 3rem;
  }
</style>

<div class="timer-container">
  <div id="clock"></div>
</div>

<script>

 
$(function(){  
     const clock = document.getElementById("clock");
     setInterval(updateTime, 1000);
    updateTime();
});  

    function updateTime() {
      const now = new Date();
      const time = now.toLocaleTimeString();
      clock.textContent = time;
    }

</script>
