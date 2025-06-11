---
layout: post
author: Shao Zelian
title: 山东省平邑县邵氏宗谱
category: Technologies
tags: D3
excerpt: 费邑唐村，为邵氏族居之所。
---

<style type="text/css">

.node-container{
    text-align: center;
    border: 1px solid;
    border-radius:5px;
    text-orientation: upright;
    writing-mode: vertical-rl;
    padding: 5px;
}
</style>

<script>
    var chart = null;
    let dragNode;
    let dropNode;
    let dragEnabled = false;
    let dragStartX;
    let dragStartY;
    let isDragStarting = false;

    let undoActions = [];
    let redoActions = [];

    d3.csv(
        '/assets/family-data.csv'
    ).then((data) => {
        console.log(data);
        chart = new d3.OrgChart()
            .nodeId((dataItem) => dataItem.id)
            .parentNodeId((dataItem) => dataItem.parentId)
            .nodeWidth((node) => 100)
            .nodeHeight((node) => 150)
            .nodeContent(function (d, i, arr, state) {
                return generateContent(d);
            })
            .container('.chart-container')
            .data(data)
            .render();
    });


    function generateContent(d) {
        return `
        <div class="node-container">
            <i class="fa-solid fa-circle-user"></i>${d.data.full_name}
        </div>
      `;
    }
</script>

<div class="chart-container"></div>
